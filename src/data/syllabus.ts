export type Subject = 'mathematics' | 'physics' | 'chemistry' | 'english';

export interface Topic {
  id: string;
  name: string;
  subject: Subject;
  category: string;
}

export const SUBJECT_LABELS: Record<Subject, string> = {
  mathematics: 'MATHEMATICS',
  physics: 'PHYSICS',
  chemistry: 'CHEMISTRY',
  english: 'ENGLISH',
};

export const SUBJECT_COLORS: Record<Subject, string> = {
  mathematics: 'text-blue-400',
  physics: 'text-orange-400',
  chemistry: 'text-purple-400',
  english: 'text-emerald-400',
};

export const SYLLABUS: Topic[] = [
  // MATHEMATICS
  { id: 'math-1', name: 'Number Bases', subject: 'mathematics', category: 'Number & Numeration' },
  { id: 'math-2', name: 'Indices & Logarithms', subject: 'mathematics', category: 'Number & Numeration' },
  { id: 'math-3', name: 'Surds', subject: 'mathematics', category: 'Number & Numeration' },
  { id: 'math-4', name: 'Fractions, Decimals & Approximation', subject: 'mathematics', category: 'Number & Numeration' },
  { id: 'math-5', name: 'Sets', subject: 'mathematics', category: 'Number & Numeration' },
  { id: 'math-6', name: 'Algebra – Polynomials', subject: 'mathematics', category: 'Algebra' },
  { id: 'math-7', name: 'Quadratic Equations', subject: 'mathematics', category: 'Algebra' },
  { id: 'math-8', name: 'Simultaneous Equations', subject: 'mathematics', category: 'Algebra' },
  { id: 'math-9', name: 'Inequalities', subject: 'mathematics', category: 'Algebra' },
  { id: 'math-10', name: 'Variation (Direct/Inverse/Joint)', subject: 'mathematics', category: 'Algebra' },
  { id: 'math-11', name: 'Binary Operations', subject: 'mathematics', category: 'Algebra' },
  { id: 'math-12', name: 'Matrices & Determinants', subject: 'mathematics', category: 'Algebra' },
  { id: 'math-13', name: 'Arithmetic Progression (AP)', subject: 'mathematics', category: 'Sequences' },
  { id: 'math-14', name: 'Geometric Progression (GP)', subject: 'mathematics', category: 'Sequences' },
  { id: 'math-15', name: 'Trigonometry', subject: 'mathematics', category: 'Trigonometry' },
  { id: 'math-16', name: 'Mensuration (Area, Volume)', subject: 'mathematics', category: 'Geometry' },
  { id: 'math-17', name: 'Coordinate Geometry', subject: 'mathematics', category: 'Geometry' },
  { id: 'math-18', name: 'Differentiation', subject: 'mathematics', category: 'Calculus' },
  { id: 'math-19', name: 'Integration', subject: 'mathematics', category: 'Calculus' },
  { id: 'math-20', name: 'Statistics (Mean, Median, Mode)', subject: 'mathematics', category: 'Statistics' },
  { id: 'math-21', name: 'Probability', subject: 'mathematics', category: 'Statistics' },
  { id: 'math-22', name: 'Permutation & Combination', subject: 'mathematics', category: 'Statistics' },

  // PHYSICS
  { id: 'phy-1', name: 'Measurements & Units', subject: 'physics', category: 'Mechanics' },
  { id: 'phy-2', name: 'Scalars & Vectors', subject: 'physics', category: 'Mechanics' },
  { id: 'phy-3', name: 'Motion (Speed, Velocity, Acceleration)', subject: 'physics', category: 'Mechanics' },
  { id: 'phy-4', name: "Newton's Laws of Motion", subject: 'physics', category: 'Mechanics' },
  { id: 'phy-5', name: 'Work, Energy & Power', subject: 'physics', category: 'Mechanics' },
  { id: 'phy-6', name: 'Friction', subject: 'physics', category: 'Mechanics' },
  { id: 'phy-7', name: 'Simple Machines', subject: 'physics', category: 'Mechanics' },
  { id: 'phy-8', name: 'Pressure (Solid, Liquid, Gas)', subject: 'physics', category: 'Mechanics' },
  { id: 'phy-9', name: 'Equilibrium of Forces', subject: 'physics', category: 'Mechanics' },
  { id: 'phy-10', name: 'Linear Momentum & Collisions', subject: 'physics', category: 'Mechanics' },
  { id: 'phy-11', name: 'Temperature & Thermometry', subject: 'physics', category: 'Heat' },
  { id: 'phy-12', name: 'Heat Transfer (Conduction, Convection, Radiation)', subject: 'physics', category: 'Heat' },
  { id: 'phy-13', name: 'Gas Laws', subject: 'physics', category: 'Heat' },
  { id: 'phy-14', name: 'Waves (Properties & Types)', subject: 'physics', category: 'Waves' },
  { id: 'phy-15', name: 'Sound Waves', subject: 'physics', category: 'Waves' },
  { id: 'phy-16', name: 'Light (Reflection & Refraction)', subject: 'physics', category: 'Waves' },
  { id: 'phy-17', name: 'Lenses & Optical Instruments', subject: 'physics', category: 'Waves' },
  { id: 'phy-18', name: 'Electromagnetic Waves', subject: 'physics', category: 'Waves' },
  { id: 'phy-19', name: 'Electrostatics', subject: 'physics', category: 'Electricity' },
  { id: 'phy-20', name: 'Current Electricity (Ohm\'s Law, Circuits)', subject: 'physics', category: 'Electricity' },
  { id: 'phy-21', name: 'Electrical Energy & Power', subject: 'physics', category: 'Electricity' },
  { id: 'phy-22', name: 'Electromagnetic Induction', subject: 'physics', category: 'Electricity' },
  { id: 'phy-23', name: 'Electronics (Diodes, Transistors)', subject: 'physics', category: 'Modern Physics' },
  { id: 'phy-24', name: 'Atomic & Nuclear Physics', subject: 'physics', category: 'Modern Physics' },

  // CHEMISTRY
  { id: 'chem-1', name: 'Atomic Structure & Bonding', subject: 'chemistry', category: 'General Chemistry' },
  { id: 'chem-2', name: 'Periodic Table & Periodicity', subject: 'chemistry', category: 'General Chemistry' },
  { id: 'chem-3', name: 'States of Matter & Gas Laws', subject: 'chemistry', category: 'General Chemistry' },
  { id: 'chem-4', name: 'Stoichiometry & Chemical Calculations', subject: 'chemistry', category: 'General Chemistry' },
  { id: 'chem-5', name: 'Acids, Bases & Salts', subject: 'chemistry', category: 'General Chemistry' },
  { id: 'chem-6', name: 'Redox Reactions', subject: 'chemistry', category: 'General Chemistry' },
  { id: 'chem-7', name: 'Electrochemistry', subject: 'chemistry', category: 'Physical Chemistry' },
  { id: 'chem-8', name: 'Rates of Reaction & Equilibrium', subject: 'chemistry', category: 'Physical Chemistry' },
  { id: 'chem-9', name: 'Energy Changes (Thermochemistry)', subject: 'chemistry', category: 'Physical Chemistry' },
  { id: 'chem-10', name: 'Water & Solution Chemistry', subject: 'chemistry', category: 'Physical Chemistry' },
  { id: 'chem-11', name: 'Metals & Their Compounds', subject: 'chemistry', category: 'Inorganic Chemistry' },
  { id: 'chem-12', name: 'Non-Metals & Their Compounds', subject: 'chemistry', category: 'Inorganic Chemistry' },
  { id: 'chem-13', name: 'Hydrocarbons (Alkanes, Alkenes, Alkynes)', subject: 'chemistry', category: 'Organic Chemistry' },
  { id: 'chem-14', name: 'Alcohols & Ethers', subject: 'chemistry', category: 'Organic Chemistry' },
  { id: 'chem-15', name: 'Ketones & Aldehydes', subject: 'chemistry', category: 'Organic Chemistry' },
  { id: 'chem-16', name: 'Carboxylic Acids & Esters', subject: 'chemistry', category: 'Organic Chemistry' },
  { id: 'chem-17', name: 'Polymers (Natural & Synthetic)', subject: 'chemistry', category: 'Organic Chemistry' },
  { id: 'chem-18', name: 'Industrial Chemistry', subject: 'chemistry', category: 'Applied Chemistry' },
  { id: 'chem-19', name: 'Environmental Chemistry', subject: 'chemistry', category: 'Applied Chemistry' },

  // ENGLISH
  { id: 'eng-1', name: 'Vowel Sounds (Monophthongs & Diphthongs)', subject: 'english', category: 'Oral English' },
  { id: 'eng-2', name: 'Consonant Sounds', subject: 'english', category: 'Oral English' },
  { id: 'eng-3', name: 'Stress Patterns (Word & Sentence)', subject: 'english', category: 'Oral English' },
  { id: 'eng-4', name: 'Intonation & Rhythm', subject: 'english', category: 'Oral English' },
  { id: 'eng-5', name: 'Rhymes & Sound Identification', subject: 'english', category: 'Oral English' },
  { id: 'eng-6', name: 'Comprehension & Summary', subject: 'english', category: 'Lexis & Structure' },
  { id: 'eng-7', name: 'Synonyms & Antonyms', subject: 'english', category: 'Lexis & Structure' },
  { id: 'eng-8', name: 'Concord (Subject-Verb Agreement)', subject: 'english', category: 'Lexis & Structure' },
  { id: 'eng-9', name: 'Tenses & Sentence Construction', subject: 'english', category: 'Lexis & Structure' },
  { id: 'eng-10', name: 'Register & Vocabulary', subject: 'english', category: 'Lexis & Structure' },
  { id: 'eng-11', name: 'Idioms & Phrasal Verbs', subject: 'english', category: 'Lexis & Structure' },
  { id: 'eng-12', name: 'Figures of Speech', subject: 'english', category: 'Lexis & Structure' },
  { id: 'eng-13', name: 'Parts of Speech (Nouns, Verbs, Adverbs, etc.)', subject: 'english', category: 'Lexis & Structure' },
  { id: 'eng-14', name: 'Active & Passive Voice', subject: 'english', category: 'Lexis & Structure' },
  { id: 'eng-15', name: 'Direct & Indirect Speech', subject: 'english', category: 'Lexis & Structure' },
  { id: 'eng-16', name: 'The Life Changer – Khadija Abubakar Jalli', subject: 'english', category: 'Literature' },
  { id: 'eng-17', name: 'In Dependence – Sarah Ladipo Manyika', subject: 'english', category: 'Literature' },
];

// Daily schedule alternation: Day A = Physics + English, Day B = Chemistry + Math
export type DayType = 'A' | 'B';

export function getDayType(date: Date): DayType {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const dayNum = Math.floor((date.getTime() - startOfYear.getTime()) / 86400000);
  return dayNum % 2 === 0 ? 'A' : 'B';
}

export function getTodaySubjects(date: Date): [Subject, Subject] {
  const dayType = getDayType(date);
  return dayType === 'A' ? ['physics', 'english'] : ['chemistry', 'mathematics'];
}

export interface ScheduleBlock {
  time: string;
  label: string;
  description: string;
  type: 'study' | 'lesson' | 'rest' | 'cbt' | 'revision';
  icon: string;
}

export function getDailySchedule(subjects: [Subject, Subject]): ScheduleBlock[] {
  return [
    { time: '05:30-06:00', label: 'WAKE UP & ACTIVATE', description: 'Machine boots. Cold water. Focus.', type: 'revision', icon: '⚡' },
    { time: '06:00-06:45', label: 'REVISION DRILL', description: 'Review yesterday\'s topics. Quick-fire recall.', type: 'revision', icon: '🔄' },
    { time: '06:45-08:30', label: `MORNING ASSAULT: ${SUBJECT_LABELS[subjects[0]]}`, description: `Deep study session — ${SUBJECT_LABELS[subjects[0]]}`, type: 'study', icon: '📖' },
    { time: '08:30-09:00', label: 'FUEL & PREP', description: 'Eat. Prepare for lesson.', type: 'rest', icon: '🍽️' },
    { time: '09:00-13:00', label: 'LESSON MODE', description: 'At lesson. Machine on standby.', type: 'lesson', icon: '🏫' },
    { time: '13:00-14:30', label: 'HUMAN RECHARGE', description: 'Eat. Rest. You are human. Recover.', type: 'rest', icon: '😴' },
    { time: '14:30-16:00', label: `AFTERNOON ASSAULT: ${SUBJECT_LABELS[subjects[1]]}`, description: `Deep study session — ${SUBJECT_LABELS[subjects[1]]}`, type: 'study', icon: '📖' },
    { time: '16:00-16:15', label: 'BREAK', description: 'Walk. Stretch. Breathe.', type: 'rest', icon: '🚶' },
    { time: '16:15-17:30', label: 'CBT LAB', description: 'Timed practice. Simulate the real thing.', type: 'cbt', icon: '🖥️' },
    { time: '17:30-18:00', label: 'MISTAKE REVIEW', description: 'Log what you missed. Own it.', type: 'revision', icon: '📝' },
    { time: '18:00', label: 'MACHINE REST', description: 'Shut down. Tomorrow we go again.', type: 'rest', icon: '🌙' },
  ];
}

export function isGeneralCBTDay(date: Date): boolean {
  const day = date.getDay();
  return day === 3 || day === 5 || day === 6; // Wed, Fri, Sat
}
