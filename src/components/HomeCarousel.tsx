import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import study from '@/assets/banner-study.jpg';
import cbt from '@/assets/banner-cbt.jpg';
import science from '@/assets/banner-science.jpg';
import english from '@/assets/banner-english.jpg';

const SLIDES = [
  { img: study, kicker: 'Daily study', title: 'One topic a day builds a 300+ score.', text: 'Open the AOC syllabus, read the offline lesson, then do the classwork at the end.' },
  { img: cbt, kicker: 'CBT centre', title: 'Practise exactly like the real exam hall.', text: 'Timed papers, JAMB-style calculator, and a full review with corrections after every test.' },
  { img: science, kicker: 'Sciences', title: 'Physics, Chemistry and Maths made clear.', text: 'Formulas, worked examples and common traps for every 2027 syllabus topic — all offline.' },
  { img: english, kicker: 'Use of English', title: 'Read The Lekki Headmaster chapter by chapter.', text: '60 English questions in UTME 2027 — 10 come straight from the novel.' },
];

export default function HomeCarousel() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI(v => (v + 1) % SLIDES.length), 6000); return () => clearInterval(t); }, []);
  const s = SLIDES[i];
  return (
    <section className="-mx-5 mb-10 lg:-mx-8" aria-label="Featured">
      <div className="relative h-72 overflow-hidden bg-secondary sm:h-96">
        <AnimatePresence mode="sync">
          <motion.img key={s.img} src={s.img} alt={s.title} className="absolute inset-0 size-full object-cover"
            initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2 }} />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
        <AnimatePresence mode="wait">
          <motion.div key={i} className="absolute inset-x-0 bottom-0 p-6 text-background lg:p-8" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.5 }}>
            <p className="text-[10px] font-bold uppercase tracking-[.2em] opacity-80">{s.kicker}</p>
            <h2 className="mt-2 max-w-xl font-serif text-2xl leading-tight sm:text-4xl">{s.title}</h2>
            <p className="mt-2 max-w-lg text-sm opacity-90">{s.text}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex gap-1.5 px-5 pt-3 lg:px-8">
        {SLIDES.map((_, n) => <button key={n} onClick={() => setI(n)} aria-label={`Show slide ${n + 1}`} className={`h-1 flex-1 transition-colors ${n === i ? 'bg-primary' : 'bg-border'}`} />)}
      </div>
    </section>
  );
}
