import { useMemo, useState } from 'react';
import MathMarkdown from '@/components/MathMarkdown';
import type { Question } from '@/data/questions';

interface AOCQuizProps {
  questions: Question[];
}

export default function AOCQuiz({ questions }: AOCQuizProps) {
  const usableQuestions = useMemo(() => questions.slice(0, 10), [questions]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});

  if (usableQuestions.length === 0) return null;

  const currentQuestion = usableQuestions[currentIndex];
  const selected = answers[currentQuestion.id];
  const revealed = Boolean(selected);
  const isLast = currentIndex === usableQuestions.length - 1;
  const score = usableQuestions.filter((question) => answers[question.id] === question.answer).length;

  return (
    <div className="border border-border rounded-lg bg-card p-4 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold tracking-widest text-primary">🧠 OFFLINE PRACTICE MODE</p>
          <p className="text-xs text-muted-foreground">Answer and see the correction immediately without data.</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] tracking-widest text-muted-foreground">QUESTION</p>
          <p className="text-sm font-bold text-foreground">{currentIndex + 1}/{usableQuestions.length}</p>
        </div>
      </div>

      <div className="space-y-3">
        <MathMarkdown className="text-sm text-foreground [&_p]:my-0 [&_ul]:my-2 [&_ol]:my-2">
          {currentQuestion.question}
        </MathMarkdown>

        <div className="space-y-2">
          {(['A', 'B', 'C', 'D'] as const).map((option) => {
            const isSelected = selected === option;
            const isCorrect = currentQuestion.answer === option;
            const isWrongPick = revealed && isSelected && !isCorrect;

            return (
              <button
                key={option}
                onClick={() => !revealed && setAnswers((prev) => ({ ...prev, [currentQuestion.id]: option }))}
                disabled={revealed}
                className={`w-full rounded-lg border p-3 text-left transition-colors ${
                  isCorrect && revealed
                    ? 'border-primary bg-primary/10'
                    : isWrongPick
                      ? 'border-destructive bg-destructive/10'
                      : isSelected
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-background hover:bg-muted/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold ${
                    isCorrect && revealed
                      ? 'border-primary bg-primary text-primary-foreground'
                      : isWrongPick
                        ? 'border-destructive text-destructive'
                        : 'border-border text-muted-foreground'
                  }`}>
                    {option}
                  </span>
                  <MathMarkdown className="min-w-0 flex-1 text-sm text-foreground [&_p]:my-0">
                    {currentQuestion.options[option]}
                  </MathMarkdown>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {revealed && (
        <div className="rounded-lg border border-border bg-muted/40 p-3 space-y-2">
          <p className="text-[10px] font-bold tracking-widest text-muted-foreground">
            {selected === currentQuestion.answer ? '✅ CORRECT' : `❌ CORRECT ANSWER: ${currentQuestion.answer}`}
          </p>
          <MathMarkdown className="text-sm text-foreground [&_p]:my-0.5">
            {currentQuestion.explanation}
          </MathMarkdown>
        </div>
      )}

      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">Score so far: <span className="font-bold text-foreground">{score}</span></p>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="rounded px-3 py-2 text-xs font-bold tracking-wider bg-muted text-foreground disabled:opacity-40"
          >
            ← PREV
          </button>
          <button
            onClick={() => {
              if (isLast) {
                setCurrentIndex(0);
                setAnswers({});
                return;
              }
              setCurrentIndex((prev) => prev + 1);
            }}
            disabled={!revealed}
            className="rounded px-3 py-2 text-xs font-bold tracking-wider bg-primary text-primary-foreground disabled:opacity-40"
          >
            {isLast ? 'RESTART' : 'NEXT →'}
          </button>
        </div>
      </div>
    </div>
  );
}