import type { Topic } from './syllabus';
import { SUBJECT_LABELS } from './syllabus';
import { getTopicNote } from './topicNotes';
import { AOC_SEEN_KEY, getQuestionsBySubject, getQuestionsForTopic, selectQuestionsForSession, type Question } from './questions';

function unique<T>(items: T[]): T[] {
  return Array.from(new Set(items));
}

function getLocalQuestions(topic: Topic): Question[] {
  const own = getTopicNote(topic.id)?.practice ?? [];
  const exact = getQuestionsForTopic(topic.subject, topic.name);
  if (own.length + exact.length > 0) return [...own, ...exact];
  return getQuestionsBySubject(topic.subject).slice(0, 12);
}

function formatOptions(question: Question): string {
  return (['A', 'B', 'C', 'D'] as const)
    .map((option) => `- **${option}.** ${question.options[option]}`)
    .join('\n');
}

export function getOfflinePracticeQuestions(topic: Topic, count = 10): Question[] {
  const own = getTopicNote(topic.id)?.practice ?? [];
  const bank = getQuestionsForTopic(topic.subject, topic.name);
  const picked = selectQuestionsForSession(bank, Math.max(0, count - own.length), AOC_SEEN_KEY);
  const result = [...own, ...picked];
  return result.length > 0 ? result.slice(0, count) : selectQuestionsForSession(getLocalQuestions(topic), count, AOC_SEEN_KEY);
}

export function buildOfflineLessonMarkdown(topic: Topic): string {
  const note = getTopicNote(topic.id);
  const questions = getQuestionsForTopic(topic.subject, topic.name);
  const examples = (questions.length ? questions : note?.practice ?? []).slice(0, 2);
  return [
    `## ${topic.name}`,
    '',
    `**${SUBJECT_LABELS[topic.subject]} · ${topic.category}** — aligned to the JAMB UTME syllabus for the 2027 exam. Works without data.`,
    '',
    ...(note ? [
      '### What JAMB expects you to do',
      ...note.objectives.map((o) => `- ${o}`),
      '',
      '### Key points',
      ...note.points.map((p) => `- ${p}`),
      '',
      ...(note.formulas?.length ? ['### Formulas to memorise', ...note.formulas.map((f) => `- ${f}`), ''] : []),
      ...(note.traps?.length ? ['### Common traps', ...note.traps.map((t) => `- ${t}`), ''] : []),
    ] : []),
    ...(examples.length ? ['### Worked examples', ...examples.flatMap((question, index) => [
      `**Example ${index + 1}.** ${question.question}`,
      '',
      formatOptions(question),
      '',
      `**Answer: ${question.answer}.** ${question.explanation}`,
      '',
    ])] : []),
    '### Exam clues',
    '- Read the exact keyword first before calculating or choosing an option.',
    '- Watch for traps: wrong unit, wrong sign, wrong base, wrong tense, or an option that looks almost right.',
    '- Break long questions into: what is given, what is asked, which rule solves it.',
    '',
    '### Classwork',
    'Pick A, B, C or D below — your answer is marked immediately with the correction.',
  ].join('\n');
}
