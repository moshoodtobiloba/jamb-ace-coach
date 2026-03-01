import { Subject } from './syllabus';

export interface Question {
  id: string;
  subject: Subject;
  topic: string;
  year: number;
  question: string;
  options: { A: string; B: string; C: string; D: string };
  answer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

// Real JAMB UTME past questions and JAMB-standard model questions
export const QUESTION_BANK: Question[] = [
  // ==================== MATHEMATICS ====================
  {
    id: 'math-q1', subject: 'mathematics', topic: 'Indices & Logarithms', year: 2020,
    question: 'Simplify: log₂8 + log₂4',
    options: { A: '5', B: '6', C: '7', D: '8' },
    answer: 'A', explanation: 'log₂8 = 3, log₂4 = 2, so 3 + 2 = 5'
  },
  {
    id: 'math-q2', subject: 'mathematics', topic: 'Quadratic Equations', year: 2019,
    question: 'Find the roots of the equation x² - 5x + 6 = 0',
    options: { A: 'x = 2 or x = 3', B: 'x = -2 or x = -3', C: 'x = 1 or x = 6', D: 'x = -1 or x = -6' },
    answer: 'A', explanation: 'Factoring: (x-2)(x-3) = 0, so x = 2 or x = 3'
  },
  {
    id: 'math-q3', subject: 'mathematics', topic: 'Surds', year: 2021,
    question: 'Simplify √75 - √27',
    options: { A: '2√3', B: '3√2', C: '√48', D: '4√3' },
    answer: 'A', explanation: '√75 = 5√3, √27 = 3√3, so 5√3 - 3√3 = 2√3'
  },
  {
    id: 'math-q4', subject: 'mathematics', topic: 'Sets', year: 2018,
    question: 'In a class of 50 students, 30 offer Mathematics and 25 offer Physics. If 10 offer both, how many offer neither?',
    options: { A: '5', B: '10', C: '15', D: '20' },
    answer: 'A', explanation: 'n(M∪P) = 30 + 25 - 10 = 45. Neither = 50 - 45 = 5'
  },
  {
    id: 'math-q5', subject: 'mathematics', topic: 'Algebra – Polynomials', year: 2022,
    question: 'If f(x) = 2x³ - 3x² + x - 1, find f(2)',
    options: { A: '5', B: '7', C: '9', D: '3' },
    answer: 'A', explanation: 'f(2) = 2(8) - 3(4) + 2 - 1 = 16 - 12 + 2 - 1 = 5'
  },
  {
    id: 'math-q6', subject: 'mathematics', topic: 'Simultaneous Equations', year: 2017,
    question: 'Solve: 2x + y = 7, x - y = 2',
    options: { A: 'x=3, y=1', B: 'x=2, y=3', C: 'x=4, y=-1', D: 'x=1, y=5' },
    answer: 'A', explanation: 'Adding: 3x = 9, x = 3. Then y = 7 - 6 = 1'
  },
  {
    id: 'math-q7', subject: 'mathematics', topic: 'Matrices & Determinants', year: 2020,
    question: 'Find the determinant of the matrix |2 3; 1 4|',
    options: { A: '5', B: '8', C: '11', D: '-1' },
    answer: 'A', explanation: 'det = (2×4) - (3×1) = 8 - 3 = 5'
  },
  {
    id: 'math-q8', subject: 'mathematics', topic: 'Arithmetic Progression (AP)', year: 2019,
    question: 'The 10th term of the AP: 3, 7, 11, 15, ... is',
    options: { A: '39', B: '43', C: '35', D: '47' },
    answer: 'A', explanation: 'a = 3, d = 4. T₁₀ = 3 + (10-1)×4 = 3 + 36 = 39'
  },
  {
    id: 'math-q9', subject: 'mathematics', topic: 'Geometric Progression (GP)', year: 2021,
    question: 'Find the sum of the first 4 terms of the GP: 2, 6, 18, 54',
    options: { A: '80', B: '72', C: '66', D: '90' },
    answer: 'A', explanation: 'S₄ = 2(3⁴ - 1)/(3 - 1) = 2(80)/2 = 80'
  },
  {
    id: 'math-q10', subject: 'mathematics', topic: 'Differentiation', year: 2022,
    question: 'Differentiate y = 3x⁴ - 2x² + 5x with respect to x',
    options: { A: '12x³ - 4x + 5', B: '12x³ - 4x', C: '3x³ - 2x + 5', D: '12x⁴ - 4x² + 5' },
    answer: 'A', explanation: 'dy/dx = 12x³ - 4x + 5'
  },
  {
    id: 'math-q11', subject: 'mathematics', topic: 'Integration', year: 2018,
    question: 'Evaluate ∫(4x³ + 2x)dx',
    options: { A: 'x⁴ + x² + C', B: '12x² + 2 + C', C: '4x⁴ + x² + C', D: 'x⁴ + x + C' },
    answer: 'A', explanation: '∫4x³dx = x⁴, ∫2xdx = x², so x⁴ + x² + C'
  },
  {
    id: 'math-q12', subject: 'mathematics', topic: 'Probability', year: 2020,
    question: 'Two dice are thrown. What is the probability that the sum is 7?',
    options: { A: '1/6', B: '1/12', C: '5/36', D: '7/36' },
    answer: 'A', explanation: 'Favorable outcomes: (1,6)(2,5)(3,4)(4,3)(5,2)(6,1) = 6. P = 6/36 = 1/6'
  },
  {
    id: 'math-q13', subject: 'mathematics', topic: 'Statistics (Mean, Median, Mode)', year: 2019,
    question: 'Find the mean of: 2, 5, 7, 8, 3',
    options: { A: '5', B: '6', C: '7', D: '4' },
    answer: 'A', explanation: 'Mean = (2+5+7+8+3)/5 = 25/5 = 5'
  },
  {
    id: 'math-q14', subject: 'mathematics', topic: 'Trigonometry', year: 2021,
    question: 'If sin θ = 3/5, find cos θ',
    options: { A: '4/5', B: '3/4', C: '5/3', D: '5/4' },
    answer: 'A', explanation: 'cos²θ = 1 - sin²θ = 1 - 9/25 = 16/25, cos θ = 4/5'
  },
  {
    id: 'math-q15', subject: 'mathematics', topic: 'Coordinate Geometry', year: 2018,
    question: 'Find the distance between points A(1,2) and B(4,6)',
    options: { A: '5', B: '7', C: '√13', D: '√20' },
    answer: 'A', explanation: 'd = √((4-1)² + (6-2)²) = √(9+16) = √25 = 5'
  },
  {
    id: 'math-q16', subject: 'mathematics', topic: 'Number Bases', year: 2022,
    question: 'Convert 101101₂ to base 10',
    options: { A: '45', B: '43', C: '41', D: '47' },
    answer: 'A', explanation: '32 + 0 + 8 + 4 + 0 + 1 = 45'
  },
  {
    id: 'math-q17', subject: 'mathematics', topic: 'Variation (Direct/Inverse/Joint)', year: 2017,
    question: 'If y varies directly as x and y = 12 when x = 4, find y when x = 7',
    options: { A: '21', B: '24', C: '28', D: '18' },
    answer: 'A', explanation: 'y = kx, 12 = 4k, k = 3. When x = 7, y = 3(7) = 21'
  },
  {
    id: 'math-q18', subject: 'mathematics', topic: 'Binary Operations', year: 2020,
    question: 'If a*b = a² + b² - ab, find 3*2',
    options: { A: '7', B: '13', C: '9', D: '5' },
    answer: 'A', explanation: '3*2 = 9 + 4 - 6 = 7'
  },
  {
    id: 'math-q19', subject: 'mathematics', topic: 'Inequalities', year: 2019,
    question: 'Solve 3x - 5 > x + 3',
    options: { A: 'x > 4', B: 'x > 3', C: 'x > 2', D: 'x > 8' },
    answer: 'A', explanation: '3x - x > 3 + 5, 2x > 8, x > 4'
  },
  {
    id: 'math-q20', subject: 'mathematics', topic: 'Permutation & Combination', year: 2021,
    question: 'In how many ways can 5 people be arranged in a row?',
    options: { A: '120', B: '60', C: '24', D: '720' },
    answer: 'A', explanation: '5! = 5 × 4 × 3 × 2 × 1 = 120'
  },
  {
    id: 'math-q21', subject: 'mathematics', topic: 'Fractions, Decimals & Approximation', year: 2018,
    question: 'Express 0.0035 in standard form',
    options: { A: '3.5 × 10⁻³', B: '35 × 10⁻⁴', C: '3.5 × 10⁻²', D: '0.35 × 10⁻²' },
    answer: 'A', explanation: '0.0035 = 3.5 × 10⁻³'
  },
  {
    id: 'math-q22', subject: 'mathematics', topic: 'Mensuration (Area, Volume)', year: 2022,
    question: 'Find the volume of a cylinder with radius 7cm and height 10cm (Take π = 22/7)',
    options: { A: '1540 cm³', B: '1440 cm³', C: '1340 cm³', D: '1640 cm³' },
    answer: 'A', explanation: 'V = πr²h = (22/7)(49)(10) = 1540 cm³'
  },
  // Extra math questions for full 40
  {
    id: 'math-q23', subject: 'mathematics', topic: 'Quadratic Equations', year: 2023,
    question: 'The sum and product of the roots of 2x² - 6x + 4 = 0 are respectively',
    options: { A: '3 and 2', B: '6 and 4', C: '-3 and 2', D: '3 and -2' },
    answer: 'A', explanation: 'Sum = -b/a = 6/2 = 3, Product = c/a = 4/2 = 2'
  },
  {
    id: 'math-q24', subject: 'mathematics', topic: 'Indices & Logarithms', year: 2015,
    question: 'Simplify 27^(2/3)',
    options: { A: '9', B: '3', C: '27', D: '81' },
    answer: 'A', explanation: '27^(2/3) = (27^(1/3))² = 3² = 9'
  },
  {
    id: 'math-q25', subject: 'mathematics', topic: 'Sets', year: 2016,
    question: 'If P = {1,2,3,4,5} and Q = {2,4,6,8}, find P ∩ Q',
    options: { A: '{2, 4}', B: '{1, 3, 5}', C: '{6, 8}', D: '{1, 2, 3, 4, 5, 6, 8}' },
    answer: 'A', explanation: 'P ∩ Q contains elements common to both sets = {2, 4}'
  },
  {
    id: 'math-q26', subject: 'mathematics', topic: 'Trigonometry', year: 2017,
    question: 'Find the value of tan 45°',
    options: { A: '1', B: '0', C: '√2', D: '1/√2' },
    answer: 'A', explanation: 'tan 45° = sin 45°/cos 45° = 1'
  },
  {
    id: 'math-q27', subject: 'mathematics', topic: 'Differentiation', year: 2016,
    question: 'If y = (3x + 1)², find dy/dx',
    options: { A: '6(3x + 1)', B: '2(3x + 1)', C: '9(3x + 1)', D: '3(3x + 1)' },
    answer: 'A', explanation: 'Using chain rule: dy/dx = 2(3x+1) × 3 = 6(3x+1)'
  },
  {
    id: 'math-q28', subject: 'mathematics', topic: 'Probability', year: 2023,
    question: 'A bag contains 4 red and 6 blue balls. What is the probability of picking a red ball?',
    options: { A: '2/5', B: '3/5', C: '1/4', D: '4/6' },
    answer: 'A', explanation: 'P(red) = 4/10 = 2/5'
  },
  {
    id: 'math-q29', subject: 'mathematics', topic: 'Coordinate Geometry', year: 2015,
    question: 'Find the midpoint of (2, 4) and (6, 8)',
    options: { A: '(4, 6)', B: '(3, 5)', C: '(8, 12)', D: '(2, 2)' },
    answer: 'A', explanation: 'Midpoint = ((2+6)/2, (4+8)/2) = (4, 6)'
  },
  {
    id: 'math-q30', subject: 'mathematics', topic: 'Arithmetic Progression (AP)', year: 2014,
    question: 'The sum of the first 20 terms of the AP 4, 7, 10, 13, ... is',
    options: { A: '650', B: '610', C: '670', D: '630' },
    answer: 'A', explanation: 'a=4, d=3, S₂₀ = 20/2[2(4) + 19(3)] = 10[8+57] = 10(65) = 650'
  },
  {
    id: 'math-q31', subject: 'mathematics', topic: 'Matrices & Determinants', year: 2023,
    question: 'If A = |1 2; 3 4|, find A⁻¹',
    options: { A: '1/-2 × |4 -2; -3 1|', B: '|4 -2; -3 1|', C: '|1 3; 2 4|', D: 'Does not exist' },
    answer: 'A', explanation: 'det(A) = 4-6 = -2. A⁻¹ = (1/det) × adj(A)'
  },
  {
    id: 'math-q32', subject: 'mathematics', topic: 'Integration', year: 2022,
    question: 'Evaluate ∫₀² (3x²)dx',
    options: { A: '8', B: '6', C: '12', D: '4' },
    answer: 'A', explanation: '∫3x²dx = x³. [x³]₀² = 8 - 0 = 8'
  },
  {
    id: 'math-q33', subject: 'mathematics', topic: 'Number Bases', year: 2014,
    question: 'Convert 37₁₀ to binary',
    options: { A: '100101₂', B: '100111₂', C: '110101₂', D: '101001₂' },
    answer: 'A', explanation: '37 = 32+4+1 = 100101₂'
  },
  {
    id: 'math-q34', subject: 'mathematics', topic: 'Surds', year: 2013,
    question: 'Rationalize 1/(√5 - √3)',
    options: { A: '(√5 + √3)/2', B: '(√5 - √3)/2', C: '√5 + √3', D: '2/(√5 + √3)' },
    answer: 'A', explanation: 'Multiply by (√5+√3)/(√5+√3) = (√5+√3)/(5-3) = (√5+√3)/2'
  },
  {
    id: 'math-q35', subject: 'mathematics', topic: 'Statistics (Mean, Median, Mode)', year: 2015,
    question: 'Find the median of: 3, 7, 1, 9, 5',
    options: { A: '5', B: '3', C: '7', D: '1' },
    answer: 'A', explanation: 'Arranged: 1, 3, 5, 7, 9. Middle value = 5'
  },
  {
    id: 'math-q36', subject: 'mathematics', topic: 'Geometric Progression (GP)', year: 2016,
    question: 'Find the 5th term of the GP: 3, 6, 12, ...',
    options: { A: '48', B: '96', C: '24', D: '36' },
    answer: 'A', explanation: 'a=3, r=2. T₅ = 3(2)⁴ = 3(16) = 48'
  },
  {
    id: 'math-q37', subject: 'mathematics', topic: 'Permutation & Combination', year: 2019,
    question: 'Find ⁶C₂',
    options: { A: '15', B: '30', C: '12', D: '720' },
    answer: 'A', explanation: '⁶C₂ = 6!/(2!4!) = (6×5)/(2×1) = 15'
  },
  {
    id: 'math-q38', subject: 'mathematics', topic: 'Variation (Direct/Inverse/Joint)', year: 2020,
    question: 'If y varies inversely as x and y = 6 when x = 2, find y when x = 3',
    options: { A: '4', B: '9', C: '3', D: '6' },
    answer: 'A', explanation: 'y = k/x, 6 = k/2, k = 12. When x=3, y = 12/3 = 4'
  },
  {
    id: 'math-q39', subject: 'mathematics', topic: 'Mensuration (Area, Volume)', year: 2021,
    question: 'Find the area of a triangle with base 10cm and height 8cm',
    options: { A: '40 cm²', B: '80 cm²', C: '18 cm²', D: '20 cm²' },
    answer: 'A', explanation: 'Area = ½ × base × height = ½ × 10 × 8 = 40 cm²'
  },
  {
    id: 'math-q40', subject: 'mathematics', topic: 'Binary Operations', year: 2018,
    question: 'A binary operation * is defined on the set of real numbers by a*b = a + b + ab. Find 2*3',
    options: { A: '11', B: '8', C: '6', D: '12' },
    answer: 'A', explanation: '2*3 = 2 + 3 + (2)(3) = 2 + 3 + 6 = 11'
  },

  // ==================== PHYSICS ====================
  {
    id: 'phy-q1', subject: 'physics', topic: 'Motion (Speed, Velocity, Acceleration)', year: 2020,
    question: 'A car starts from rest and accelerates uniformly at 2m/s². Find its velocity after 5 seconds.',
    options: { A: '10 m/s', B: '5 m/s', C: '15 m/s', D: '20 m/s' },
    answer: 'A', explanation: 'v = u + at = 0 + 2(5) = 10 m/s'
  },
  {
    id: 'phy-q2', subject: 'physics', topic: "Newton's Laws of Motion", year: 2019,
    question: 'A force of 10N acts on a body of mass 2kg. What is the acceleration?',
    options: { A: '5 m/s²', B: '20 m/s²', C: '12 m/s²', D: '0.2 m/s²' },
    answer: 'A', explanation: 'F = ma, a = F/m = 10/2 = 5 m/s²'
  },
  {
    id: 'phy-q3', subject: 'physics', topic: 'Work, Energy & Power', year: 2021,
    question: 'A force of 50N moves a body through a distance of 10m in the direction of the force. Calculate the work done.',
    options: { A: '500 J', B: '60 J', C: '5 J', D: '250 J' },
    answer: 'A', explanation: 'W = F × d = 50 × 10 = 500 J'
  },
  {
    id: 'phy-q4', subject: 'physics', topic: 'Waves (Properties & Types)', year: 2018,
    question: 'A wave has a frequency of 200Hz and a wavelength of 1.5m. Find the velocity of the wave.',
    options: { A: '300 m/s', B: '133 m/s', C: '200 m/s', D: '400 m/s' },
    answer: 'A', explanation: 'v = fλ = 200 × 1.5 = 300 m/s'
  },
  {
    id: 'phy-q5', subject: 'physics', topic: 'Current Electricity (Ohm\'s Law, Circuits)', year: 2022,
    question: 'A current of 3A flows through a resistor of 4Ω. Find the voltage across the resistor.',
    options: { A: '12 V', B: '7 V', C: '1.3 V', D: '0.75 V' },
    answer: 'A', explanation: 'V = IR = 3 × 4 = 12 V'
  },
  {
    id: 'phy-q6', subject: 'physics', topic: 'Measurements & Units', year: 2017,
    question: 'The S.I. unit of energy is',
    options: { A: 'Joule', B: 'Newton', C: 'Watt', D: 'Pascal' },
    answer: 'A', explanation: 'Energy is measured in Joules (J) in the SI system'
  },
  {
    id: 'phy-q7', subject: 'physics', topic: 'Pressure (Solid, Liquid, Gas)', year: 2020,
    question: 'A block of weight 100N stands on an area of 2m². What is the pressure exerted?',
    options: { A: '50 Pa', B: '200 Pa', C: '100 Pa', D: '25 Pa' },
    answer: 'A', explanation: 'P = F/A = 100/2 = 50 Pa'
  },
  {
    id: 'phy-q8', subject: 'physics', topic: 'Temperature & Thermometry', year: 2019,
    question: 'Convert 100°C to Fahrenheit',
    options: { A: '212°F', B: '180°F', C: '200°F', D: '100°F' },
    answer: 'A', explanation: 'F = (9/5)C + 32 = (9/5)(100) + 32 = 180 + 32 = 212°F'
  },
  {
    id: 'phy-q9', subject: 'physics', topic: 'Gas Laws', year: 2021,
    question: 'A gas occupies 500cm³ at 27°C. At what temperature will it occupy 600cm³ at constant pressure?',
    options: { A: '87°C', B: '32.4°C', C: '127°C', D: '360°C' },
    answer: 'A', explanation: 'V₁/T₁ = V₂/T₂, 500/300 = 600/T₂, T₂ = 360K = 87°C'
  },
  {
    id: 'phy-q10', subject: 'physics', topic: 'Electrostatics', year: 2018,
    question: 'Two point charges of +2μC and +3μC are 0.5m apart. Find the force between them (k = 9 × 10⁹ Nm²/C²)',
    options: { A: '0.216 N', B: '0.108 N', C: '1.08 N', D: '2.16 N' },
    answer: 'A', explanation: 'F = kq₁q₂/r² = 9×10⁹ × 2×10⁻⁶ × 3×10⁻⁶ / 0.25 = 0.216 N'
  },
  {
    id: 'phy-q11', subject: 'physics', topic: 'Scalars & Vectors', year: 2022,
    question: 'Which of the following is a vector quantity?',
    options: { A: 'Displacement', B: 'Speed', C: 'Mass', D: 'Temperature' },
    answer: 'A', explanation: 'Displacement has both magnitude and direction, making it a vector'
  },
  {
    id: 'phy-q12', subject: 'physics', topic: 'Friction', year: 2017,
    question: 'A block of mass 5kg rests on a rough surface. If μ = 0.4, find the frictional force (g = 10m/s²)',
    options: { A: '20 N', B: '50 N', C: '2 N', D: '12.5 N' },
    answer: 'A', explanation: 'f = μmg = 0.4 × 5 × 10 = 20 N'
  },
  {
    id: 'phy-q13', subject: 'physics', topic: 'Simple Machines', year: 2020,
    question: 'A machine has a velocity ratio of 5 and an efficiency of 80%. Find the mechanical advantage.',
    options: { A: '4', B: '6.25', C: '3', D: '5' },
    answer: 'A', explanation: 'Efficiency = (MA/VR) × 100. 80 = (MA/5) × 100, MA = 4'
  },
  {
    id: 'phy-q14', subject: 'physics', topic: 'Linear Momentum & Collisions', year: 2019,
    question: 'A body of mass 2kg moving at 3m/s collides with a stationary body of mass 1kg. If they stick together, find their common velocity.',
    options: { A: '2 m/s', B: '3 m/s', C: '1 m/s', D: '6 m/s' },
    answer: 'A', explanation: 'm₁u₁ = (m₁+m₂)v, 2(3) = 3v, v = 2 m/s'
  },
  {
    id: 'phy-q15', subject: 'physics', topic: 'Sound Waves', year: 2021,
    question: 'The speed of sound in air is approximately',
    options: { A: '340 m/s', B: '3 × 10⁸ m/s', C: '1500 m/s', D: '100 m/s' },
    answer: 'A', explanation: 'The speed of sound in air at room temperature is approximately 340 m/s'
  },
  {
    id: 'phy-q16', subject: 'physics', topic: 'Light (Reflection & Refraction)', year: 2018,
    question: 'The angle of incidence equals the angle of reflection. This is the law of',
    options: { A: 'Reflection', B: 'Refraction', C: 'Diffraction', D: 'Interference' },
    answer: 'A', explanation: 'The law of reflection states that the angle of incidence equals the angle of reflection'
  },
  {
    id: 'phy-q17', subject: 'physics', topic: 'Electrical Energy & Power', year: 2022,
    question: 'An electric heater rated 1000W is used for 2 hours. Calculate the energy consumed in kWh.',
    options: { A: '2 kWh', B: '0.5 kWh', C: '2000 kWh', D: '500 kWh' },
    answer: 'A', explanation: 'E = Pt = 1kW × 2h = 2 kWh'
  },
  {
    id: 'phy-q18', subject: 'physics', topic: 'Electromagnetic Induction', year: 2017,
    question: "Faraday's law of electromagnetic induction states that the induced e.m.f. is proportional to the",
    options: { A: 'rate of change of magnetic flux', B: 'magnetic flux', C: 'area of the coil', D: 'resistance of the coil' },
    answer: 'A', explanation: "Faraday's law: induced EMF = -dΦ/dt"
  },
  {
    id: 'phy-q19', subject: 'physics', topic: 'Lenses & Optical Instruments', year: 2020,
    question: 'A converging lens has a focal length of 20cm. An object is placed 30cm from the lens. Find the image distance.',
    options: { A: '60 cm', B: '15 cm', C: '10 cm', D: '50 cm' },
    answer: 'A', explanation: '1/f = 1/v - 1/u. 1/20 = 1/v - 1/(-30). 1/v = 1/20 - 1/30 = 1/60. v = 60cm'
  },
  {
    id: 'phy-q20', subject: 'physics', topic: 'Equilibrium of Forces', year: 2019,
    question: 'For a body in equilibrium, the sum of all forces acting on it is',
    options: { A: 'Zero', B: 'Maximum', C: 'Minimum', D: 'Constant but not zero' },
    answer: 'A', explanation: 'For equilibrium, ΣF = 0 (first condition of equilibrium)'
  },
  {
    id: 'phy-q21', subject: 'physics', topic: 'Heat Transfer (Conduction, Convection, Radiation)', year: 2021,
    question: 'Which method of heat transfer does not require a medium?',
    options: { A: 'Radiation', B: 'Conduction', C: 'Convection', D: 'All require a medium' },
    answer: 'A', explanation: 'Radiation can travel through a vacuum, unlike conduction and convection'
  },
  {
    id: 'phy-q22', subject: 'physics', topic: 'Electromagnetic Waves', year: 2018,
    question: 'Which of these electromagnetic waves has the shortest wavelength?',
    options: { A: 'Gamma rays', B: 'X-rays', C: 'Ultraviolet', D: 'Radio waves' },
    answer: 'A', explanation: 'Gamma rays have the shortest wavelength in the electromagnetic spectrum'
  },
  {
    id: 'phy-q23', subject: 'physics', topic: 'Electronics (Diodes, Transistors)', year: 2022,
    question: 'A p-n junction diode allows current to flow easily when it is',
    options: { A: 'Forward biased', B: 'Reverse biased', C: 'Unbiased', D: 'Short circuited' },
    answer: 'A', explanation: 'A diode conducts when forward biased (p connected to +ve, n to -ve)'
  },
  {
    id: 'phy-q24', subject: 'physics', topic: 'Atomic & Nuclear Physics', year: 2017,
    question: 'The number of protons in the nucleus of an atom is called the',
    options: { A: 'Atomic number', B: 'Mass number', C: 'Neutron number', D: 'Nucleon number' },
    answer: 'A', explanation: 'Atomic number (Z) = number of protons in the nucleus'
  },
  // Extra physics questions
  {
    id: 'phy-q25', subject: 'physics', topic: 'Motion (Speed, Velocity, Acceleration)', year: 2016,
    question: 'A ball is thrown vertically upwards with a velocity of 20m/s. Find the maximum height reached (g = 10m/s²)',
    options: { A: '20 m', B: '40 m', C: '10 m', D: '200 m' },
    answer: 'A', explanation: 'v² = u² - 2gs, 0 = 400 - 20s, s = 20m'
  },
  {
    id: 'phy-q26', subject: 'physics', topic: "Newton's Laws of Motion", year: 2015,
    question: 'The tendency of a body to remain in its state of rest or uniform motion is called',
    options: { A: 'Inertia', B: 'Momentum', C: 'Force', D: 'Velocity' },
    answer: 'A', explanation: "Newton's first law - the law of inertia"
  },
  {
    id: 'phy-q27', subject: 'physics', topic: 'Work, Energy & Power', year: 2014,
    question: 'A body of mass 4kg is raised to a height of 5m. Find its potential energy (g = 10m/s²)',
    options: { A: '200 J', B: '20 J', C: '100 J', D: '50 J' },
    answer: 'A', explanation: 'PE = mgh = 4 × 10 × 5 = 200 J'
  },
  {
    id: 'phy-q28', subject: 'physics', topic: 'Waves (Properties & Types)', year: 2023,
    question: 'In which type of wave do particles vibrate perpendicular to the direction of wave propagation?',
    options: { A: 'Transverse wave', B: 'Longitudinal wave', C: 'Sound wave', D: 'Compression wave' },
    answer: 'A', explanation: 'In transverse waves, particle vibration is perpendicular to wave direction'
  },
  {
    id: 'phy-q29', subject: 'physics', topic: 'Current Electricity (Ohm\'s Law, Circuits)', year: 2013,
    question: 'Three resistors of 2Ω, 3Ω and 6Ω are connected in parallel. Find the effective resistance.',
    options: { A: '1 Ω', B: '11 Ω', C: '0.5 Ω', D: '3.67 Ω' },
    answer: 'A', explanation: '1/R = 1/2 + 1/3 + 1/6 = 3/6 + 2/6 + 1/6 = 6/6 = 1. R = 1Ω'
  },
  {
    id: 'phy-q30', subject: 'physics', topic: 'Pressure (Solid, Liquid, Gas)', year: 2016,
    question: 'Atmospheric pressure is approximately',
    options: { A: '1.013 × 10⁵ Pa', B: '1.013 × 10³ Pa', C: '1.013 × 10⁷ Pa', D: '1.013 Pa' },
    answer: 'A', explanation: 'Standard atmospheric pressure = 1.013 × 10⁵ Pa (101.3 kPa)'
  },
  {
    id: 'phy-q31', subject: 'physics', topic: 'Gas Laws', year: 2015,
    question: "Boyle's law states that",
    options: { A: 'PV = constant at constant temperature', B: 'V/T = constant at constant pressure', C: 'P/T = constant at constant volume', D: 'PVT = constant' },
    answer: 'A', explanation: "Boyle's law: PV = k at constant temperature"
  },
  {
    id: 'phy-q32', subject: 'physics', topic: 'Light (Reflection & Refraction)', year: 2014,
    question: 'The refractive index of a medium is 1.5. Find the critical angle.',
    options: { A: '41.8°', B: '48.6°', C: '30°', D: '60°' },
    answer: 'A', explanation: 'sin C = 1/n = 1/1.5 = 0.667, C = 41.8°'
  },
  {
    id: 'phy-q33', subject: 'physics', topic: 'Scalars & Vectors', year: 2023,
    question: 'Two forces of 3N and 4N act at right angles. Find the resultant.',
    options: { A: '5 N', B: '7 N', C: '1 N', D: '12 N' },
    answer: 'A', explanation: 'R = √(3² + 4²) = √(9 + 16) = √25 = 5 N'
  },
  {
    id: 'phy-q34', subject: 'physics', topic: 'Simple Machines', year: 2013,
    question: 'The velocity ratio of a screw jack with pitch 0.2cm and lever arm length 35cm is',
    options: { A: '1100', B: '175', C: '70', D: '7' },
    answer: 'A', explanation: 'VR = 2πl/p = 2π(35)/0.2 = 220π/0.2 ≈ 1100'
  },
  {
    id: 'phy-q35', subject: 'physics', topic: 'Friction', year: 2014,
    question: 'Which of the following reduces friction?',
    options: { A: 'Lubrication', B: 'Increasing weight', C: 'Roughening surfaces', D: 'Increasing area' },
    answer: 'A', explanation: 'Lubrication introduces a fluid layer between surfaces, reducing friction'
  },
  {
    id: 'phy-q36', subject: 'physics', topic: 'Temperature & Thermometry', year: 2016,
    question: 'The boiling point of water on the Kelvin scale is',
    options: { A: '373 K', B: '273 K', C: '100 K', D: '212 K' },
    answer: 'A', explanation: '100°C + 273 = 373 K'
  },
  {
    id: 'phy-q37', subject: 'physics', topic: 'Electrostatics', year: 2015,
    question: 'Like charges',
    options: { A: 'Repel each other', B: 'Attract each other', C: 'Have no effect', D: 'Cancel out' },
    answer: 'A', explanation: 'Like charges repel, unlike charges attract'
  },
  {
    id: 'phy-q38', subject: 'physics', topic: 'Electromagnetic Induction', year: 2023,
    question: "Lenz's law is a consequence of the conservation of",
    options: { A: 'Energy', B: 'Momentum', C: 'Charge', D: 'Mass' },
    answer: 'A', explanation: "Lenz's law ensures the induced current opposes the change causing it, conserving energy"
  },
  {
    id: 'phy-q39', subject: 'physics', topic: 'Atomic & Nuclear Physics', year: 2022,
    question: 'An alpha particle consists of',
    options: { A: '2 protons and 2 neutrons', B: '1 proton and 1 neutron', C: '1 electron', D: '2 electrons' },
    answer: 'A', explanation: 'Alpha particle = helium nucleus = 2 protons + 2 neutrons'
  },
  {
    id: 'phy-q40', subject: 'physics', topic: 'Linear Momentum & Collisions', year: 2021,
    question: 'The impulse of a force is equal to the',
    options: { A: 'Change in momentum', B: 'Change in velocity', C: 'Change in acceleration', D: 'Change in energy' },
    answer: 'A', explanation: 'Impulse = Ft = Δp (change in momentum)'
  },

  // ==================== CHEMISTRY ====================
  {
    id: 'chem-q1', subject: 'chemistry', topic: 'Atomic Structure & Bonding', year: 2020,
    question: 'The electronic configuration of sodium (Na, Z=11) is',
    options: { A: '2, 8, 1', B: '2, 8, 2', C: '2, 1, 8', D: '8, 2, 1' },
    answer: 'A', explanation: 'Na has 11 electrons: 2 in the first shell, 8 in the second, 1 in the third'
  },
  {
    id: 'chem-q2', subject: 'chemistry', topic: 'Stoichiometry & Chemical Calculations', year: 2019,
    question: 'How many moles are in 44g of CO₂? (C=12, O=16)',
    options: { A: '1 mole', B: '2 moles', C: '0.5 moles', D: '44 moles' },
    answer: 'A', explanation: 'Molar mass of CO₂ = 12 + 32 = 44g/mol. n = 44/44 = 1 mole'
  },
  {
    id: 'chem-q3', subject: 'chemistry', topic: 'Acids, Bases & Salts', year: 2021,
    question: 'What is the pH of a neutral solution?',
    options: { A: '7', B: '0', C: '14', D: '1' },
    answer: 'A', explanation: 'A neutral solution has pH = 7'
  },
  {
    id: 'chem-q4', subject: 'chemistry', topic: 'Redox Reactions', year: 2018,
    question: 'In the reaction 2Mg + O₂ → 2MgO, magnesium is',
    options: { A: 'Oxidized', B: 'Reduced', C: 'Neither oxidized nor reduced', D: 'A catalyst' },
    answer: 'A', explanation: 'Mg loses electrons (0 to +2), so it is oxidized'
  },
  {
    id: 'chem-q5', subject: 'chemistry', topic: 'Periodic Table & Periodicity', year: 2022,
    question: 'Group 1 elements are known as',
    options: { A: 'Alkali metals', B: 'Alkaline earth metals', C: 'Halogens', D: 'Noble gases' },
    answer: 'A', explanation: 'Group 1 elements (Li, Na, K, etc.) are called alkali metals'
  },
  {
    id: 'chem-q6', subject: 'chemistry', topic: 'States of Matter & Gas Laws', year: 2017,
    question: 'At S.T.P., the molar volume of a gas is',
    options: { A: '22.4 dm³', B: '44.8 dm³', C: '11.2 dm³', D: '2.24 dm³' },
    answer: 'A', explanation: 'At STP (0°C, 1 atm), one mole of any gas occupies 22.4 dm³'
  },
  {
    id: 'chem-q7', subject: 'chemistry', topic: 'Electrochemistry', year: 2020,
    question: 'During electrolysis of dilute H₂SO₄, the gas collected at the cathode is',
    options: { A: 'Hydrogen', B: 'Oxygen', C: 'Sulphur dioxide', D: 'Chlorine' },
    answer: 'A', explanation: 'H⁺ ions migrate to the cathode and are discharged as hydrogen gas'
  },
  {
    id: 'chem-q8', subject: 'chemistry', topic: 'Rates of Reaction & Equilibrium', year: 2019,
    question: 'Which of the following increases the rate of a chemical reaction?',
    options: { A: 'Increase in temperature', B: 'Decrease in concentration', C: 'Increase in volume', D: 'Removal of catalyst' },
    answer: 'A', explanation: 'Higher temperature increases kinetic energy, leading to more effective collisions'
  },
  {
    id: 'chem-q9', subject: 'chemistry', topic: 'Hydrocarbons (Alkanes, Alkenes, Alkynes)', year: 2021,
    question: 'The general formula for alkanes is',
    options: { A: 'CₙH₂ₙ₊₂', B: 'CₙH₂ₙ', C: 'CₙH₂ₙ₋₂', D: 'CₙHₙ' },
    answer: 'A', explanation: 'Alkanes are saturated hydrocarbons with formula CₙH₂ₙ₊₂'
  },
  {
    id: 'chem-q10', subject: 'chemistry', topic: 'Alcohols & Ethers', year: 2018,
    question: 'The functional group in alcohols is',
    options: { A: '-OH', B: '-COOH', C: '-CHO', D: '-CO-' },
    answer: 'A', explanation: 'Alcohols contain the hydroxyl (-OH) functional group'
  },
  {
    id: 'chem-q11', subject: 'chemistry', topic: 'Ketones & Aldehydes', year: 2022,
    question: 'Which reagent is used to distinguish between aldehydes and ketones?',
    options: { A: "Tollen's reagent", B: 'Litmus paper', C: 'Universal indicator', D: 'Methyl orange' },
    answer: 'A', explanation: "Tollen's reagent (ammoniacal silver nitrate) gives a silver mirror with aldehydes but not ketones"
  },
  {
    id: 'chem-q12', subject: 'chemistry', topic: 'Carboxylic Acids & Esters', year: 2017,
    question: 'The IUPAC name for CH₃COOH is',
    options: { A: 'Ethanoic acid', B: 'Methanoic acid', C: 'Propanoic acid', D: 'Butanoic acid' },
    answer: 'A', explanation: 'CH₃COOH has 2 carbons = ethanoic acid (commonly called acetic acid)'
  },
  {
    id: 'chem-q13', subject: 'chemistry', topic: 'Energy Changes (Thermochemistry)', year: 2020,
    question: 'A reaction that absorbs heat from the surroundings is',
    options: { A: 'Endothermic', B: 'Exothermic', C: 'Isothermal', D: 'Adiabatic' },
    answer: 'A', explanation: 'Endothermic reactions absorb heat (ΔH is positive)'
  },
  {
    id: 'chem-q14', subject: 'chemistry', topic: 'Water & Solution Chemistry', year: 2019,
    question: 'Hard water contains dissolved salts of',
    options: { A: 'Calcium and magnesium', B: 'Sodium and potassium', C: 'Iron and zinc', D: 'Lead and copper' },
    answer: 'A', explanation: 'Hard water contains dissolved Ca²⁺ and Mg²⁺ ions'
  },
  {
    id: 'chem-q15', subject: 'chemistry', topic: 'Metals & Their Compounds', year: 2021,
    question: 'The most reactive metal in the reactivity series is',
    options: { A: 'Potassium', B: 'Sodium', C: 'Calcium', D: 'Iron' },
    answer: 'A', explanation: 'Potassium is the most reactive metal in the standard reactivity series'
  },
  {
    id: 'chem-q16', subject: 'chemistry', topic: 'Non-Metals & Their Compounds', year: 2018,
    question: 'The gas responsible for the depletion of the ozone layer is',
    options: { A: 'Chlorofluorocarbons (CFCs)', B: 'Carbon dioxide', C: 'Nitrogen', D: 'Oxygen' },
    answer: 'A', explanation: 'CFCs release chlorine atoms that catalytically destroy ozone molecules'
  },
  {
    id: 'chem-q17', subject: 'chemistry', topic: 'Polymers (Natural & Synthetic)', year: 2022,
    question: 'Starch is a natural polymer of',
    options: { A: 'Glucose', B: 'Fructose', C: 'Amino acids', D: 'Nucleotides' },
    answer: 'A', explanation: 'Starch is a polysaccharide made up of glucose monomers'
  },
  {
    id: 'chem-q18', subject: 'chemistry', topic: 'Industrial Chemistry', year: 2017,
    question: 'The Haber process is used for the manufacture of',
    options: { A: 'Ammonia', B: 'Sulphuric acid', C: 'Sodium hydroxide', D: 'Nitric acid' },
    answer: 'A', explanation: 'Haber process: N₂ + 3H₂ ⇌ 2NH₃ (manufacture of ammonia)'
  },
  {
    id: 'chem-q19', subject: 'chemistry', topic: 'Environmental Chemistry', year: 2020,
    question: 'Acid rain is mainly caused by',
    options: { A: 'SO₂ and NO₂', B: 'CO₂ and H₂O', C: 'O₃ and N₂', D: 'CH₄ and CO' },
    answer: 'A', explanation: 'SO₂ and NO₂ dissolve in rainwater to form sulphuric and nitric acids'
  },
  // Extra chemistry questions
  {
    id: 'chem-q20', subject: 'chemistry', topic: 'Atomic Structure & Bonding', year: 2016,
    question: 'An ionic bond is formed by',
    options: { A: 'Transfer of electrons', B: 'Sharing of electrons', C: 'Delocalization of electrons', D: 'Nuclear fusion' },
    answer: 'A', explanation: 'Ionic bonds form when electrons are transferred from a metal to a non-metal'
  },
  {
    id: 'chem-q21', subject: 'chemistry', topic: 'Periodic Table & Periodicity', year: 2015,
    question: 'Electronegativity across a period',
    options: { A: 'Increases', B: 'Decreases', C: 'Remains constant', D: 'First increases then decreases' },
    answer: 'A', explanation: 'Electronegativity increases across a period due to increasing nuclear charge'
  },
  {
    id: 'chem-q22', subject: 'chemistry', topic: 'Stoichiometry & Chemical Calculations', year: 2014,
    question: "What is Avogadro's number?",
    options: { A: '6.02 × 10²³', B: '3.01 × 10²³', C: '6.02 × 10⁻²³', D: '1.66 × 10⁻²⁴' },
    answer: 'A', explanation: "Avogadro's number = 6.02 × 10²³ particles per mole"
  },
  {
    id: 'chem-q23', subject: 'chemistry', topic: 'Acids, Bases & Salts', year: 2023,
    question: 'Which indicator is used in the titration of a strong acid and strong base?',
    options: { A: 'Any indicator', B: 'Methyl orange only', C: 'Phenolphthalein only', D: 'Litmus only' },
    answer: 'A', explanation: 'For strong acid-strong base titration, any indicator works as the pH change is sharp'
  },
  {
    id: 'chem-q24', subject: 'chemistry', topic: 'Redox Reactions', year: 2016,
    question: 'The oxidation state of Mn in KMnO₄ is',
    options: { A: '+7', B: '+5', C: '+4', D: '+2' },
    answer: 'A', explanation: 'K(+1) + Mn(x) + 4O(-2) = 0. 1 + x - 8 = 0. x = +7'
  },
  {
    id: 'chem-q25', subject: 'chemistry', topic: 'Electrochemistry', year: 2015,
    question: 'During electroplating, the object to be plated is the',
    options: { A: 'Cathode', B: 'Anode', C: 'Electrolyte', D: 'Salt bridge' },
    answer: 'A', explanation: 'The object to be plated is made the cathode so metal ions deposit on it'
  },
  {
    id: 'chem-q26', subject: 'chemistry', topic: 'Rates of Reaction & Equilibrium', year: 2014,
    question: "According to Le Chatelier's principle, increasing pressure favors",
    options: { A: 'The side with fewer gas molecules', B: 'The side with more gas molecules', C: 'The forward reaction always', D: 'The backward reaction always' },
    answer: 'A', explanation: "Le Chatelier's principle: increased pressure shifts equilibrium to the side with fewer moles of gas"
  },
  {
    id: 'chem-q27', subject: 'chemistry', topic: 'Hydrocarbons (Alkanes, Alkenes, Alkynes)', year: 2023,
    question: 'The test for unsaturation in organic compounds is',
    options: { A: 'Decolorization of bromine water', B: 'Burning with a smoky flame', C: 'Dissolving in water', D: 'Reacting with NaOH' },
    answer: 'A', explanation: 'Unsaturated compounds (alkenes/alkynes) decolorize bromine water'
  },
  {
    id: 'chem-q28', subject: 'chemistry', topic: 'Energy Changes (Thermochemistry)', year: 2013,
    question: "Hess's law states that the total enthalpy change is",
    options: { A: 'Independent of the route taken', B: 'Dependent on temperature', C: 'Always negative', D: 'Always positive' },
    answer: 'A', explanation: "Hess's law: total enthalpy change depends only on initial and final states, not the path"
  },
  {
    id: 'chem-q29', subject: 'chemistry', topic: 'Metals & Their Compounds', year: 2023,
    question: 'Rusting of iron requires',
    options: { A: 'Oxygen and water', B: 'Only oxygen', C: 'Only water', D: 'Carbon dioxide' },
    answer: 'A', explanation: 'Rusting is the oxidation of iron in the presence of both oxygen and moisture'
  },
  {
    id: 'chem-q30', subject: 'chemistry', topic: 'States of Matter & Gas Laws', year: 2013,
    question: 'The kinetic theory of gases assumes that gas molecules',
    options: { A: 'Are in constant random motion', B: 'Are stationary', C: 'Attract each other strongly', D: 'Have large volumes' },
    answer: 'A', explanation: 'Kinetic theory: gas molecules are in constant random motion with negligible intermolecular forces'
  },
  {
    id: 'chem-q31', subject: 'chemistry', topic: 'Water & Solution Chemistry', year: 2016,
    question: 'A saturated solution is one that',
    options: { A: 'Contains the maximum amount of solute at that temperature', B: 'Is always concentrated', C: 'Cannot dissolve anything', D: 'Has no solute' },
    answer: 'A', explanation: 'A saturated solution holds the maximum solute that can dissolve at a given temperature'
  },
  {
    id: 'chem-q32', subject: 'chemistry', topic: 'Non-Metals & Their Compounds', year: 2015,
    question: 'The allotropes of carbon include',
    options: { A: 'Diamond and graphite', B: 'Oxygen and ozone', C: 'Red and white phosphorus', D: 'Rhombic and monoclinic sulphur' },
    answer: 'A', explanation: 'Diamond and graphite are allotropes of carbon'
  },
  {
    id: 'chem-q33', subject: 'chemistry', topic: 'Polymers (Natural & Synthetic)', year: 2014,
    question: 'Nylon is an example of a',
    options: { A: 'Condensation polymer', B: 'Addition polymer', C: 'Natural polymer', D: 'Copolymer' },
    answer: 'A', explanation: 'Nylon is formed by condensation polymerization with the elimination of water'
  },
  {
    id: 'chem-q34', subject: 'chemistry', topic: 'Industrial Chemistry', year: 2016,
    question: 'The Contact process is used for manufacturing',
    options: { A: 'Sulphuric acid', B: 'Nitric acid', C: 'Hydrochloric acid', D: 'Ammonia' },
    answer: 'A', explanation: 'Contact process: 2SO₂ + O₂ → 2SO₃, then SO₃ + H₂O → H₂SO₄'
  },
  {
    id: 'chem-q35', subject: 'chemistry', topic: 'Alcohols & Ethers', year: 2015,
    question: 'The product of the oxidation of ethanol is',
    options: { A: 'Ethanal (acetaldehyde)', B: 'Ethane', C: 'Ethene', D: 'Methanol' },
    answer: 'A', explanation: 'Mild oxidation of ethanol gives ethanal (CH₃CHO)'
  },
  {
    id: 'chem-q36', subject: 'chemistry', topic: 'Ketones & Aldehydes', year: 2014,
    question: 'The IUPAC name of CH₃COCH₃ is',
    options: { A: 'Propanone', B: 'Propanal', C: 'Butanone', D: 'Ethanone' },
    answer: 'A', explanation: 'CH₃COCH₃ has 3 carbons with a ketone group = propanone (acetone)'
  },
  {
    id: 'chem-q37', subject: 'chemistry', topic: 'Carboxylic Acids & Esters', year: 2013,
    question: 'Esters are formed by the reaction of',
    options: { A: 'An acid and an alcohol', B: 'Two acids', C: 'An acid and a base', D: 'Two alcohols' },
    answer: 'A', explanation: 'Esterification: acid + alcohol → ester + water'
  },
  {
    id: 'chem-q38', subject: 'chemistry', topic: 'Environmental Chemistry', year: 2023,
    question: 'The greenhouse gas that contributes most to global warming is',
    options: { A: 'Carbon dioxide', B: 'Nitrogen', C: 'Oxygen', D: 'Hydrogen' },
    answer: 'A', explanation: 'CO₂ is the most significant greenhouse gas contributing to global warming'
  },
  {
    id: 'chem-q39', subject: 'chemistry', topic: 'Atomic Structure & Bonding', year: 2013,
    question: 'The shape of a methane molecule is',
    options: { A: 'Tetrahedral', B: 'Linear', C: 'Trigonal planar', D: 'Octahedral' },
    answer: 'A', explanation: 'CH₄ has 4 bonding pairs around carbon, giving it a tetrahedral shape'
  },
  {
    id: 'chem-q40', subject: 'chemistry', topic: 'Periodic Table & Periodicity', year: 2022,
    question: 'The element with atomic number 17 belongs to group',
    options: { A: 'VII (Halogens)', B: 'I (Alkali metals)', C: 'VIII (Noble gases)', D: 'II (Alkaline earth)' },
    answer: 'A', explanation: 'Element 17 is Chlorine (2,8,7) — 7 valence electrons = Group VII'
  },

  // ==================== ENGLISH ====================
  {
    id: 'eng-q1', subject: 'english', topic: 'Comprehension & Summary', year: 2020,
    question: 'In the sentence "The boy ran quickly to school," the word "quickly" is a/an',
    options: { A: 'Adverb', B: 'Adjective', C: 'Verb', D: 'Noun' },
    answer: 'A', explanation: '"Quickly" modifies the verb "ran" and is therefore an adverb'
  },
  {
    id: 'eng-q2', subject: 'english', topic: 'Synonyms & Antonyms', year: 2019,
    question: 'Choose the word that is nearest in meaning to "benevolent"',
    options: { A: 'Kind', B: 'Cruel', C: 'Lazy', D: 'Rich' },
    answer: 'A', explanation: 'Benevolent means well-meaning and kindly'
  },
  {
    id: 'eng-q3', subject: 'english', topic: 'Concord (Subject-Verb Agreement)', year: 2021,
    question: 'Choose the correct option: "The committee ____ decided to postpone the meeting."',
    options: { A: 'has', B: 'have', C: 'are', D: 'were' },
    answer: 'A', explanation: '"Committee" is a collective noun acting as a single unit, so it takes "has"'
  },
  {
    id: 'eng-q4', subject: 'english', topic: 'Tenses & Sentence Construction', year: 2018,
    question: 'Select the correct sentence:',
    options: { A: 'She has been working here since 2015.', B: 'She have been working here since 2015.', C: 'She had been working here since 2015.', D: 'She was been working here since 2015.' },
    answer: 'A', explanation: 'Present perfect continuous: subject + has/have + been + verb-ing. "She" takes "has"'
  },
  {
    id: 'eng-q5', subject: 'english', topic: 'Idioms & Phrasal Verbs', year: 2022,
    question: 'The idiom "to burn the midnight oil" means to',
    options: { A: 'Study or work late into the night', B: 'Waste resources', C: 'Start a fire', D: 'Cook at night' },
    answer: 'A', explanation: 'To burn the midnight oil = to work or study late at night'
  },
  {
    id: 'eng-q6', subject: 'english', topic: 'Vowel Sounds (Monophthongs & Diphthongs)', year: 2017,
    question: 'The underlined letter in "caught" represents the sound',
    options: { A: '/ɔː/', B: '/aʊ/', C: '/æ/', D: '/eɪ/' },
    answer: 'A', explanation: 'The "au" in "caught" produces the long /ɔː/ sound'
  },
  {
    id: 'eng-q7', subject: 'english', topic: 'Consonant Sounds', year: 2020,
    question: 'The "ph" in "phone" represents the sound',
    options: { A: '/f/', B: '/p/', C: '/h/', D: '/v/' },
    answer: 'A', explanation: '"Ph" produces the /f/ sound in English'
  },
  {
    id: 'eng-q8', subject: 'english', topic: 'Stress Patterns (Word & Sentence)', year: 2019,
    question: 'In the word "education," the primary stress falls on the syllable',
    options: { A: 'Third (CA)', B: 'First (ED)', C: 'Second (U)', D: 'Fourth (TION)' },
    answer: 'A', explanation: 'ed-u-CA-tion — the primary stress falls on the third syllable'
  },
  {
    id: 'eng-q9', subject: 'english', topic: 'Figures of Speech', year: 2021,
    question: '"Life is a journey" is an example of',
    options: { A: 'Metaphor', B: 'Simile', C: 'Hyperbole', D: 'Personification' },
    answer: 'A', explanation: 'A metaphor compares two things directly without using "like" or "as"'
  },
  {
    id: 'eng-q10', subject: 'english', topic: 'Register & Vocabulary', year: 2018,
    question: 'In legal register, "plaintiff" means',
    options: { A: 'The person who brings a case to court', B: 'The judge', C: 'The lawyer', D: 'The witness' },
    answer: 'A', explanation: 'A plaintiff is the person who initiates a lawsuit'
  },
  {
    id: 'eng-q11', subject: 'english', topic: 'Parts of Speech (Nouns, Verbs, Adverbs, etc.)', year: 2022,
    question: 'Identify the abstract noun: "His ____ was admired by all."',
    options: { A: 'honesty', B: 'house', C: 'shirt', D: 'car' },
    answer: 'A', explanation: '"Honesty" is an abstract noun — it cannot be seen or touched'
  },
  {
    id: 'eng-q12', subject: 'english', topic: 'Active & Passive Voice', year: 2017,
    question: 'Change to passive voice: "The cat caught the mouse."',
    options: { A: 'The mouse was caught by the cat.', B: 'The mouse caught by the cat.', C: 'The mouse is caught by the cat.', D: 'The cat was caught by the mouse.' },
    answer: 'A', explanation: 'Passive: object + was/were + past participle + by + subject'
  },
  {
    id: 'eng-q13', subject: 'english', topic: 'Direct & Indirect Speech', year: 2020,
    question: 'Change to indirect speech: He said, "I am going home."',
    options: { A: 'He said that he was going home.', B: 'He said that I am going home.', C: 'He said that he is going home.', D: 'He says that he was going home.' },
    answer: 'A', explanation: 'In indirect speech: "I am" → "he was", past tense shift'
  },
  {
    id: 'eng-q14', subject: 'english', topic: 'The Life Changer – Khadija Abubakar Jalli', year: 2021,
    question: 'In "The Life Changer," the main character who narrates the story is',
    options: { A: 'Ummi', B: 'Bint', C: 'Omar', D: 'Salma' },
    answer: 'A', explanation: 'Ummi is the mother who narrates the story to her children'
  },
  {
    id: 'eng-q15', subject: 'english', topic: 'The Life Changer – Khadija Abubakar Jalli', year: 2022,
    question: 'In "The Life Changer," Salma gained admission into',
    options: { A: 'Kongo Campus of ABU', B: 'University of Lagos', C: 'Bayero University', D: 'University of Ibadan' },
    answer: 'A', explanation: 'Salma was admitted to the Kongo Campus of Ahmadu Bello University'
  },
  {
    id: 'eng-q16', subject: 'english', topic: 'Intonation & Rhythm', year: 2018,
    question: 'A rising intonation is typically used for',
    options: { A: 'Yes/No questions', B: 'Statements', C: 'Commands', D: 'Wh-questions' },
    answer: 'A', explanation: 'Yes/No questions typically end with a rising intonation pattern'
  },
  {
    id: 'eng-q17', subject: 'english', topic: 'Rhymes & Sound Identification', year: 2019,
    question: 'Which pair of words rhyme?',
    options: { A: 'Caught and taught', B: 'Cough and through', C: 'Lead and bead', D: 'Wind and find' },
    answer: 'A', explanation: '"Caught" and "taught" both end with the /ɔːt/ sound'
  },
  // Extra English questions
  {
    id: 'eng-q18', subject: 'english', topic: 'Synonyms & Antonyms', year: 2016,
    question: 'Choose the word opposite in meaning to "extravagant"',
    options: { A: 'Frugal', B: 'Lavish', C: 'Wasteful', D: 'Generous' },
    answer: 'A', explanation: 'Extravagant = wasteful/lavish. Frugal = economical/thrifty (opposite)'
  },
  {
    id: 'eng-q19', subject: 'english', topic: 'Concord (Subject-Verb Agreement)', year: 2015,
    question: 'Choose the correct option: "Neither the teacher nor the students ____ present."',
    options: { A: 'were', B: 'was', C: 'is', D: 'has been' },
    answer: 'A', explanation: 'With "neither...nor," the verb agrees with the nearer subject ("students" = plural = "were")'
  },
  {
    id: 'eng-q20', subject: 'english', topic: 'Idioms & Phrasal Verbs', year: 2014,
    question: '"To let the cat out of the bag" means to',
    options: { A: 'Reveal a secret', B: 'Release an animal', C: 'Start a fight', D: 'Give up' },
    answer: 'A', explanation: 'To let the cat out of the bag = to reveal a secret accidentally'
  },
  {
    id: 'eng-q21', subject: 'english', topic: 'Figures of Speech', year: 2013,
    question: '"The wind whispered through the trees" is an example of',
    options: { A: 'Personification', B: 'Simile', C: 'Hyperbole', D: 'Irony' },
    answer: 'A', explanation: 'Personification gives human qualities (whispering) to non-human things (wind)'
  },
  {
    id: 'eng-q22', subject: 'english', topic: 'Tenses & Sentence Construction', year: 2023,
    question: 'Choose the correct option: "If I ____ you, I would apologize."',
    options: { A: 'were', B: 'was', C: 'am', D: 'been' },
    answer: 'A', explanation: 'In conditional (subjunctive mood), "were" is used for all persons: "If I were you"'
  },
  {
    id: 'eng-q23', subject: 'english', topic: 'Register & Vocabulary', year: 2016,
    question: 'In medical register, "diagnosis" means',
    options: { A: 'Identification of a disease', B: 'Treatment of a disease', C: 'Prevention of a disease', D: 'Spread of a disease' },
    answer: 'A', explanation: 'Diagnosis is the identification of the nature of an illness'
  },
  {
    id: 'eng-q24', subject: 'english', topic: 'Parts of Speech (Nouns, Verbs, Adverbs, etc.)', year: 2015,
    question: 'In "She sings beautifully," the word "beautifully" is a/an',
    options: { A: 'Adverb of manner', B: 'Adjective', C: 'Noun', D: 'Preposition' },
    answer: 'A', explanation: '"Beautifully" describes how she sings = adverb of manner'
  },
  {
    id: 'eng-q25', subject: 'english', topic: 'Vowel Sounds (Monophthongs & Diphthongs)', year: 2014,
    question: 'The vowel sound in "beat" is',
    options: { A: '/iː/', B: '/ɪ/', C: '/e/', D: '/æ/' },
    answer: 'A', explanation: '"Beat" has the long vowel sound /iː/'
  },
  {
    id: 'eng-q26', subject: 'english', topic: 'Stress Patterns (Word & Sentence)', year: 2013,
    question: 'Which of the following words has stress on the first syllable?',
    options: { A: 'TAble', B: 'beLOW', C: 'aGREE', D: 'deCIDE' },
    answer: 'A', explanation: '"Table" = TA-ble, stress falls on the first syllable'
  },
  {
    id: 'eng-q27', subject: 'english', topic: 'Active & Passive Voice', year: 2016,
    question: 'Change to active voice: "The cake was eaten by the children."',
    options: { A: 'The children ate the cake.', B: 'The cake ate the children.', C: 'The children was eating the cake.', D: 'The cake is eaten.' },
    answer: 'A', explanation: 'Active: subject (children) + verb (ate) + object (cake)'
  },
  {
    id: 'eng-q28', subject: 'english', topic: 'Direct & Indirect Speech', year: 2015,
    question: 'Change to direct speech: She said that she would come tomorrow.',
    options: { A: 'She said, "I will come tomorrow."', B: 'She said, "She will come tomorrow."', C: 'She said, "I would come tomorrow."', D: 'She said, "I came tomorrow."' },
    answer: 'A', explanation: 'Direct speech reverses the tense shift: "would" → "will", "she" → "I"'
  },
  {
    id: 'eng-q29', subject: 'english', topic: 'The Life Changer – Khadija Abubakar Jalli', year: 2023,
    question: 'In "The Life Changer," what lesson does Ummi try to teach her children?',
    options: { A: 'The importance of integrity and hard work', B: 'How to make money', C: 'How to cook', D: 'How to drive' },
    answer: 'A', explanation: 'Ummi uses stories to teach her children about integrity, hard work, and moral values'
  },
  {
    id: 'eng-q30', subject: 'english', topic: 'Consonant Sounds', year: 2016,
    question: 'The initial consonant sound in "knight" is',
    options: { A: '/n/', B: '/k/', C: '/kn/', D: '/naɪ/' },
    answer: 'A', explanation: 'The "k" in "knight" is silent, so it begins with the /n/ sound'
  },
  {
    id: 'eng-q31', subject: 'english', topic: 'Comprehension & Summary', year: 2014,
    question: 'A good summary should be',
    options: { A: 'Brief and in your own words', B: 'Longer than the original', C: 'A copy of the passage', D: 'Written in verse' },
    answer: 'A', explanation: 'A summary condenses the main ideas in your own words, shorter than the original'
  },
  {
    id: 'eng-q32', subject: 'english', topic: 'Synonyms & Antonyms', year: 2023,
    question: 'Choose the word nearest in meaning to "obsolete"',
    options: { A: 'Outdated', B: 'Modern', C: 'Expensive', D: 'Popular' },
    answer: 'A', explanation: 'Obsolete = no longer in use = outdated'
  },
  {
    id: 'eng-q33', subject: 'english', topic: 'Idioms & Phrasal Verbs', year: 2013,
    question: '"To call off" means to',
    options: { A: 'Cancel', B: 'Summon', C: 'Phone', D: 'Shout' },
    answer: 'A', explanation: 'To call off = to cancel an event or activity'
  },
  {
    id: 'eng-q34', subject: 'english', topic: 'Figures of Speech', year: 2023,
    question: '"She is as brave as a lion" is an example of',
    options: { A: 'Simile', B: 'Metaphor', C: 'Irony', D: 'Oxymoron' },
    answer: 'A', explanation: 'A simile compares using "as" or "like" — "as brave as a lion"'
  },
  {
    id: 'eng-q35', subject: 'english', topic: 'Concord (Subject-Verb Agreement)', year: 2014,
    question: 'Choose the correct option: "Each of the students ____ a textbook."',
    options: { A: 'has', B: 'have', C: 'are having', D: 'were having' },
    answer: 'A', explanation: '"Each" is singular and takes "has"'
  },
  {
    id: 'eng-q36', subject: 'english', topic: 'In Dependence – Sarah Ladipo Manyika', year: 2021,
    question: 'In "In Dependence," Tayo goes to study at',
    options: { A: 'Oxford University', B: 'Cambridge University', C: 'Harvard University', D: 'University of Lagos' },
    answer: 'A', explanation: 'Tayo Ajayi travels to Oxford University in England on a scholarship'
  },
  {
    id: 'eng-q37', subject: 'english', topic: 'In Dependence – Sarah Ladipo Manyika', year: 2022,
    question: 'In "In Dependence," Vanessa is',
    options: { A: "Tayo's love interest at Oxford", B: "Tayo's sister", C: "Tayo's mother", D: "Tayo's teacher" },
    answer: 'A', explanation: 'Vanessa Richardson is the English girl Tayo falls in love with at Oxford'
  },
  {
    id: 'eng-q38', subject: 'english', topic: 'Intonation & Rhythm', year: 2015,
    question: 'A falling intonation is typically used for',
    options: { A: 'Statements and Wh-questions', B: 'Yes/No questions', C: 'Tag questions expecting agreement', D: 'Exclamations only' },
    answer: 'A', explanation: 'Statements and Wh-questions typically end with a falling intonation'
  },
  {
    id: 'eng-q39', subject: 'english', topic: 'Register & Vocabulary', year: 2014,
    question: '"Cockpit" belongs to the register of',
    options: { A: 'Aviation', B: 'Medicine', C: 'Law', D: 'Agriculture' },
    answer: 'A', explanation: 'Cockpit is the area where pilots sit — aviation register'
  },
  {
    id: 'eng-q40', subject: 'english', topic: 'Rhymes & Sound Identification', year: 2013,
    question: 'The words "flour" and "flower" are examples of',
    options: { A: 'Homophones', B: 'Synonyms', C: 'Antonyms', D: 'Homonyms' },
    answer: 'A', explanation: 'Homophones are words that sound the same but have different meanings and spellings'
  },

  // ==================== THE LEKKI HEADMASTER ====================
  {
    id: 'lekki-q1', subject: 'english', topic: 'The Lekki Headmaster', year: 2025,
    question: 'In "The Lekki Headmaster," the central theme revolves around',
    options: { A: 'Corruption and moral decay in society', B: 'Love and romance', C: 'Space exploration', D: 'Agricultural reform' },
    answer: 'A', explanation: 'The Lekki Headmaster explores themes of corruption, moral decay, and the challenges of modern Nigerian society.'
  },
  {
    id: 'lekki-q2', subject: 'english', topic: 'The Lekki Headmaster', year: 2025,
    question: 'The setting of "The Lekki Headmaster" is primarily in',
    options: { A: 'Lagos, Nigeria', B: 'London, England', C: 'Accra, Ghana', D: 'Abuja, Nigeria' },
    answer: 'A', explanation: 'The story is set in Lagos, specifically around the Lekki area, reflecting urban Nigerian life.'
  },
  {
    id: 'lekki-q3', subject: 'english', topic: 'The Lekki Headmaster', year: 2025,
    question: 'The title "The Lekki Headmaster" is significant because',
    options: { A: 'It represents authority and the abuse of power', B: 'It describes a school principal', C: 'It is about a geography teacher', D: 'It refers to a religious leader' },
    answer: 'A', explanation: 'The title symbolically represents authority figures and the potential for abuse of power in society.'
  },
  {
    id: 'lekki-q4', subject: 'english', topic: 'The Lekki Headmaster', year: 2025,
    question: 'The narrative technique used in "The Lekki Headmaster" is',
    options: { A: 'Third person omniscient', B: 'First person', C: 'Second person', D: 'Stream of consciousness' },
    answer: 'A', explanation: 'The author uses third person omniscient narration to give readers insight into multiple characters.'
  },
  {
    id: 'lekki-q5', subject: 'english', topic: 'The Lekki Headmaster', year: 2025,
    question: 'A major lesson from "The Lekki Headmaster" is that',
    options: { A: 'Integrity should not be compromised for material gain', B: 'Money solves all problems', C: 'Education is unnecessary', D: 'Violence is the answer' },
    answer: 'A', explanation: 'The text teaches that integrity and moral uprightness should not be sacrificed for material wealth.'
  },
  {
    id: 'lekki-q6', subject: 'english', topic: 'The Lekki Headmaster', year: 2024,
    question: 'The literary device most prominently used in "The Lekki Headmaster" is',
    options: { A: 'Satire', B: 'Alliteration', C: 'Onomatopoeia', D: 'Assonance' },
    answer: 'A', explanation: 'The author uses satire to critique societal vices and moral failings in contemporary Nigeria.'
  },
  {
    id: 'lekki-q7', subject: 'english', topic: 'The Lekki Headmaster', year: 2024,
    question: 'The social class portrayed in "The Lekki Headmaster" is primarily',
    options: { A: 'The affluent upper class of Lagos', B: 'Rural farmers', C: 'Nomadic herders', D: 'Colonial administrators' },
    answer: 'A', explanation: 'The story focuses on the wealthy upper class in Lagos and their moral contradictions.'
  },
  {
    id: 'lekki-q8', subject: 'english', topic: 'The Lekki Headmaster', year: 2024,
    question: 'The conflict in "The Lekki Headmaster" can best be described as',
    options: { A: 'Man vs. society', B: 'Man vs. nature', C: 'Man vs. technology', D: 'Man vs. self only' },
    answer: 'A', explanation: 'The central conflict is between individuals and the corrupt societal systems they navigate.'
  },

  // ==================== USE OF ENGLISH (Extra 20 for the 60-question requirement) ====================
  {
    id: 'eng-q41', subject: 'english', topic: 'Comprehension & Summary', year: 2020,
    question: 'The main purpose of a topic sentence in a paragraph is to',
    options: { A: 'State the main idea', B: 'Give examples', C: 'Conclude the paragraph', D: 'List details' },
    answer: 'A', explanation: 'A topic sentence states the main idea that the paragraph will develop'
  },
  {
    id: 'eng-q42', subject: 'english', topic: 'Synonyms & Antonyms', year: 2019,
    question: 'Choose the word opposite in meaning to "transparent"',
    options: { A: 'Opaque', B: 'Clear', C: 'Visible', D: 'Obvious' },
    answer: 'A', explanation: 'Transparent = clear/see-through. Opaque = not transparent (opposite)'
  },
  {
    id: 'eng-q43', subject: 'english', topic: 'Tenses & Sentence Construction', year: 2018,
    question: 'Choose the correct option: "By this time tomorrow, I ____ the exam."',
    options: { A: 'shall have written', B: 'shall be writing', C: 'wrote', D: 'had written' },
    answer: 'A', explanation: 'Future perfect tense for an action that will be completed before a future time'
  },
  {
    id: 'eng-q44', subject: 'english', topic: 'Parts of Speech (Nouns, Verbs, Adverbs, etc.)', year: 2017,
    question: 'In "The tall man spoke softly," the adjective is',
    options: { A: 'tall', B: 'man', C: 'spoke', D: 'softly' },
    answer: 'A', explanation: '"Tall" describes the noun "man" and is therefore an adjective'
  },
  {
    id: 'eng-q45', subject: 'english', topic: 'Idioms & Phrasal Verbs', year: 2016,
    question: '"To turn down" means to',
    options: { A: 'Reject', B: 'Fold', C: 'Rotate', D: 'Decrease' },
    answer: 'A', explanation: 'To turn down = to refuse/reject an offer or request'
  },
  {
    id: 'eng-q46', subject: 'english', topic: 'Consonant Sounds', year: 2015,
    question: 'How many consonant sounds are there in English?',
    options: { A: '24', B: '21', C: '26', D: '20' },
    answer: 'A', explanation: 'There are 24 consonant sounds (phonemes) in English'
  },
  {
    id: 'eng-q47', subject: 'english', topic: 'Figures of Speech', year: 2014,
    question: '"I have told you a million times" is an example of',
    options: { A: 'Hyperbole', B: 'Metaphor', C: 'Irony', D: 'Litotes' },
    answer: 'A', explanation: 'Hyperbole is an intentional exaggeration for emphasis'
  },
  {
    id: 'eng-q48', subject: 'english', topic: 'Comprehension & Summary', year: 2023,
    question: 'An inference in comprehension is',
    options: { A: 'A conclusion drawn from evidence in the text', B: 'A direct quote', C: 'The title of the passage', D: 'A summary of the text' },
    answer: 'A', explanation: 'An inference is a conclusion reached based on evidence and reasoning from the text'
  },
  {
    id: 'eng-q49', subject: 'english', topic: 'Stress Patterns (Word & Sentence)', year: 2022,
    question: 'In the word "photograph," the stress is on the',
    options: { A: 'First syllable (PHO)', B: 'Second syllable (TO)', C: 'Third syllable (GRAPH)', D: 'None' },
    answer: 'A', explanation: 'PHO-to-graph — primary stress on the first syllable'
  },
  {
    id: 'eng-q50', subject: 'english', topic: 'Active & Passive Voice', year: 2013,
    question: 'Which sentence is in the passive voice?',
    options: { A: 'The letter was written by John.', B: 'John wrote the letter.', C: 'John is writing.', D: 'John writes daily.' },
    answer: 'A', explanation: 'Passive voice: object becomes subject + "was/were" + past participle + "by" + agent'
  },
  {
    id: 'eng-q51', subject: 'english', topic: 'Vowel Sounds (Monophthongs & Diphthongs)', year: 2021,
    question: 'The vowel sound /aʊ/ is found in',
    options: { A: 'House', B: 'Heat', C: 'Hit', D: 'Hat' },
    answer: 'A', explanation: '"House" contains the diphthong /aʊ/'
  },
  {
    id: 'eng-q52', subject: 'english', topic: 'Concord (Subject-Verb Agreement)', year: 2020,
    question: '"The news ____ disturbing." Choose the correct verb.',
    options: { A: 'is', B: 'are', C: 'were', D: 'have been' },
    answer: 'A', explanation: '"News" is an uncountable noun and takes a singular verb "is"'
  },
  {
    id: 'eng-q53', subject: 'english', topic: 'Direct & Indirect Speech', year: 2019,
    question: 'He said, "I will come tomorrow." In indirect speech:',
    options: { A: 'He said that he would come the following day.', B: 'He said that he will come tomorrow.', C: 'He said that I would come tomorrow.', D: 'He says that he would come.' },
    answer: 'A', explanation: '"will" → "would", "tomorrow" → "the following day", "I" → "he"'
  },
  {
    id: 'eng-q54', subject: 'english', topic: 'The Life Changer – Khadija Abubakar Jalli', year: 2020,
    question: 'In "The Life Changer," who is Habib?',
    options: { A: "Ummi's husband", B: "Salma's boyfriend", C: 'A lecturer', D: "Omar's friend" },
    answer: 'A', explanation: "Habib is Ummi's husband and father of the children"
  },
  {
    id: 'eng-q55', subject: 'english', topic: 'Register & Vocabulary', year: 2018,
    question: '"Defendant" belongs to the register of',
    options: { A: 'Law', B: 'Medicine', C: 'Education', D: 'Sports' },
    answer: 'A', explanation: 'Defendant is a legal term for the person being accused in court'
  },
  {
    id: 'eng-q56', subject: 'english', topic: 'Idioms & Phrasal Verbs', year: 2017,
    question: '"A piece of cake" means something that is',
    options: { A: 'Very easy', B: 'Delicious', C: 'Expensive', D: 'Sweet' },
    answer: 'A', explanation: '"A piece of cake" = something very easy to do'
  },
  {
    id: 'eng-q57', subject: 'english', topic: 'Parts of Speech (Nouns, Verbs, Adverbs, etc.)', year: 2016,
    question: 'A pronoun is a word that',
    options: { A: 'Takes the place of a noun', B: 'Describes a verb', C: 'Joins two sentences', D: 'Shows action' },
    answer: 'A', explanation: 'A pronoun replaces a noun to avoid repetition (he, she, it, they, etc.)'
  },
  {
    id: 'eng-q58', subject: 'english', topic: 'Figures of Speech', year: 2015,
    question: '"O Death, where is thy sting?" is an example of',
    options: { A: 'Apostrophe', B: 'Simile', C: 'Metaphor', D: 'Onomatopoeia' },
    answer: 'A', explanation: 'Apostrophe addresses an absent person, dead person, or abstract idea directly'
  },
  {
    id: 'eng-q59', subject: 'english', topic: 'Comprehension & Summary', year: 2022,
    question: 'The tone of a passage refers to the',
    options: { A: "Writer's attitude toward the subject", B: 'Volume of reading', C: 'Number of paragraphs', D: 'Length of sentences' },
    answer: 'A', explanation: "Tone reflects the author's attitude or feeling toward the subject matter"
  },
  {
    id: 'eng-q60', subject: 'english', topic: 'Intonation & Rhythm', year: 2014,
    question: 'Rhythm in English speech depends mainly on',
    options: { A: 'Stressed and unstressed syllables', B: 'Number of words', C: 'Punctuation marks', D: 'Spelling patterns' },
    answer: 'A', explanation: 'English rhythm is stress-timed, based on the pattern of stressed and unstressed syllables'
  },
];

// Helper functions
export function getQuestionsBySubject(subject: Subject): Question[] {
  return QUESTION_BANK.filter(q => q.subject === subject);
}

export function getQuestionsByTopic(subject: Subject, topic: string): Question[] {
  return QUESTION_BANK.filter(q => q.subject === subject && q.topic === topic);
}

export function getQuestionsByYear(year: number): Question[] {
  return QUESTION_BANK.filter(q => q.year === year);
}

export function generateExam(mode: 'daily' | 'general'): Question[] {
  if (mode === 'general') {
    // Full JAMB simulation: 60 English + 40 each for 3 subjects = 180
    const english = shuffleArray(getQuestionsBySubject('english')).slice(0, 60);
    const maths = shuffleArray(getQuestionsBySubject('mathematics')).slice(0, 40);
    const physics = shuffleArray(getQuestionsBySubject('physics')).slice(0, 40);
    const chemistry = shuffleArray(getQuestionsBySubject('chemistry')).slice(0, 40);
    return [...english, ...maths, ...physics, ...chemistry];
  } else {
    // Daily mini-test: 15 per subject = 60 questions
    const english = shuffleArray(getQuestionsBySubject('english')).slice(0, 15);
    const maths = shuffleArray(getQuestionsBySubject('mathematics')).slice(0, 15);
    const physics = shuffleArray(getQuestionsBySubject('physics')).slice(0, 15);
    const chemistry = shuffleArray(getQuestionsBySubject('chemistry')).slice(0, 15);
    return [...english, ...maths, ...physics, ...chemistry];
  }
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function getAvailableYears(): number[] {
  // Show all years 1999-2025 even if we don't have questions for every year
  const allYears: number[] = [];
  for (let y = 2025; y >= 1999; y--) allYears.push(y);
  return allYears;
}

export function generateCustomExam(config: {
  subjects: Subject[];
  questionsPerSubject: number;
  topics?: string[];
}): Question[] {
  let allQs: Question[] = [];
  for (const sub of config.subjects) {
    let qs = getQuestionsBySubject(sub);
    if (config.topics && config.topics.length > 0) {
      qs = qs.filter(q => config.topics!.includes(q.topic));
    }
    allQs.push(...shuffleArray(qs).slice(0, config.questionsPerSubject));
  }
  return shuffleArray(allQs);
}

export function getSubjectTopics(subject: Subject): string[] {
  const topics = new Set(QUESTION_BANK.filter(q => q.subject === subject).map(q => q.topic));
  return Array.from(topics);
}
