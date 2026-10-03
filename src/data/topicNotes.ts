import type { Question } from './questions';
import type { Subject } from './syllabus';

/**
 * Offline AOC study notes aligned to the JAMB UTME syllabus used for the 2027 exam
 * (JAMB iBASS e-syllabus). Every topic has objectives, key points and formulas;
 * topics that the stored question bank does not cover also carry their own practice questions.
 */
export interface TopicNote {
  objectives: string[];
  points: string[];
  formulas?: string[];
  traps?: string[];
  practice?: Question[];
}

type Opt = 'A' | 'B' | 'C' | 'D';
let n = 0;
function q(subject: Subject, topic: string, question: string, opts: [string, string, string, string], answer: Opt, explanation: string): Question {
  n += 1;
  return { id: `note-${subject}-${n}`, subject, topic, year: 2027, question, options: { A: opts[0], B: opts[1], C: opts[2], D: opts[3] }, answer, explanation };
}

export const TOPIC_NOTES: Record<string, TopicNote> = {
  // ================= MATHEMATICS =================
  'math-1': {
    objectives: ['Convert numbers between bases 2 to 10', 'Add, subtract, multiply and divide in a given base', 'Solve for an unknown base'],
    points: ['A digit in base $b$ must be less than $b$ (base 2 uses only 0 and 1).', 'To convert to base 10, multiply each digit by its place value $b^0, b^1, b^2, \\ldots$ and add.', 'To convert from base 10, divide repeatedly by the new base and read the remainders from bottom to top.', 'For base-to-base (e.g. base 5 to base 2), go through base 10.'],
    formulas: ['$(abc)_b = a\\times b^2 + b_1\\times b + c$'],
    traps: ['Reading remainders from top to bottom gives the wrong answer.', 'Carrying 10 instead of the base when adding.'],
  },
  'math-2': {
    objectives: ['Apply the laws of indices', 'Apply the laws of logarithms and change of base', 'Solve indicial and logarithmic equations'],
    points: ['$a^m \\times a^n = a^{m+n}$, $a^m \\div a^n = a^{m-n}$, $(a^m)^n = a^{mn}$.', '$a^0 = 1$, $a^{-n} = \\frac{1}{a^n}$, $a^{\\frac{1}{n}} = \\sqrt[n]{a}$.', '$\\log_a xy = \\log_a x + \\log_a y$; $\\log_a \\frac{x}{y} = \\log_a x - \\log_a y$; $\\log_a x^n = n\\log_a x$.', 'Change of base: $\\log_a x = \\frac{\\log_b x}{\\log_b a}$.', 'For equations like $2^{x+1} = 8$, write both sides with the same base: $2^{x+1} = 2^3$, so $x = 2$.'],
    traps: ['$\\log(x+y) \\ne \\log x + \\log y$.', '$\\log_a a = 1$ and $\\log_a 1 = 0$.'],
  },
  'math-3': {
    objectives: ['Identify surds', 'Simplify, add and multiply surds', 'Rationalise denominators'],
    points: ['A surd is a root that cannot be simplified to a whole number or fraction, e.g. $\\sqrt{2}$, $\\sqrt{5}$. $\\sqrt{49} = 7$ is NOT a surd.', 'Simplify by taking out perfect squares: $\\sqrt{18} = \\sqrt{9\\times 2} = 3\\sqrt{2}$.', 'Only like surds can be added: $3\\sqrt{5} + 2\\sqrt{5} = 5\\sqrt{5}$.', 'Rationalise $\\frac{a}{\\sqrt{b}}$ by multiplying by $\\frac{\\sqrt{b}}{\\sqrt{b}}$.', 'Rationalise $\\frac{1}{a+\\sqrt{b}}$ with the conjugate $a-\\sqrt{b}$.'],
    formulas: ['$\\sqrt{a}\\times\\sqrt{b} = \\sqrt{ab}$', '$(\\sqrt{a}+\\sqrt{b})(\\sqrt{a}-\\sqrt{b}) = a-b$'],
  },
  'math-4': {
    objectives: ['Work with fractions, decimals, percentages, ratio, proportion and rate', 'Round to decimal places and significant figures', 'Write numbers in standard form'],
    points: ['Standard form: $A\\times10^n$ where $1 \\le A < 10$.', 'Significant figures start from the first non-zero digit: 0.004072 to 2 s.f. is 0.0041.', 'Percentage error $= \\frac{\\text{error}}{\\text{actual value}}\\times100\\%$.', 'Share in a ratio $a:b$: each part $= \\frac{a}{a+b}\\times$ total.'],
  },
  'math-5': {
    objectives: ['Use set notation: universal set, subset, empty set, complement', 'Find unions and intersections', 'Solve problems with Venn diagrams of up to 3 sets'],
    points: ['$n(A\\cup B) = n(A) + n(B) - n(A\\cap B)$.', 'A set with $n$ elements has $2^n$ subsets.', "$A'$ is everything in the universal set that is not in $A$.", 'For 3 sets, fill the Venn diagram from the centre (all three) outwards.'],
    formulas: ['$n(A\\cup B\\cup C) = n(A)+n(B)+n(C)-n(A\\cap B)-n(A\\cap C)-n(B\\cap C)+n(A\\cap B\\cap C)$'],
  },
  'math-6': {
    objectives: ['Use the factor and remainder theorems', 'Factorise and divide polynomials', 'Interpret graphs of polynomial functions'],
    points: ['Remainder theorem: when $f(x)$ is divided by $(x-a)$, the remainder is $f(a)$.', 'Factor theorem: $(x-a)$ is a factor if $f(a) = 0$.', 'For $(ax-b)$, substitute $x = \\frac{b}{a}$.', 'Where the graph crosses the $x$-axis gives the roots.'],
  },
  'math-7': {
    objectives: ['Solve quadratics by factorising, formula and completing the square', 'Use sum and product of roots', 'Form a quadratic from its roots'],
    points: ['Formula: $x = \\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}$.', 'Sum of roots $\\alpha+\\beta = -\\frac{b}{a}$; product $\\alpha\\beta = \\frac{c}{a}$.', 'Equation from roots: $x^2 - (\\alpha+\\beta)x + \\alpha\\beta = 0$.', 'Discriminant $b^2-4ac$: $>0$ two real roots, $=0$ equal roots, $<0$ no real roots.'],
  },
  'math-8': {
    objectives: ['Solve linear simultaneous equations by elimination and substitution', 'Solve one linear and one quadratic equation together'],
    points: ['Elimination: make one coefficient equal, then add or subtract.', 'Substitution is best when one variable is already alone.', 'Always check your answer in BOTH equations — JAMB options often satisfy only one.'],
  },
  'math-9': {
    objectives: ['Solve linear and quadratic inequalities in one variable', 'Show solutions on a number line or graph'],
    points: ['Multiplying or dividing by a negative number reverses the sign.', 'For $(x-a)(x-b) < 0$ with $a<b$: $a < x < b$.', 'For $(x-a)(x-b) > 0$: $x < a$ or $x > b$.'],
  },
  'math-10': {
    objectives: ['Solve direct, inverse, joint and partial variation problems'],
    points: ['Direct: $y = kx$. Inverse: $y = \\frac{k}{x}$.', 'Joint: $y = kxz$. Partial: $y = a + kx$ (two constants — needs two sets of values).', 'Find $k$ first from the given values, then substitute.'],
  },
  'math-11': {
    objectives: ['Evaluate binary operations', 'Test closure, commutativity, associativity, identity and inverse'],
    points: ['Commutative if $a*b = b*a$.', 'Identity $e$ satisfies $a*e = a$.', 'Inverse $a^{-1}$ satisfies $a*a^{-1} = e$.'],
  },
  'math-12': {
    objectives: ['Add, subtract and multiply matrices', 'Find determinants of 2×2 and 3×3 matrices', 'Find the inverse of a 2×2 matrix'],
    points: ['Multiply rows by columns; $AB$ exists only if columns of $A$ = rows of $B$.', 'For $\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}$, determinant $= ad-bc$.', 'Inverse $= \\frac{1}{ad-bc}\\begin{pmatrix}d&-b\\\\-c&a\\end{pmatrix}$.', 'A matrix with determinant 0 is singular (no inverse).'],
  },
  'math-13': {
    objectives: ['Find the nth term and sum of an AP'],
    points: ['$T_n = a + (n-1)d$.', '$S_n = \\frac{n}{2}[2a + (n-1)d]$ or $\\frac{n}{2}(a + l)$.', 'Common difference $d = T_2 - T_1$.'],
  },
  'math-14': {
    objectives: ['Find the nth term, sum and sum to infinity of a GP'],
    points: ['$T_n = ar^{n-1}$.', '$S_n = \\frac{a(r^n-1)}{r-1}$ for $r>1$.', 'Sum to infinity $S_\\infty = \\frac{a}{1-r}$, only when $|r| < 1$.'],
  },
  'math-15': {
    objectives: ['Use sine, cosine and tangent ratios, sine and cosine rules', 'Solve angles of elevation/depression and bearings', 'Use identities and graphs'],
    points: ['SOH CAH TOA for right-angled triangles.', 'Sine rule: $\\frac{a}{\\sin A} = \\frac{b}{\\sin B}$. Cosine rule: $a^2 = b^2 + c^2 - 2bc\\cos A$.', 'Identity: $\\sin^2\\theta + \\cos^2\\theta = 1$.', 'Bearings are measured clockwise from North, written with three digits (e.g. 045°).', 'Special angles: $\\sin30° = \\frac12$, $\\cos60° = \\frac12$, $\\tan45° = 1$.'],
  },
  'math-16': {
    objectives: ['Find perimeters and areas of plane shapes', 'Find surface areas and volumes of prisms, cylinders, cones, spheres and pyramids'],
    points: ['Cylinder: $V = \\pi r^2 h$; curved surface $= 2\\pi rh$.', 'Cone: $V = \\frac13\\pi r^2 h$; curved surface $= \\pi r l$.', 'Sphere: $V = \\frac43\\pi r^3$; surface $= 4\\pi r^2$.', 'Pyramid: $V = \\frac13\\times$ base area $\\times h$.', 'Arc length $= \\frac{\\theta}{360}\\times2\\pi r$; sector area $= \\frac{\\theta}{360}\\times\\pi r^2$.'],
  },
  'math-17': {
    objectives: ['Find distance, midpoint and gradient', 'Find equations of lines, parallel and perpendicular lines'],
    points: ['Distance $= \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$.', 'Midpoint $= \\left(\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2}\\right)$.', 'Gradient $m = \\frac{y_2-y_1}{x_2-x_1}$; line: $y - y_1 = m(x - x_1)$.', 'Parallel lines: equal gradients. Perpendicular: $m_1 m_2 = -1$.'],
  },
  'math-18': {
    objectives: ['Find limits and differentiate algebraic and simple trig functions', 'Find rates of change, maxima and minima'],
    points: ['$\\frac{d}{dx}x^n = nx^{n-1}$.', '$\\frac{d}{dx}\\sin x = \\cos x$; $\\frac{d}{dx}\\cos x = -\\sin x$.', 'Stationary points: set $\\frac{dy}{dx} = 0$.', 'If $\\frac{d^2y}{dx^2} < 0$ it is a maximum; $> 0$ a minimum.', 'Product rule: $(uv)\' = u\'v + uv\'$.'],
  },
  'math-19': {
    objectives: ['Integrate algebraic and simple trig functions', 'Evaluate definite integrals and areas under curves'],
    points: ['$\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C$ ($n \\ne -1$).', '$\\int \\cos x\\,dx = \\sin x + C$; $\\int \\sin x\\,dx = -\\cos x + C$.', 'Area under $y = f(x)$ from $a$ to $b$ $= \\int_a^b f(x)\\,dx$.', 'Do not forget $+C$ for indefinite integrals.'],
  },
  'math-20': {
    objectives: ['Find the mean, median and mode of grouped and ungrouped data'],
    points: ['Mean $= \\frac{\\sum fx}{\\sum f}$.', 'Median: arrange in order first; middle value (or average of the two middle values).', 'Mode: the most frequent value.', 'For grouped data use class mid-points as $x$.'],
  },
  'math-21': {
    objectives: ['Use addition and multiplication laws of probability', 'Handle independent and mutually exclusive events, coins and dice'],
    points: ['$P(E) = \\frac{\\text{favourable outcomes}}{\\text{total outcomes}}$; $0 \\le P \\le 1$.', 'Mutually exclusive: $P(A\\text{ or }B) = P(A)+P(B)$.', 'Independent: $P(A\\text{ and }B) = P(A)\\times P(B)$.', 'Two dice give 36 outcomes; two coins give 4.', "$P(\\text{not }A) = 1 - P(A)$."],
  },
  'math-22': {
    objectives: ['Count arrangements (permutations) and selections (combinations)'],
    points: ['${}^nP_r = \\frac{n!}{(n-r)!}$ — order matters.', '${}^nC_r = \\frac{n!}{r!(n-r)!}$ — order does not matter.', 'Words with repeated letters: divide by the factorial of each repeat, e.g. arrangements of LEVEL $= \\frac{5!}{2!2!}$.'],
  },
  'math-23': {
    objectives: ['Use properties of angles, parallel lines, triangles and polygons', 'Apply circle theorems'],
    points: ['Angles on a straight line add to 180°; angles at a point add to 360°.', 'Sum of interior angles of an $n$-sided polygon $= (n-2)\\times180°$; each exterior angle of a regular polygon $= \\frac{360°}{n}$.', 'Angle at the centre is twice the angle at the circumference.', 'Angles in the same segment are equal; angle in a semicircle is 90°.', 'Opposite angles of a cyclic quadrilateral add to 180°.', 'Alternate segment theorem: angle between tangent and chord equals the angle in the alternate segment.'],
    practice: [
      q('mathematics', 'Euclidean Geometry & Circle Theorems', 'Find the sum of the interior angles of a hexagon.', ['540°', '720°', '900°', '360°'], 'B', 'Sum $= (n-2)\\times180° = (6-2)\\times180° = 720°$.'),
      q('mathematics', 'Euclidean Geometry & Circle Theorems', 'Each exterior angle of a regular polygon is 40°. How many sides has it?', ['8', '9', '10', '12'], 'B', '$n = \\frac{360°}{40°} = 9$.'),
      q('mathematics', 'Euclidean Geometry & Circle Theorems', 'The angle subtended by a chord at the centre of a circle is 110°. Find the angle it subtends at the circumference (same side).', ['55°', '110°', '70°', '125°'], 'A', 'Angle at centre = 2 × angle at circumference, so $\\frac{110°}{2} = 55°$.'),
      q('mathematics', 'Euclidean Geometry & Circle Theorems', 'PQRS is a cyclic quadrilateral with $\\angle P = 75°$. Find $\\angle R$.', ['75°', '95°', '105°', '115°'], 'C', 'Opposite angles of a cyclic quadrilateral are supplementary: $180° - 75° = 105°$.'),
      q('mathematics', 'Euclidean Geometry & Circle Theorems', 'What is the angle in a semicircle?', ['45°', '60°', '90°', '180°'], 'C', 'The angle subtended by a diameter at the circumference is always 90°.'),
    ],
  },
  'math-24': {
    objectives: ['Read and draw histograms, frequency polygons, pie charts and bar charts'],
    points: ['Pie chart angle $= \\frac{\\text{frequency}}{\\text{total}}\\times360°$.', 'In a histogram the AREA of each bar represents frequency; bars touch.', 'A frequency polygon joins the mid-points of the tops of histogram bars.', 'Bar charts have gaps between bars and equal widths.'],
    practice: [
      q('mathematics', 'Data Representation', 'In a class of 40, 12 students like Physics. What angle represents Physics on a pie chart?', ['96°', '108°', '120°', '72°'], 'B', '$\\frac{12}{40}\\times360° = 108°$.'),
      q('mathematics', 'Data Representation', 'A sector of 90° on a pie chart represents 30 people. What is the total?', ['90', '100', '120', '360'], 'C', '$90°$ is a quarter of $360°$, so total $= 4\\times30 = 120$.'),
      q('mathematics', 'Data Representation', 'In a histogram, frequency is represented by the', ['height of the bar', 'width of the bar', 'area of the bar', 'gap between bars'], 'C', 'For histograms, area is proportional to frequency (important when class widths differ).'),
      q('mathematics', 'Data Representation', 'A frequency polygon is drawn by joining', ['class boundaries', 'mid-points of the tops of the bars', 'cumulative frequencies', 'upper class limits'], 'B', 'Plot frequency against class mid-points and join with straight lines.'),
    ],
  },
  'math-25': {
    objectives: ['Find range, mean deviation, variance and standard deviation'],
    points: ['Range = highest − lowest.', 'Variance $\\sigma^2 = \\frac{\\sum f(x-\\bar{x})^2}{\\sum f}$.', 'Standard deviation $\\sigma = \\sqrt{\\text{variance}}$.', 'Adding the same number to every value does not change the standard deviation.'],
    practice: [
      q('mathematics', 'Measures of Dispersion', 'Find the range of 4, 9, 2, 15, 7.', ['11', '13', '15', '9'], 'B', 'Range $= 15 - 2 = 13$.'),
      q('mathematics', 'Measures of Dispersion', 'Find the variance of 2, 4, 6.', ['$\\frac{8}{3}$', '4', '2', '$\\frac{4}{3}$'], 'A', 'Mean = 4. Squared deviations: 4, 0, 4. Variance $= \\frac{8}{3}$.'),
      q('mathematics', 'Measures of Dispersion', 'The variance of a set of data is 16. Its standard deviation is', ['4', '8', '256', '2'], 'A', '$\\sigma = \\sqrt{16} = 4$.'),
      q('mathematics', 'Measures of Dispersion', 'If 5 is added to every value in a set, the standard deviation', ['increases by 5', 'is unchanged', 'is multiplied by 5', 'decreases by 5'], 'B', 'Every deviation from the mean stays the same, so spread is unchanged.'),
    ],
  },

  // ================= PHYSICS =================
  'phy-1': {
    objectives: ['Distinguish fundamental and derived quantities and their units/dimensions', 'Read vernier calipers and micrometer screw gauges'],
    points: ['Fundamental: length (m), mass (kg), time (s), current (A), temperature (K), amount (mol), luminous intensity (cd).', 'Dimensions use M, L, T: velocity $= LT^{-1}$, force $= MLT^{-2}$.', 'Vernier calipers read to 0.01 cm; micrometer screw gauge reads to 0.01 mm.'],
  },
  'phy-2': {
    objectives: ['Distinguish scalars from vectors', 'Find resultants and resolve vectors', 'Find relative velocity'],
    points: ['Scalars have magnitude only (mass, speed, energy); vectors also have direction (force, velocity, displacement).', 'Components: $F_x = F\\cos\\theta$, $F_y = F\\sin\\theta$.', 'Resultant of perpendicular vectors $= \\sqrt{a^2+b^2}$.'],
  },
  'phy-3': {
    objectives: ['Use equations of linear motion and motion under gravity', 'Interpret distance-time and velocity-time graphs'],
    points: ['$v = u + at$; $s = ut + \\frac12at^2$; $v^2 = u^2 + 2as$.', 'Gradient of a velocity–time graph = acceleration; area under it = distance.', 'Free fall: $a = g \\approx 10\\,\\text{m/s}^2$.'],
  },
  'phy-4': {
    objectives: ["State and apply Newton's three laws", 'Use $F = ma$ and impulse'],
    points: ['First law: inertia. Second law: $F = ma$ (rate of change of momentum). Third law: action and reaction are equal and opposite.', 'Impulse $= Ft = mv - mu$.', 'Apparent weight in a lift: $R = m(g + a)$ going up with acceleration.'],
  },
  'phy-5': {
    objectives: ['Calculate work, kinetic and potential energy, and power', 'Apply conservation of energy'],
    points: ['Work $= Fs\\cos\\theta$ (J).', 'KE $= \\frac12mv^2$; PE $= mgh$.', 'Power $= \\frac{\\text{work}}{\\text{time}} = Fv$ (W).', 'Falling body: $mgh = \\frac12mv^2$, so $v = \\sqrt{2gh}$.'],
  },
  'phy-6': {
    objectives: ['Distinguish static and dynamic friction', 'Use the coefficient of friction'],
    points: ['$F = \\mu R$, where $R$ is the normal reaction.', 'Limiting (static) friction is greater than kinetic friction.', 'On an incline at the angle of repose: $\\mu = \\tan\\theta$.'],
  },
  'phy-7': {
    objectives: ['Find mechanical advantage, velocity ratio and efficiency of levers, pulleys, inclined planes and screws'],
    points: ['MA $= \\frac{\\text{load}}{\\text{effort}}$; VR $= \\frac{\\text{effort distance}}{\\text{load distance}}$.', 'Efficiency $= \\frac{MA}{VR}\\times100\\%$.', 'Pulley system: VR = number of supporting strands. Inclined plane: VR $= \\frac{1}{\\sin\\theta}$. Screw: VR $= \\frac{2\\pi r}{\\text{pitch}}$.'],
  },
  'phy-8': {
    objectives: ['Calculate pressure in solids, liquids and gases'],
    points: ['$P = \\frac{F}{A}$ (Pa).', 'Liquid pressure $P = h\\rho g$ — independent of the container shape.', 'Atmospheric pressure ≈ 760 mmHg ≈ $1.01\\times10^5$ Pa.', 'Hydraulic press: $\\frac{F_1}{A_1} = \\frac{F_2}{A_2}$.'],
  },
  'phy-9': {
    objectives: ['Find moments, centre of gravity and conditions for equilibrium', 'Handle couples and parallel forces'],
    points: ['Moment $= F\\times$ perpendicular distance.', 'Principle of moments: clockwise moments = anticlockwise moments.', 'Equilibrium: resultant force = 0 AND resultant moment = 0.', 'A couple is two equal, opposite, parallel forces; moment of couple $= F\\times d$.'],
  },
  'phy-10': {
    objectives: ['Apply conservation of linear momentum in collisions and explosions'],
    points: ['Momentum $p = mv$ (kg m/s).', '$m_1u_1 + m_2u_2 = m_1v_1 + m_2v_2$.', 'Elastic: KE conserved. Inelastic: KE lost. Bodies sticking together: $(m_1+m_2)v$.'],
  },
  'phy-11': {
    objectives: ['Describe thermometers and temperature scales'],
    points: ['$K = °C + 273$.', 'Thermometric property must vary uniformly with temperature (e.g. length of mercury, resistance).', '$\\theta = \\frac{X_\\theta - X_0}{X_{100} - X_0}\\times100°C$.', 'Clinical thermometer has a constriction; range about 35–43 °C.'],
  },
  'phy-12': {
    objectives: ['Explain conduction, convection and radiation and their applications'],
    points: ['Conduction: through solids, particle to particle. Convection: fluids, by movement of the fluid. Radiation: no medium needed.', 'Dull black surfaces are the best absorbers and emitters; shiny surfaces are the best reflectors.', 'Vacuum flask reduces all three modes.'],
  },
  'phy-13': {
    objectives: ["Apply Boyle's, Charles's, pressure and ideal gas laws"],
    points: ["Boyle's: $P_1V_1 = P_2V_2$ (constant T).", "Charles's: $\\frac{V_1}{T_1} = \\frac{V_2}{T_2}$ (constant P).", 'Pressure law: $\\frac{P_1}{T_1} = \\frac{P_2}{T_2}$.', 'General: $\\frac{P_1V_1}{T_1} = \\frac{P_2V_2}{T_2}$; $PV = nRT$.'],
    traps: ['Temperatures MUST be in kelvin.'],
  },
  'phy-14': {
    objectives: ['Describe transverse and longitudinal waves', 'Use the wave equation'],
    points: ['$v = f\\lambda$; $T = \\frac1f$.', 'Transverse: vibration perpendicular to travel (light, water). Longitudinal: parallel (sound).', 'Progressive wave: $y = A\\sin(\\omega t - kx)$, where $\\omega = 2\\pi f$ and $k = \\frac{2\\pi}{\\lambda}$.', 'Properties: reflection, refraction, diffraction, interference; only transverse waves can be polarised.'],
  },
  'phy-15': {
    objectives: ['Explain speed of sound, resonance, pipes and strings, harmonics and the Doppler effect'],
    points: ['Sound needs a medium; fastest in solids, slowest in gases.', 'Closed pipe fundamental: $\\lambda = 4l$ (odd harmonics only). Open pipe: $\\lambda = 2l$ (all harmonics).', 'String: $f = \\frac{1}{2l}\\sqrt{\\frac{T}{\\mu}}$.', 'Echo: $v = \\frac{2d}{t}$.', 'Doppler effect: pitch rises as the source approaches.'],
  },
  'phy-16': {
    objectives: ['Apply laws of reflection at plane and curved mirrors', "Apply Snell's law, critical angle and total internal reflection"],
    points: ['Mirror formula: $\\frac1f = \\frac1u + \\frac1v$; $f = \\frac r2$.', 'Magnification $m = \\frac vu$.', "Snell's law: $n = \\frac{\\sin i}{\\sin r}$.", '$n = \\frac{1}{\\sin C}$; total internal reflection when $i > C$ going from dense to less dense.', 'Number of images between two mirrors: $\\frac{360}{\\theta} - 1$.'],
  },
  'phy-17': {
    objectives: ['Use the lens formula and power of a lens', 'Describe the microscope, telescope, camera and eye defects'],
    points: ['$\\frac1f = \\frac1u + \\frac1v$ (real-is-positive).', 'Power $= \\frac1f$ (f in metres), unit dioptre.', 'Short sight: corrected with diverging (concave) lens. Long sight: converging (convex) lens.', 'Astronomical telescope magnification $= \\frac{f_o}{f_e}$.'],
  },
  'phy-18': {
    objectives: ['List the electromagnetic spectrum and properties of EM waves'],
    points: ['Order (increasing frequency): radio, microwave, infrared, visible, ultraviolet, X-rays, gamma.', 'All travel at $3\\times10^8$ m/s in vacuum and are transverse.', 'Infrared detected by thermopile; UV by fluorescence.'],
  },
  'phy-19': {
    objectives: ["Apply Coulomb's law, electric field and potential", 'Calculate capacitance and energy stored'],
    points: ['$F = \\frac{kq_1q_2}{r^2}$, $k = 9\\times10^9$.', 'Field $E = \\frac Fq$; $V = \\frac{kq}{r}$.', '$C = \\frac QV$; parallel plates $C = \\frac{\\varepsilon A}{d}$.', 'Series: $\\frac1C = \\frac1{C_1}+\\frac1{C_2}$. Parallel: $C = C_1 + C_2$.', 'Energy $= \\frac12CV^2$.'],
  },
  'phy-20': {
    objectives: ["Apply Ohm's law, resistivity, series/parallel circuits, e.m.f. and internal resistance, Wheatstone bridge"],
    points: ['$V = IR$. Resistivity: $R = \\frac{\\rho l}{A}$.', 'Series: $R = R_1 + R_2$. Parallel: $\\frac1R = \\frac1{R_1} + \\frac1{R_2}$.', '$E = I(R + r)$.', 'Wheatstone/metre bridge: $\\frac{R_1}{R_2} = \\frac{l_1}{l_2}$.'],
  },
  'phy-21': {
    objectives: ['Calculate electrical power, energy and cost'],
    points: ['$P = IV = I^2R = \\frac{V^2}{R}$.', 'Energy $= Pt$; 1 kWh $= 3.6\\times10^6$ J.', 'Cost = kWh × price per unit.'],
  },
  'phy-22': {
    objectives: ["Apply Faraday's and Lenz's laws", 'Explain generators and transformers'],
    points: ['Induced e.m.f. ∝ rate of change of flux; Lenz: it opposes the change.', 'Transformer: $\\frac{V_s}{V_p} = \\frac{N_s}{N_p}$; efficiency $= \\frac{P_{out}}{P_{in}}\\times100\\%$.', 'Step-up: more secondary turns.', 'Energy losses: eddy currents (reduced by laminating), hysteresis, copper ($I^2R$).'],
  },
  'phy-23': {
    objectives: ['Explain conduction in gases and semiconductors', 'Describe p-n junctions and diodes'],
    points: ['Intrinsic semiconductor: pure Si/Ge. Doping with pentavalent atoms gives n-type; trivalent gives p-type.', 'A diode conducts in forward bias and blocks in reverse bias — used for rectification.', 'Cathode rays are streams of electrons; they are deflected by electric and magnetic fields.'],
  },
  'phy-24': {
    objectives: ['Describe atomic models (Thomson, Rutherford, Bohr), energy levels and line spectra'],
    points: ['Rutherford: tiny dense positive nucleus (gold-foil experiment).', 'Bohr: electrons in fixed energy levels; photon emitted when an electron drops: $E = hf = E_2 - E_1$.', 'Line spectra are evidence of discrete energy levels.'],
  },
  'phy-25': {
    objectives: ['Solve projectile motion problems', 'Apply uniform circular motion'],
    points: ['Time of flight $T = \\frac{2u\\sin\\theta}{g}$.', 'Maximum height $H = \\frac{u^2\\sin^2\\theta}{2g}$.', 'Range $R = \\frac{u^2\\sin2\\theta}{g}$ — maximum at 45°.', 'Circular motion: $v = \\omega r$; centripetal acceleration $= \\frac{v^2}{r}$; force $= \\frac{mv^2}{r}$.'],
    practice: [
      q('physics', 'Projectile & Circular Motion', 'At what angle of projection is the horizontal range maximum?', ['30°', '45°', '60°', '90°'], 'B', '$R = \\frac{u^2\\sin2\\theta}{g}$ is greatest when $\\sin2\\theta = 1$, i.e. $\\theta = 45°$.'),
      q('physics', 'Projectile & Circular Motion', 'A ball is projected at 20 m/s at 30° to the horizontal. Find its time of flight. ($g = 10\\,\\text{m/s}^2$)', ['1 s', '2 s', '4 s', '3 s'], 'B', '$T = \\frac{2u\\sin\\theta}{g} = \\frac{2\\times20\\times0.5}{10} = 2$ s.'),
      q('physics', 'Projectile & Circular Motion', 'A 2 kg body moves in a circle of radius 4 m at 6 m/s. Find the centripetal force.', ['18 N', '24 N', '36 N', '12 N'], 'A', '$F = \\frac{mv^2}{r} = \\frac{2\\times36}{4} = 18$ N.'),
      q('physics', 'Projectile & Circular Motion', 'At the highest point of a projectile, the vertical component of velocity is', ['maximum', 'zero', 'equal to the horizontal component', 'equal to $g$'], 'B', 'The body momentarily stops rising, so vertical velocity is zero; horizontal velocity is unchanged.'),
    ],
  },
  'phy-26': {
    objectives: ["Apply Archimedes' principle and the law of floatation", 'Find relative density and upthrust'],
    points: ["Archimedes: upthrust = weight of fluid displaced.", 'Floatation: a floating body displaces its own weight of fluid.', 'Relative density $= \\frac{\\text{weight in air}}{\\text{loss of weight in water}}$.', 'Hydrometers float higher in denser liquids.'],
    practice: [
      q('physics', 'Hydrostatics (Archimedes & Floatation)', 'A body weighs 20 N in air and 15 N in water. Find its relative density.', ['4', '1.33', '5', '0.75'], 'A', 'Loss in weight $= 5$ N. RD $= \\frac{20}{5} = 4$.'),
      q('physics', 'Hydrostatics (Archimedes & Floatation)', 'The upthrust on a body in a fluid equals the', ['weight of the body', 'weight of fluid displaced', 'volume of the body', 'density of the fluid'], 'B', "That is Archimedes' principle."),
      q('physics', 'Hydrostatics (Archimedes & Floatation)', 'A ship rises slightly when it sails from river water into sea water because sea water', ['is warmer', 'is denser', 'has waves', 'is less dense'], 'B', 'Denser water gives the same upthrust with less volume displaced.'),
    ],
  },
  'phy-27': {
    objectives: ["Apply Hooke's law and Young's modulus", 'Explain elastic limit and energy stored in a spring'],
    points: ["Hooke's law: $F = ke$, up to the elastic limit.", "Young's modulus $E = \\frac{\\text{stress}}{\\text{strain}} = \\frac{F/A}{e/l}$.", 'Energy stored $= \\frac12Fe = \\frac12ke^2$.', 'Beyond the yield point the material deforms plastically.'],
    practice: [
      q('physics', "Elasticity (Hooke's Law & Young's Modulus)", 'A spring extends 4 cm under a 20 N load. Find its force constant.', ['5 N/m', '50 N/m', '500 N/m', '80 N/m'], 'C', '$k = \\frac{F}{e} = \\frac{20}{0.04} = 500$ N/m.'),
      q('physics', "Elasticity (Hooke's Law & Young's Modulus)", 'Find the energy stored in a spring stretched 0.1 m by a 30 N force.', ['1.5 J', '3 J', '0.3 J', '15 J'], 'A', '$E = \\frac12Fe = \\frac12\\times30\\times0.1 = 1.5$ J.'),
      q('physics', "Elasticity (Hooke's Law & Young's Modulus)", "The unit of Young's modulus is", ['N', 'N/m', 'N/m²', 'no unit'], 'C', 'Stress (N/m²) divided by strain (no unit) gives N/m².'),
    ],
  },
  'phy-28': {
    objectives: ['Calculate linear, area and volume expansivities', 'Explain anomalous expansion of water'],
    points: ['Linear expansivity $\\alpha = \\frac{l_2 - l_1}{l_1\\Delta\\theta}$.', 'Area expansivity $\\beta = 2\\alpha$; volume (cubic) $\\gamma = 3\\alpha$.', 'Water has maximum density at 4 °C, so lakes freeze from the top.', 'Applications: gaps in rails, bimetallic strips in thermostats.'],
    practice: [
      q('physics', 'Thermal Expansion', 'The linear expansivity of a metal is $1.2\\times10^{-5}\\,\\text{K}^{-1}$. Its cubic expansivity is', ['$1.2\\times10^{-5}$', '$2.4\\times10^{-5}$', '$3.6\\times10^{-5}$', '$4.8\\times10^{-5}$'], 'C', '$\\gamma = 3\\alpha = 3.6\\times10^{-5}\\,\\text{K}^{-1}$.'),
      q('physics', 'Thermal Expansion', 'Water has its maximum density at', ['0 °C', '4 °C', '100 °C', '−4 °C'], 'B', 'This is the anomalous expansion of water.'),
      q('physics', 'Thermal Expansion', 'A thermostat uses a bimetallic strip because the two metals have different', ['densities', 'expansivities', 'colours', 'specific heats'], 'B', 'Unequal expansion makes the strip bend and switch the circuit.'),
    ],
  },
  'phy-29': {
    objectives: ['Use specific heat capacity and latent heat in calorimetry'],
    points: ['$Q = mc\\Delta\\theta$.', 'Latent heat: $Q = mL$ (no temperature change during melting/boiling).', 'Heat lost by hot body = heat gained by cold body.', 'Specific latent heat of fusion of ice ≈ $3.36\\times10^5$ J/kg.'],
    practice: [
      q('physics', 'Quantity of Heat (Specific & Latent Heat)', 'How much heat raises 2 kg of water by 10 °C? ($c = 4200$ J/kg K)', ['8 400 J', '84 000 J', '42 000 J', '840 J'], 'B', '$Q = mc\\Delta\\theta = 2\\times4200\\times10 = 84\\,000$ J.'),
      q('physics', 'Quantity of Heat (Specific & Latent Heat)', 'During melting, the temperature of a pure solid', ['rises', 'falls', 'stays constant', 'fluctuates'], 'C', 'The heat supplied (latent heat) breaks bonds instead of raising temperature.'),
      q('physics', 'Quantity of Heat (Specific & Latent Heat)', 'Heat needed to melt 0.5 kg of ice at 0 °C ($L = 3.4\\times10^5$ J/kg) is', ['$1.7\\times10^5$ J', '$3.4\\times10^5$ J', '$6.8\\times10^5$ J', '$1.7\\times10^4$ J'], 'A', '$Q = mL = 0.5\\times3.4\\times10^5 = 1.7\\times10^5$ J.'),
    ],
  },
  'phy-30': {
    objectives: ['Describe magnetic materials and fields around conductors', 'Find force on a current-carrying conductor and on moving charges'],
    points: ['Force on a conductor: $F = BIl\\sin\\theta$.', 'Force on a moving charge: $F = qvB\\sin\\theta$.', "Fleming's left-hand rule gives the direction of force (motor).", 'Soft iron is used for electromagnets (easily magnetised and demagnetised); steel for permanent magnets.'],
    practice: [
      q('physics', 'Magnetic Fields', 'A 0.5 m wire carrying 4 A lies perpendicular to a 0.2 T field. Find the force.', ['0.4 N', '0.8 N', '1.6 N', '4 N'], 'A', '$F = BIl = 0.2\\times4\\times0.5 = 0.4$ N.'),
      q('physics', 'Magnetic Fields', 'Which material is best for the core of an electromagnet?', ['steel', 'soft iron', 'copper', 'aluminium'], 'B', 'Soft iron magnetises and demagnetises easily.'),
      q('physics', 'Magnetic Fields', 'The direction of the force on a current-carrying wire in a magnetic field is given by', ["Fleming's right-hand rule", "Fleming's left-hand rule", "Lenz's law", "Snell's law"], 'B', 'Left-hand rule is for motors (force); right-hand rule is for generators (induced current).'),
    ],
  },
  'phy-31': {
    objectives: ['Describe alpha, beta and gamma emissions', 'Use half-life and decay constant', 'Explain fission and fusion'],
    points: ['Alpha: helium nucleus, mass number −4, atomic number −2, least penetrating.', 'Beta: electron, atomic number +1. Gamma: EM wave, no change in mass or atomic number, most penetrating.', 'After $n$ half-lives, remaining $= N_0\\left(\\frac12\\right)^n$.', '$T_{1/2} = \\frac{0.693}{\\lambda}$.', 'Fission splits heavy nuclei; fusion joins light nuclei (powers the sun).'],
    practice: [
      q('physics', 'Radioactivity & Nuclear Energy', 'A sample has a half-life of 5 days. What fraction remains after 15 days?', ['$\\frac12$', '$\\frac14$', '$\\frac18$', '$\\frac1{16}$'], 'C', '15 days = 3 half-lives: $\\left(\\frac12\\right)^3 = \\frac18$.'),
      q('physics', 'Radioactivity & Nuclear Energy', 'When a nucleus emits an alpha particle, its mass number', ['increases by 4', 'decreases by 4', 'decreases by 2', 'is unchanged'], 'B', 'An alpha particle is ${}^4_2\\text{He}$: mass number falls by 4, atomic number by 2.'),
      q('physics', 'Radioactivity & Nuclear Energy', 'Which radiation is the most penetrating?', ['alpha', 'beta', 'gamma', 'cathode rays'], 'C', 'Gamma rays need thick lead or concrete to stop them.'),
      q('physics', 'Radioactivity & Nuclear Energy', 'The energy of the sun comes mainly from', ['fission', 'fusion', 'combustion', 'radioactive decay'], 'B', 'Hydrogen nuclei fuse to form helium.'),
    ],
  },
  'phy-32': {
    objectives: ["Explain the photoelectric effect and Einstein's equation", 'Use $E = mc^2$ and wave–particle duality'],
    points: ['Photon energy $E = hf = \\frac{hc}{\\lambda}$.', 'Einstein: $hf = W_0 + \\frac12mv_{max}^2$; threshold frequency $f_0 = \\frac{W_0}{h}$.', 'Brighter light gives MORE electrons, not faster ones; higher frequency gives faster electrons.', 'de Broglie wavelength $\\lambda = \\frac hp$.', 'Mass–energy: $E = mc^2$.'],
    practice: [
      q('physics', 'Photoelectric Effect & Dual Nature', 'Increasing the intensity of light (above threshold) on a metal surface increases the', ['energy of each electron', 'number of electrons emitted', 'work function', 'threshold frequency'], 'B', 'Intensity means more photons, so more electrons; their maximum energy depends only on frequency.'),
      q('physics', 'Photoelectric Effect & Dual Nature', 'The energy of a photon of frequency $5\\times10^{14}$ Hz is ($h = 6.6\\times10^{-34}$ Js)', ['$3.3\\times10^{-19}$ J', '$1.3\\times10^{-48}$ J', '$3.3\\times10^{-20}$ J', '$6.6\\times10^{-19}$ J'], 'A', '$E = hf = 6.6\\times10^{-34}\\times5\\times10^{14} = 3.3\\times10^{-19}$ J.'),
      q('physics', 'Photoelectric Effect & Dual Nature', 'Electron diffraction is evidence that electrons', ['have mass', 'behave as waves', 'are charged', 'travel at light speed'], 'B', 'Diffraction is a wave property — this supports wave–particle duality.'),
    ],
  },
  'phy-33': {
    objectives: ['Find r.m.s. and peak values', 'Calculate reactance and impedance in a.c. circuits'],
    points: ['$I_{rms} = \\frac{I_0}{\\sqrt2}$.', 'Inductive reactance $X_L = 2\\pi fL$; capacitive reactance $X_C = \\frac{1}{2\\pi fC}$.', 'Impedance $Z = \\sqrt{R^2 + (X_L - X_C)^2}$.', 'Resonance when $X_L = X_C$: $f_0 = \\frac{1}{2\\pi\\sqrt{LC}}$.'],
    practice: [
      q('physics', 'Alternating Current Circuits', 'The peak value of an a.c. voltage is 240√2 V. Its r.m.s. value is', ['240 V', '480 V', '120 V', '339 V'], 'A', '$V_{rms} = \\frac{V_0}{\\sqrt2} = 240$ V.'),
      q('physics', 'Alternating Current Circuits', 'A circuit has R = 3 Ω and net reactance 4 Ω. Its impedance is', ['7 Ω', '5 Ω', '1 Ω', '12 Ω'], 'B', '$Z = \\sqrt{3^2 + 4^2} = 5\\,\\Omega$.'),
      q('physics', 'Alternating Current Circuits', 'At resonance in an RLC series circuit', ['$X_L > X_C$', '$X_L = X_C$', 'current is minimum', '$Z$ is maximum'], 'B', 'Reactances cancel, impedance = R (minimum) and current is maximum.'),
    ],
  },

  // ================= CHEMISTRY =================
  'chem-1': {
    objectives: ["Explain Dalton's theory, subatomic particles, isotopes and electronic configuration (s, p, d, f)", 'Describe ionic, covalent, dative, metallic and hydrogen bonding'],
    points: ['Mass number = protons + neutrons; isotopes have the same protons but different neutrons.', 'Order of filling: 1s 2s 2p 3s 3p 4s 3d.', 'Ionic bond: transfer of electrons (metal + non-metal). Covalent: sharing. Dative: both shared electrons come from one atom (e.g. $\\text{NH}_4^+$).', 'Hydrogen bonding explains the high boiling point of water.'],
  },
  'chem-2': {
    objectives: ['Explain periodicity of atomic radius, ionisation energy, electron affinity and electronegativity'],
    points: ['Across a period: atomic radius decreases; ionisation energy and electronegativity increase.', 'Down a group: atomic radius increases; ionisation energy decreases.', 'Fluorine is the most electronegative element.', 'Group number = valence electrons; period = number of shells.'],
  },
  'chem-3': {
    objectives: ['Apply the kinetic theory and gas laws', 'Describe vapour pressure, boiling and crystalline vs amorphous solids'],
    points: ['$PV = nRT$; molar volume at s.t.p. = 22.4 dm³.', "Graham's law: rate $\\propto \\frac{1}{\\sqrt{M}}$.", 'A liquid boils when its vapour pressure equals the external pressure.', 'Crystalline solids have sharp melting points; amorphous solids soften over a range.'],
  },
  'chem-4': {
    objectives: ['Use relative masses, the mole, empirical and molecular formulas', 'Balance equations and do volumetric calculations'],
    points: ['Moles $= \\frac{\\text{mass}}{\\text{molar mass}} = \\frac{\\text{volume (dm}^3)}{22.4}$.', '1 mole $= 6.02\\times10^{23}$ particles (Avogadro).', 'Titration: $\\frac{C_AV_A}{C_BV_B} = \\frac{n_A}{n_B}$.', 'Empirical formula: divide percentages by atomic masses, then by the smallest.'],
  },
  'chem-5': {
    objectives: ['Use Arrhenius, Brønsted–Lowry and Lewis definitions', 'Calculate pH and pOH; explain buffers and salt hydrolysis'],
    points: ['pH $= -\\log[\\text{H}^+]$; pH + pOH = 14.', 'Brønsted acid donates a proton; Lewis acid accepts an electron pair.', 'Salt of strong acid + weak base is acidic (e.g. $\\text{NH}_4\\text{Cl}$); weak acid + strong base is basic (e.g. $\\text{CH}_3\\text{COONa}$).', 'Buffers resist changes in pH.'],
  },
  'chem-6': {
    objectives: ['Assign oxidation numbers', 'Identify oxidising and reducing agents'],
    points: ['OIL RIG: Oxidation Is Loss (of electrons), Reduction Is Gain.', 'Oxidising agent is itself reduced.', 'Oxidation number of O is usually −2, H is +1; sum in a neutral compound = 0.'],
  },
  'chem-7': {
    objectives: ["Describe electrochemical cells and electrolysis", "Apply Faraday's laws; explain corrosion"],
    points: ['Oxidation at the anode, reduction at the cathode.', "Faraday's first law: $m = \\frac{MIt}{nF}$, $F = 96\\,500$ C/mol.", 'Preferential discharge depends on electrochemical series, concentration and electrode type.', 'Rusting needs both water and oxygen; prevented by galvanising, painting, sacrificial protection.'],
  },
  'chem-8': {
    objectives: ['Use collision theory and activation energy', "Apply Le Chatelier's principle and $K_c$, $K_p$"],
    points: ['Rate increases with temperature, concentration, surface area and catalyst.', 'A catalyst lowers activation energy and does NOT shift equilibrium.', "Le Chatelier: the system shifts to oppose the change.", 'Increasing pressure favours the side with fewer gas moles.', '$K_c = \\frac{[\\text{products}]}{[\\text{reactants}]}$, each raised to its coefficient.'],
  },
  'chem-9': {
    objectives: ['Distinguish exothermic and endothermic reactions', 'Use heats of combustion, neutralisation and formation'],
    points: ['Exothermic: $\\Delta H$ negative; endothermic: $\\Delta H$ positive.', 'Heat of neutralisation for strong acid + strong base ≈ −57.3 kJ/mol.', "Hess's law: total enthalpy change is independent of route.", 'Spontaneity: $\\Delta G = \\Delta H - T\\Delta S$.'],
  },
  'chem-10': {
    objectives: ['Explain hardness of water, water treatment and solution concentration'],
    points: ['Temporary hardness (hydrogencarbonates) is removed by boiling; permanent hardness (sulphates/chlorides) by washing soda or ion exchange.', 'Concentration (mol/dm³) $= \\frac{\\text{moles}}{\\text{volume in dm}^3}$.', 'Water treatment: coagulation (alum), sedimentation, filtration, chlorination.'],
  },
  'chem-11': {
    objectives: ['Describe extraction, properties and uses of Na, Ca, Al, Fe and Cu'],
    points: ['Very reactive metals (Na, Ca, Al) are extracted by electrolysis.', 'Aluminium from bauxite using cryolite to lower the melting point.', 'Iron is extracted in the blast furnace with coke; limestone removes impurities as slag.', 'Copper is purified by electrolysis.'],
  },
  'chem-12': {
    objectives: ['Describe preparation and reactions of C, O, N, S, halogens and their compounds'],
    points: ['Allotropes of carbon: diamond, graphite (conducts), fullerenes.', 'Haber process: $\\text{N}_2 + 3\\text{H}_2 \\rightleftharpoons 2\\text{NH}_3$, iron catalyst.', 'Contact process: $\\text{SO}_2 \\to \\text{SO}_3$ with $\\text{V}_2\\text{O}_5$ catalyst, then $\\text{H}_2\\text{SO}_4$.', 'Chlorine bleaches moist litmus; air is about 78% nitrogen, 21% oxygen.'],
  },
  'chem-13': {
    objectives: ['Name hydrocarbons by IUPAC rules and draw isomers', 'Describe preparation and reactions of alkanes, alkenes and alkynes'],
    points: ['Alkanes $\\text{C}_n\\text{H}_{2n+2}$ (substitution); alkenes $\\text{C}_n\\text{H}_{2n}$ (addition); alkynes $\\text{C}_n\\text{H}_{2n-2}$.', 'Alkenes decolourise bromine water — test for unsaturation.', 'Isomers: same molecular formula, different structures.', 'Ethyne is prepared from calcium carbide and water.'],
  },
  'chem-14': {
    objectives: ['Classify and name alkanols; describe their reactions'],
    points: ['Primary alkanols oxidise to alkanals then alkanoic acids; secondary to alkanones; tertiary resist oxidation.', 'Ethanol is made by fermentation (yeast/zymase) or hydration of ethene.', 'Alcohol + sodium → hydrogen gas.'],
  },
  'chem-15': {
    objectives: ['Distinguish alkanals and alkanones'],
    points: ['Alkanals (aldehydes) have –CHO; alkanones (ketones) have C=O within the chain.', "Aldehydes reduce Fehling's and Tollens' reagents; ketones do not.", 'Both form from oxidation of alkanols.'],
  },
  'chem-16': {
    objectives: ['Describe alkanoic acids, esters (alkanoates) and amines'],
    points: ['Alkanoic acid + alkanol → ester + water (esterification, conc. $\\text{H}_2\\text{SO}_4$ catalyst).', 'Esters have fruity smells; alkaline hydrolysis of fats gives soap (saponification).', 'Amines (–NH₂) are organic bases derived from ammonia.'],
  },
  'chem-17': {
    objectives: ['Distinguish natural and synthetic polymers', 'Explain addition and condensation polymerisation'],
    points: ['Addition: monomers with C=C join without losing anything (polythene, PVC).', 'Condensation: a small molecule (e.g. water) is lost (nylon, terylene, proteins).', 'Natural polymers: rubber, starch, cellulose, proteins.', 'Thermoplastics soften on heating; thermosets do not.'],
  },
  'chem-18': {
    objectives: ['Describe major industrial processes and petrochemicals'],
    points: ['Haber (ammonia), Contact (sulphuric acid), Solvay (sodium carbonate).', 'Soap and detergents; detergents work in hard water.', 'Fertilisers: ammonium salts, urea, NPK.'],
  },
  'chem-19': {
    objectives: ['Explain air pollution, water pollution and waste management'],
    points: ['Greenhouse gases ($\\text{CO}_2$, $\\text{CH}_4$) cause global warming.', '$\\text{SO}_2$ and nitrogen oxides cause acid rain.', 'CO is poisonous because it combines with haemoglobin.', 'Biodegradable wastes decay naturally; plastics are mostly non-biodegradable.'],
  },
  'chem-20': {
    objectives: ['Choose the right separation technique for a mixture'],
    points: ['Filtration: insoluble solid from liquid.', 'Crystallisation/evaporation: dissolved solid from solution.', 'Sublimation: e.g. iodine, ammonium chloride, naphthalene from sand.', 'Simple distillation: solvent from solution. Fractional distillation: miscible liquids with close boiling points (e.g. crude oil, liquid air).', 'Chromatography: coloured components (e.g. ink dyes); separating funnel: immiscible liquids.'],
    practice: [
      q('chemistry', 'Separation of Mixtures', 'Which method best separates a mixture of sand and iodine?', ['filtration', 'sublimation', 'distillation', 'chromatography'], 'B', 'Iodine sublimes on heating; sand does not.'),
      q('chemistry', 'Separation of Mixtures', 'Ethanol and water are best separated by', ['filtration', 'separating funnel', 'fractional distillation', 'crystallisation'], 'C', 'They are miscible liquids with different boiling points.'),
      q('chemistry', 'Separation of Mixtures', 'The components of black ink can be separated by', ['chromatography', 'sublimation', 'decantation', 'magnetism'], 'A', 'Dyes travel at different rates on paper.'),
      q('chemistry', 'Separation of Mixtures', 'Oil and water are separated using a', ['separating funnel', 'fractionating column', 'sieve', 'condenser'], 'A', 'They are immiscible and form two layers.'),
    ],
  },
  'chem-21': {
    objectives: ['Read solubility curves', 'Distinguish saturated, unsaturated and supersaturated solutions'],
    points: ['Solubility (mol/dm³ or g/100 g water) at a given temperature.', 'Solubility of most solids increases with temperature; gases become LESS soluble as temperature rises.', 'Mass crystallising on cooling = solubility at high temp − solubility at low temp (for the same mass of water).', 'Supersaturated: holds more solute than normal at that temperature — unstable.'],
    practice: [
      q('chemistry', 'Solubility', 'The solubility of a salt is 40 g/100 g water at 60 °C and 25 g/100 g at 20 °C. Mass crystallising when a saturated solution in 100 g water is cooled from 60 °C to 20 °C is', ['15 g', '25 g', '40 g', '65 g'], 'A', '$40 - 25 = 15$ g.'),
      q('chemistry', 'Solubility', 'As temperature increases, the solubility of a gas in water', ['increases', 'decreases', 'stays the same', 'doubles'], 'B', 'Gas molecules gain energy and escape — e.g. warm soft drinks go flat faster.'),
      q('chemistry', 'Solubility', '0.2 mol of a solute dissolved in 500 cm³ of solution gives a concentration of', ['0.1 mol/dm³', '0.4 mol/dm³', '0.2 mol/dm³', '1.0 mol/dm³'], 'B', '$\\frac{0.2}{0.5} = 0.4$ mol/dm³.'),
    ],
  },
  'chem-22': {
    objectives: ['Describe the laboratory preparation, properties and uses of hydrogen'],
    points: ['Prepared from zinc and dilute HCl or $\\text{H}_2\\text{SO}_4$; collected over water or by downward displacement of air.', 'Burns with a "pop" sound; it is the lightest gas.', 'Uses: hydrogenation of oils (margarine), Haber process, rocket fuel.', 'It is a reducing agent: reduces hot copper(II) oxide to copper.'],
    practice: [
      q('chemistry', 'Hydrogen', 'The test for hydrogen gas is that it', ['relights a glowing splint', 'burns with a pop', 'turns lime water milky', 'bleaches litmus'], 'B', 'A lighted splint gives a squeaky pop.'),
      q('chemistry', 'Hydrogen', 'Hydrogen is used in the manufacture of margarine by', ['oxidation', 'hydrogenation of oils', 'fermentation', 'cracking'], 'B', 'Hydrogen adds across C=C bonds in oils with a nickel catalyst.'),
      q('chemistry', 'Hydrogen', 'Hydrogen is collected by downward displacement of air because it is', ['denser than air', 'lighter than air', 'very soluble', 'coloured'], 'B', 'It is the lightest gas, so it rises into an inverted jar.'),
    ],
  },
  'chem-23': {
    objectives: ['Describe fractional distillation of crude oil, cracking, reforming and octane rating'],
    points: ['Fractions (lowest to highest boiling): refinery gas, petrol, naphtha, kerosene, diesel, lubricating oil, bitumen.', 'Cracking breaks large molecules into smaller, more useful ones (more petrol and alkenes).', 'Reforming converts straight chains into branched/cyclic ones with higher octane number.', 'Octane rating measures resistance to knocking; 2,2,4-trimethylpentane = 100.'],
    practice: [
      q('chemistry', 'Petroleum', 'Crude oil is separated into fractions by', ['cracking', 'fractional distillation', 'polymerisation', 'filtration'], 'B', 'Fractions boil at different temperature ranges.'),
      q('chemistry', 'Petroleum', 'Cracking of large hydrocarbons produces', ['only alkanes', 'smaller alkanes and alkenes', 'only bitumen', 'esters'], 'B', 'Large molecules are broken into smaller alkanes plus alkenes.'),
      q('chemistry', 'Petroleum', 'A high octane number means the fuel', ['knocks easily', 'resists knocking', 'has more sulphur', 'is a gas'], 'B', 'Branched-chain alkanes give smoother burning in engines.'),
      q('chemistry', 'Petroleum', 'Which fraction is used for road surfacing?', ['kerosene', 'naphtha', 'bitumen', 'diesel'], 'C', 'Bitumen is the heaviest residue.'),
    ],
  },

  // ================= ENGLISH =================
  'eng-1': {
    objectives: ['Identify the 12 pure vowels (monophthongs) and 8 diphthongs'],
    points: ['Long vowels: /iː/ (seat), /ɑː/ (cart), /ɔː/ (caught), /uː/ (food), /ɜː/ (bird).', 'Short vowels: /ɪ/ (sit), /e/ (bed), /æ/ (cat), /ʌ/ (cup), /ɒ/ (pot), /ʊ/ (book), /ə/ (about).', 'Diphthongs: /eɪ/ day, /aɪ/ my, /ɔɪ/ boy, /əʊ/ go, /aʊ/ now, /ɪə/ here, /eə/ there, /ʊə/ poor.', 'Spelling is not a guide — listen for the sound: "women" has /ɪ/ in the first syllable.'],
  },
  'eng-2': {
    objectives: ['Identify consonant sounds; voiced vs voiceless'],
    points: ['Voiceless/voiced pairs: /p/–/b/, /t/–/d/, /k/–/g/, /f/–/v/, /θ/–/ð/, /s/–/z/, /ʃ/–/ʒ/, /tʃ/–/dʒ/.', '"th" in think is /θ/; in this is /ð/.', '"ch" can be /tʃ/ (church), /k/ (chemistry) or /ʃ/ (machine).', 'Silent letters: k in knee, b in debt, p in psychology.'],
  },
  'eng-3': {
    objectives: ['Place word stress in two- and multi-syllable words', 'Identify emphatic (sentence) stress'],
    points: ['Many two-syllable nouns stress the first syllable (PREsent), verbs the second (preSENT).', 'Words ending in -tion, -sion, -ic stress the syllable just before: inforMAtion, ecoNOMic.', 'Emphatic stress: the stressed word answers the hidden question (e.g. "JOHN broke the cup" — not someone else).'],
  },
  'eng-4': {
    objectives: ['Recognise falling and rising intonation'],
    points: ['Falling tune: statements, commands, WH-questions.', 'Rising tune: Yes/No questions, uncertainty, polite requests.', 'Question tags: falling when sure, rising when asking.'],
  },
  'eng-5': {
    objectives: ['Identify words that rhyme'],
    points: ['Rhyme depends on the final vowel and consonant SOUNDS, not spelling: "though" rhymes with "go", not "tough".', 'Practise with minimal pairs such as ship/sheep, full/fool.'],
  },
  'eng-6': {
    objectives: ['Identify main ideas and supporting points', 'Deduce meanings from context; draw inferences; recognise tone', 'Choose the best summary or title'],
    points: ['Read the questions first, then the passage.', 'Main idea is usually in the first or last sentence of a paragraph.', 'An inference is what the passage implies, not what it states word-for-word.', 'When replacing a word, test the option in the sentence — it must keep the same meaning AND grammar.'],
  },
  'eng-7': {
    objectives: ['Choose words nearest or opposite in meaning'],
    points: ['Read the whole sentence: context decides meaning.', 'Match the part of speech — an adjective is replaced by an adjective.', 'Eliminate options with the wrong tone (positive vs negative).'],
  },
  'eng-8': {
    objectives: ['Apply subject–verb agreement, proximity concord and collective nouns'],
    points: ['"Either…or / neither…nor": the verb agrees with the nearer subject.', '"Each", "every", "everyone", "none of" (formal) take singular verbs.', '"The number of" is singular; "a number of" is plural.', 'Collective nouns: singular when acting as one unit, plural when members act individually.', '"Along with / as well as" does not change the subject.'],
  },
  'eng-9': {
    objectives: ['Use tenses, aspects and conditional clauses correctly', 'Identify simple, compound, complex and compound-complex sentences'],
    points: ['Conditionals: "If I were…" (unreal present); "If he had come, he would have…" (unreal past).', 'Sequence of tenses: a past main verb usually needs a past verb in the reported clause.', 'Complex sentence: one main clause + at least one subordinate clause.'],
  },
  'eng-10': {
    objectives: ['Recognise specialised vocabulary in fields such as medicine, law, commerce, sports, mining and IT'],
    points: ['Law: plaintiff, defendant, verdict, adjourn. Medicine: diagnosis, prognosis, prescription.', 'Commerce: invoice, dividend, debenture. Sports: referee, umpire (cricket/tennis), dribble.', 'IT: software, download, cursor, bandwidth.'],
  },
  'eng-11': {
    objectives: ['Interpret idioms and phrasal verbs'],
    points: ['Do not translate literally: "to bury the hatchet" = to make peace.', '"Call off" = cancel; "put up with" = tolerate; "look into" = investigate.', 'Choose the meaning that fits the whole sentence.'],
  },
  'eng-12': {
    objectives: ['Identify metaphor, simile, irony, personification, hyperbole, oxymoron, euphemism and others'],
    points: ['Simile uses "like/as"; metaphor does not.', 'Oxymoron: contradictory words together ("bitter sweet"). Euphemism: softer expression ("passed away").', 'Hyperbole: deliberate exaggeration. Litotes: understatement by negation ("not bad").'],
  },
  'eng-13': {
    objectives: ['Identify nouns, pronouns, verbs, adverbs, adjectives, prepositions, conjunctions and interjections'],
    points: ['A word\'s class depends on its use in the sentence: "run" can be a noun or a verb.', 'Pronoun case: "between you and me" (object), "It is I" (formal).', 'Order of adjectives: opinion, size, age, shape, colour, origin, material, purpose.'],
  },
  'eng-14': {
    objectives: ['Change sentences between active and passive voice'],
    points: ['Passive: object becomes subject + form of "be" + past participle.', 'Keep the tense: "They are building a house" → "A house is being built."'],
  },
  'eng-15': {
    objectives: ['Convert direct speech to reported speech'],
    points: ['Tense moves back: "am" → "was", "will" → "would", "have done" → "had done".', 'Time words change: "today" → "that day", "tomorrow" → "the next day".', 'Questions become statements: "Where are you?" → He asked where I was.'],
  },
  'eng-16': {
    objectives: ['Know the plot, characters and themes (previous JAMB text)'],
    points: ['The Life Changer was the JAMB text for earlier years; it is kept here for revision only.', 'For UTME 2027, focus on the current prescribed text (see The Lekki Headmaster) and confirm in the official 2027 brochure.'],
  },
  'eng-17': {
    objectives: ['Know the plot, characters and themes (previous JAMB text)'],
    points: ['In Dependence was an earlier JAMB text; kept for revision only.', 'For UTME 2027, prioritise the current prescribed novel.'],
  },
  'eng-18': {
    objectives: ['Answer questions on characters, plot, setting and sub-plots of the prescribed novel'],
    points: ['Author: Kabir Alabi Garba. Setting: Lagos (Lekki) and Badagry.', 'Central figure: Mr Adewale Bepo, the retiring headmaster of Lekki High School, admired for discipline and good leadership.', 'Themes: dedication of teachers, good leadership, discipline, education as nation-building, gratitude.', 'Expect about 10 questions from the novel in Use of English — read it chapter by chapter.', 'JAMB may announce a different text for 2027 — confirm in the official 2027 brochure.'],
  },
  'eng-19': {
    objectives: ['Identify sentence types', 'Recognise clauses and phrases'],
    points: ['Simple: one main clause. Compound: two main clauses joined by and/but/or.', 'Complex: main clause + subordinate clause (because, although, when, who, which).', 'Compound-complex: at least two main clauses + one subordinate clause.', 'A phrase has no finite verb; a clause has one.'],
    practice: [
      q('english', 'Sentence Structures', '"Although it rained, we played the match." This is a', ['simple sentence', 'compound sentence', 'complex sentence', 'compound-complex sentence'], 'C', 'One main clause ("we played the match") and one subordinate clause ("Although it rained").'),
      q('english', 'Sentence Structures', '"She sang and he danced." This is a', ['simple sentence', 'compound sentence', 'complex sentence', 'phrase'], 'B', 'Two main clauses joined by "and".'),
      q('english', 'Sentence Structures', 'In "The boy who won the prize is my brother", "who won the prize" is', ['an adverbial clause', 'a noun clause', 'an adjectival clause', 'a phrase'], 'C', 'It describes "the boy", so it is an adjectival (relative) clause.'),
      q('english', 'Sentence Structures', '"On the table" is a', ['clause', 'phrase', 'sentence', 'main clause'], 'B', 'It has no finite verb.'),
    ],
  },
};

export function getTopicNote(topicId: string): TopicNote | undefined {
  return TOPIC_NOTES[topicId];
}
