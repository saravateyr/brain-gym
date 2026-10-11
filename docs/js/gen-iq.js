'use strict';
// Intelligence Test (बुद्धिमत्ता चाचणी) puzzle generators. Each gen(level) returns one question; level is 1, 2 or 3.

const BOYS = ['Amit', 'Rohan', 'Arjun', 'Sahil', 'Om', 'Yash', 'Varun', 'Kunal', 'Aditya', 'Pranav'];
const GIRLS = ['Riya', 'Sneha', 'Pooja', 'Neha', 'Tanvi', 'Isha', 'Kavya', 'Meera', 'Anushka', 'Gauri'];
const ALL_NAMES = BOYS.concat(GIRLS);

function seriesBox(items) {
  return `<div class="series">${items.map(x => x === '?' ? '<span class="qm">?</span>' : `<span>${x}</span>`).join('')}</div>`;
}

// ---------------------------------------------------------------- Number Series
registerGen({
  id: 'numseries', section: 'iq', icon: '🔢', title: 'Number Series',
  desc: 'Find the missing number by spotting the rule.',
  gen(level) {
    const L1 = [
      () => { const a = U.ri(1, 20), d = U.ri(2, 9); return { t: U.range(6).map(i => a + i * d), rule: `Add ${d} each time (+${d}).` }; },
      () => { const d = U.ri(2, 8), a = U.ri(5 * d + 5, 5 * d + 60); return { t: U.range(6).map(i => a - i * d), rule: `Subtract ${d} each time (−${d}).` }; },
      () => { const a = U.ri(1, 5); return { t: U.range(6).map(i => a * 2 ** i), rule: 'Multiply by 2 each time (×2).' }; },
      () => { const d = U.pick([5, 10, 11, 25]), a = d * U.ri(1, 6); return { t: U.range(6).map(i => a + i * d), rule: `Add ${d} each time (+${d}).` }; },
    ];
    const L2 = [
      () => { const a = U.ri(1, 4), m = U.pick([2, 3]); return { t: U.range(6).map(i => a * m ** i), rule: `Multiply by ${m} each time (×${m}).` }; },
      () => { const s = U.ri(1, 5); return { t: U.range(6).map(i => (s + i) ** 2), rule: `These are square numbers: ${s}×${s}, ${s + 1}×${s + 1}, ${s + 2}×${s + 2} …` }; },
      () => {
        const a = U.ri(1, 10), d0 = U.ri(1, 4), k = U.ri(1, 3), t = [a];
        for (let i = 1; i < 6; i++) t.push(t[i - 1] + d0 + (i - 1) * k);
        return { t, rule: `The difference grows by ${k} each time: +${d0}, +${d0 + k}, +${d0 + 2 * k} …` };
      },
      () => {
        const x = U.ri(4, 9), y = U.ri(1, x - 1), t = [U.ri(5, 20)];
        for (let i = 1; i < 6; i++) t.push(i % 2 ? t[i - 1] + x : t[i - 1] - y);
        return { t, rule: `Add ${x}, then subtract ${y}, again and again (+${x}, −${y}).` };
      },
      () => { const t = [U.ri(1, 5)]; for (let i = 1; i < 6; i++) t.push(t[i - 1] * 2 + 1); return { t, rule: 'Multiply by 2, then add 1 (×2 +1).' }; },
    ];
    const L3 = [
      () => {
        const a = U.ri(1, 10), d1 = U.ri(2, 6), b = U.ri(20, 40), d2 = U.ri(2, 5);
        const t = []; for (let i = 0; i < 3; i++) { t.push(a + i * d1); t.push(b - i * d2); }
        return { t, rule: `Two series are mixed. 1st, 3rd, 5th numbers: +${d1} each time. 2nd, 4th, 6th numbers: −${d2} each time.` };
      },
      () => { const s = U.ri(1, 3); return { t: U.range(6).map(i => (s + i) ** 3), rule: `These are cube numbers: ${s}×${s}×${s}, ${s + 1}×${s + 1}×${s + 1} …` }; },
      () => {
        const t = [U.ri(1, 5), U.ri(1, 6)]; for (let i = 2; i < 6; i++) t.push(t[i - 1] + t[i - 2]);
        return { t, rule: 'Each number is the sum of the two numbers before it.' };
      },
      () => {
        const t = [U.ri(1, 6)]; for (let i = 1; i < 6; i++) t.push(i % 2 ? t[i - 1] * 2 : t[i - 1] + 3);
        return { t, rule: 'Multiply by 2, then add 3, again and again (×2, +3).' };
      },
      () => { const s = U.ri(1, 4); return { t: U.range(6).map(i => (s + i) ** 2 + 1), rule: 'Square of the number plus 1: n×n + 1.' }; },
      () => { const s = U.ri(1, 5); return { t: U.range(6).map(i => (s + i) * (s + i + 1)), rule: `Multiply two neighbouring numbers: ${s}×${s + 1}, ${s + 1}×${s + 2} …` }; },
      () => {
        const pr = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47], s = U.ri(0, 8);
        return { t: pr.slice(s, s + 6), rule: 'These are prime numbers in order (numbers with exactly two factors).' };
      },
    ];
    const { t, rule } = U.pick(level === 1 ? L1 : level === 2 ? L2 : L3)();
    const hide = level === 1 ? 5 : U.pick([2, 3, 4, 5]);
    const ans = t[hide];
    const shown = t.map((x, i) => i === hide ? '?' : x);
    const step = Math.abs(t[1] - t[0]) || 1;
    return U.mcq({
      q: 'Which number should come in place of <b>?</b>',
      visual: seriesBox(shown),
      correct: ans,
      wrong: [ans + step, ans - step, ans + 1, ans - 1, ans + 2, ans * 2],
      hint: level === 1 ? 'Find the difference between two neighbouring numbers.' : 'Check differences first. If they are not equal, try ×, squares, or two mixed series.',
      explain: `${rule}<br>Full series: ${t.join(', ')}.<br>So the answer is <b>${ans}</b>.`,
    });
  },
});

// ---------------------------------------------------------------- Letter Series
registerGen({
  id: 'letterseries', section: 'iq', icon: '🔤', title: 'Alphabet Series',
  desc: 'Letter patterns and positions in the alphabet.',
  gen(level) {
    const P = s => s.split('').map(c => `${c}(${U.pos(c)})`).join(' → ');
    const letterOpts = (ans, extra) => {
      const p = U.pos(ans);
      const w = [p + 1, p - 1, p + 2, p - 2, p + 3, p - 3].concat(extra || []).filter(x => x >= 1 && x <= 26).map(U.letter);
      return w;
    };
    const kind = level === 1 ? U.pick(['step', 'step', 'pos']) : level === 2 ? U.pick(['pair', 'pair', 'stepBack', 'opp']) : U.pick(['grow', 'grow', 'pos2', 'mixed']);

    if (kind === 'step' || kind === 'stepBack') {
      const k = U.ri(1, level === 1 ? 3 : 4), back = kind === 'stepBack';
      const s = back ? U.ri(5 * k + 1, 26) : U.ri(1, 26 - 5 * k);
      const t = U.range(6).map(i => U.letter(back ? s - i * k : s + i * k));
      const ans = t[5];
      return U.mcq({
        q: 'Which letter comes next?', visual: seriesBox(t.slice(0, 5).concat('?')),
        correct: ans, wrong: letterOpts(ans),
        hint: 'Write the letter positions: A=1, B=2, C=3 … Z=26.',
        explain: `${P(t.join(''))}<br>Each step ${back ? 'goes back' : 'moves forward'} by ${k}. Answer: <b>${ans}</b>.`,
      });
    }
    if (kind === 'pos') {
      const fromRight = Math.random() < 0.5, n = U.ri(2, 13);
      const ans = U.letter(fromRight ? 27 - n : n);
      const o = ord(n);
      return U.mcq({
        q: `Which is the <b>${o}</b> letter from the <b>${fromRight ? 'right' : 'left'}</b> in the English alphabet?`,
        correct: ans, wrong: letterOpts(ans, [fromRight ? n : 27 - n]),
        hint: fromRight ? 'Position from the right = 27 − position from the left.' : 'Count from A.',
        explain: fromRight ? `From the right, the ${o} letter = 27 − ${n} = ${ord(27 - n)} from the left = <b>${ans}</b>.` : `Counting from A, the ${o} letter is <b>${ans}</b>.`,
      });
    }
    if (kind === 'pair') {
      let k1, k2, a, b;
      do {
        k1 = U.ri(1, 3); k2 = U.pick([-3, -2, -1, 1, 2, 3]);
        a = U.ri(1, 26); b = U.ri(1, 26);
      } while (a + 4 * k1 > 26 || b + 4 * k2 > 26 || b + 4 * k2 < 1);
      const t = U.range(5).map(i => U.letter(a + i * k1) + U.letter(b + i * k2));
      const ans = t[4];
      const A = a + 4 * k1, B = b + 4 * k2;
      const wrong = [[A + 1, B], [A, B + 1], [A - 1, B], [A, B - 1], [B, A], [A + 2, B], [A, B - 2], [A - 2, B], [A, B + 2], [A - 1, B - 1]].filter(x => x[0] >= 1 && x[0] <= 26 && x[1] >= 1 && x[1] <= 26).map(x => U.letter(x[0]) + U.letter(x[1]));
      return U.mcq({
        q: 'Which letter pair comes next?', visual: seriesBox(t.slice(0, 4).concat('?')),
        correct: ans, wrong,
        hint: 'Look at the first letters together, then the second letters together.',
        explain: `First letters: ${t.map(x => x[0]).join(', ')} (${k1 > 0 ? '+' : ''}${k1} each).<br>Second letters: ${t.map(x => x[1]).join(', ')} (${k2 > 0 ? '+' : ''}${k2} each).<br>Answer: <b>${ans}</b>.`,
      });
    }
    if (kind === 'opp') {
      const p = U.ri(1, 26);
      const ans = U.letter(27 - p);
      return U.mcq({
        q: `In the alphabet, A is opposite to Z, B is opposite to Y. Which letter is opposite to <b>${U.letter(p)}</b>?`,
        correct: ans, wrong: letterOpts(ans, [26 - p, 28 - p]),
        hint: 'Opposite letters always add up to 27 (A=1, Z=26).',
        explain: `${U.letter(p)} = ${p}. Opposite = 27 − ${p} = ${27 - p} = <b>${ans}</b>.`,
      });
    }
    if (kind === 'grow') {
      let s, d0;
      do { s = U.ri(1, 12); d0 = U.ri(1, 2); } while (s + 5 * d0 + 10 > 26);
      const t = [s]; for (let i = 1; i < 6; i++) t.push(t[i - 1] + d0 + i - 1);
      const L = t.map(U.letter), ans = L[5];
      return U.mcq({
        q: 'Which letter comes next?', visual: seriesBox(L.slice(0, 5).concat('?')),
        correct: ans, wrong: letterOpts(ans),
        hint: 'The jump between letters is getting bigger each time.',
        explain: `${P(L.join(''))}<br>Jumps: ${t.slice(1).map((x, i) => '+' + (x - t[i])).join(', ')}. Answer: <b>${ans}</b>.`,
      });
    }
    if (kind === 'mixed') {
      // two interleaved letter series
      const a = U.ri(1, 6), k1 = U.ri(1, 3), b = U.ri(20, 26), k2 = U.ri(1, 3);
      const L = []; for (let i = 0; i < 3; i++) { L.push(U.letter(a + i * k1)); L.push(U.letter(b - i * k2)); }
      const ans = U.letter(a + 3 * k1);
      return U.mcq({
        q: 'Which letter comes next?', visual: seriesBox(L.concat('?')),
        correct: ans, wrong: letterOpts(ans, [b - 3 * k2]),
        hint: 'There are two series mixed together. Look at every second letter.',
        explain: `1st, 3rd, 5th letters: ${L[0]}, ${L[2]}, ${L[4]} (+${k1} each).<br>2nd, 4th, 6th letters: ${L[1]}, ${L[3]}, ${L[5]} (−${k2} each).<br>Next is the 7th letter, from the first series: <b>${ans}</b>.`,
      });
    }
    // pos2: combined position question
    const n = U.ri(8, 20), m = U.ri(2, 7), fromRight = Math.random() < 0.5, toLeft = Math.random() < 0.5;
    const base = fromRight ? 27 - n : n;
    const target = toLeft ? base - m : base + m;
    if (target < 1 || target > 26) return this.gen(level);
    const ans = U.letter(target);
    const ordN = ord(n), ordM = ord(m);
    return U.mcq({
      q: `In the English alphabet, which letter is <b>${ordM} to the ${toLeft ? 'left' : 'right'}</b> of the <b>${ordN} letter from the ${fromRight ? 'right' : 'left'}</b>?`,
      correct: ans, wrong: [toLeft ? base + m : base - m, base, target + 1, target - 1].filter(x => x >= 1 && x <= 26).map(U.letter),
      hint: 'First find the letter, then move left (back) or right (forward).',
      explain: `${ordN} from the ${fromRight ? 'right' : 'left'} = ${fromRight ? `27 − ${n} = ` : ''}${base} = ${U.letter(base)}.<br>${ordM} to the ${toLeft ? 'left' : 'right'}: ${base} ${toLeft ? '−' : '+'} ${m} = ${target} = <b>${ans}</b>.`,
    });
  },
});

// ---------------------------------------------------------------- Analogy
const WORD_ANALOGIES = [
  ['Doctor', 'Hospital', 'Teacher', 'School', ['Book', 'Student', 'Office'], 'A doctor works in a hospital; a teacher works in a school.'],
  ['Cow', 'Calf', 'Dog', 'Puppy', ['Kitten', 'Cub', 'Lamb'], 'A young cow is a calf; a young dog is a puppy.'],
  ['Bird', 'Fly', 'Fish', 'Swim', ['Water', 'Run', 'Crawl'], 'A bird flies; a fish swims.'],
  ['Pen', 'Write', 'Knife', 'Cut', ['Sharp', 'Kitchen', 'Cook'], 'A pen is used to write; a knife is used to cut.'],
  ['Eye', 'See', 'Ear', 'Hear', ['Sound', 'Nose', 'Speak'], 'We see with eyes and hear with ears.'],
  ['Bee', 'Hive', 'Horse', 'Stable', ['Kennel', 'Nest', 'Den'], 'A bee lives in a hive; a horse lives in a stable.'],
  ['Hot', 'Cold', 'Day', 'Night', ['Sun', 'Light', 'Morning'], 'Hot is the opposite of cold; day is the opposite of night.'],
  ['Tailor', 'Cloth', 'Carpenter', 'Wood', ['Hammer', 'Table', 'Iron'], 'A tailor works with cloth; a carpenter works with wood.'],
  ['Cat', 'Kitten', 'Lion', 'Cub', ['Calf', 'Puppy', 'Foal'], 'A young cat is a kitten; a young lion is a cub.'],
  ['Water', 'Thirst', 'Food', 'Hunger', ['Eat', 'Plate', 'Taste'], 'Water removes thirst; food removes hunger.'],
  ['Car', 'Road', 'Ship', 'Sea', ['Sky', 'Rail', 'Sail'], 'A car moves on the road; a ship moves on the sea.'],
  ['Hour', 'Minute', 'Minute', 'Second', ['Day', 'Hour', 'Clock'], 'An hour is made of minutes; a minute is made of seconds.'],
  ['Shoe', 'Foot', 'Glove', 'Hand', ['Finger', 'Leg', 'Wool'], 'A shoe is worn on the foot; a glove is worn on the hand.'],
  ['Painter', 'Brush', 'Writer', 'Pen', ['Book', 'Paper', 'Story'], 'A painter uses a brush; a writer uses a pen.'],
  ['Milk', 'Cow', 'Honey', 'Bee', ['Flower', 'Sweet', 'Ant'], 'We get milk from a cow and honey from bees.'],
  ['Flower', 'Garden', 'Tree', 'Forest', ['Leaf', 'Wood', 'Fruit'], 'Many flowers make a garden; many trees make a forest.'],
  ['Up', 'Down', 'Left', 'Right', ['Side', 'Turn', 'Front'], 'Up is the opposite of down; left is the opposite of right.'],
  ['Thermometer', 'Temperature', 'Clock', 'Time', ['Watch', 'Hour', 'Alarm'], 'A thermometer measures temperature; a clock measures time.'],
  ['Maharashtra', 'Mumbai', 'Karnataka', 'Bengaluru', ['Chennai', 'Hyderabad', 'Mysuru'], 'Mumbai is the capital of Maharashtra; Bengaluru is the capital of Karnataka.'],
  ['India', 'New Delhi', 'Japan', 'Tokyo', ['Beijing', 'Osaka', 'Seoul'], 'New Delhi is the capital of India; Tokyo is the capital of Japan.'],
  ['Frog', 'Croak', 'Lion', 'Roar', ['Bark', 'Hiss', 'Chirp'], 'A frog croaks; a lion roars.'],
  ['Snake', 'Hiss', 'Dog', 'Bark', ['Roar', 'Moo', 'Neigh'], 'A snake hisses; a dog barks.'],
  ['Square', '4', 'Triangle', '3', ['5', '6', '2'], 'A square has 4 sides; a triangle has 3 sides.'],
  ['Sheep', 'Lamb', 'Hen', 'Chick', ['Kid', 'Calf', 'Egg'], 'A young sheep is a lamb; a young hen is a chick.'],
  ['Sun', 'Day', 'Moon', 'Night', ['Star', 'Sky', 'Light'], 'We see the sun in the day and the moon at night.'],
  ['Fast', 'Slow', 'Big', 'Small', ['Huge', 'Tall', 'Large'], 'Fast is the opposite of slow; big is the opposite of small.'],
  ['Ice', 'Cold', 'Fire', 'Hot', ['Smoke', 'Water', 'Light'], 'Ice is cold; fire is hot.'],
  ['Pilot', 'Aeroplane', 'Driver', 'Bus', ['Road', 'Ticket', 'Wheel'], 'A pilot drives an aeroplane; a driver drives a bus.'],
  ['Farmer', 'Field', 'Cook', 'Kitchen', ['Food', 'Spoon', 'Hotel'], 'A farmer works in a field; a cook works in a kitchen.'],
  ['Week', '7', 'Year', '12', ['30', '365', '52'], 'A week has 7 days; a year has 12 months.'],
];

registerGen({
  id: 'analogy', section: 'iq', icon: '🔗', title: 'Analogy',
  desc: 'A is to B as C is to ? — find the matching relation.',
  gen(level) {
    const kind = level === 1 ? U.pick(['word', 'word', 'num']) : level === 2 ? U.pick(['word', 'num', 'num', 'letter']) : U.pick(['num', 'num', 'letter', 'opp']);
    if (kind === 'word') {
      const [a, b, c, d, wrong, why] = U.pick(WORD_ANALOGIES);
      return U.mcq({
        q: `<b>${a}</b> : <b>${b}</b> :: <b>${c}</b> : <b>?</b>`, correct: d, wrong,
        hint: `How is ${a} related to ${b}? Use the same relation for ${c}.`,
        explain: `${why}<br>Answer: <b>${d}</b>.`,
      });
    }
    if (kind === 'num') {
      const rules = level === 1 ? ['add', 'mul'] : level === 2 ? ['add', 'mul', 'sq'] : ['cube', 'sq1', 'nn1', 'sqm', 'dbl1'];
      const r = U.pick(rules);
      const k = r === 'add' ? U.ri(3, 15) : U.ri(2, 5);
      const R = {
        add: [n => n + k, `Add ${k}`, 1, 40],
        mul: [n => n * k, `Multiply by ${k}`, 2, 12],
        sq: [n => n * n, 'Square (n × n)', 2, 12],
        cube: [n => n * n * n, 'Cube (n × n × n)', 2, 6],
        sq1: [n => n * n + 1, 'Square plus 1 (n × n + 1)', 2, 10],
        nn1: [n => n * (n + 1), 'n × (n + 1)', 2, 10],
        sqm: [n => n * n - n, 'n × n − n', 3, 10],
        dbl1: [n => n * 2 + 1, 'Double plus 1 (n × 2 + 1)', 3, 30],
      }[r];
      let a, c; do { a = U.ri(R[2], R[3]); c = U.ri(R[2], R[3]); } while (a === c);
      const ans = R[0](c), b = R[0](a);
      // Values another rule that also turns a into b would give — never offer these as wrong options.
      const alt = new Set([c + (b - a)]);
      if (b % a === 0) alt.add(c * (b / a));
      [[x => x * x], [x => x * x * x], [x => x * x + 1], [x => x * (x + 1)], [x => x * x - x], [x => x * 2 + 1]]
        .forEach(([f]) => { if (f(a) === b) alt.add(f(c)); });
      const others = [c * 2, c * c, c * c * c, ans + 1, ans - 1, ans + c, ans + 2, ans - 2, ans + 10].filter(x => x !== ans && !alt.has(x));
      return U.mcq({
        q: `<b>${a}</b> : <b>${R[0](a)}</b> :: <b>${c}</b> : <b>?</b>`, correct: ans, wrong: U.shuffle(others),
        hint: 'What did you do to the first number to get the second? Do the same to the third.',
        explain: `Rule: ${R[1]}. ${a} → ${R[0](a)}, so ${c} → <b>${ans}</b>.`,
      });
    }
    if (kind === 'letter') {
      const len = U.ri(2, 3), k = U.pick([1, 2, 3, 4, -1, -2]);
      const mk = () => { const s = U.ri(Math.max(1, 1 - k), Math.min(26 - len + 1, 26 - len + 1 - k)); return U.range(len).map(i => s + i); };
      const A = mk(), C = mk();
      if (A[0] === C[0]) return this.gen(level);
      const W = x => x.map(U.letter).join('');
      const B = A.map(p => p + k), D = C.map(p => p + k);
      const wr = [C.map(p => p + k + 1), C.map(p => p + k - 1), C.map(p => p - k)].filter(x => x.every(p => p >= 1 && p <= 26)).map(W);
      return U.mcq({
        q: `<b>${W(A)}</b> : <b>${W(B)}</b> :: <b>${W(C)}</b> : <b>?</b>`, correct: W(D), wrong: wr.concat([W(D).split('').reverse().join('')]),
        hint: 'Move each letter of the first group. How many steps?',
        explain: `Each letter moves ${k > 0 ? 'forward' : 'back'} by ${Math.abs(k)}: ${W(A)} → ${W(B)}.<br>So ${W(C)} → <b>${W(D)}</b>.`,
      });
    }
    // opposite letters
    const a = U.ri(1, 13), c = U.ri(1, 26);
    if (a === c || 27 - a === c) return this.gen(level);
    const ans = U.letter(27 - c);
    return U.mcq({
      q: `<b>${U.letter(a)}</b> : <b>${U.letter(27 - a)}</b> :: <b>${U.letter(c)}</b> : <b>?</b>`, correct: ans,
      wrong: [26 - c, 28 - c, 25 - c, 29 - c, c, 24 - c, 30 - c, c + 1].filter(x => x >= 1 && x <= 26 && x !== c + (27 - 2 * a)).map(U.letter),
      hint: 'Try opposite letters: A ↔ Z, B ↔ Y. Their positions add up to 27.',
      explain: `${U.letter(a)}(${a}) and ${U.letter(27 - a)}(${27 - a}) are opposite letters (sum 27).<br>Opposite of ${U.letter(c)}(${c}) is ${27 - c} = <b>${ans}</b>.`,
    });
  },
});

// ---------------------------------------------------------------- Odd One Out
const ODD_WORDS = [
  [1, ['Mango', 'Apple', 'Banana', 'Guava'], 'Potato', 'others are fruits; potato is a vegetable'],
  [1, ['Rose', 'Lotus', 'Jasmine', 'Marigold'], 'Neem', 'others are flowers; neem is a tree'],
  [1, ['Cow', 'Goat', 'Buffalo', 'Sheep'], 'Tiger', 'others are domestic animals; tiger is a wild animal'],
  [1, ['Red', 'Blue', 'Green', 'Yellow'], 'Circle', 'others are colours; circle is a shape'],
  [1, ['Monday', 'Tuesday', 'Friday', 'Sunday'], 'April', 'others are days of the week; April is a month'],
  [1, ['Gold', 'Silver', 'Iron', 'Copper'], 'Wood', 'others are metals'],
  [1, ['Spoon', 'Plate', 'Bowl', 'Glass'], 'Pillow', 'others are used for eating or drinking'],
  [1, ['Car', 'Bus', 'Truck', 'Scooter'], 'Boat', 'others travel on roads; a boat travels on water'],
  [2, ['Parrot', 'Sparrow', 'Crow', 'Pigeon'], 'Bat', 'others are birds; a bat is a mammal'],
  [2, ['Mumbai', 'Pune', 'Nagpur', 'Nashik'], 'Bhopal', 'others are cities in Maharashtra'],
  [2, ['Square', 'Rectangle', 'Triangle', 'Pentagon'], 'Cube', 'others are flat (2-D) shapes; a cube is a solid'],
  [2, ['Hockey', 'Cricket', 'Football', 'Kabaddi'], 'Chess', 'others are outdoor games'],
  [2, ['Eye', 'Ear', 'Nose', 'Tongue'], 'Kidney', 'others are sense organs'],
  [2, ['Pen', 'Pencil', 'Crayon', 'Chalk'], 'Eraser', 'others are used to write or draw; an eraser removes writing'],
  [2, ['Ganga', 'Godavari', 'Krishna', 'Narmada'], 'Himalaya', 'others are rivers; Himalaya is a mountain range'],
  [2, ['Doctor', 'Teacher', 'Farmer', 'Carpenter'], 'Hospital', 'others are people (jobs); hospital is a place'],
  [2, ['Mercury', 'Venus', 'Earth', 'Mars'], 'Moon', 'others are planets; the Moon is a satellite'],
  [2, ['Metre', 'Centimetre', 'Kilometre', 'Millimetre'], 'Litre', 'others measure length; litre measures capacity'],
  [3, ['January', 'March', 'May', 'July'], 'June', 'others have 31 days; June has 30 days'],
  [3, ['Penguin', 'Ostrich', 'Emu', 'Kiwi'], 'Eagle', 'others are birds that cannot fly'],
  [3, ['Onion', 'Carrot', 'Radish', 'Beetroot'], 'Tomato', 'others grow under the ground'],
  [3, ['Lion', 'Tiger', 'Leopard', 'Cheetah'], 'Wolf', 'others belong to the cat family'],
  [3, ['Kilogram', 'Gram', 'Quintal', 'Tonne'], 'Litre', 'others measure weight (mass)'],
  [3, ['Whale', 'Dolphin', 'Seal', 'Walrus'], 'Shark', 'others are mammals; a shark is a fish'],
  [3, ['Shivaji Maharaj', 'Rani Laxmibai', 'Maharana Pratap', 'Tipu Sultan'], 'Rabindranath Tagore', 'others were warrior kings and queens; Tagore was a poet'],
];

registerGen({
  id: 'oddone', section: 'iq', icon: '🧩', title: 'Odd One Out',
  desc: 'Three belong together — find the one that does not.',
  gen(level) {
    const kind = level === 1 ? U.pick(['word', 'word', 'num']) : U.pick(['word', 'num', 'num']);
    if (kind === 'word') {
      const pool = ODD_WORDS.filter(x => x[0] <= level && (level === 1 || x[0] >= level - 1));
      const [, group, odd, why] = U.pick(pool);
      const opts = U.sample(group, 3);
      return U.mcq({
        q: 'Which one is the <b>odd one out</b>?', correct: odd, wrong: opts,
        hint: 'Find what three of them have in common.',
        explain: `<b>${odd}</b> — ${why}.`,
      });
    }
    // number groups
    const groups = level === 1 ? ['even', 'odd', 'mult5'] : level === 2 ? ['mult', 'square', 'same', 'mult'] : ['prime', 'digitsum', 'consec', 'square'];
    const g = U.pick(groups);
    let good = [], bad, why;
    const uniq = (f, n) => { const s = new Set(); while (s.size < n) s.add(f()); return [...s]; };
    if (g === 'even') { good = uniq(() => 2 * U.ri(5, 49), 3); bad = 2 * U.ri(5, 49) + 1; why = 'the others are even numbers'; }
    else if (g === 'odd') { good = uniq(() => 2 * U.ri(5, 49) + 1, 3); bad = 2 * U.ri(5, 49); why = 'the others are odd numbers'; }
    else if (g === 'mult5') { good = uniq(() => 5 * U.ri(2, 19), 3); do { bad = U.ri(11, 99); } while (bad % 5 === 0); why = 'the others are multiples of 5'; }
    else if (g === 'mult') { const k = U.pick([3, 4, 6, 7, 8, 9]); good = uniq(() => k * U.ri(3, 12), 3); do { bad = U.ri(k * 3, k * 12); } while (bad % k === 0); why = `the others are multiples of ${k} (in the table of ${k})`; }
    else if (g === 'square') { good = U.sample([4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144], 3); bad = U.pick([12, 18, 24, 27, 32, 45, 48, 50, 63, 72, 90]); why = 'the others are square numbers (like 5 × 5 = 25)'; }
    else if (g === 'same') { good = U.sample([11, 22, 33, 44, 55, 66, 77, 88, 99], 3); bad = U.pick([21, 32, 43, 54, 65, 76, 87, 98]); why = 'the others have both digits the same'; }
    else if (g === 'prime') { good = U.sample([11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59], 3); bad = U.pick([21, 27, 33, 39, 49, 51, 57, 15, 25, 35]); why = `the others are prime numbers; ${bad} = ${U.factors(bad).filter(f => f > 1 && f < bad)[0]} × ${bad / U.factors(bad).filter(f => f > 1 && f < bad)[0]}`; }
    else if (g === 'digitsum') {
      const s = U.ri(7, 12);
      const all = U.range(90).map(i => i + 10).filter(n => Math.floor(n / 10) + n % 10 === s);
      good = U.sample(all, 3);
      do { bad = U.ri(10, 99); } while (Math.floor(bad / 10) + bad % 10 === s);
      why = `in the others, the digits add up to ${s} (e.g. ${good[0]}: ${Math.floor(good[0] / 10)} + ${good[0] % 10} = ${s})`;
    }
    else { // consec digits like 23, 45, 78
      good = U.sample([12, 23, 34, 45, 56, 67, 78, 89], 3);
      bad = U.pick([13, 24, 35, 46, 57, 68, 79]);
      why = 'in the others the second digit is 1 more than the first digit';
    }
    return U.mcq({
      q: 'Which number is the <b>odd one out</b>?', correct: bad, wrong: good,
      hint: 'Check: even/odd, tables, squares, digits, or prime numbers.',
      explain: `<b>${bad}</b> is different — ${why}.`,
    });
  },
});

// ---------------------------------------------------------------- Coding-Decoding
const CODE_WORDS = ['CAT', 'DOG', 'SUN', 'PEN', 'BOOK', 'TREE', 'FISH', 'BALL', 'MILK', 'RAIN', 'STAR', 'LAMP', 'KITE', 'DESK', 'ROSE', 'CAKE', 'GOLD', 'FROG', 'SHIP', 'BIRD', 'HAND', 'NEST', 'TIGER', 'MANGO', 'CHAIR', 'WATER', 'PLANT', 'HORSE', 'APPLE', 'CLOUD', 'TRAIN', 'BREAD'];

registerGen({
  id: 'coding', section: 'iq', icon: '🕵️', title: 'Coding–Decoding',
  desc: 'Crack the secret code used for a word.',
  gen(level) {
    const shiftW = (w, k) => w.split('').map(c => U.letter(((U.pos(c) - 1 + k) % 26 + 26) % 26 + 1)).join('');
    const opp = w => w.split('').map(c => U.letter(27 - U.pos(c))).join('');
    const rev = w => w.split('').reverse().join('');
    const sum = w => w.split('').reduce((s, c) => s + U.pos(c), 0);
    let [w1, w2] = U.sample(CODE_WORDS, 2);
    const kind = level === 1 ? U.pick(['shift1', 'shift1', 'back1']) : level === 2 ? U.pick(['shift', 'shift', 'rev', 'sum']) : U.pick(['opp', 'shiftrev', 'sum', 'shift']);
    const corrupt = s => { const i = U.ri(0, s.length - 1); return s.slice(0, i) + shiftW(s[i], U.pick([1, -1])) + s.slice(i + 1); };

    if (kind === 'sum') {
      return U.mcq({
        q: `If A = 1, B = 2, C = 3 … Z = 26, and <b>${w1}</b> = <b>${sum(w1)}</b>, then <b>${w2}</b> = ?`,
        correct: sum(w2), wrong: [sum(w2) + 1, sum(w2) - 1, sum(w2) + 2, sum(w2) + 10],
        hint: 'Add the position numbers of all the letters.',
        explain: `${w1}: ${w1.split('').map(c => U.pos(c)).join(' + ')} = ${sum(w1)}.<br>${w2}: ${w2.split('').map(c => U.pos(c)).join(' + ')} = <b>${sum(w2)}</b>.`,
      });
    }
    let enc, desc;
    if (kind === 'shift1') { enc = w => shiftW(w, 1); desc = 'each letter moves 1 step forward (A→B, B→C …)'; }
    else if (kind === 'back1') { enc = w => shiftW(w, -1); desc = 'each letter moves 1 step back (B→A, C→B …)'; }
    else if (kind === 'shift') { const k = U.pick([2, 3, -2, 1, -1]); enc = w => shiftW(w, k); desc = `each letter moves ${Math.abs(k)} step${Math.abs(k) > 1 ? 's' : ''} ${k > 0 ? 'forward' : 'back'}`; }
    else if (kind === 'rev') { enc = rev; desc = 'the word is written backwards'; }
    else if (kind === 'opp') { enc = opp; desc = 'each letter is replaced by its opposite letter (A↔Z, B↔Y …, positions add to 27)'; }
    else { const k = U.pick([1, 2]); enc = w => rev(shiftW(w, k)); desc = `each letter moves ${k} step${k > 1 ? 's' : ''} forward and then the word is written backwards`; }
    // Avoid wrap-around in easy level
    if (level === 1 && /[Z]/.test(w1 + w2) && kind === 'shift1') return this.gen(level);
    if (level === 1 && /[A]/.test(w1 + w2) && kind === 'back1') return this.gen(level);
    const ans = enc(w2);
    if (ans === w2) return this.gen(level);
    const wrong = [shiftW(w2, 1), shiftW(w2, -1), shiftW(w2, 2), rev(w2), corrupt(ans), rev(ans)].filter(x => x !== ans);
    const map = w1.split('').map((c, i) => `${c}→${enc(w1)[kind === 'rev' || kind === 'shiftrev' ? w1.length - 1 - i : i]}`).join(', ');
    return U.mcq({
      q: `In a code language, <b>${w1}</b> is written as <b>${enc(w1)}</b>. How is <b>${w2}</b> written in that code?`,
      correct: ans, wrong: U.shuffle(wrong),
      hint: 'Compare each letter of the word with its code letter. Count the steps.',
      explain: `${kind === 'rev' ? '' : map + '<br>'}Rule: ${desc}${kind === 'shift' || kind === 'shiftrev' ? ' (after Z we go back to A)' : ''}.<br>So ${w2} → <b>${ans}</b>.`,
    });
  },
});

// ---------------------------------------------------------------- Direction Sense
const DIRS = ['North', 'East', 'South', 'West'];
const DX = [0, 1, 0, -1], DY = [1, 0, -1, 0];
function dir8(dx, dy) {
  const ns = dy > 0 ? 'North' : dy < 0 ? 'South' : '';
  const ew = dx > 0 ? 'East' : dx < 0 ? 'West' : '';
  return ns && ew ? `${ns}-${ew}` : ns || ew;
}
const DIR8 = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];

registerGen({
  id: 'direction', section: 'iq', icon: '🧭', title: 'Directions',
  desc: 'Left, right, North, South — where did they reach?',
  gen(level) {
    const who = U.pick(ALL_NAMES);
    const he = BOYS.includes(who) ? 'he' : 'she', He = he === 'he' ? 'He' : 'She';
    if (level === 1) {
      let d = U.ri(0, 3); const start = d;
      const n = U.ri(1, 3), steps = [];
      for (let i = 0; i < n; i++) {
        const t = U.pick(['right', 'left', 'right', 'left', 'back']);
        d = (d + (t === 'right' ? 1 : t === 'left' ? 3 : 2)) % 4;
        steps.push(t === 'back' ? 'turns back (about-turn)' : `turns ${t}`);
      }
      return U.mcq({
        q: `${who} is facing <b>${DIRS[start]}</b>. ${He} ${steps.join(', then ')}. Which direction is ${he} facing now?`,
        visual: SVG.compass(), correct: DIRS[d], wrong: DIRS.filter(x => x !== DIRS[d]),
        hint: 'Right turn = clockwise (N → E → S → W). Left turn = anticlockwise.',
        explain: `Start: ${DIRS[start]}. ${steps.map(s => s).join(' → ')} → now facing <b>${DIRS[d]}</b>.`,
      });
    }
    const unit = U.pick(['m', 'km']);
    for (let tries = 0; tries < 300; tries++) {
      let d = U.ri(0, 3), x = 0, y = 0;
      const legs = level === 2 ? U.ri(2, 3) : U.ri(3, 4);
      const pts = [[0, 0]], parts = [];
      for (let i = 0; i < legs; i++) {
        let turnTxt = '';
        if (i > 0) { const t = U.pick(['right', 'left']); d = (d + (t === 'right' ? 1 : 3)) % 4; turnTxt = `turns ${t} and walks`; }
        const len = U.ri(2, 10);
        x += DX[d] * len; y += DY[d] * len; pts.push([x, y]);
        parts.push(i === 0 ? `walks ${len} ${unit} towards <b>${DIRS[d]}</b>` : `${turnTxt} ${len} ${unit}`);
      }
      if (x === 0 && y === 0) continue;
      const story = `${who} ${parts.join(', then ')}.`;
      if (level === 2) {
        const ans = dir8(x, y), i8 = DIR8.indexOf(ans);
        return U.mcq({
          q: `${story} In which direction is ${he} now from the <b>starting point</b>?`,
          visual: SVG.compass(), correct: ans, wrong: U.shuffle([DIR8[(i8 + 4) % 8], DIR8[(i8 + 1) % 8], DIR8[(i8 + 7) % 8], DIR8[(i8 + 2) % 8]]),
          hint: 'Draw the path on paper. Mark the start point S and the end point E.',
          explain: `Drawing the path:<br>${SVG.path(pts)}<br>The end point E is to the <b>${ans}</b> of the start point S.`,
        });
      }
      if (x !== 0 && y !== 0) continue; // level 3: must lie on a straight line from start
      const dist = Math.abs(x + y), ans = `${dist} ${unit} ${dir8(x, y)}`;
      const total = pts.slice(1).reduce((s, p, i) => s + Math.abs(p[0] - pts[i][0]) + Math.abs(p[1] - pts[i][1]), 0);
      const oppDir = dir8(-x, -y);
      return U.mcq({
        q: `${story} How far and in which direction is ${he} from the <b>starting point</b>?`,
        visual: SVG.compass(), correct: ans,
        wrong: [`${dist} ${unit} ${oppDir}`, `${total} ${unit} ${dir8(x, y)}`, `${dist + 2} ${unit} ${dir8(x, y)}`, `${Math.max(1, dist - 1)} ${unit} ${oppDir}`],
        hint: 'Draw the path. Steps in opposite directions cancel each other.',
        explain: `Drawing the path:<br>${SVG.path(pts)}<br>The end point is <b>${ans}</b> of the start (a straight line from S to E).`,
      });
    }
    return this.gen(1);
  },
});

// ---------------------------------------------------------------- Ranking & Order
registerGen({
  id: 'ranking', section: 'iq', icon: '🏅', title: 'Ranking & Order',
  desc: 'Positions in a row, and who is tallest or oldest.',
  gen(level) {
    const kind = level === 1 ? U.pick(['fromRight', 'fromRight', 'compare4']) : level === 2 ? U.pick(['total', 'total', 'compare4']) : U.pick(['between', 'between', 'compare5']);
    const who = U.pick(ALL_NAMES);
    if (kind === 'fromRight') {
      const N = U.ri(10, 40), K = U.ri(2, N - 1), side = U.pick(['left', 'top']);
      const other = side === 'left' ? 'right' : 'bottom';
      const ans = N - K + 1;
      return U.mcq({
        q: side === 'left'
          ? `There are <b>${N}</b> children in a row. ${who} is <b>${ord(K)}</b> from the left. What is ${who}'s position from the right?`
          : `In a class of <b>${N}</b> students, ${who}'s rank is <b>${ord(K)}</b> from the top. What is the rank from the bottom?`,
        correct: ans, wrong: [N - K, N - K + 2, K, N + K],
        hint: 'Position from the other end = Total − Position + 1.',
        explain: `From the ${other} = ${N} − ${K} + 1 = <b>${ans}</b>.`,
      });
    }
    if (kind === 'total') {
      const L = U.ri(4, 25), R = U.ri(4, 25), ans = L + R - 1;
      return U.mcq({
        q: `${who} is <b>${ord(L)}</b> from the left and <b>${ord(R)}</b> from the right in a row. How many children are there in the row?`,
        correct: ans, wrong: [L + R, L + R + 1, L + R - 2],
        hint: `${who} is counted twice — once from each side.`,
        explain: `Total = ${L} + ${R} − 1 = <b>${ans}</b> (we subtract 1 because ${who} is counted twice).`,
      });
    }
    if (kind === 'between') {
      let N, p, q;
      do { N = U.ri(20, 45); p = U.ri(3, 15); q = U.ri(3, 15); } while (N - p - q < 1);
      const [a, b] = U.sample(ALL_NAMES, 2), ans = N - p - q;
      return U.mcq({
        q: `In a row of <b>${N}</b> children, ${a} is <b>${ord(p)}</b> from the left and ${b} is <b>${ord(q)}</b> from the right. How many children are there <b>between</b> ${a} and ${b}?`,
        correct: ans, wrong: [ans + 1, ans + 2, ans - 1, p + q],
        hint: 'Remove the children up to ' + a + ' from the left and up to ' + b + ' from the right.',
        explain: `Children between = Total − (left count) − (right count) = ${N} − ${p} − ${q} = <b>${ans}</b>.`,
      });
    }
    const n = kind === 'compare5' ? 5 : 4;
    const names = U.sample(ALL_NAMES, n); // names[0] is the most
    const A = U.pick([
      { more: 'taller', less: 'shorter', top: 'tallest', bottom: 'shortest' },
      { more: 'older', less: 'younger', top: 'oldest', bottom: 'youngest' },
      { more: 'heavier', less: 'lighter', top: 'heaviest', bottom: 'lightest' },
    ]);
    const facts = U.range(n - 1).map(i => Math.random() < 0.5 ? `${names[i]} is ${A.more} than ${names[i + 1]}` : `${names[i + 1]} is ${A.less} than ${names[i]}`);
    let askTxt, ans;
    if (n === 5 && Math.random() < 0.6) { askTxt = `Who is in the <b>middle</b> (3rd ${A.top})?`; ans = names[2]; }
    else if (Math.random() < 0.5) { askTxt = `Who is the <b>${A.top}</b>?`; ans = names[0]; }
    else { askTxt = `Who is the <b>${A.bottom}</b>?`; ans = names[n - 1]; }
    return U.mcq({
      q: `${U.shuffle(facts).join('. ')}. ${askTxt}`, correct: ans, wrong: U.shuffle(names.filter(x => x !== ans)),
      hint: `Write the names in a line from ${A.top} to ${A.bottom}.`,
      explain: `Order (${A.top} → ${A.bottom}): ${names.join(' > ')}.<br>Answer: <b>${ans}</b>.`,
    });
  },
});

// ---------------------------------------------------------------- Calendar & Clock
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const MDAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const ord = n => n + ([11, 12, 13].includes(n % 100) ? 'th' : ['th', 'st', 'nd', 'rd'][n % 10] || 'th');

registerGen({
  id: 'calclock', section: 'iq', icon: '📅', title: 'Calendar & Clock',
  desc: 'Days, dates, time and mirror clocks.',
  gen(level) {
    const kind = level === 1 ? U.pick(['after', 'readClock', 'addTime']) : level === 2 ? U.pick(['date', 'afterBig', 'leap', 'elapsed']) : U.pick(['month', 'mirror', 'angle', 'month']);
    const dayWrong = d => [DAYS[(d + 1) % 7], DAYS[(d + 6) % 7], DAYS[(d + 2) % 7], DAYS[(d + 5) % 7]];
    if (kind === 'after') {
      const d = U.ri(0, 6), n = U.ri(1, 6), before = Math.random() < 0.4;
      const r = (d + (before ? -n : n) + 7) % 7;
      return U.mcq({
        q: before ? `If today is <b>${DAYS[d]}</b>, what day was it <b>${n} days ago</b>?` : `If today is <b>${DAYS[d]}</b>, what day will it be after <b>${n} days</b>?`,
        correct: DAYS[r], wrong: dayWrong(r),
        hint: 'Count the days one by one on your fingers.',
        explain: `Counting ${n} days ${before ? 'back' : 'forward'} from ${DAYS[d]} gives <b>${DAYS[r]}</b>.`,
      });
    }
    if (kind === 'readClock') {
      const h = U.ri(1, 12), m = 5 * U.ri(0, 11);
      const t = (hh, mm) => `${hh}:${U.pad2(mm)}`;
      const swapH = m === 0 ? 12 : m / 5, swapM = (h % 12) * 5;
      return U.mcq({
        q: 'What time does the clock show?', visual: SVG.clock(h, m),
        correct: t(h, m), wrong: [t(swapH, swapM), t(h % 12 + 1, m), t(h, (m + 5) % 60), t(h === 1 ? 12 : h - 1, m)],
        hint: 'Short (red) hand = hours. Long (blue) hand = minutes; each number means 5 minutes.',
        explain: `The hour hand is at ${m > 0 ? `just after ${h}` : h}; the minute hand is at ${m === 0 ? 12 : m / 5} → ${m} minutes. Time: <b>${t(h, m)}</b>.`,
      });
    }
    if (kind === 'addTime' || kind === 'elapsed') {
      const h = U.ri(1, 10), m = 5 * U.ri(0, 11), add = kind === 'addTime' ? 5 * U.ri(3, 11) : 5 * U.ri(10, 40);
      const tot = h * 60 + m + add, eh = Math.floor(tot / 60), em = tot % 60;
      const end = `${eh > 12 ? eh - 12 : eh}:${U.pad2(em)}`;
      if (kind === 'addTime') {
        return U.mcq({
          q: `The time now is <b>${h}:${U.pad2(m)}</b>. What time will it be after <b>${add} minutes</b>?`,
          correct: end, wrong: [`${h}:${U.pad2((m + add) % 60)}`, `${eh > 12 ? eh - 12 : eh}:${U.pad2((em + 10) % 60)}`, `${eh + 1 > 12 ? eh - 11 : eh + 1}:${U.pad2(em)}`, `${h + 1}:${U.pad2(m)}`],
          hint: '60 minutes make 1 hour.',
          explain: `${h}:${U.pad2(m)} + ${add} min = ${h} h ${m + add} min${m + add >= 60 ? ` = ${eh} h ${em} min` : ''} → <b>${end}</b>.`,
        });
      }
      const H = Math.floor(add / 60), M = add % 60, f = (a, b) => `${a} h ${b} min`;
      return U.mcq({
        q: `A programme starts at <b>${h}:${U.pad2(m)}</b> and ends at <b>${end}</b> on the same afternoon. How long is it?`,
        correct: f(H, M), wrong: [f(H + 1, M), f(H, (M + 40) % 60), f(Math.max(0, H - 1), M), f(H, (M + 10) % 60)],
        hint: 'Count to the next full hour first, then the rest.',
        explain: `From ${h}:${U.pad2(m)} to ${end} = ${add} minutes = <b>${f(H, M)}</b>.`,
      });
    }
    if (kind === 'date') {
      const d1 = U.ri(1, 12), diff = U.ri(5, 18), d2 = d1 + diff, w = U.ri(0, 6), r = (w + diff) % 7;
      return U.mcq({
        q: `If the <b>${ord(d1)}</b> of a month is a <b>${DAYS[w]}</b>, what day of the week is the <b>${ord(d2)}</b> of the same month?`,
        correct: DAYS[r], wrong: dayWrong(r),
        hint: 'The same day comes again after every 7 days.',
        explain: `${d2} − ${d1} = ${diff} days. ${diff} = ${Math.floor(diff / 7)} weeks + ${diff % 7} days.<br>${DAYS[w]} + ${diff % 7} days = <b>${DAYS[r]}</b>.`,
      });
    }
    if (kind === 'afterBig') {
      const d = U.ri(0, 6), n = U.ri(15, 70), r = (d + n) % 7;
      return U.mcq({
        q: `Today is <b>${DAYS[d]}</b>. What day will it be after <b>${n} days</b>?`, correct: DAYS[r], wrong: dayWrong(r),
        hint: 'Divide the number of days by 7. Only the remainder matters.',
        explain: `${n} ÷ 7 = ${Math.floor(n / 7)} weeks, remainder ${n % 7}.<br>${DAYS[d]} + ${n % 7} days = <b>${DAYS[r]}</b>.`,
      });
    }
    if (kind === 'leap') {
      const y = U.ri(2021, 2040), leap = y % 4 === 0;
      if (Math.random() < 0.5) {
        return U.mcq({
          q: `How many days are there in <b>February ${y}</b>?`, correct: leap ? '29' : '28', wrong: [leap ? '28' : '29', '30', '31'],
          hint: 'In a leap year February has 29 days. A leap year (here) can be divided by 4.',
          explain: `${y} ÷ 4 ${leap ? 'has no remainder, so it is a leap year' : 'has a remainder, so it is not a leap year'}. February ${y} has <b>${leap ? 29 : 28}</b> days.`,
        });
      }
      return U.mcq({
        q: `How many days are there in the year <b>${y}</b>?`, correct: leap ? '366' : '365', wrong: [leap ? '365' : '366', '364', '360'],
        hint: 'A leap year has 366 days. Check if the year can be divided by 4.',
        explain: `${y} ${leap ? 'is' : 'is not'} a leap year, so it has <b>${leap ? 366 : 365}</b> days.`,
      });
    }
    if (kind === 'month') {
      const leap = Math.random() < 0.3, md = MDAYS.slice(); if (leap) md[1] = 29;
      const m1 = U.ri(0, 9), m2 = U.ri(m1 + 1, Math.min(11, m1 + 2)), d1 = U.ri(1, 15), d2 = U.ri(1, 15), w = U.ri(0, 6);
      let diff = md[m1] - d1 + d2; for (let i = m1 + 1; i < m2; i++) diff += md[i];
      const r = (w + diff) % 7;
      const steps = [`${md[m1]} − ${d1} = ${md[m1] - d1} days left in ${MONTHS[m1]}`];
      for (let i = m1 + 1; i < m2; i++) steps.push(`${md[i]} days of ${MONTHS[i]}`);
      steps.push(`${d2} days of ${MONTHS[m2]}`);
      return U.mcq({
        q: `In a ${leap ? '' : 'non-'}leap year, <b>${d1} ${MONTHS[m1]}</b> is a <b>${DAYS[w]}</b>. What day of the week is <b>${d2} ${MONTHS[m2]}</b>?`,
        correct: DAYS[r], wrong: dayWrong(r),
        hint: 'Count the total days between the two dates, then divide by 7.',
        explain: `${steps.join(' + ')} = ${diff} days.<br>${diff} ÷ 7 leaves remainder ${diff % 7}. ${DAYS[w]} + ${diff % 7} = <b>${DAYS[r]}</b>.`,
      });
    }
    if (kind === 'mirror') {
      const h = U.ri(1, 11), m = 5 * U.ri(1, 11);
      let tot = 12 * 60 - (h * 60 + m); const ah = Math.floor(tot / 60) || 12, am = tot % 60;
      const T = (a, b) => `${a}:${U.pad2(b)}`;
      return U.mcq({
        q: `In a mirror, a clock shows the time <b>${T(h, m)}</b>. What is the <b>actual</b> time?`,
        visual: SVG.clock(ah, am, { mirror: true }) + '<div class="caption">The clock as seen in the mirror</div>',
        correct: T(ah, am), wrong: [T(h, m), T(ah, (am + 30) % 60), T(ah === 12 ? 1 : ah + 1, am), T(12 - h, m), T(ah === 1 ? 12 : ah - 1, am), T(ah, (am + 15) % 60)],
        hint: 'Mirror trick: Actual time = 11:60 − mirror time.',
        explain: `11:60 − ${T(h, m)} = <b>${T(ah, am)}</b>.<br>(In a mirror, left and right swap, so the hands look reversed.)`,
      });
    }
    // angle at full hour
    const h = U.ri(1, 11), a = Math.min(h * 30, 360 - h * 30);
    return U.mcq({
      q: `What is the (smaller) angle between the hour hand and the minute hand at <b>${h} o'clock</b>?`, visual: SVG.clock(h, 0),
      correct: a + '°', wrong: [a + 30, a - 30, 360 - a, h * 5, 90].filter(x => x !== a && x > 0).map(x => x + '°'),
      hint: 'The clock is 360°. Between two numbers there are 360 ÷ 12 = 30°.',
      explain: `At ${h} o'clock the hands are ${Math.min(h, 12 - h)} number gaps apart. ${Math.min(h, 12 - h)} × 30° = <b>${a}°</b>.`,
    });
  },
});

// ---------------------------------------------------------------- Blood Relations
const RELATIONS = [
  [1, 'Ramesh is the son of Sunita. How is Sunita related to Ramesh?', 'Mother', ['Sister', 'Aunt', 'Grandmother'], 'Ramesh is Sunita\'s son, so Sunita is his mother.'],
  [1, "Anil's father's father is Raghav. How is Raghav related to Anil?", 'Grandfather', ['Father', 'Uncle', 'Brother'], "Father's father = grandfather."],
  [1, "Neha's mother's sister is Kavita. How is Kavita related to Neha?", 'Aunt (Mavshi)', ['Mother', 'Sister', 'Grandmother'], "Mother's sister = aunt (Mavshi)."],
  [1, "Rohan's father's brother is Suresh. How is Suresh related to Rohan?", 'Uncle (Kaka)', ['Father', 'Brother', 'Cousin'], "Father's brother = uncle (Kaka)."],
  [1, "Meera's mother's brother is Vijay. How is Vijay related to Meera?", 'Uncle (Mama)', ['Father', 'Brother', 'Grandfather'], "Mother's brother = uncle (Mama)."],
  [1, 'Priya is the daughter of Sameer. How is Sameer related to Priya?', 'Father', ['Brother', 'Uncle', 'Son'], 'Priya is Sameer\'s daughter, so Sameer is her father.'],
  [1, "Rahul's mother's husband is Prakash. How is Prakash related to Rahul?", 'Father', ['Uncle', 'Grandfather', 'Brother'], "Mother's husband = father."],
  [1, "Gauri's mother's mother is Shanta. How is Shanta related to Gauri?", 'Grandmother', ['Mother', 'Aunt', 'Sister'], "Mother's mother = grandmother (Aaji)."],
  [2, "Kiran's father's sister is Lata. How is Lata related to Kiran?", 'Aunt (Atya)', ['Mother', 'Sister', 'Cousin'], "Father's sister = aunt (Atya)."],
  [2, "Sahil's brother's daughter is Tanvi. How is Tanvi related to Sahil?", 'Niece', ['Daughter', 'Sister', 'Cousin'], "Brother's daughter = niece."],
  [2, "Arjun's sister's son is Om. How is Om related to Arjun?", 'Nephew', ['Son', 'Brother', 'Cousin'], "Sister's son = nephew."],
  [2, "Varun's father's brother's son is Yash. How is Yash related to Varun?", 'Cousin', ['Brother', 'Nephew', 'Uncle'], "Father's brother = uncle; uncle's son = cousin."],
  [2, "Sneha's father's wife is Anita. How is Anita related to Sneha?", 'Mother', ['Aunt', 'Sister', 'Grandmother'], "Father's wife = mother."],
  [2, "Ravi's sister's father is Mohan. How is Mohan related to Ravi?", 'Father', ['Uncle', 'Grandfather', 'Brother'], "Ravi's sister has the same father as Ravi."],
  [2, 'Anu is the only daughter of Mr. Patil. Raj is the son of Mr. Patil. How is Anu related to Raj?', 'Sister', ['Cousin', 'Mother', 'Aunt'], 'Both are children of Mr. Patil, so Anu is Raj\'s sister.'],
  [2, "Kavya's father's mother is Sita. Sita's husband is Ram. How is Ram related to Kavya?", 'Grandfather', ['Father', 'Uncle', 'Brother'], "Father's mother's husband = father's father = grandfather."],
  [3, "Pointing to a photo, Ajay says, \"He is the only son of my father.\" Who is in the photo?", 'Ajay himself', ["Ajay's brother", "Ajay's father", "Ajay's uncle"], "Ajay's father's only son is Ajay himself."],
  [3, "Pointing to a girl, Amit says, \"She is the daughter of my mother's only son.\" How is the girl related to Amit?", 'Daughter', ['Sister', 'Niece', 'Cousin'], "Amit's mother's only son is Amit. So the girl is Amit's daughter."],
  [3, "Pointing to a boy, Riya says, \"He is the son of my grandfather's only son.\" How is the boy related to Riya?", 'Brother', ['Cousin', 'Uncle', 'Nephew'], "Grandfather's only son = Riya's father. Father's son = Riya's brother."],
  [3, 'A is the brother of B. B is the mother of C. How is A related to C?', 'Uncle (Mama)', ['Father', 'Brother', 'Grandfather'], "A is the brother of C's mother, so A is C's maternal uncle (Mama)."],
  [3, "Seema's mother's father's only son is Mohan. How is Mohan related to Seema?", 'Uncle (Mama)', ['Grandfather', 'Father', 'Brother'], "Mother's father's only son = mother's brother = uncle (Mama)."],
  [3, 'X is the wife of Y. Y is the father of Z. How is X related to Z?', 'Mother', ['Sister', 'Aunt', 'Grandmother'], "Y is Z's father, and X is Y's wife, so X is Z's mother."],
  [3, "P is the father of Q. Q is the sister of R. R is the son of S. How is S related to P?", 'Wife', ['Sister', 'Daughter', 'Mother'], 'Q and R are children of P. R is also the son of S, so S is the mother and P\'s wife.'],
  [3, "Pointing to a lady, Om says, \"Her mother is the only daughter of my grandmother.\" How is the lady related to Om?", 'Sister', ['Aunt', 'Mother', 'Cousin'], "My grandmother's only daughter is my mother. So the lady's mother = Om's mother, and she is Om's sister."],
];

registerGen({
  id: 'relations', section: 'iq', icon: '👨‍👩‍👧', title: 'Blood Relations',
  desc: 'Family puzzles — father, aunt, cousin, nephew …',
  gen(level) {
    const pool = RELATIONS.filter(r => r[0] === level || (level === 3 && r[0] === 2 && Math.random() < 0.2));
    const [, q, ans, wrong, why] = U.pick(pool);
    return U.mcq({
      q, correct: ans, wrong,
      hint: 'Break the sentence into small steps and draw a family tree.',
      explain: `${why}<br>Answer: <b>${ans}</b>.`,
    });
  },
});
