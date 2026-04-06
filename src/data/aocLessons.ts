import type { Topic } from './syllabus';
import { SUBJECT_LABELS } from './syllabus';
import { getQuestionsBySubject, getQuestionsForTopic, type Question } from './questions';

function unique<T>(items: T[]): T[] {
  return Array.from(new Set(items));
}

function getLocalQuestions(topic: Topic): Question[] {
  const exact = getQuestionsForTopic(topic.subject, topic.name);
  if (exact.length > 0) return exact;
  return getQuestionsBySubject(topic.subject).slice(0, 12);
}

function formatOptions(question: Question): string {
  return (['A', 'B', 'C', 'D'] as const)
    .map((option) => `- **${option}.** ${question.options[option]}`)
    .join('\n');
}

export function getOfflinePracticeQuestions(topic: Topic, count = 10): Question[] {
  return getLocalQuestions(topic).slice(0, count);
}

export function buildOfflineLessonMarkdown(topic: Topic): string {
  const questions = getLocalQuestions(topic);
  const examples = questions.slice(0, 3);
  const keyIdeas = unique(questions.map((question) => question.explanation.trim()).filter(Boolean)).slice(0, 6);
  const quickChecks = questions.slice(3, 8);

  return [
    `## ${topic.name}`,
    '',
    '### 📖 What Is This? (Offline Lesson)',
    `This lesson is stored inside your app, so it works without internet connection. It focuses on **${topic.name}** in **${SUBJECT_LABELS[topic.subject]}** and follows the same exam direction as your CBT practice.`,
    '',
    `**Topic family:** ${topic.category}`,
    '',
    '### 🔰 Core Ideas You Must Know',
    ...(keyIdeas.length > 0
      ? keyIdeas.map((idea) => `- ${idea}`)
      : ['- Study the worked examples and the practice section below for the main patterns in this topic.']),
    '',
    '### 📘 Worked Examples from Your Stored Question Bank',
    ...examples.flatMap((question, index) => [
      `#### Example ${index + 1}`,
      `**Question:** ${question.question}`,
      formatOptions(question),
      `**Correct answer:** ${question.answer}. ${question.options[question.answer]}`,
      `**Explanation:** ${question.explanation}`,
      '',
    ]),
    '### ⚡ Exam Clues',
    '- Read the exact keyword first before calculating or choosing an option.',
    '- Watch out for familiar traps: wrong unit, wrong sign, wrong base, wrong tense, or a distractor that looks almost correct.',
    '- If a question feels long, break it into: what is given, what is asked, and which rule/formula solves it.',
    '',
    '### 🧠 Quick Self-Check',
    ...quickChecks.map((question, index) => `${index + 1}. ${question.question}`),
    '',
    '### 🎯 Interactive Practice',
    'Use the offline practice box below to answer with A, B, C, or D and get the explanation immediately.',
  ].join('\n');
}