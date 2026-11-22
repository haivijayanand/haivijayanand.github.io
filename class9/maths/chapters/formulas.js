/*
TOOL:    class9_maths_formulas
FAMILY:  CBSE_REVISION / Class 9 Maths (Ganita Manjari)
VERSION: 1.1.0
DATE:    2026-11-22
CHAT:    CBSE Revision - Class 9 Maths full build
CHANGES: 1.1.0 - first release: one-page formula sheet data for all 14 chapters (formula groups, worked examples, remember points)
*/
(function () {
  const F = G9.F;
  // groups: [heading, [[label, formula], ...]]; ex: [[question, worked answer]]; rem: short reminders
  G9.FS = {
    1: { groups: [
        ['The plane', [['Quadrant signs', 'I (+,+) · II (−,+) · III (−,−) · IV (+,−)'], ['On x-axis', '(a, 0)'], ['On y-axis', '(0, b)'], ['Distance from x-axis', '|y|'], ['Distance from y-axis', '|x|']]],
        ['Distance', [['Between A, B', 'AB = √[(x₂ − x₁)² + (y₂ − y₁)²]'], ['From origin', 'OP = √(x² + y²)'], ['Same y', 'AB = |x₂ − x₁|'], ['Same x', 'AB = |y₂ − y₁|']]],
        ['Midpoint', [['Midpoint M', `(${F('x₁ + x₂', 2)}, ${F('y₁ + y₂', 2)})`], ['Other end B', '(2Mₓ − x₁, 2Mᵧ − y₁)']]],
        ['Proving with coordinates', [['Right triangle', 'longest² = sum of other two squares'], ['Isosceles', 'two equal sides'], ['Collinear A, B, C', 'AB + BC = AC'], ['Parallelogram', 'diagonals have the same midpoint'], ['Point on x-axis equidistant from A, B', 'P(x, 0): PA² = PB²']]]],
      ex: [['Distance between (−1, 2) and (5, 10)', '√(6² + 8²) = √100 = 10'], ['Midpoint of (−4, 6) and (2, 0)', '((−4 + 2)/2, (6 + 0)/2) = (−1, 3)']],
      rem: ['Write (x, y): along first, then up.', 'Points on axes are in no quadrant.', 'Square the differences — signs do not matter.'] },
    2: { groups: [
        ['Linear polynomial', [['Form', 'p(x) = ax + b, a ≠ 0'], ['Degree', '1'], ['Value at k', 'p(k) = ak + b'], ['Zero', `x = −${F('b', 'a')} (exactly one)`]]],
        ['Patterns → rules', [['Constant difference', '= a (rate)'], ['Value at step 0', '= b'], ['Rule', 'term = a·n + b'], ['Find a, b from two values', `a = ${F('p(x₂) − p(x₁)', 'x₂ − x₁')}, b = p(x₁) − a·x₁`]]],
        ['Graph y = ax + b', [['Shape', 'straight line'], ['Slope', 'a (y changes by a when x increases by 1)'], ['y-intercept', '(0, b)'], ['x-intercept', `(−${F('b', 'a')}, 0)`], ['a > 0 / a < 0', 'rises / falls']]],
        ['Comparing two rules', [['Equal when', 'a₁x + b₁ = a₂x + b₂'], ['Break-even', `x = ${F('b₂ − b₁', 'a₁ − a₂')}`], ['Same a', 'parallel lines, never equal']]]],
      ex: [['Rule for 7, 11, 15, 19 (n = 1, 2, 3, 4)', 'a = 4, b = 7 − 4 = 3 ⇒ 4n + 3'], ['Zero of 3x + 12', '3x = −12 ⇒ x = −4']],
      rem: ['A constant (like 5) has degree 0 — not linear.', 'b is the value at step 0, not the first term.', 'Zero = where the line cuts the x-axis.'] },
    3: { groups: [
        ['Number families', [['Chain', 'N ⊂ W ⊂ Z ⊂ Q ⊂ R'], ['Rational', 'p/q, p, q integers, q ≠ 0'], ['Irrational', 'not p/q: √2, √3, π'], ['Real', 'rationals + irrationals']]],
        ['Decimals', [['Terminates iff', 'q (lowest terms) = 2ᵐ·5ⁿ'], ['0.ā', 'a/9'], ['0.ab repeating', 'ab/99'], ['0.aḃ', '(ab − a)/90'], ['Non-terminating, non-recurring', 'irrational']]],
        ['Density', [['Between a and b', `${F('a + b', 2)}`], ['Between any two numbers', 'infinitely many rationals and irrationals'], ['√n on number line', 'spiral: legs √(n − 1) and 1']]],
        ['Surds and exponents', [['Product', '√a·√b = √(ab)'], ['Quotient', '√a/√b = √(a/b)'], ['Simplify', '√72 = 6√2'], ['Rationalise', `${F(1, 'a + √b')} = ${F('a − √b', 'a² − b')}`], ['Laws', 'aᵐaⁿ = aᵐ⁺ⁿ, (aᵐ)ⁿ = aᵐⁿ, a⁰ = 1'], ['Fractional', 'a^(m/n) = (ⁿ√a)ᵐ']]]],
      ex: [['0.363636… as p/q', '100x − x = 36 ⇒ x = 36/99 = 4/11'], ['Rationalise 1/(√3 + 1)', '(√3 − 1)/(3 − 1) = (√3 − 1)/2']],
      rem: ['√(a + b) ≠ √a + √b.', 'Reduce the fraction before the 2-and-5 test.', 'π ≠ 22/7; 22/7 is an approximation.'] },
    4: { groups: [
        ['Squares', [['(a + b)²', 'a² + 2ab + b²'], ['(a − b)²', 'a² − 2ab + b²'], ['(a + b)(a − b)', 'a² − b²'], ['(x + a)(x + b)', 'x² + (a + b)x + ab'], ['(a + b + c)²', 'a² + b² + c² + 2ab + 2bc + 2ca']]],
        ['Cubes', [['(a + b)³', 'a³ + b³ + 3ab(a + b)'], ['(a − b)³', 'a³ − b³ − 3ab(a − b)'], ['a³ + b³', '(a + b)(a² − ab + b²)'], ['a³ − b³', '(a − b)(a² + ab + b²)'], ['a³ + b³ + c³ − 3abc', '(a + b + c)(a² + b² + c² − ab − bc − ca)'], ['If a + b + c = 0', 'a³ + b³ + c³ = 3abc']]],
        ['Useful rearrangements', [['a² + b²', '(a + b)² − 2ab'], ['(a − b)²', '(a + b)² − 4ab'], ['x² + 1/x²', '(x + 1/x)² − 2'], ['x³ + 1/x³', '(x + 1/x)³ − 3(x + 1/x)']]],
        ['Factorising checklist', [['1', 'common factor'], ['2', 'difference of squares'], ['3', 'perfect square'], ['4', 'x² + px + q: two numbers, sum p, product q'], ['5', 'ax² + bx + c: split b using product ac']]]],
      ex: [['103²', '(100 + 3)² = 10000 + 600 + 9 = 10609'], ['Factorise 2x² + 7x + 3', 'ac = 6, sum 7 ⇒ 6 and 1 ⇒ (2x + 1)(x + 3)']],
      rem: ['Never drop the 2ab.', '(3x)² = 9x², not 3x².', 'a² + b² does not factorise like a² − b².'] },
    5: { groups: [
        ['Parts', [['Diameter', '2r, the longest chord'], ['Circumference', '2πr'], ['Arc / segment / sector', 'part of circle / chord + arc / two radii + arc']]],
        ['Chords', [['Perpendicular from O', 'bisects the chord'], ['Chord–centre distance', 'r² = d² + (c/2)²'], ['Equal chords', '⇔ equidistant from O ⇔ equal angles at O'], ['Longer chord', 'nearer the centre'], ['Three non-collinear points', 'exactly one circle (perpendicular bisectors meet)'], ['Two parallel chords', 'distance = d₁ ± d₂ (opposite / same side)']]],
        ['Angles', [['Centre vs circle', '∠AOB = 2∠APB'], ['Same segment', 'equal angles'], ['Semicircle', '90°'], ['Isosceles △OAB', '∠OAB = ∠OBA = (180° − ∠AOB)/2']]],
        ['Cyclic quadrilateral', [['Opposite angles', '∠A + ∠C = ∠B + ∠D = 180°'], ['Exterior angle', '= interior opposite angle'], ['Converse', 'opposite angles sum 180° ⇒ cyclic']]]],
      ex: [['r = 13, chord 24: distance from O', '√(13² − 12²) = 5'], ['∠AOB = 110°, angle on major arc', '110° ÷ 2 = 55°']],
      rem: ['The centre angle is the larger one (double).', '180° rule is for opposite angles only.', 'Mark radii — look for isosceles triangles.'] },
    6: { groups: [
        ['Polygons', [['Rectangle', 'A = lb, P = 2(l + b), diagonal √(l² + b²)'], ['Square', 'A = a², P = 4a, diagonal a√2'], ['Parallelogram', 'A = base × height'], ['Trapezium', 'A = ½(a + b)h'], ['Rhombus / kite', 'A = ½d₁d₂']]],
        ['Triangles', [['Base and height', 'A = ½bh'], ['Semi-perimeter', 's = (a + b + c)/2'], ["Heron's formula", 'A = √[s(s − a)(s − b)(s − c)]'], ['Equilateral', 'A = (√3/4)a², h = (√3/2)a'], ['Right triangle', 'A = ½ × leg × leg']]],
        ['Circles', [['Circumference', 'C = 2πr = πd'], ['Area', 'A = πr²'], ['Arc length', '(θ/360°) × 2πr'], ['Sector area', '(θ/360°) × πr²'], ['Ring', 'π(R² − r²)'], ['Semicircle perimeter', 'πr + 2r']]],
        ['Units', [['1 m²', '10 000 cm²'], ['1 hectare', '10 000 m²'], ['1 km²', '100 hectares']]]],
      ex: [['Triangle 13, 14, 15', 's = 21; √(21·8·7·6) = 84'], ['Circle C = 88 cm (π = 22/7)', 'r = 14 ⇒ A = 616 cm²']],
      rem: ['Use the perpendicular height.', 'Convert units before multiplying.', 'Perimeter counts the outer boundary only.'] },
    7: { groups: [
        ['Basics', [['Experiment / outcome', 'action with unpredictable result / one result'], ['Sample space', 'all outcomes'], ['Event', 'set of outcomes']]],
        ['Probability', [['Experimental', `P(E) ≈ ${F('times E happened', 'trials')}`], ['Theoretical', `P(E) = ${F('favourable', 'total')} (equally likely)`], ['Range', '0 ≤ P(E) ≤ 1'], ['Complement', 'P(not E) = 1 − P(E)'], ['Sum over all outcomes', '1']]],
        ['Common sample spaces', [['Coin', '2'], ['Die', '6'], ['Two coins / three coins', '4 / 8 (= 2ⁿ)'], ['Two dice', '36'], ['Deck of cards', '52: 4 suits × 13, 12 face cards, 26 red']]],
        ['Two dice: ways to get each sum', [['Sum 2, 3, 4, 5, 6, 7', '1, 2, 3, 4, 5, 6 ways'], ['Sum 8, 9, 10, 11, 12', '5, 4, 3, 2, 1 ways'], ['Doubles', '6 ways']]],
        ['Trees', [['Along a path', 'multiply'], ['Across paths', 'add'], ['Without replacement', 'second fraction: one fewer on top and bottom']]]],
      ex: [['P(sum 8) with two dice', '(2,6),(3,5),(4,4),(5,3),(6,2) ⇒ 5/36'], ['Bag 4 red, 6 blue; two red without replacement', '4/10 × 3/9 = 2/15']],
      rem: ['Sums of two dice are NOT equally likely.', 'A coin has no memory.', 'Answer must lie between 0 and 1.'] },
    8: { groups: [
        ['Arithmetic progression', [['Terms', 'a, a + d, a + 2d, …'], ['Common difference', 'd = aₙ₊₁ − aₙ'], ['nth term', 'aₙ = a + (n − 1)d'], ['Which term is v', 'n = (v − a)/d + 1'], ['From two terms', 'd = (aq − ap)/(q − p)']]],
        ['Sum of an AP', [['Sum', 'Sₙ = (n/2)[2a + (n − 1)d]'], ['Using last term l', 'Sₙ = (n/2)(a + l)'], ['1 + 2 + … + n', 'n(n + 1)/2'], ['First n odd numbers', 'n²']]],
        ['Geometric progression', [['Terms', 'a, ar, ar², …'], ['Common ratio', 'r = aₙ₊₁ ÷ aₙ'], ['nth term', 'aₙ = a·rⁿ⁻¹'], ['Doubling n times', 'start × 2ⁿ']]],
        ['Rules', [['Recursive', 'a₁ given, aₙ₊₁ from aₙ'], ['Explicit', 'aₙ as a formula in n'], ['AP recursive → explicit', 'aₙ₊₁ = aₙ + d ⇒ aₙ = a + (n − 1)d'], ['Virahāṅka–Fibonacci', 'aₙ₊₁ = aₙ + aₙ₋₁: 1, 2, 3, 5, 8, 13, …']]]],
      ex: [['20th term of 3, 7, 11, …', '3 + 19 × 4 = 79'], ['Sum of first 10 terms of 2, 5, 8, …', '5 × (4 + 27) = 155']],
      rem: ['(n − 1)d, not nd.', 'Check differences first, then ratios.', 'AP points (n, aₙ) lie on a line.'] },
    9: { groups: [
        ['Logic', [['Proposition', 'statement that is true or false'], ['If P then Q', 'P: hypothesis, Q: conclusion'], ['Converse', 'If Q then P'], ['P ⇔ Q', 'both directions true'], ['Disprove', 'one counterexample'], ['Prove', 'chain of justified steps']]],
        ['Lines and angles', [['Linear pair', 'sum 180°'], ['Vertically opposite', 'equal'], ['Angles at a point', 'sum 360°'], ['Corresponding / alternate (∥ lines)', 'equal'], ['Co-interior (∥ lines)', 'sum 180°'], ['Tests for ∥', 'converses of the above']]],
        ['Triangles', [['Angle sum', '180°'], ['Exterior angle', 'sum of interior opposite angles'], ['Congruence', 'SSS, SAS, ASA/AAS, RHS'], ['Isosceles', 'equal sides ⇔ equal opposite angles'], ['Baudhāyana–Pythagoras', 'right angle at C ⇔ a² + b² = c²'], ['Obtuse / acute at C', 'a² + b² < c² / a² + b² > c²']]]],
      ex: [['Converse of "If x = 3 then x² = 9"', '"If x² = 9 then x = 3" — false: x = −3'], ['Sides 20, 21, 29', '400 + 441 = 841 = 29² ⇒ right-angled']],
      rem: ['A true statement can have a false converse.', 'Examples never prove "for all".', 'Co-interior angles are supplementary, not equal.'] },
    10: { groups: [
        ['Centre of data', [['Mean', 'sum ÷ count'], ['Sum', 'mean × count'], ['Median', 'middle value of sorted data (average of two middles if n even)'], ['Mode', 'most frequent value']]],
        ['Combining', [['Combined mean', `${F('n₁m₁ + n₂m₂', 'n₁ + n₂')}`], ['Weighted mean', `${F('Σ wx', 'Σ w')}`], ['Percentage weights', '0.4 × 70 + 0.6 × 85 = 79'], ['Add a value x', 'new mean = (n·m + x)/(n + 1)'], ['Remove a value x', 'new mean = (n·m − x)/(n − 1)']]],
        ['Mixtures', [['Concentration', 'substance ÷ total'], ['Mix', `${F('V₁c₁ + V₂c₂', 'V₁ + V₂')}`], ['Add water w', 'c_new = substance ÷ (V + w)'], ['Reverse (alligation)', 'q₁(m − p₁) = q₂(p₂ − m)']]],
        ['Charts', [['Stacked bar', 'height = total; parts stacked'], ['100% stacked bar', 'each bar = 100%; shows shares'], ['Share', 'part ÷ that group\'s total × 100']]]],
      ex: [['20 students avg 60, 30 avg 70', '(1200 + 2100)/50 = 66'], ['500 mL of 10% + 200 mL of 20%', '(50 + 40)/700 ≈ 12.9%']],
      rem: ['Do not average the averages.', 'Water is 0% but adds volume.', 'Bigger number ≠ bigger share.'] },
    11: { groups: [
        ['Algorithm', [['Must have', 'input, output, precise steps, stops, correct'], ['Trace', 'write the values after each step'], ['Efficiency', 'how the steps grow with input size']]],
        ['Number algorithms', [['Column addition', 'right to left, carry 1 when column ≥ 10'], ['Divisors of n', 'test k ≤ √n, record k and n/k'], ['Euclid', 'gcd(a, b) = gcd(b, a mod b); stop at remainder 0'], ['GCD', 'last non-zero remainder'], ['LCM', 'a × b ÷ gcd(a, b)']]],
        ['Searching and sorting', [['Linear search', 'up to n comparisons'], ['Binary search (sorted list)', '≤ ⌈log₂(n + 1)⌉: 100 → 7, 1000 → 10'], ['Bubble sort', 'n(n − 1)/2 comparisons; largest moves to the end each pass']]],
        ['Growth', [['Slowest → fastest', 'log₂n < √n < n < n²'], ['Doubling n', 'n² work becomes 4×']]]],
      ex: [['gcd(252, 105)', '252 = 2·105 + 42; 105 = 2·42 + 21; 42 = 2·21 ⇒ 21'], ['Divisors of 36', 'test 1–6: 1·36, 2·18, 3·12, 4·9, 6·6']],
      rem: ['GCD is the last non-zero remainder.', 'Binary search needs a sorted list.', '"To taste" is not precise — not an algorithm.'] },
    12: { groups: [
        ['Quadrilaterals', [['Angle sum', '360°'], ['Trapezium', 'at least one pair of parallel sides'], ['Parallelogram', 'both pairs parallel'], ['Rectangle / rhombus / square', '∥gm + right angle / equal sides / both'], ['Kite', 'two pairs of adjacent equal sides']]],
        ['Parallelogram', [['Opposite sides', 'equal'], ['Opposite angles', 'equal; adjacent sum 180°'], ['Diagonals', 'bisect each other'], ['Tests', 'both pairs opp. sides equal / opp. angles equal / diagonals bisect / one pair equal & ∥'], ['Rectangle', 'diagonals equal'], ['Rhombus', 'diagonals ⊥, side² = (d₁/2)² + (d₂/2)²']]],
        ['Midpoints', [['Midpoint theorem', 'MN ∥ BC, MN = ½BC'], ['Converse', 'line through midpoint ∥ side bisects third side'], ['Midpoint triangle', 'perimeter = ½ original'], ['Centroid', 'medians meet; AG : GD = 2 : 1'], ['Varignon', 'midpoints → ∥gm; perimeter = d₁ + d₂; area = ½']]],
        ['Tiling', [['Any quadrilateral', 'tiles the plane (rotate 180° about side midpoints)']]]],
      ex: [['∥gm: ∠A = 3∠B', '3x + x = 180 ⇒ ∠B = 45°, ∠A = 135°'], ['Median AD = 18 cm', 'AG = 12 cm, GD = 6 cm']],
      rem: ['Every square is a rhombus; not the reverse.', 'Equal diagonals alone ≠ rectangle.', 'Centroid ratio 2 : 1 from the vertex.'] },
    13: { groups: [
        ['Equation', [['Standard form', 'ax + by = c (a, b not both 0)'], ['Solution', 'ordered pair (x, y) that satisfies it'], ['Number of solutions', 'infinitely many'], ['Graph', 'a straight line']]],
        ['Intercepts and slope', [['x-intercept', '(c/a, 0)'], ['y-intercept', '(0, c/b)'], ['Slope', `m = ${F('y₂ − y₁', 'x₂ − x₁')} = rise/run`], ['Slope–intercept', 'y = mx + c'], ['From ax + by = c', 'm = −a/b'], ['Through two points', 'find m, then c = y₁ − m x₁']]],
        ['Special lines', [['x = k', 'vertical, slope undefined'], ['y = k', 'horizontal, slope 0'], ['y = mx', 'through the origin']]],
        ['Two lines', [['Different slopes', 'meet at one point'], ['Same slope, different intercept', 'parallel — no common solution'], ['One a multiple of the other', 'same line'], ['Solve', 'substitute y from one into the other']]]],
      ex: [['Intercepts of 2x + 5y = 10', '(5, 0) and (0, 2)'], ['x + y = 4, x − y = 2', 'add: 2x = 6 ⇒ (3, 1)']],
      rem: ['m = rise over run, not run over rise.', 'x = 3 is a line, not a point.', 'Check the answer in both equations.'] },
    14: { groups: [
        ['Cuboid and cube', [['Cuboid TSA', '2(lb + bh + hl)'], ['Four walls', '2h(l + b)'], ['Cuboid volume', 'lbh'], ['Cuboid diagonal', '√(l² + b² + h²)'], ['Cube', 'TSA 6a², V a³, diagonal a√3']]],
        ['Cylinder', [['Curved surface', '2πrh'], ['Total surface', '2πr(r + h)'], ['Volume', 'πr²h'], ['Hollow', 'π(R² − r²)h']]],
        ['Cone', [['Slant height', 'l = √(r² + h²)'], ['Curved surface', 'πrl'], ['Total surface', 'πr(l + r)'], ['Volume', '⅓πr²h']]],
        ['Sphere and hemisphere', [['Sphere', 'SA 4πr², V (4/3)πr³'], ['Hemisphere', 'CSA 2πr², TSA 3πr², V (2/3)πr³'], ['Archimedes', 'cone : sphere : cylinder = 1 : 2 : 3']]],
        ['Units and scale', [['Capacity', '1 m³ = 1000 L, 1 L = 1000 cm³'], ['Painted n³ cube', '8 · 12(n − 2) · 6(n − 2)² · (n − 2)³'], ['Lengths × k', 'area × k², volume × k³'], ['Melt and recast', 'volume stays the same']]]],
      ex: [['Cone r = 5, h = 12', 'l = 13; CSA = 65π cm², V = 100π cm³'], ['Cube of volume 343 cm³', 'a = 7; TSA = 294 cm²']],
      rem: ['Slant height l ≠ height h.', 'Use the radius, not the diameter.', 'Joined faces are hidden — do not add them.'] }
  };
})();
