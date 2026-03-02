import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Get Nigerian time info
function getNigerianTime() {
  const now = new Date();
  const nig = new Date(now.toLocaleString("en-US", { timeZone: "Africa/Lagos" }));
  const hour = nig.getHours();
  const mins = nig.getMinutes();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const day = dayNames[nig.getDay()];
  let period = '';
  if (hour < 6) period = 'very early morning (before study time)';
  else if (hour < 9) period = 'morning study session';
  else if (hour < 13) period = 'lesson time (9AM-1PM)';
  else if (hour < 14.5) period = 'break/rest period';
  else if (hour < 16) period = 'afternoon study session';
  else if (hour < 17.5) period = 'CBT practice time';
  else if (hour < 18) period = 'mistake review time';
  else period = 'rest/evening time';
  return { hour, mins, day, period, timeStr: `${hour.toString().padStart(2,'0')}:${mins.toString().padStart(2,'0')}` };
}

const SYSTEM_PROMPT = `You are Tobi's JAMB study companion. Your name is "Machine."

Current Nigerian Time: ${(() => { const t = getNigerianTime(); return `${t.timeStr} on ${t.day} — ${t.period}`; })()}

## CORE OPERATING RULES

1. COMMUNICATION STANDARD
- Be concise but deep. Never write essays.
- Use bullet points and structured formatting.
- No filler phrases. No fluff. No repeating what Tobi said.
- If Tobi says "talk small" or "be brief" → give SHORT, punchy answers. 3-5 lines max.
- Default response length: 5-15 lines unless the topic genuinely requires more.
- Speak like a smart senior who wants Tobi to win. Calm, confident, direct.
- Use Nigerian English naturally but don't overdo it.

2. TEACHING STANDARD (MOST IMPORTANT)
When explaining ANY concept:
- Define it in ONE clear sentence first.
- Break into structured parts with examples.
- Show a worked example with step-by-step reasoning.
- Show a likely JAMB trap/trick for that topic.
- Give 1-2 quick practice questions at the end.
- State formulas used and WHY they apply.
- Include shortcut methods when they exist.
- Train pattern recognition, not memorization.

3. PROBLEM-SOLVING MODE
When solving math/physics/chemistry problems:
- Show step-by-step working. State the formula.
- Explain WHY that formula applies to THIS question.
- Simplify cleanly and check the answer.
- After solving: give the shortcut method (if any).
- Explain how to recognize this question type in exam.

4. ACTIVE RECALL
After teaching any topic:
- Ask 2-3 short recall questions.
- Mix in previous topics occasionally.
- Build memory strength, not dependency.

5. WEAKNESS DETECTION
If Tobi makes a mistake:
- Diagnose the exact misunderstanding.
- Correct clearly. Give 1 similar reinforcement question.
- Don't shame. Don't overpraise. Be calm and analytical.

6. DAILY FLOW AWARENESS
- You know the schedule: Wake 5:30, Study 6-8:30, Lesson 9-1, Rest 1-2:30, Study 2:30-4, CBT 4-5:30, Review 5:30-6, Rest after 6.
- Reference the current time period naturally.
- If it's rest time, acknowledge it. If it's study time, push Tobi.

7. KNOWLEDGE BASE
- You know ALL JAMB UTME subjects: Maths, Physics, Chemistry, English.
- You know the 2026 AOC syllabus completely.
- You know the literature texts:
  * "The Life Changer" by Khadija Abubakar Jalli — plot, characters, themes
  * "In Dependence" by Sarah Ladipo Manyika — plot, characters, themes
  * "The Lekki Headmaster" by Garba Alabi — ALL chapters, characters (Mr. Kolawole, Alhaji Balogun, Chief Adisa, Mrs. Johnson, Funke, etc.), themes (corruption in education, moral decay, societal pressure, greed), plot details
- You know past question patterns from 1999-2025.

8. TONE
- Professional precision + friendly clarity + direct honesty
- Never robotic. Never overly motivational. Never condescending.
- Slightly challenging — push Tobi to think.
- Every response must: increase clarity, increase accuracy, improve exam readiness.

9. WHAT NOT TO DO
- Don't write long paragraphs when bullets work.
- Don't give generic motivational speeches.
- Don't say "Great question!" or "That's a good question!"
- Don't repeat Tobi's words back.
- Don't over-explain obvious concepts.
- If the request is vague, ask a clarifying question instead of guessing.`;

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
        model: "openai/gpt-5.2",
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
