'use strict';
// Maths puzzle generators — Maharashtra State Board Std 4 (Balbharati) topics at scholarship level.

const ONES = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
function words2(n) { return n < 20 ? ONES[n] : TENS[Math.floor(n / 10)] + (n % 10 ? '-' + ONES[n % 10] : ''); }
function numWords(n) {
  if (n === 0) return 'zero';
  if (n === 100000) return 'one lakh';
  const s = [], th = Math.floor(n / 1000), h = Math.floor(n % 1000 / 100), r = n % 100;
  if (th) s.push(words2(th) + ' thousand');
  if (h) s.push(ONES[h] + ' hundred');
  if (r) s.push(words2(r));
  return s.join(' ');
}
const PLACE = ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands'];

// ---------------------------------------------------------------- Number Work
registerGen({
  id: 'numwork', section: 'math', icon: '🔟', title: 'Number Work',
  desc: 'Place value, number names, largest & smallest numbers (up to 1 lakh).',
  gen(level) {
    const kind = level === 1 ? U.pick(['place', 'place', 'name', 'succ']) : level === 2 ? U.pick(['place5', 'form', 'round', 'expand']) : U.pick(['form0', 'extreme', 'between', 'distinct']);
    if (kind === 'place' || kind === 'place5') {
      const len = kind === 'place' ? 4 : 5;
      const digits = U.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], len); // unique digits avoid confusion
      const n = Number(digits.join(''));
      const idx = U.ri(0, len - 1), d = digits[idx], p = len - 1 - idx, pv = d * 10 ** p;
      if (kind === 'place5' && p > 0 && Math.random() < 0.4) {
        const ans = pv - d;
        return U.mcq({
          q: `What is the difference between the <b>place value</b> and the <b>face value</b> of <b>${d}</b> in <b>${U.inr(n)}</b>?`,
          correct: ans, fmt: U.inr, wrong: [pv, d, pv + d, d * 10 ** Math.max(0, p - 1) - d],
          hint: 'Face value is the digit itself. Place value depends on its position.',
          explain: `${d} is in the ${PLACE[p]} place. Place value = ${U.inr(pv)}, face value = ${d}.<br>${U.inr(pv)} − ${d} = <b>${U.inr(ans)}</b>.`,
        });
      }
      return U.mcq({
        q: `What is the <b>place value</b> of <b>${d}</b> in <b>${U.inr(n)}</b>?`,
        correct: pv, fmt: U.inr, wrong: [d, d * 10 ** ((p + 1) % len), d * 10 ** Math.abs(p - 1), d * 10 ** ((p + 2) % len)],
        hint: 'Ones, tens, hundreds, thousands, ten thousands — count from the right.',
        explain: `${d} is in the <b>${PLACE[p]}</b> place, so its place value is ${d} × ${U.inr(10 ** p)} = <b>${U.inr(pv)}</b>.`,
      });
    }
    if (kind === 'name') {
      const n = U.ri(1001, 9999);
      const th = Math.floor(n / 1000), rest = n % 1000;
      return U.mcq({
        q: `Write in figures: <b>${numWords(n)}</b>`,
        correct: n, fmt: U.inr, wrong: [Number(`${th}0${rest}`), th * 1000 + Math.floor(rest / 10), n + 90, n - 100, th * 100 + rest % 100].filter(x => x !== n),
        hint: 'Write the thousands digit first, then hundreds, tens and ones. Use 0 for a missing place.',
        explain: `${numWords(n)} = <b>${U.inr(n)}</b>.`,
      });
    }
    if (kind === 'succ') {
      const n = U.pick([U.ri(1000, 9998), U.pick([999, 9999, 1999, 4999, 10000, 1000, 5000])]);
      const after = Math.random() < 0.6, ans = after ? n + 1 : n - 1;
      return U.mcq({
        q: `Which number comes just <b>${after ? 'after' : 'before'}</b> ${U.inr(n)}?`,
        correct: ans, fmt: U.inr, wrong: [after ? n - 1 : n + 1, after ? n + 10 : n - 10, n + (after ? 2 : -2), ans * 10],
        hint: after ? 'Just after = add 1.' : 'Just before = subtract 1.',
        explain: `${U.inr(n)} ${after ? '+' : '−'} 1 = <b>${U.inr(ans)}</b>.`,
      });
    }
    if (kind === 'form' || kind === 'form0') {
      const len = kind === 'form' ? 4 : 5;
      let digits = U.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], len);
      if (kind === 'form0') digits[0] = 0;
      digits = U.shuffle(digits);
      const largest = Math.random() < 0.5;
      const sorted = digits.slice().sort((a, b) => largest ? b - a : a - b);
      if (!largest && sorted[0] === 0) { const i = sorted.findIndex(x => x > 0); [sorted[0], sorted[i]] = [sorted[i], sorted[0]]; }
      const ans = Number(sorted.join(''));
      const asc = digits.slice().sort((a, b) => a - b), desc = asc.slice().reverse();
      const w = [Number(asc.join('')), Number(desc.join('')), Number(desc.slice(0, -2).concat(desc.slice(-2).reverse()).join('')), Number(asc.slice(1).join('')), Number(sorted.slice(0, 1).concat(sorted.slice(1).reverse()).join(''))];
      return U.mcq({
        q: `Using each digit <b>${digits.join(', ')}</b> only once, which is the <b>${largest ? 'largest' : 'smallest'}</b> ${len}-digit number?`,
        correct: ans, fmt: U.inr, wrong: w.filter(x => x !== ans && String(x).length === len),
        hint: largest ? 'Put the biggest digit in the highest place.' : 'Put the smallest digit first — but a number cannot start with 0!',
        explain: largest ? `Arrange digits from biggest to smallest: <b>${U.inr(ans)}</b>.` : `Arrange from smallest to biggest${digits.includes(0) ? ', but 0 cannot be first, so put the smallest non-zero digit first and 0 next' : ''}: <b>${U.inr(ans)}</b>.`,
      });
    }
    if (kind === 'round') {
      const to = U.pick([10, 100, 1000]), n = U.ri(1000, 99999);
      const ans = Math.round(n / to) * to;
      if (n % to === 0) return this.gen(level);
      return U.mcq({
        q: `Round <b>${U.inr(n)}</b> to the nearest <b>${to}</b>.`,
        correct: ans, fmt: U.inr, wrong: [Math.floor(n / to) * to === ans ? Math.ceil(n / to) * to : Math.floor(n / to) * to, ans + to, ans - to, Math.round(n / (to * 10)) * to * 10],
        hint: `Look at the digit just right of the ${PLACE[Math.log10(to)]} place: 5 or more → round up.`,
        explain: `${U.inr(n)} is between ${U.inr(Math.floor(n / to) * to)} and ${U.inr(Math.ceil(n / to) * to)}; it is nearer to <b>${U.inr(ans)}</b>.`,
      });
    }
    if (kind === 'expand') {
      const n = U.ri(10000, 99999);
      const parts = String(n).split('').map((d, i, a) => Number(d) * 10 ** (a.length - 1 - i)).filter(x => x > 0);
      return U.mcq({
        q: `${parts.map(U.inr).join(' + ')} = ?`,
        correct: n, fmt: U.inr, wrong: [Number(String(n).split('').filter(d => d !== '0').join('')), n + 1000, n - 10, Number(String(n).split('').reverse().join(''))].filter(x => x !== n && x > 0),
        hint: 'Write each part in its place: ten thousands, thousands, hundreds, tens, ones.',
        explain: `Adding the place values gives <b>${U.inr(n)}</b>.`,
      });
    }
    if (kind === 'extreme') {
      const a = U.ri(2, 5), b = U.ri(2, 5);
      const big = d => 10 ** d - 1, small = d => 10 ** (d - 1);
      const A = U.pick([['largest', big], ['smallest', small]]), B = U.pick([['largest', big], ['smallest', small]]);
      let x = A[1](a), y = B[1](b), op = U.pick(['+', '−']);
      let tA = `${A[0]} ${a}-digit number`, tB = `${B[0]} ${b}-digit number`;
      if (op === '−' && x < y) { [x, y] = [y, x]; [tA, tB] = [tB, tA]; }
      if (x === y) return this.gen(level);
      const ans = op === '+' ? x + y : x - y;
      return U.mcq({
        q: `What is the ${op === '+' ? '<b>sum</b>' : '<b>difference</b>'} of the <b>${tA}</b> and the <b>${tB}</b>?`,
        correct: ans, fmt: U.inr, wrong: [op === '+' ? x - y : x + y, ans + 1, ans - 1, ans + 10],
        hint: 'Largest 3-digit = 999, smallest 3-digit = 100.',
        explain: `${tA[0].toUpperCase() + tA.slice(1)} = ${U.inr(x)}, ${tB} = ${U.inr(y)}.<br>${U.inr(x)} ${op} ${U.inr(y)} = <b>${U.inr(ans)}</b>.`,
      });
    }
    if (kind === 'between') {
      const x = U.ri(100, 5000), y = x + U.ri(20, 900), ans = y - x - 1;
      return U.mcq({
        q: `How many whole numbers are there <b>between</b> ${U.inr(x)} and ${U.inr(y)}?`,
        correct: ans, fmt: U.inr, wrong: [y - x, y - x + 1, y - x - 2],
        hint: 'Try a small example: between 5 and 9 there are 6, 7, 8 → 3 numbers = 9 − 5 − 1.',
        explain: `Numbers between = ${U.inr(y)} − ${U.inr(x)} − 1 = <b>${U.inr(ans)}</b> (both end numbers are not counted).`,
      });
    }
    const len = U.ri(3, 5), large = Math.random() < 0.5;
    const ans = large ? Number('9876543210'.slice(0, len)) : Number(('10' + '23456789').slice(0, len));
    return U.mcq({
      q: `What is the <b>${large ? 'largest' : 'smallest'}</b> ${len}-digit number with <b>all different digits</b>?`,
      correct: ans, fmt: U.inr, wrong: large ? [10 ** len - 1, ans - 1, Number('9876543210'.slice(0, len - 1) + '0')] : [10 ** (len - 1), Number('12345678'.slice(0, len)), ans + 1],
      hint: large ? 'Start with 9, then the next biggest digit that is not used.' : 'Start with 1 (not 0), then 0, then 2 …',
      explain: `${large ? 'Use the biggest digits in order' : 'Use 1 first, then 0, then the next smallest digits'}: <b>${U.inr(ans)}</b>.`,
    });
  },
});

// ---------------------------------------------------------------- Roman Numerals
function toRoman(n) {
  const v = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
  let s = ''; for (const [k, r] of v) while (n >= k) { s += r; n -= k; } return s;
}
function romanSteps(n) {
  const parts = [], v = [[100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
  for (const [k, r] of v) while (n >= k) { parts.push(`${r}(${k})`); n -= k; }
  return parts.join(' + ');
}
registerGen({
  id: 'roman', section: 'math', icon: '🏛️', title: 'Roman Numerals',
  desc: 'I, V, X, L, C — read, write and calculate.',
  gen(level) {
    const max = level === 1 ? 20 : level === 2 ? 100 : 399;
    const min = level === 1 ? 1 : level === 2 ? 20 : 40;
    const kind = level === 3 ? U.pick(['toR', 'toN', 'add', 'big']) : U.pick(['toR', 'toN']);
    const n = U.ri(min, max);
    if (kind === 'toR') {
      const r = toRoman(n);
      const wrong = [toRoman(n + 1), toRoman(Math.max(1, n - 1)), r.replace('IV', 'IIII').replace('IX', 'VIIII').replace('XL', 'XXXX').replace('XC', 'LXXXX'), r.replace('IV', 'VI').replace('IX', 'XI').replace('XL', 'LX').replace('XC', 'CX'), toRoman(n + 10), toRoman(n + 5)];
      return U.mcq({
        q: `Write <b>${n}</b> in Roman numerals.`, correct: r, wrong,
        hint: 'I=1, V=5, X=10, L=50, C=100. A smaller numeral before a bigger one means subtract (IV = 4).',
        explain: `${n} = ${romanSteps(n)} = <b>${r}</b>.`,
      });
    }
    if (kind === 'toN') {
      const r = toRoman(n);
      return U.mcq({
        q: `What number is <b>${r}</b>?`, correct: n, wrong: [n + 2, n - 2, n + 10, n - 10].filter(x => x > 0),
        hint: 'Add the values. If a smaller value is before a bigger one, subtract it.',
        explain: `${r} = ${romanSteps(n)} = <b>${n}</b>.`,
      });
    }
    if (kind === 'add') {
      const a = U.ri(10, 60), b = U.ri(5, 39), plus = Math.random() < 0.6;
      const x = plus ? a : a + b, ans = plus ? a + b : a;
      return U.mcq({
        q: `<b>${toRoman(x)}</b> ${plus ? '+' : '−'} <b>${toRoman(b)}</b> = ?`, correct: toRoman(ans),
        wrong: [toRoman(ans + 1), toRoman(ans - 1), toRoman(ans + 10), toRoman(ans + 5), toRoman(ans - 5)],
        hint: 'Change both to numbers, calculate, then change back to Roman.',
        explain: `${toRoman(x)} = ${x}, ${toRoman(b)} = ${b}. ${x} ${plus ? '+' : '−'} ${b} = ${ans} = <b>${toRoman(ans)}</b>.`,
      });
    }
    const nums = []; while (nums.length < 4) { const v = U.ri(20, 150); if (!nums.includes(v)) nums.push(v); }
    const biggest = Math.max(...nums);
    return U.mcq({
      q: 'Which Roman numeral has the <b>greatest</b> value?', correct: toRoman(biggest), wrong: nums.filter(x => x !== biggest).map(toRoman),
      hint: 'Change each one to a number first. Longer does not always mean bigger!',
      explain: nums.map(x => `${toRoman(x)} = ${x}`).join(', ') + `.<br>Greatest: <b>${toRoman(biggest)}</b>.`,
    });
  },
});

// ---------------------------------------------------------------- Four Operations
registerGen({
  id: 'operations', section: 'math', icon: '➕', title: 'Word Problems',
  desc: 'Addition, subtraction, multiplication and division stories.',
  gen(level) {
    const name = U.pick(ALL_NAMES);
    const T1 = [
      () => { const a = U.ri(150, 900), b = U.ri(150, 900); return [`A school has <b>${a}</b> boys and <b>${b}</b> girls. How many students are there in all?`, a + b, [a + b + 100, a + b - 10, Math.abs(a - b)], `${a} + ${b} = ${a + b}`]; },
      () => { const a = U.ri(500, 2000), b = U.ri(100, a - 50); return [`${name} had <b>₹${U.inr(a)}</b>. ${name} spent <b>₹${U.inr(b)}</b> on books. How much money is left?`, a - b, [a + b, a - b + 100, a - b - 10], `₹${a} − ₹${b} = ₹${a - b}`]; },
      () => { const a = U.ri(1000, 5000), b = U.ri(1000, 4000); return [`A farmer picked <b>${U.inr(a)}</b> mangoes on Monday and <b>${U.inr(b)}</b> on Tuesday. How many mangoes did he pick in all?`, a + b, [a + b - 1000, a + b + 10, Math.abs(a - b)], `${a} + ${b} = ${a + b}`]; },
      () => { const a = U.ri(2000, 9000), b = U.ri(500, a - 500); return [`A library had <b>${U.inr(a)}</b> books. <b>${U.inr(b)}</b> books were given to another school. How many books are left?`, a - b, [a + b, a - b + 1000, a - b - 100], `${a} − ${b} = ${a - b}`]; },
      () => { const a = U.ri(12, 99), b = U.ri(2, 9); return [`One box holds <b>${a}</b> pencils. How many pencils are there in <b>${b}</b> boxes?`, a * b, [a + b, a * b + a, a * b - b], `${a} × ${b} = ${a * b}`]; },
    ];
    const T2 = [
      () => { const a = U.ri(12, 48), b = U.ri(11, 45); return [`One box holds <b>${a}</b> pencils. How many pencils are there in <b>${b}</b> boxes?`, a * b, [a * b + a, a * b - b, a * (b - 1)], `${a} × ${b} = ${a * b}`]; },
      () => { const b = U.ri(3, 12), q = U.ri(12, 85); return [`<b>${b * q}</b> chocolates are shared equally among <b>${b}</b> children. How many chocolates does each child get?`, q, [q + 1, q - 1, q + b], `${b * q} ÷ ${b} = ${q}`]; },
      () => { const a = U.ri(35, 60), b = U.ri(12, 40); return [`A bus can carry <b>${a}</b> passengers. How many passengers can <b>${b}</b> such buses carry?`, a * b, [a * b + 10, a * b - a, a + b], `${a} × ${b} = ${a * b}`]; },
      () => { const k = U.ri(3, 9), q = U.ri(21, 150); return [`<b>?</b> × ${k} = <b>${U.inr(k * q)}</b>. Find the missing number.`, q, [q + 1, q - 1, q * 2, k * q - k], `${k * q} ÷ ${k} = ${q}`]; },
      () => { const a = U.ri(101, 999), b = U.ri(2, 9); return [`${a} × ${b} = ?`, a * b, [a * b + 10, a * b - 100, a * b + b], `${a} × ${b} = ${a * b}`]; },
      () => { const b = U.ri(4, 9), q = U.ri(105, 999); return [`${U.inr(b * q)} ÷ ${b} = ?`, q, [q + 10, q - 1, q + 100], `${b * q} ÷ ${b} = ${q}`]; },
    ];
    const T3 = [
      () => { const b = U.ri(3, 9), a = b * 30 + U.ri(10, 200); return [`A shopkeeper had <b>${a}</b> eggs. He sold <b>${b}</b> trays with 30 eggs in each tray. How many eggs are left?`, a - b * 30, [a - b - 30, a - b * 30 + 30, b * 30], `${b} × 30 = ${b * 30}; ${a} − ${b * 30} = ${a - b * 30}`]; },
      () => { const n = U.ri(3, 9), p = U.ri(12, 45), note = n * p < 100 ? 100 : n * p < 200 ? 200 : 500; return [`${name} buys <b>${n}</b> notebooks at <b>₹${p}</b> each and gives a <b>₹${note}</b> note. How much change will ${name} get back?`, note - n * p, [note - n * p + 10, n * p, note - p], `${n} × ₹${p} = ₹${n * p}; ₹${note} − ₹${n * p} = ₹${note - n * p}`]; },
      () => { const a = U.ri(12, 40), b = U.ri(12, 40); return [`The product of two numbers is <b>${a * b}</b>. One number is <b>${a}</b>. What is the other number?`, b, [b + 1, b - 1, a * b - a], `${a * b} ÷ ${a} = ${b}`]; },
      () => { let b = U.ri(4, 9), q = U.ri(20, 200), r = U.ri(1, b - 1); return [`What is the <b>remainder</b> when <b>${b * q + r}</b> is divided by <b>${b}</b>?`, r, [r + 1, r - 1, q, b - r].filter(x => x !== r && x >= 0), `${b * q + r} = ${b} × ${q} + ${r}; remainder = ${r}`]; },
      () => { const x = U.ri(10, 300); return [`The sum of three consecutive numbers is <b>${3 * x + 3}</b>. What is the <b>smallest</b> number?`, x, [x + 1, x + 2, x - 1], `Numbers: x, x+1, x+2 → 3x + 3 = ${3 * x + 3} → 3x = ${3 * x} → x = ${x}`]; },
      () => { const n = U.ri(4, 9), p = U.ri(5, 25), k = U.ri(2, 15); return [`If <b>${n}</b> pens cost <b>₹${n * p}</b>, what is the cost of <b>${k}</b> pens?`, k * p, [k * p + p, n * p + k, k * n], `1 pen = ₹${n * p} ÷ ${n} = ₹${p}; ${k} pens = ${k} × ₹${p} = ₹${k * p}`]; },
      () => { const d = U.ri(15, 30), w = U.ri(5, 12); return [`A factory makes <b>${d * 7}</b> toys every week. How many toys does it make in <b>${w}</b> weeks?`, d * 7 * w, [d * 7 * w + d, d * w, d * 7 + w], `${d * 7} × ${w} = ${d * 7 * w}`]; },
    ];
    const [q, ans, wrong, steps] = U.pick(level === 1 ? T1 : level === 2 ? T2 : T3)();
    return U.mcq({
      q, correct: ans, fmt: U.inr, wrong,
      hint: level === 1 ? 'Words like "in all", "total" mean add; "left", "spent" mean subtract.' : 'Write down what is given and what is asked. Then choose ×, ÷, + or −.',
      explain: `${steps}.<br>Answer: <b>${U.inr(ans)}</b>.`,
    });
  },
});

// ---------------------------------------------------------------- Factors & Multiples
registerGen({
  id: 'factors', section: 'math', icon: '✖️', title: 'Factors & Multiples',
  desc: 'Tables, factors, divisibility, primes, LCM and HCF.',
  gen(level) {
    const kind = level === 1 ? U.pick(['multOf', 'factOf', 'nth']) : level === 2 ? U.pick(['count', 'div', 'common', 'prime']) : U.pick(['lcm', 'hcf', 'primeCount', 'sumF', 'addTo']);
    if (kind === 'multOf') {
      const k = U.ri(3, 9), ans = k * U.ri(3, 12), wrong = [];
      while (wrong.length < 3) { const v = U.ri(k * 2, k * 12); if (v % k && !wrong.includes(v)) wrong.push(v); }
      return U.mcq({ q: `Which of these is a <b>multiple of ${k}</b>?`, correct: ans, wrong,
        hint: `A multiple of ${k} is in the table of ${k}.`, explain: `${ans} = ${k} × ${ans / k}, so <b>${ans}</b> is a multiple of ${k}.` });
    }
    if (kind === 'factOf') {
      const n = U.pick([12, 18, 20, 24, 28, 30, 36, 40, 42, 45, 48, 60]);
      const fs = U.factors(n).filter(f => f > 1 && f < n), ans = U.pick(fs), wrong = [];
      while (wrong.length < 3) { const v = U.ri(2, n - 1); if (n % v && !wrong.includes(v)) wrong.push(v); }
      return U.mcq({ q: `Which of these is a <b>factor of ${n}</b>?`, correct: ans, wrong,
        hint: `A factor divides ${n} exactly (no remainder).`, explain: `${n} ÷ ${ans} = ${n / ans} exactly. Factors of ${n}: ${U.factors(n).join(', ')}.` });
    }
    if (kind === 'nth') {
      const k = U.ri(3, 12), n = U.ri(4, 12);
      return U.mcq({ q: `What is the <b>${ord(n)} multiple</b> of <b>${k}</b>?`, correct: k * n, wrong: [k * (n + 1), k * (n - 1), k + n],
        hint: `The ${ord(n)} multiple = ${k} × ${n}.`, explain: `${k} × ${n} = <b>${k * n}</b>.` });
    }
    if (kind === 'count') {
      const n = U.pick([6, 8, 10, 12, 15, 16, 18, 20, 24, 28, 30, 36, 40, 48]), c = U.factors(n).length;
      return U.mcq({ q: `How many factors does <b>${n}</b> have?`, correct: c, wrong: [c - 1, c + 1, c + 2, c - 2].filter(x => x > 0),
        hint: 'Find pairs that multiply to give the number: 1 × n, 2 × …', explain: `Factors of ${n}: ${U.factors(n).join(', ')} → <b>${c}</b> factors.` });
    }
    if (kind === 'div') {
      const k = U.pick([3, 9, 4, 5, 6]);
      const rule = { 3: 'the sum of its digits is divisible by 3', 9: 'the sum of its digits is divisible by 9', 4: 'the number made by its last two digits is divisible by 4', 5: 'its last digit is 0 or 5', 6: 'it is even AND the sum of its digits is divisible by 3' }[k];
      const ans = k * U.ri(150, 1100), wrong = [];
      while (wrong.length < 3) { const v = U.ri(1000, 9999); if (v % k && !wrong.includes(v)) wrong.push(v); }
      const ds = String(ans).split('').map(Number);
      return U.mcq({ q: `Which number is <b>divisible by ${k}</b>?`, correct: ans, wrong, fmt: String,
        hint: `Divisibility rule for ${k}: ${rule}.`,
        explain: `A number is divisible by ${k} if ${rule}.<br>${k === 3 || k === 9 || k === 6 ? `${ans}: ${ds.join(' + ')} = ${ds.reduce((a, b) => a + b, 0)}. ` : ''}<b>${ans}</b> = ${k} × ${ans / k}.` });
    }
    if (kind === 'common') {
      const g = U.pick([2, 3, 4, 5, 6]), a = g * U.ri(2, 9), b = g * U.ri(2, 9);
      if (a === b) return this.gen(level);
      const common = U.factors(U.gcd(a, b)).filter(f => f > 1), ans = U.pick(common);
      const wrong = U.shuffle([...U.factors(a), ...U.factors(b)].filter(f => !common.includes(f) && f > 1));
      if (wrong.length < 2) return this.gen(level);
      return U.mcq({ q: `Which is a <b>common factor</b> of <b>${a}</b> and <b>${b}</b>?`, correct: ans, wrong: wrong.concat([a + b, 7 * 11]),
        hint: 'It must divide BOTH numbers exactly.', explain: `Factors of ${a}: ${U.factors(a).join(', ')}.<br>Factors of ${b}: ${U.factors(b).join(', ')}.<br>Common factor: <b>${ans}</b>.` });
    }
    if (kind === 'prime') {
      const ans = U.pick([11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]);
      const wrong = U.sample([9, 15, 21, 25, 27, 33, 35, 39, 49, 51, 57], 3);
      return U.mcq({ q: 'Which of these is a <b>prime number</b>?', correct: ans, wrong,
        hint: 'A prime number has only two factors: 1 and itself.', explain: `${wrong.map(w => `${w} = ${U.factors(w)[1]} × ${w / U.factors(w)[1]}`).join(', ')}.<br><b>${ans}</b> has only the factors 1 and ${ans}, so it is prime.` });
    }
    if (kind === 'lcm') {
      let ns, l;
      do { ns = U.sample([2, 3, 4, 5, 6, 8, 9, 10, 12], U.ri(2, 3)).sort((a, b) => a - b); l = ns.reduce(U.lcm); } while (l > 120 || l === Math.max(...ns));
      const prod = ns.reduce((a, b) => a * b);
      return U.mcq({ q: `What is the <b>smallest</b> number that is divisible by <b>${ns.slice(0, -1).join(', ')} and ${ns[ns.length - 1]}</b>?`, correct: l, wrong: [prod, l * 2, l + ns[0], l / 2 % 1 ? l + 2 : l / 2],
        hint: 'Write the multiples of the biggest number and test each one.', explain: `Multiples of ${ns[ns.length - 1]}: ${U.range(l / ns[ns.length - 1]).map(i => (i + 1) * ns[ns.length - 1]).join(', ')}.<br>The first one divisible by all is <b>${l}</b> (this is the LCM).` });
    }
    if (kind === 'hcf') {
      const g = U.ri(2, 15); let a, b;
      do { a = U.ri(2, 8); b = U.ri(2, 8); } while (a === b || U.gcd(a, b) !== 1);
      const x = g * a, y = g * b;
      return U.mcq({ q: `What is the <b>greatest</b> number that divides both <b>${x}</b> and <b>${y}</b> exactly?`, correct: g, wrong: [U.factors(g).length > 2 ? U.factors(g)[1] : g + 1, g * 2, Math.abs(x - y) === g ? g + 2 : Math.abs(x - y), U.lcm(x, y)],
        hint: 'List the factors of both numbers and find the biggest common one.', explain: `Factors of ${x}: ${U.factors(x).join(', ')}.<br>Factors of ${y}: ${U.factors(y).join(', ')}.<br>Greatest common factor (HCF) = <b>${g}</b>.` });
    }
    if (kind === 'primeCount') {
      const a = U.pick([1, 10, 20, 30]), b = a + U.pick([10, 20]);
      const ps = U.range(b - a - 1).map(i => a + 1 + i).filter(U.isPrime);
      return U.mcq({ q: `How many <b>prime numbers</b> are there between <b>${a}</b> and <b>${b}</b>?`, correct: ps.length, wrong: [ps.length + 1, ps.length - 1, ps.length + 2].filter(x => x >= 0),
        hint: 'Check each odd number: does it have a factor other than 1 and itself?', explain: `Primes between ${a} and ${b}: ${ps.join(', ')} → <b>${ps.length}</b>.` });
    }
    if (kind === 'sumF') {
      const n = U.pick([6, 8, 10, 12, 15, 16, 18, 20, 24]), f = U.factors(n), s = f.reduce((a, b) => a + b, 0);
      return U.mcq({ q: `What is the <b>sum of all the factors</b> of <b>${n}</b>?`, correct: s, wrong: [s - n, s - 1, s + 2, s - n - 1],
        hint: 'Do not forget 1 and the number itself!', explain: `Factors of ${n}: ${f.join(' + ')} = <b>${s}</b>.` });
    }
    const k = U.pick([3, 4, 6, 7, 8, 9]), n = U.ri(50, 500);
    const r = n % k, ans = r === 0 ? 0 : k - r;
    if (ans === 0) return this.gen(level);
    return U.mcq({ q: `What is the <b>smallest</b> number to be <b>added</b> to <b>${n}</b> so that it becomes divisible by <b>${k}</b>?`, correct: ans, wrong: [r, ans + k, ans + 1, ans - 1].filter(x => x > 0 && x !== ans),
      hint: `Divide ${n} by ${k} and look at the remainder.`, explain: `${n} ÷ ${k} leaves remainder ${r}. Add ${k} − ${r} = <b>${ans}</b> → ${n + ans} = ${k} × ${(n + ans) / k}.` });
  },
});

// ---------------------------------------------------------------- Fractions
function fracMcq(o) {
  // o.correct = [n,d]; o.wrong = [[n,d],...]; removes options equal in value to the answer.
  const val = f => f[0] / f[1];
  const wrong = o.wrong.filter(f => f[1] > 0 && f[0] >= 0 && Math.abs(val(f) - val(o.correct)) > 1e-9);
  return U.mcq(Object.assign({}, o, { correct: o.correct, wrong, fmt: f => U.frac(f[0], f[1]) }));
}
registerGen({
  id: 'fractions', section: 'math', icon: '🍕', title: 'Fractions',
  desc: 'Shaded parts, comparing, and fraction of a number.',
  gen(level) {
    const kind = level === 1 ? U.pick(['shaded', 'shaded', 'compareLike', 'half']) : level === 2 ? U.pick(['ofQty', 'addLike', 'equiv', 'shaded']) : U.pick(['story', 'boys', 'compareUnlike', 'ofQty']);
    if (kind === 'shaded') {
      const d = U.ri(3, level === 1 ? 8 : 12), n = U.ri(1, d - 1);
      return fracMcq({
        q: 'What fraction of the shape is <b>shaded</b>?', visual: Math.random() < 0.5 ? SVG.fractionPie(n, d) : SVG.fractionBar(n, d),
        correct: [n, d], wrong: [[d - n, d], [n, d - n], [d, n], [n + 1, d], [n, d + 1]],
        hint: 'Count all the equal parts (bottom number) and the shaded parts (top number).',
        explain: `There are ${d} equal parts and ${n} ${n === 1 ? 'is' : 'are'} shaded → ${U.frac(n, d)}.`,
      });
    }
    if (kind === 'compareLike') {
      const d = U.ri(5, 12), ns = U.sample(U.range(d - 1).map(i => i + 1), 4), big = Math.random() < 0.6;
      const ans = big ? Math.max(...ns) : Math.min(...ns);
      return fracMcq({
        q: `Which fraction is the <b>${big ? 'greatest' : 'smallest'}</b>?`, correct: [ans, d], wrong: ns.filter(x => x !== ans).map(x => [x, d]),
        hint: 'When the bottom numbers are the same, compare the top numbers.',
        explain: `All have denominator ${d}. The ${big ? 'biggest' : 'smallest'} numerator is ${ans}, so ${U.frac(ans, d)} is the ${big ? 'greatest' : 'smallest'}.`,
      });
    }
    if (kind === 'half') {
      const d = U.pick([2, 3, 4]), name = { 2: 'half', 3: 'one-third', 4: 'one-fourth (a quarter)' }[d], q = U.ri(3, 25), N = d * q;
      return U.mcq({
        q: `What is <b>${name}</b> of <b>${N}</b>?`, correct: q, wrong: [N - q, q + d, q * 2, N / 2 === q ? q + 1 : N / 2],
        hint: `${name.split(' ')[0]} of a number = number ÷ ${d}.`,
        explain: `${U.frac(1, d)} of ${N} = ${N} ÷ ${d} = <b>${q}</b>.`,
      });
    }
    if (kind === 'ofQty') {
      const d = U.pick([3, 4, 5, 6, 8, 10]), n = U.ri(2, d - 1), q = U.ri(2, 15), N = d * q;
      const unit = U.pick(['', ' rupees', ' kg', ' students', ' m']);
      return U.mcq({
        q: `Find ${U.frac(n, d)} of <b>${N}${unit}</b>.`, correct: n * q, fmt: x => x + unit, wrong: [q, N - n * q, n * q + q, n * d],
        hint: `First find ${U.frac(1, d)} (divide by ${d}), then multiply by ${n}.`,
        explain: `${U.frac(1, d)} of ${N} = ${N} ÷ ${d} = ${q}. So ${U.frac(n, d)} = ${n} × ${q} = <b>${n * q}${unit}</b>.`,
      });
    }
    if (kind === 'addLike') {
      const d = U.ri(5, 15), a = U.ri(1, d - 2), b = U.ri(1, d - 1 - a), add = Math.random() < 0.6;
      const [x, y] = add ? [a, b] : [a + b, b];
      const r = add ? a + b : a;
      return fracMcq({
        q: `${U.frac(x, d)} ${add ? '+' : '−'} ${U.frac(y, d)} = ?`, correct: [r, d], wrong: [[r, d * 2], [add ? x + y : x - y, add ? 2 * d : 0], [r + 1, d], [add ? Math.max(1, x - y) : x + y, d]],
        hint: 'When the denominators are the same, add or subtract only the numerators.',
        explain: `${x} ${add ? '+' : '−'} ${y} = ${r}, denominator stays ${d} → ${U.frac(r, d)}.`,
      });
    }
    if (kind === 'equiv') {
      const d = U.ri(2, 6), n = U.ri(1, d - 1), k = U.ri(2, 5);
      if (U.gcd(n, d) !== 1) return this.gen(level);
      return U.mcq({
        q: `${U.frac(n, d)} = ${U.frac('?', d * k)} &nbsp; Find the missing number.`, correct: n * k, wrong: [n + k, n * k + 1, d * k - n, n * (k + 1)],
        hint: `The bottom number was multiplied by ${k}. Do the same to the top.`,
        explain: `${d} × ${k} = ${d * k}, so ${n} × ${k} = <b>${n * k}</b>. ${U.frac(n, d)} = ${U.frac(n * k, d * k)}.`,
      });
    }
    if (kind === 'story') {
      const d = U.pick([8, 10, 12]), a = U.ri(1, 4), b = U.ri(1, Math.min(4, d - a - 2)), left = d - a - b;
      const [p1, p2] = U.sample(ALL_NAMES, 2);
      return fracMcq({
        q: `A cake was cut into <b>${d}</b> equal pieces. ${p1} ate <b>${a}</b> pieces and ${p2} ate <b>${b}</b> pieces. What fraction of the cake is <b>left</b>?`,
        correct: [left, d], wrong: [[a + b, d], [left, a + b], [left + 1, d], [left - 1, d]],
        hint: 'Find how many pieces are left first.',
        explain: `Pieces eaten = ${a} + ${b} = ${a + b}. Pieces left = ${d} − ${a + b} = ${left}.<br>Fraction left = ${U.frac(left, d)}.`,
      });
    }
    if (kind === 'boys') {
      const d = U.pick([4, 5, 8, 10]), n = U.ri(1, d - 1), q = U.ri(4, 6), N = d * q, girls = n * q;
      return U.mcq({
        q: `There are <b>${N}</b> students in a class. ${U.frac(n, d)} of them are girls. How many <b>boys</b> are there?`,
        correct: N - girls, wrong: [girls, q, N - q, N - girls + d],
        hint: 'Find the number of girls first, then subtract from the total.',
        explain: `Girls = ${U.frac(n, d)} of ${N} = ${N} ÷ ${d} × ${n} = ${girls}.<br>Boys = ${N} − ${girls} = <b>${N - girls}</b>.`,
      });
    }
    // compare unlike with same numerator
    const n = U.ri(1, 5), ds = U.sample([2, 3, 4, 5, 6, 7, 8, 9, 10, 12].filter(x => x > n), 4), big = Math.random() < 0.5;
    const ad = big ? Math.min(...ds) : Math.max(...ds);
    return fracMcq({
      q: `Which fraction is the <b>${big ? 'greatest' : 'smallest'}</b>?`, correct: [n, ad], wrong: ds.filter(x => x !== ad).map(x => [n, x]),
      hint: 'Same top number? The more parts the whole is cut into, the smaller each part is.',
      explain: `All have numerator ${n}. The ${big ? 'smaller' : 'bigger'} the denominator, the ${big ? 'bigger' : 'smaller'} the fraction. Answer: ${U.frac(n, ad)}.`,
    });
  },
});

// ---------------------------------------------------------------- Measurement
const kgg = g => `${Math.floor(g / 1000)} kg ${g % 1000} g`;
const mcm = c => `${Math.floor(c / 100)} m ${c % 100} cm`;
const lml = ml => `${Math.floor(ml / 1000)} L ${ml % 1000} mL`;
const hm = mins => `${Math.floor(mins / 60)} h ${mins % 60} min`;
function clock12(mins) { // minutes since midnight -> "h:mm am/pm"
  mins = ((mins % 1440) + 1440) % 1440;
  const h = Math.floor(mins / 60), m = mins % 60, ap = h < 12 ? 'am' : 'pm';
  return `${h % 12 || 12}:${U.pad2(m)} ${ap}`;
}
registerGen({
  id: 'measure', section: 'math', icon: '📏', title: 'Measurement',
  desc: 'Length, weight, capacity, money and time.',
  gen(level) {
    if (level === 1) {
      const C = [
        ['km', 'm', 1000], ['m', 'cm', 100], ['kg', 'g', 1000], ['L', 'mL', 1000], ['rupees', 'paise', 100], ['hours', 'minutes', 60], ['minutes', 'seconds', 60], ['days', 'hours', 24], ['weeks', 'days', 7], ['years', 'months', 12],
      ];
      const [big, small, f] = U.pick(C), n = U.ri(2, 9);
      if (Math.random() < 0.3 && f >= 100) {
        const extra = U.ri(1, f - 1);
        return U.mcq({ q: `<b>${n} ${big} ${extra} ${small}</b> = ? ${small}`, correct: n * f + extra, wrong: [n * f, n * 100 + extra, n * f - extra, n * 10 + extra],
          hint: `1 ${big.replace(/s$/, '')} = ${f} ${small}.`, explain: `${n} × ${f} + ${extra} = <b>${n * f + extra} ${small}</b>.` });
      }
      return U.mcq({ q: `<b>${n} ${big}</b> = ? ${small}`, correct: n * f, wrong: [n * 10, n * 100, n * 1000, n * 60, n + f].filter(x => x !== n * f),
        hint: `1 ${big.replace(/s$/, '')} = ${f} ${small}.`, explain: `1 ${big.replace(/s$/, '')} = ${f} ${small}, so ${n} ${big} = ${n} × ${f} = <b>${n * f} ${small}</b>.` });
    }
    if (level === 2) {
      const kind = U.pick(['kgAdd', 'split', 'money', 'hrs', '24h']);
      if (kind === 'kgAdd') {
        const unit = U.pick(['kg', 'L']), f = unit === 'kg' ? kgg : lml;
        const a = U.ri(1, 5) * 1000 + U.ri(1, 19) * 50, b = U.ri(1, 5) * 1000 + U.ri(1, 19) * 50, s = a + b;
        return U.mcq({ q: `<b>${f(a)}</b> + <b>${f(b)}</b> = ?`, correct: f(s), wrong: [f(s - 1000), f(s + 1000), f(s - 100), f(s + 50)],
          hint: `Add the small units first. 1000 ${unit === 'kg' ? 'g' : 'mL'} = 1 ${unit}.`, explain: `${a % 1000} + ${b % 1000} = ${a % 1000 + b % 1000} ${unit === 'kg' ? 'g' : 'mL'}${a % 1000 + b % 1000 >= 1000 ? ` = 1 ${unit} ${(a + b) % 1000} ${unit === 'kg' ? 'g' : 'mL'} (carry 1 ${unit})` : ''}.<br>Answer: <b>${f(s)}</b>.` });
      }
      if (kind === 'split') {
        const g = U.ri(1, 9) * 1000 + U.pick([U.ri(1, 9) * 100, U.ri(1, 99) * 5, U.ri(1, 9) * 10]);
        const r = g % 1000;
        return U.mcq({ q: `<b>${U.inr(g)} g</b> = ?`, correct: kgg(g), wrong: [`${Math.floor(g / 100)} kg ${g % 100} g`, `${Math.floor(g / 1000)} kg ${r * 10 % 1000} g`, `${Math.floor(g / 1000) + 1} kg ${r} g`, `${Math.floor(g / 10)} kg ${g % 10} g`],
          hint: '1000 g = 1 kg.', explain: `${U.inr(g)} g = ${Math.floor(g / 1000)} × 1000 g + ${r} g = <b>${kgg(g)}</b>.` });
      }
      if (kind === 'money') {
        const a = U.ri(10, 300) * 100 + U.ri(1, 19) * 5, b = U.ri(10, 300) * 100 + U.ri(1, 19) * 5, plus = Math.random() < 0.6;
        const [x, y] = plus ? [a, b] : [Math.max(a, b), Math.min(a, b)], r = plus ? x + y : x - y;
        return U.mcq({ q: `<b>${U.rupees(x)}</b> ${plus ? '+' : '−'} <b>${U.rupees(y)}</b> = ?`, correct: r, fmt: U.rupees, wrong: [r + 100, r - 100, r + 10, plus ? r - 1 : r + 1],
          hint: '100 paise = ₹1. Line up the decimal points.', explain: `${U.rupees(x)} ${plus ? '+' : '−'} ${U.rupees(y)} = <b>${U.rupees(r)}</b>.` });
      }
      if (kind === 'hrs') {
        const h = U.ri(1, 5), m = U.ri(5, 55);
        return U.mcq({ q: `How many minutes are there in <b>${h} hours ${m} minutes</b>?`, correct: h * 60 + m, wrong: [h * 100 + m, h * 60, h + m, h * 60 + m + 10],
          hint: '1 hour = 60 minutes.', explain: `${h} × 60 + ${m} = <b>${h * 60 + m} minutes</b>.` });
      }
      const mins = U.ri(13, 23) * 60 + 5 * U.ri(0, 11), h = Math.floor(mins / 60), m = mins % 60;
      const to24 = Math.random() < 0.5;
      const t24 = `${U.pad2(h)}:${U.pad2(m)}`, t12 = clock12(mins);
      return to24
        ? U.mcq({ q: `Write <b>${t12}</b> in 24-hour clock time.`, correct: t24, wrong: [`${U.pad2(h - 12)}:${U.pad2(m)}`, `${U.pad2(h + 1)}:${U.pad2(m)}`, `${U.pad2(h - 2)}:${U.pad2(m)}`],
          hint: 'For pm times (after 1 pm), add 12 to the hours.', explain: `${h - 12} + 12 = ${h}, so ${t12} = <b>${t24}</b>.` })
        : U.mcq({ q: `What is <b>${t24}</b> (24-hour clock) in 12-hour time?`, correct: t12, wrong: [clock12(mins - 120), clock12(mins - 720), clock12(mins + 60)],
          hint: 'If the hour is more than 12, subtract 12 and write pm.', explain: `${h} − 12 = ${h - 12}, so ${t24} = <b>${t12}</b>.` });
    }
    const kind = U.pick(['rope', 'travel', 'glasses', 'cost', 'change']);
    if (kind === 'rope') {
      const L = U.ri(8, 20) * 100, n = U.ri(2, 4), p = U.ri(1, 3) * 100 + U.pick([25, 50, 75, 20, 40]), left = L - n * p;
      if (left <= 0) return this.gen(level);
      return U.mcq({ q: `A rope is <b>${L / 100} m</b> long. <b>${n}</b> pieces of <b>${mcm(p)}</b> each are cut from it. How much rope is left?`, correct: mcm(left), wrong: [mcm(n * p), mcm(left + 100), mcm(left - p > 0 ? left - p : left + 50), mcm(L - p)],
        hint: 'Change everything to cm, then subtract.', explain: `${n} × ${p} cm = ${n * p} cm. ${L} cm − ${n * p} cm = ${left} cm = <b>${mcm(left)}</b>.` });
    }
    if (kind === 'travel') {
      const start = U.ri(6, 11) * 60 + 5 * U.ri(0, 11), dur = U.ri(1, 4) * 60 + 5 * U.ri(1, 11), end = start + dur;
      return U.mcq({ q: `A bus leaves Pune at <b>${clock12(start)}</b>. The journey takes <b>${hm(dur)}</b>. At what time does it reach?`, correct: clock12(end), wrong: [clock12(end + 60), clock12(end - 60), clock12(end + 40), clock12(end - 40)],
        hint: 'Add the hours first, then the minutes. 60 minutes = 1 hour.', explain: `${clock12(start)} + ${hm(dur)} = <b>${clock12(end)}</b>.` });
    }
    if (kind === 'glasses') {
      const g = U.pick([200, 250, 125, 500]), n = U.ri(2, 12), total = g * n;
      return U.mcq({ q: `A jug holds <b>${total >= 1000 ? lml(total) : total + ' mL'}</b> of juice. How many glasses of <b>${g} mL</b> can be filled from it?`, correct: n, wrong: [n + 1, n - 1, n * 2, n + 2].filter(x => x > 0),
        hint: 'Change litres to mL (1 L = 1000 mL), then divide.', explain: `${total} mL ÷ ${g} mL = <b>${n}</b> glasses.` });
    }
    if (kind === 'cost') {
      const kg = U.ri(5, 25), p = U.ri(25, 80);
      return U.mcq({ q: `Rice costs <b>₹${p} per kg</b>. What is the cost of a <b>${kg} kg</b> bag?`, correct: kg * p, fmt: x => '₹' + U.inr(x), wrong: [kg * p + p, kg * p - 10, kg + p, kg * (p + 1)],
        hint: 'Cost = rate × quantity.', explain: `${kg} × ₹${p} = <b>₹${U.inr(kg * p)}</b>.` });
    }
    const a = U.ri(50, 200) * 100 + U.ri(1, 19) * 5, b = U.ri(30, 150) * 100 + U.ri(1, 19) * 5, note = a + b < 50000 ? 50000 : 100000;
    const r = note - a - b;
    return U.mcq({ q: `${U.pick(ALL_NAMES)} buys a bag for <b>${U.rupees(a)}</b> and a water bottle for <b>${U.rupees(b)}</b>, and pays with a <b>₹${note / 100}</b> note. How much change is returned?`, correct: r, fmt: U.rupees, wrong: [r + 100, r - 100, a + b, r + 10].filter(x => x > 0),
      hint: 'Add the prices first, then subtract from the money given.', explain: `${U.rupees(a)} + ${U.rupees(b)} = ${U.rupees(a + b)}.<br>₹${note / 100}.00 − ${U.rupees(a + b)} = <b>${U.rupees(r)}</b>.` });
  },
});

// ---------------------------------------------------------------- Geometry
registerGen({
  id: 'geometry', section: 'math', icon: '📐', title: 'Perimeter, Area & Shapes',
  desc: 'Perimeter, area, circles and angles.',
  gen(level) {
    const unit = U.pick(['cm', 'm']);
    const kind = level === 1 ? U.pick(['perRect', 'perSq', 'grid', 'circle']) : level === 2 ? U.pick(['areaRect', 'areaSq', 'sideFromPer', 'breadth', 'triPer']) : U.pick(['lshape', 'lshapePer', 'sqAreaPer', 'fence', 'tiles']);
    if (kind === 'perRect' || kind === 'areaRect') {
      const l = U.ri(4, 20), b = U.ri(2, l - 1), per = kind === 'perRect';
      const ans = per ? 2 * (l + b) : l * b;
      return U.mcq({ q: `Find the <b>${per ? 'perimeter' : 'area'}</b> of this rectangle.`, visual: SVG.rect(l, b, unit),
        correct: ans, fmt: x => per ? `${x} ${unit}` : `${x} sq ${unit}`, wrong: per ? [l + b, l * b, 2 * l + b] : [2 * (l + b), l + b, l * b + l],
        hint: per ? 'Perimeter = 2 × (length + breadth).' : 'Area = length × breadth.',
        explain: per ? `Perimeter = 2 × (${l} + ${b}) = 2 × ${l + b} = <b>${ans} ${unit}</b>.` : `Area = ${l} × ${b} = <b>${ans} sq ${unit}</b>.` });
    }
    if (kind === 'perSq' || kind === 'areaSq') {
      const s = U.ri(3, 15), per = kind === 'perSq', ans = per ? 4 * s : s * s;
      return U.mcq({ q: `Find the <b>${per ? 'perimeter' : 'area'}</b> of this square.`, visual: SVG.rect(s, s, unit, true),
        correct: ans, fmt: x => `${x} ${per ? '' : 'sq '}${unit}`, wrong: per ? [s * s, 2 * s, 4 + s] : [4 * s, 2 * s, s * s + s],
        hint: per ? 'Perimeter of a square = 4 × side.' : 'Area of a square = side × side.',
        explain: per ? `4 × ${s} = <b>${ans} ${unit}</b>.` : `${s} × ${s} = <b>${ans} sq ${unit}</b>.` });
    }
    if (kind === 'grid') {
      const w = U.ri(2, 6), h = U.ri(2, 4);
      return U.mcq({ q: 'Each small square is 1 sq cm. What is the <b>area</b> of the blue part?', visual: SVG.grid(w + U.ri(1, 2), h + 1, w, h),
        correct: w * h, fmt: x => `${x} sq cm`, wrong: [2 * (w + h), w * h + w, w + h],
        hint: 'Count the blue squares (or multiply rows × columns).', explain: `${h} rows × ${w} squares = <b>${w * h} sq cm</b>.` });
    }
    if (kind === 'circle') {
      const r = U.ri(2, 15), toD = Math.random() < 0.5;
      return toD
        ? U.mcq({ q: `The <b>radius</b> of a circle is <b>${r} cm</b>. What is its <b>diameter</b>?`, correct: 2 * r, fmt: x => x + ' cm', wrong: [r, r + 2, r * 4],
          hint: 'Diameter = 2 × radius.', explain: `2 × ${r} = <b>${2 * r} cm</b>.` })
        : U.mcq({ q: `The <b>diameter</b> of a circle is <b>${2 * r} cm</b>. What is its <b>radius</b>?`, correct: r, fmt: x => x + ' cm', wrong: [2 * r, 4 * r, r + 2],
          hint: 'Radius = diameter ÷ 2.', explain: `${2 * r} ÷ 2 = <b>${r} cm</b>.` });
    }
    if (kind === 'sideFromPer') {
      const s = U.ri(4, 25);
      return U.mcq({ q: `The perimeter of a square is <b>${4 * s} ${unit}</b>. What is the length of one side?`, correct: s, fmt: x => `${x} ${unit}`, wrong: [2 * s, 4 * s, s + 4],
        hint: 'A square has 4 equal sides.', explain: `${4 * s} ÷ 4 = <b>${s} ${unit}</b>.` });
    }
    if (kind === 'breadth') {
      const l = U.ri(8, 30), b = U.ri(3, l - 1), P = 2 * (l + b);
      return U.mcq({ q: `The perimeter of a rectangle is <b>${P} ${unit}</b> and its length is <b>${l} ${unit}</b>. What is its breadth?`, correct: b, fmt: x => `${x} ${unit}`, wrong: [P - l, P / 2, P - 2 * l, b + 2],
        hint: 'Length + breadth = half of the perimeter.', explain: `${P} ÷ 2 = ${P / 2}. ${P / 2} − ${l} = <b>${b} ${unit}</b>.` });
    }
    if (kind === 'triPer') {
      const a = U.ri(3, 15), b = U.ri(3, 15), c = U.ri(Math.abs(a - b) + 1, a + b - 1);
      return U.mcq({ q: `The sides of a triangle are <b>${a} ${unit}</b>, <b>${b} ${unit}</b> and <b>${c} ${unit}</b>. What is its perimeter?`, correct: a + b + c, fmt: x => `${x} ${unit}`, wrong: [a + b, a * b, a + b + c + 2],
        hint: 'Perimeter = sum of all sides.', explain: `${a} + ${b} + ${c} = <b>${a + b + c} ${unit}</b>.` });
    }
    if (kind === 'lshape' || kind === 'lshapePer') {
      const W = U.ri(8, 16), H = U.ri(6, 12), w = U.ri(2, W - 3), h = U.ri(2, H - 3);
      if (kind === 'lshape') {
        const ans = W * H - w * h;
        return U.mcq({ q: 'Find the <b>area</b> of this shape (a small rectangle is cut from the corner).', visual: SVG.lshape(W, H, w, h, unit),
          correct: ans, fmt: x => `${x} sq ${unit}`, wrong: [W * H, W * H + w * h, 2 * (W + H), ans + w],
          hint: 'Area of the big rectangle − area of the cut-out piece.', explain: `Big rectangle: ${W} × ${H} = ${W * H}. Cut piece: ${w} × ${h} = ${w * h}.<br>${W * H} − ${w * h} = <b>${ans} sq ${unit}</b>.` });
      }
      const ans = 2 * (W + H);
      return U.mcq({ q: 'Find the <b>perimeter</b> of this shape (a small rectangle is cut from the corner).', visual: SVG.lshape(W, H, w, h, unit),
        correct: ans, fmt: x => `${x} ${unit}`, wrong: [ans - 2 * (w + h), ans + 2 * (w + h), W * H - w * h, ans - w - h],
        hint: 'Slide the inside edges outwards — they fill the missing corner exactly!', explain: `The two inner edges together equal the missing top (${w}) and right (${h}) edges.<br>So perimeter = same as the big rectangle = 2 × (${W} + ${H}) = <b>${ans} ${unit}</b>.` });
    }
    if (kind === 'sqAreaPer') {
      const s = U.ri(3, 12);
      return U.mcq({ q: `The area of a square is <b>${s * s} sq ${unit}</b>. What is its perimeter?`, correct: 4 * s, fmt: x => `${x} ${unit}`, wrong: [s, s * s, 2 * s, 4 * s + 4],
        hint: 'Which number multiplied by itself gives the area? That is the side.', explain: `${s} × ${s} = ${s * s}, so side = ${s} ${unit}. Perimeter = 4 × ${s} = <b>${4 * s} ${unit}</b>.` });
    }
    if (kind === 'fence') {
      const l = U.ri(10, 40), b = U.ri(5, l - 1), r = U.ri(5, 25), P = 2 * (l + b);
      return U.mcq({ q: `A rectangular garden is <b>${l} m</b> long and <b>${b} m</b> wide. Fencing costs <b>₹${r} per metre</b>. What is the cost of fencing the garden?`, correct: P * r, fmt: x => '₹' + U.inr(x), wrong: [l * b * r, (l + b) * r, P * r + r],
        hint: 'A fence goes around the boundary → find the perimeter first.', explain: `Perimeter = 2 × (${l} + ${b}) = ${P} m. Cost = ${P} × ₹${r} = <b>₹${U.inr(P * r)}</b>.` });
    }
    const l = U.ri(3, 9) * 2, b = U.ri(2, 6) * 2, t = 2;
    return U.mcq({ q: `A floor is <b>${l} m</b> long and <b>${b} m</b> wide. How many square tiles of side <b>${t} m</b> are needed to cover it?`, correct: (l / t) * (b / t), wrong: [l * b, (l + b), l * b / 2, (l / t) * (b / t) + 2],
      hint: 'Find how many tiles fit along the length and along the breadth.', explain: `Along length: ${l} ÷ ${t} = ${l / t}. Along breadth: ${b} ÷ ${t} = ${b / t}.<br>${l / t} × ${b / t} = <b>${(l / t) * (b / t)}</b> tiles.` });
  },
});

// ---------------------------------------------------------------- Magic Squares & Number Puzzles
function magicGrid(cells) {
  return `<table class="magic">${cells.map(r => `<tr>${r.map(c => `<td class="${c === '?' ? 'qm' : c === '' ? 'blank' : ''}">${c}</td>`).join('')}</tr>`).join('')}</table>`;
}
registerGen({
  id: 'magic', section: 'math', icon: '✨', title: 'Magic Squares & Number Puzzles',
  desc: 'Magic squares, number pyramids and missing numbers.',
  gen(level) {
    const kind = level === 1 ? 'magic1' : level === 2 ? U.pick(['magic2', 'pyramid']) : U.pick(['table', 'pyramidDown', 'magic2']);
    if (kind === 'magic1' || kind === 'magic2') {
      let g = [[2, 7, 6], [9, 5, 1], [4, 3, 8]];
      const rot = m => m[0].map((_, i) => m.map(r => r[i]).reverse());
      for (let i = U.ri(0, 3); i > 0; i--) g = rot(g);
      if (Math.random() < 0.5) g = g.map(r => r.slice().reverse());
      const a = level === 1 ? 1 : U.ri(1, 3), b = level === 1 ? U.ri(0, 5) : U.ri(0, 10);
      g = g.map(r => r.map(v => a * v + b));
      const S = 15 * a + 3 * b;
      const r = U.ri(0, 2), c = U.ri(0, 2), ans = g[r][c];
      const cells = g.map(row => row.map(String));
      cells[r][c] = '?';
      if (kind === 'magic2') {
        // hide one more cell not in the same row or column, so the row of '?' is still complete
        let r2, c2; do { r2 = U.ri(0, 2); c2 = U.ri(0, 2); } while (r2 === r || c2 === c);
        cells[r2][c2] = '';
      }
      const rowOthers = g[r].filter((_, i) => i !== c);
      return U.mcq({
        q: kind === 'magic1' ? `In this magic square every row, column and diagonal adds up to <b>${S}</b>. Find <b>?</b>` : 'This is a magic square (every row, column and diagonal has the same sum). Find <b>?</b>',
        visual: magicGrid(cells), correct: ans, wrong: [ans + a, ans - a, ans + 2 * a, S - ans],
        hint: kind === 'magic1' ? 'Pick a line through ? where the other two numbers are known.' : 'First find the magic sum using a full row, column or diagonal.',
        explain: `${kind === 'magic2' ? `A full line adds up to ${S}, so the magic sum is ${S}.<br>` : ''}In the row with ?: ${S} − ${rowOthers[0]} − ${rowOthers[1]} = <b>${ans}</b>.`,
      });
    }
    if (kind === 'pyramid' || kind === 'pyramidDown') {
      const base = U.range(4).map(() => U.ri(1, level === 2 ? 9 : 15));
      const rows = [base];
      while (rows[0].length > 1) { const prev = rows[0]; rows.unshift(prev.slice(1).map((v, i) => v + prev[i])); }
      // rows[0] = top
      let hr, hc;
      if (kind === 'pyramid') { hr = 0; hc = 0; }
      else { hr = 3; hc = U.ri(0, 3); }
      const ans = rows[hr][hc];
      const show = rows.map((r, ri) => r.map((v, ci) => (ri === hr && ci === hc) ? '?' : (kind === 'pyramid' && ri < 3 && !(ri === 0)) ? '' : v));
      // pyramid: show only base + top '?'; pyramidDown: show everything but one base brick
      const vis = `<div class="pyramid">${show.map(r => `<div class="prow">${r.map(v => `<span class="${v === '?' ? 'qm' : v === '' ? 'blank' : ''}">${v}</span>`).join('')}</div>`).join('')}</div>`;
      if (kind === 'pyramid') {
        return U.mcq({
          q: 'In this number pyramid, each brick = the sum of the two bricks below it. Find the number at the <b>top</b>.', visual: vis,
          correct: ans, wrong: [base.reduce((a, b) => a + b), ans + 2, ans - 3, ans + 10],
          hint: 'Fill the rows one by one, from the bottom up.',
          explain: `Row 3: ${rows[2].join(', ')}<br>Row 2: ${rows[1].join(', ')}<br>Top: ${rows[1][0]} + ${rows[1][1]} = <b>${ans}</b>.`,
        });
      }
      const above = hc > 0 ? [2, hc - 1, 'left'] : [2, hc, 'right'];
      const parent = rows[above[0]][above[1]], sib = above[2] === 'left' ? rows[3][hc - 1] : rows[3][hc + 1];
      return U.mcq({
        q: 'Each brick = the sum of the two bricks below it. Find the missing number at the bottom.', visual: vis,
        correct: ans, wrong: [parent + sib, ans + 1, ans + 2, Math.max(1, ans - 2)],
        hint: 'Use subtraction: bottom brick = brick above − its neighbour.',
        explain: `${parent} = ${sib} + ?, so ? = ${parent} − ${sib} = <b>${ans}</b>.`,
      });
    }
    // table rule puzzle
    // [rule in words, worked form, function]
    const RULES = [
      ['1st + 2nd', (a, b) => `${a} + ${b}`, (a, b) => a + b],
      ['1st × 2nd', (a, b) => `${a} × ${b}`, (a, b) => a * b],
      ['1st × 2nd + 1', (a, b) => `${a} × ${b} + 1`, (a, b) => a * b + 1],
      ['(1st + 2nd) × 2', (a, b) => `(${a} + ${b}) × 2`, (a, b) => (a + b) * 2],
      ['1st × 1st + 2nd', (a, b) => `${a} × ${a} + ${b}`, (a, b) => a * a + b],
      ['1st × 2nd − 1st', (a, b) => `${a} × ${b} − ${a}`, (a, b) => a * b - a],
      ['1st × 2 + 2nd', (a, b) => `${a} × 2 + ${b}`, (a, b) => a * 2 + b],
      ['1st × 2', (a, b) => `${a} × 2`, (a, b) => a * 2],
      ['2nd × 2', (a, b) => `${b} × 2`, (a, b) => b * 2],
    ];
    const R = U.pick(RULES.slice(0, 7));
    let rows;
    // Make sure no other simple rule also fits rows 1 and 2 but gives a different answer.
    for (let t = 0; t < 200; t++) {
      rows = U.range(3).map(() => { const a = U.ri(2, 9), b = U.ri(2, 9); return [a, b, R[2](a, b)]; });
      const fitsOther = RULES.some(o => o !== R && rows.slice(0, 2).every(r => o[2](r[0], r[1]) === r[2]) && o[2](rows[2][0], rows[2][1]) !== rows[2][2]);
      if (!fitsOther && rows.every(r => r[0] !== r[1])) break;
    }
    const ans = rows[2][2];
    const [a3, b3] = rows[2];
    const vis = `<table class="magic rule">${rows.map((r, i) => `<tr><td>${r[0]}</td><td>${r[1]}</td><td class="${i === 2 ? 'qm' : 'res'}">${i === 2 ? '?' : r[2]}</td></tr>`).join('')}</table>`;
    return U.mcq({
      q: 'The numbers in each row follow the same rule. Find <b>?</b>', visual: vis,
      correct: ans, wrong: [a3 + b3, a3 * b3, a3 * b3 + 1, (a3 + b3) * 2, a3 * 2 + b3],
      hint: 'Try +, × or a mix with the first two numbers of row 1. Check it on row 2.',
      explain: `Rule: 3rd number = ${R[0]}.<br>Row 1: ${R[1](rows[0][0], rows[0][1])} = ${rows[0][2]}.<br>Row 2: ${R[1](rows[1][0], rows[1][1])} = ${rows[1][2]}.<br>Row 3: ${R[1](a3, b3)} = <b>${ans}</b>.`,
    });
  },
});
