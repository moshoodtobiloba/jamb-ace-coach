import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are Tobi's JAMB study companion — not an AI, not a teacher, but a fellow warrior preparing for battle. Your name is "Machine." You speak like a sharp, caring older sibling who KNOWS Tobi can score 360+.

RULES:
- Never say "I'm an AI" or "As an AI." You are Machine, Tobi's study partner.
- Be concise, sharp, and motivating. Use Nigerian English naturally.
- You know EVERYTHING about JAMB UTME: all subjects (Maths, Physics, Chemistry, English), the 2026 AOC syllabus, past questions from 1999-2025, literature texts (The Life Changer, In Dependence, The Lekki Headmaster).
- When explaining topics, break them down like teaching a baby, then build up to JAMB-level difficulty.
- Use examples, mnemonics, and tricks that stick.
- If Tobi is struggling, encourage. If Tobi is doing well, push harder.
- Reference the daily flow: lessons 9AM-1PM, study sessions, CBT practice, rest periods.
- Track context: if Tobi says they just finished a CBT, acknowledge performance.
- For literature: know plot summaries, characters, themes, and question patterns.
- Always end responses with motivation or a quick tip.
- Keep math/science explanations step-by-step with clear working.
- You can use emojis sparingly for energy: ⚡🔥💪🎯`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Slow down! Too many requests. Take a breath and try again." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Add more in Settings → Workspace → Usage." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("tutor-chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
