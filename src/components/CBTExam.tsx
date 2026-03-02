import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question, generateExam, generateCustomExam, getQuestionsBySubject, getAvailableYears, getSubjectTopics } from '@/data/questions';
import { Subject, SUBJECT_LABELS } from '@/data/syllabus';
import Calculator from './Calculator';

type ExamMode = 'setup' | 'exam' | 'review';

interface CBTExamProps {
  onSessionComplete: (session: { date: string; duration: number; score?: number; total?: number; type: 'daily' | 'general' }) => void;
  sessions: { id: string; date: string; duration: number; score?: number; total?: number; type: string }[];
}

export default function CBTExam({ onSessionComplete, sessions }: CBTExamProps) {
  const [mode, setMode] = useState<ExamMode>('setup');
  const [examType, setExamType] = useState<'daily' | 'general'>('daily');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [currentQ, setCurrentQ] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showCalc, setShowCalc] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [examStartTime, setExamStartTime] = useState(0);
  const [subjectFilter, setSubjectFilter] = useState<Subject | 'all'>('all');

  // Practice mode filters
  const [practiceSubject, setPracticeSubject] = useState<Subject>('mathematics');
  const [practiceTopic, setPracticeTopic] = useState<string>('all');
  const [practiceYear, setPracticeYear] = useState<number | 'all'>('all');

  // Custom CBT mode
  const [showCustom, setShowCustom] = useState(false);
  const [customSubjects, setCustomSubjects] = useState<Subject[]>(['mathematics', 'physics', 'chemistry', 'english']);
  const [customQPerSubject, setCustomQPerSubject] = useState(15);
  const [customTimeMin, setCustomTimeMin] = useState(30);
  const [customYear, setCustomYear] = useState<number | 'all'>('all');
  const [customTopics, setCustomTopics] = useState<string[]>([]);

  // Timer
  useEffect(() => {
    if (mode !== 'exam' || timeLeft <= 0) return;
    const t = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [mode, timeLeft]);

  // Keyboard shortcuts
  useEffect(() => {
    if (mode !== 'exam') return;
    const handleKey = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (['A', 'B', 'C', 'D'].includes(key)) {
        setAnswers(prev => ({ ...prev, [questions[currentQ].id]: key as 'A' | 'B' | 'C' | 'D' }));
      } else if (key === 'N' || e.key === 'ArrowRight') {
        setCurrentQ(prev => Math.min(prev + 1, questions.length - 1));
      } else if (key === 'P' || e.key === 'ArrowLeft') {
        setCurrentQ(prev => Math.max(prev - 1, 0));
      } else if (key === 'S') {
        setShowSubmitConfirm(true);
      } else if (key === 'Y' && showSubmitConfirm) {
        handleSubmit();
      } else if (key === 'R' && showSubmitConfirm) {
        setShowSubmitConfirm(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [mode, currentQ, questions, showSubmitConfirm]);

  const startExam = (type: 'daily' | 'general') => {
    setExamType(type);
    const qs = generateExam(type);
    setQuestions(qs);
    setAnswers({});
    setCurrentQ(0);
    setTimeLeft(type === 'general' ? 120 * 60 : 30 * 60);
    setExamStartTime(Date.now());
    setMode('exam');
    setSubjectFilter('all');
  };

  const startPractice = () => {
    let qs = getQuestionsBySubject(practiceSubject);
    if (practiceTopic !== 'all') qs = qs.filter(q => q.topic === practiceTopic);
    if (practiceYear !== 'all') qs = qs.filter(q => q.year === practiceYear);
    if (qs.length === 0) return;
    // Shuffle for randomness
    qs = [...qs].sort(() => Math.random() - 0.5);
    setQuestions(qs);
    setAnswers({});
    setCurrentQ(0);
    setTimeLeft(qs.length * 90);
    setExamStartTime(Date.now());
    setMode('exam');
    setExamType('daily');
    setSubjectFilter('all');
  };

  const startCustomExam = () => {
    if (customSubjects.length === 0) return;
    const qs = generateCustomExam({
      subjects: customSubjects,
      questionsPerSubject: customQPerSubject, // No cap - use whatever user sets
      topics: customTopics.length > 0 ? customTopics : undefined,
      year: customYear !== 'all' ? customYear : undefined,
    });
    if (qs.length === 0) return;
    setQuestions(qs);
    setAnswers({});
    setCurrentQ(0);
    setTimeLeft(customTimeMin * 60);
    setExamStartTime(Date.now());
    setMode('exam');
    setExamType('daily');
    setSubjectFilter('all');
    setShowCustom(false);
  };

  const handleSubmit = useCallback(() => {
    const duration = Math.floor((Date.now() - examStartTime) / 1000);
    let score = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.answer) score++;
    });
    onSessionComplete({
      date: new Date().toDateString(),
      duration,
      score,
      total: questions.length,
      type: examType,
    });
    setMode('review');
    setShowSubmitConfirm(false);
  }, [answers, questions, examStartTime, examType, onSessionComplete]);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const getFilteredIndices = () => {
    if (subjectFilter === 'all') return questions.map((_, i) => i);
    return questions.map((q, i) => q.subject === subjectFilter ? i : -1).filter(i => i !== -1);
  };

  // Get all topics for custom mode based on selected subjects
  const getCustomTopicsList = () => {
    const topics = new Set<string>();
    customSubjects.forEach(sub => {
      getSubjectTopics(sub).forEach(t => topics.add(t));
    });
    return Array.from(topics);
  };

  // ============== SETUP SCREEN ==============
  if (mode === 'setup') {
    const todaySessions = sessions.filter(s => s.date === new Date().toDateString());
    const availableYears = getAvailableYears();
    const topics = getSubjectTopics(practiceSubject);
    const customTopicsList = getCustomTopicsList();

    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black tracking-wider text-foreground">JAMB UTME CBT</h2>
          <p className="text-xs text-muted-foreground tracking-widest">COMPUTER BASED TEST — SIMULATION MODE</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest text-primary">SYSTEM READY</span>
          </div>
        </div>

        {/* Exam Mode Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={() => startExam('daily')}
            className="border border-border rounded-lg p-6 text-left hover:border-primary/50 transition-colors group">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">⚡</span>
              <div>
                <p className="font-bold tracking-wider text-foreground group-hover:text-primary transition-colors">DAILY CBT</p>
                <p className="text-[10px] text-muted-foreground tracking-widest">RANDOM MIX EVERY TIME</p>
              </div>
            </div>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>• 60 Questions (15 per subject)</p>
              <p>• 30 Minutes</p>
              <p>• Questions shuffled randomly</p>
            </div>
          </motion.button>

          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={() => startExam('general')}
            className="border border-secondary/30 rounded-lg p-6 text-left hover:border-secondary/60 transition-colors group">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🔥</span>
              <div>
                <p className="font-bold tracking-wider text-secondary group-hover:text-secondary transition-colors">FULL JAMB SIMULATION</p>
                <p className="text-[10px] text-muted-foreground tracking-widest">EXACTLY LIKE THE REAL THING</p>
              </div>
            </div>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>• 180 Questions (60 English + 40×3)</p>
              <p>• 2 Hours (120 Minutes)</p>
              <p>• Random questions from all years</p>
            </div>
          </motion.button>
        </div>

        {/* Practice by Topic/Year */}
        <div className="border border-border rounded-lg p-5 space-y-4">
          <p className="text-xs font-bold tracking-widest text-muted-foreground">📚 PRACTICE BY TOPIC / YEAR</p>
          <div className="flex gap-2 flex-wrap">
            {(['mathematics', 'physics', 'chemistry', 'english'] as Subject[]).map(s => (
              <button key={s} onClick={() => { setPracticeSubject(s); setPracticeTopic('all'); }}
                className={`px-3 py-1.5 rounded text-xs font-bold tracking-wider transition-colors ${
                  practiceSubject === s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}>{SUBJECT_LABELS[s]}</button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-muted-foreground tracking-widest block mb-1">TOPIC</label>
              <select value={practiceTopic} onChange={e => setPracticeTopic(e.target.value)}
                className="w-full bg-muted border border-border rounded px-3 py-2 text-xs text-foreground">
                <option value="all">All Topics</option>
                {topics.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] text-muted-foreground tracking-widest block mb-1">YEAR</label>
              <select value={practiceYear} onChange={e => setPracticeYear(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
                className="w-full bg-muted border border-border rounded px-3 py-2 text-xs text-foreground">
                <option value="all">All Years</option>
                {availableYears.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>
          <button onClick={startPractice}
            className="w-full py-2.5 bg-muted hover:bg-muted/80 rounded text-xs font-bold tracking-wider text-foreground transition-colors">
            START PRACTICE →
          </button>
        </div>

        {/* Custom CBT Mode */}
        <div className="border border-border rounded-lg p-5 space-y-4">
          <button onClick={() => setShowCustom(!showCustom)} className="w-full text-left">
            <p className="text-xs font-bold tracking-widest text-muted-foreground">🎯 CUSTOM CBT MODE {showCustom ? '▼' : '▶'}</p>
            <p className="text-[10px] text-muted-foreground mt-1">Choose subjects, questions, topics, year, and time</p>
          </button>
          {showCustom && (
            <div className="space-y-3 pt-2">
              {/* Subject selection */}
              <div>
                <label className="text-[10px] text-muted-foreground tracking-widest block mb-1">SUBJECTS</label>
                <div className="flex gap-2 flex-wrap">
                  {(['mathematics', 'physics', 'chemistry', 'english'] as Subject[]).map(s => (
                    <button key={s}
                      onClick={() => {
                        setCustomSubjects(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
                        setCustomTopics([]);
                      }}
                      className={`px-3 py-1.5 rounded text-xs font-bold tracking-wider transition-colors ${
                        customSubjects.includes(s) ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}>{SUBJECT_LABELS[s]}</button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] text-muted-foreground tracking-widest block mb-1">Q PER SUBJECT</label>
                  <input type="number" value={customQPerSubject}
                    onChange={e => setCustomQPerSubject(Math.max(1, parseInt(e.target.value) || 1))}
                    min={1} max={200}
                    className="w-full bg-muted border border-border rounded px-3 py-2 text-xs text-foreground" />
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground tracking-widest block mb-1">TIME (MIN)</label>
                  <input type="number" value={customTimeMin}
                    onChange={e => setCustomTimeMin(Math.max(1, parseInt(e.target.value) || 1))}
                    min={1} max={300}
                    className="w-full bg-muted border border-border rounded px-3 py-2 text-xs text-foreground" />
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground tracking-widest block mb-1">YEAR</label>
                  <select value={customYear}
                    onChange={e => setCustomYear(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
                    className="w-full bg-muted border border-border rounded px-3 py-2 text-xs text-foreground">
                    <option value="all">All Years</option>
                    {availableYears.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>

              {/* Topic filter for custom */}
              {customTopicsList.length > 0 && (
                <div>
                  <label className="text-[10px] text-muted-foreground tracking-widest block mb-1">TOPICS (optional — leave empty for all)</label>
                  <div className="flex gap-1.5 flex-wrap max-h-24 overflow-y-auto">
                    {customTopicsList.map(t => (
                      <button key={t}
                        onClick={() => setCustomTopics(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])}
                        className={`px-2 py-1 rounded text-[10px] font-bold transition-colors ${
                          customTopics.includes(t) ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'
                        }`}>{t}</button>
                    ))}
                  </div>
                </div>
              )}

              <button onClick={startCustomExam} disabled={customSubjects.length === 0}
                className="w-full py-2.5 bg-secondary text-secondary-foreground rounded text-xs font-bold tracking-wider hover:bg-secondary/80 transition-colors disabled:opacity-40">
                🎯 START CUSTOM CBT ({customSubjects.length * customQPerSubject} Q • {customTimeMin} MIN)
              </button>
            </div>
          )}
        </div>

        {/* Keyboard Shortcuts */}
        <div className="border border-border rounded-lg p-4">
          <p className="text-[10px] text-muted-foreground tracking-widest mb-3">⌨️ KEYBOARD SHORTCUTS (SAME AS REAL JAMB)</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[['A, B, C, D', 'Select answer'], ['N / →', 'Next question'], ['P / ←', 'Previous question'], ['S', 'Submit exam'], ['Y', 'Confirm submit'], ['R', 'Return (cancel submit)']].map(([key, desc]) => (
              <div key={key} className="flex items-center gap-2">
                <kbd className="px-2 py-0.5 bg-muted rounded text-[10px] font-mono text-foreground border border-border">{key}</kbd>
                <span className="text-muted-foreground">{desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Sessions */}
        {todaySessions.length > 0 && (
          <div className="border border-border rounded-lg p-4">
            <p className="text-[10px] text-muted-foreground tracking-widest mb-3">TODAY'S SESSIONS</p>
            <div className="space-y-2">
              {todaySessions.map(s => (
                <div key={s.id} className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">{s.type.toUpperCase()} • {formatTime(s.duration)}</span>
                  {s.score !== undefined && (
                    <span className={`font-bold ${(s.score / (s.total || 1)) >= 0.7 ? 'text-primary' : 'text-destructive'}`}>
                      {s.score}/{s.total} ({Math.round((s.score / (s.total || 1)) * 100)}%)
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ============== REVIEW SCREEN ==============
  if (mode === 'review') {
    let score = 0;
    questions.forEach(q => { if (answers[q.id] === q.answer) score++; });
    const pct = Math.round((score / questions.length) * 100);

    return (
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="text-center border border-border rounded-lg p-8 space-y-4">
          <p className="text-xs tracking-widest text-muted-foreground">EXAMINATION COMPLETED</p>
          <p className={`text-6xl font-black ${pct >= 70 ? 'text-primary glow-green' : pct >= 50 ? 'text-secondary glow-amber' : 'text-destructive'}`}>
            {score}/{questions.length}
          </p>
          <p className="text-2xl font-bold text-foreground">{pct}%</p>
          <p className={`text-sm font-bold tracking-wider ${pct >= 80 ? 'text-primary' : pct >= 60 ? 'text-secondary' : 'text-destructive'}`}>
            {pct >= 80 ? '🔥 EXCELLENT! TARGET 300+ ACHIEVABLE!' :
             pct >= 60 ? '⚡ GOOD EFFORT. PUSH HARDER!' :
             pct >= 40 ? '⚠️ NEEDS MORE WORK. REVIEW YOUR MISTAKES.' :
             '🚨 CRITICAL. FOCUS ON WEAK AREAS.'}
          </p>
        </motion.div>

        {/* Subject Breakdown */}
        <div className="border border-border rounded-lg p-4">
          <p className="text-[10px] text-muted-foreground tracking-widest mb-3">SUBJECT BREAKDOWN</p>
          <div className="space-y-3">
            {(['english', 'mathematics', 'physics', 'chemistry'] as Subject[]).map(sub => {
              const subQs = questions.filter(q => q.subject === sub);
              if (subQs.length === 0) return null;
              const subScore = subQs.filter(q => answers[q.id] === q.answer).length;
              const subPct = Math.round((subScore / subQs.length) * 100);
              return (
                <div key={sub} className="flex items-center gap-3">
                  <span className="text-xs font-bold tracking-wider w-28 text-muted-foreground">{SUBJECT_LABELS[sub]}</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${subPct >= 70 ? 'bg-primary' : subPct >= 50 ? 'bg-secondary' : 'bg-destructive'}`}
                      style={{ width: `${subPct}%` }} />
                  </div>
                  <span className="text-xs font-bold text-foreground w-16 text-right">{subScore}/{subQs.length}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Question Review */}
        <div className="border border-border rounded-lg p-4 space-y-3">
          <p className="text-[10px] text-muted-foreground tracking-widest">REVIEW ANSWERS</p>
          <div className="max-h-96 overflow-y-auto space-y-3 pr-2">
            {questions.map((q, i) => {
              const userAns = answers[q.id];
              const isCorrect = userAns === q.answer;
              return (
                <div key={q.id} className={`p-3 rounded border ${isCorrect ? 'border-primary/30 bg-primary/5' : 'border-destructive/30 bg-destructive/5'}`}>
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-[10px] font-mono text-muted-foreground shrink-0">Q{i + 1}</span>
                    <p className="text-xs text-foreground">{q.question}</p>
                  </div>
                  <div className="ml-6 space-y-1">
                    <p className="text-[10px] text-muted-foreground">
                      Your answer: <span className={isCorrect ? 'text-primary font-bold' : 'text-destructive font-bold'}>{userAns || 'Not answered'}</span>
                      {!isCorrect && <> • Correct: <span className="text-primary font-bold">{q.answer}</span></>}
                    </p>
                    {!isCorrect && <p className="text-[10px] text-muted-foreground italic">{q.explanation}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={() => setMode('setup')}
            className="flex-1 py-3 bg-muted hover:bg-muted/80 rounded text-xs font-bold tracking-wider text-foreground transition-colors">← BACK TO MENU</button>
          <button onClick={() => startExam(examType)}
            className="flex-1 py-3 bg-primary text-primary-foreground rounded text-xs font-bold tracking-wider hover:bg-primary/80 transition-colors">RETAKE EXAM →</button>
        </div>
      </div>
    );
  }

  // ============== EXAM SCREEN ==============
  const currentQuestion = questions[currentQ];
  const answered = Object.keys(answers).length;
  const unanswered = questions.length - answered;
  const isTimeWarning = timeLeft < 300;
  const filteredIndices = getFilteredIndices();

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* TOP BAR */}
      <div className="bg-card border-b border-border px-4 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] font-bold tracking-widest text-foreground">
            JAMB UTME CBT {examType === 'general' ? '— FULL SIMULATION' : '— DAILY TEST'}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className={`font-mono text-lg font-bold ${isTimeWarning ? 'text-destructive animate-pulse' : 'text-foreground'}`}>
            ⏱ {formatTime(timeLeft)}
          </div>
          <div className="relative">
            <button onClick={() => setShowCalc(!showCalc)}
              className="px-3 py-1.5 bg-muted hover:bg-muted/80 rounded text-xs font-bold tracking-wider text-foreground transition-colors border border-border">🧮 CALC</button>
            <Calculator isOpen={showCalc} onClose={() => setShowCalc(false)} />
          </div>
        </div>
      </div>

      {/* SUBJECT TABS */}
      <div className="bg-card/50 border-b border-border px-4 py-1.5 flex items-center gap-1 shrink-0 overflow-x-auto">
        <button onClick={() => setSubjectFilter('all')}
          className={`px-3 py-1 rounded text-[10px] font-bold tracking-wider transition-colors shrink-0 ${
            subjectFilter === 'all' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}>ALL ({questions.length})</button>
        {(['english', 'mathematics', 'physics', 'chemistry'] as Subject[]).map(sub => {
          const count = questions.filter(q => q.subject === sub).length;
          if (count === 0) return null;
          return (
            <button key={sub} onClick={() => setSubjectFilter(sub)}
              className={`px-3 py-1 rounded text-[10px] font-bold tracking-wider transition-colors shrink-0 ${
                subjectFilter === sub ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}>{SUBJECT_LABELS[sub]} ({count})</button>
          );
        })}
      </div>

      {/* MAIN QUESTION AREA */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono px-2 py-1 bg-muted rounded text-muted-foreground">Q{currentQ + 1} of {questions.length}</span>
              <span className="text-[10px] font-bold tracking-widest text-muted-foreground">{SUBJECT_LABELS[currentQuestion?.subject]}</span>
              {currentQuestion && <span className="text-[10px] text-muted-foreground">{currentQuestion.topic} • {currentQuestion.year}</span>}
            </div>
          </div>

          {currentQuestion && (
            <div className="space-y-6">
              <p className="text-base text-foreground leading-relaxed font-medium">{currentQuestion.question}</p>
              <div className="space-y-2">
                {(['A', 'B', 'C', 'D'] as const).map(opt => {
                  const isSelected = answers[currentQuestion.id] === opt;
                  return (
                    <button key={opt} onClick={() => setAnswers(prev => ({ ...prev, [currentQuestion.id]: opt }))}
                      className={`w-full flex items-center gap-4 p-4 rounded-lg border text-left transition-all ${
                        isSelected ? 'border-primary bg-primary/10 text-foreground' : 'border-border hover:border-muted-foreground/50 text-foreground hover:bg-muted/50'
                      }`}>
                      <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${
                        isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-muted-foreground'
                      }`}>{opt}</span>
                      <span className="text-sm">{currentQuestion.options[opt]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-8">
            <button onClick={() => setCurrentQ(prev => Math.max(prev - 1, 0))} disabled={currentQ === 0}
              className="px-6 py-2.5 bg-muted hover:bg-muted/80 rounded text-xs font-bold tracking-wider text-foreground disabled:opacity-30 transition-colors">← PREVIOUS</button>
            <div className="text-xs text-muted-foreground">{answered} answered • {unanswered} remaining</div>
            {currentQ < questions.length - 1 ? (
              <button onClick={() => setCurrentQ(prev => Math.min(prev + 1, questions.length - 1))}
                className="px-6 py-2.5 bg-primary text-primary-foreground rounded text-xs font-bold tracking-wider hover:bg-primary/80 transition-colors">NEXT →</button>
            ) : (
              <button onClick={() => setShowSubmitConfirm(true)}
                className="px-6 py-2.5 bg-secondary text-secondary-foreground rounded text-xs font-bold tracking-wider hover:bg-secondary/80 transition-colors">END EXAM</button>
            )}
          </div>
        </div>
      </div>

      {/* QUESTION GRID */}
      <div className="border-t border-border bg-card px-4 py-3 shrink-0">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-2 text-[10px]">
              <span className="w-3 h-3 rounded-sm bg-primary/30 border border-primary/50" /> <span className="text-muted-foreground">Answered</span>
              <span className="w-3 h-3 rounded-sm bg-muted border border-border ml-2" /> <span className="text-muted-foreground">Unanswered</span>
              <span className="w-3 h-3 rounded-sm border-2 border-foreground ml-2" /> <span className="text-muted-foreground">Current</span>
            </div>
            <div className="flex-1" />
            <button onClick={() => setShowSubmitConfirm(true)}
              className="px-4 py-1.5 bg-destructive/20 text-destructive rounded text-[10px] font-bold tracking-wider hover:bg-destructive/30 transition-colors">SUBMIT (S)</button>
          </div>
          <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
            {filteredIndices.map(idx => {
              const isAnswered = !!answers[questions[idx].id];
              const isCurrent = idx === currentQ;
              return (
                <button key={idx} onClick={() => setCurrentQ(idx)}
                  className={`w-8 h-8 rounded text-[10px] font-bold transition-all ${
                    isCurrent ? 'border-2 border-foreground bg-muted text-foreground'
                    : isAnswered ? 'bg-primary/20 border border-primary/40 text-foreground'
                    : 'bg-muted border border-border text-muted-foreground hover:text-foreground'
                  }`}>{idx + 1}</button>
              );
            })}
          </div>
        </div>
      </div>

      {/* SUBMIT CONFIRM */}
      <AnimatePresence>
        {showSubmitConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="bg-card border border-border rounded-lg p-8 max-w-md w-full space-y-4 text-center">
              <p className="text-lg font-bold text-foreground tracking-wider">SUBMIT EXAMINATION?</p>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Answered: <span className="text-foreground font-bold">{answered}</span> / {questions.length}</p>
                <p>Unanswered: <span className="text-destructive font-bold">{unanswered}</span></p>
                <p>Time remaining: <span className="text-foreground font-bold">{formatTime(timeLeft)}</span></p>
              </div>
              {unanswered > 0 && <p className="text-xs text-destructive font-bold">⚠️ You have {unanswered} unanswered question{unanswered > 1 ? 's' : ''}!</p>}
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowSubmitConfirm(false)}
                  className="flex-1 py-3 bg-muted hover:bg-muted/80 rounded text-xs font-bold tracking-wider text-foreground transition-colors">RETURN (R)</button>
                <button onClick={handleSubmit}
                  className="flex-1 py-3 bg-primary text-primary-foreground rounded text-xs font-bold tracking-wider hover:bg-primary/80 transition-colors">CONFIRM (Y)</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
