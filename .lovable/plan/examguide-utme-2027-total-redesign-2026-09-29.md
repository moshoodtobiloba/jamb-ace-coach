# EXAMGUIDE UTME 2027 total redesign

## Goal
Rebuild the full student experience around a bright, premium editorial system while preserving every question, answer, score, timetable entry, saved mistake, progress record, offline feature, and tutor action.

## Visual direction
- Predominantly white canvas with deep ink typography, warm paper neutrals, and one restrained oxblood accent used only for focus and status.
- A reading-first type system selected for long lessons and exam questions: an expressive editorial display face for major headings, paired with a highly legible sans-serif for controls and study content.
- Sharp dividers and full-width page bands instead of rounded cards, floating boxes, neon effects, emojis, gradients, or footer tabs.
- Mobile-first navigation through one clear menu containing HQ, AOC, CBT, Tutor, Log, Display, Help, Rest Mode, and Sign Out.

## What will change
1. **Design foundation**
   - Replace the dark green “machine” theme, glow effects, and old typography with new semantic light-mode tokens.
   - Restyle shared buttons, fields, dialogs, progress indicators, and feedback states so every screen feels related.
   - Update the app name and visible 2026 language to EXAMGUIDE UTME 2027.

2. **Application shell and navigation**
   - Replace the current header/footer navigation with a precise top bar and full-height menu.
   - Keep every existing destination and action accessible without duplicating navigation.
   - Make the content width and spacing adapt cleanly from phones to large screens.

3. **Headquarters**
   - Turn the home screen into a clear daily study briefing: one next action, current subjects, progress, streak, revisions, and today’s timetable.
   - Use ruled rows and editorial sections rather than a dashboard of boxes.
   - Retain rest mode and install/offline controls.

4. **Learning screens**
   - Restyle AOC, lessons, CBT setup/exam/results, calculator, Tutor, Mistake Log, contact, timetable, onboarding, and survey surfaces.
   - Improve question readability, answer selection, exam navigation, score hierarchy, and formula presentation without changing question data or exam logic.

5. **Entry and offline presentation**
   - Redesign sign-in/sign-up to match the new identity.
   - Refresh install prompts and offline-facing copy so the product feels intentional when saved to a phone.
   - Update the app manifest and page metadata to EXAMGUIDE UTME 2027.

6. **Verification**
   - Check the central signed-in flow on mobile and desktop: open menu, move between learning areas, start CBT, use calculator, and return home.
   - Confirm no content overlaps, no footer navigation remains, formulas render, and the current build has no errors.

## Technical notes
- Existing local storage keys and state shapes stay unchanged so current users keep their saved progress.
- Existing question and syllabus files remain untouched; this work does not add or remove questions.
- The redesign will use the current React app, semantic design tokens, existing accessible controls, and reduced-motion support.
