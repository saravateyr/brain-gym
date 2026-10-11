'use strict';
// Shared helpers used by all puzzle generators.

const U = {
  ri(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); },
  pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; },
  shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },
  sample(arr, n) { return U.shuffle(arr).slice(0, n); },
  range(n) { return [...Array(n).keys()]; },

  // Indian digit grouping: 123456 -> 1,23,456
  inr(n) {
    const s = String(Math.abs(n));
    let last3 = s.slice(-3), rest = s.slice(0, -3);
    if (rest) last3 = ',' + last3;
    rest = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    return (n < 0 ? '-' : '') + rest + last3;
  },
  rupees(paise) {
    const r = Math.floor(paise / 100), p = paise % 100;
    return '₹ ' + U.inr(r) + '.' + String(p).padStart(2, '0');
  },
  pad2(n) { return String(n).padStart(2, '0'); },

  letter(i) { return String.fromCharCode(64 + i); }, // 1 -> A
  pos(ch) { return ch.charCodeAt(0) - 64; },         // A -> 1

  frac(n, d) { return `<span class="frac"><span>${n}</span><span>${d}</span></span>`; },
  gcd(a, b) { while (b) [a, b] = [b, a % b]; return a; },
  lcm(a, b) { return a / U.gcd(a, b) * b; },
  isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
    return true;
  },
  factors(n) { return U.range(n).map(i => i + 1).filter(i => n % i === 0); },

  // Numeric distractor candidates close to n (never n, never negative).
  near(n, spread) {
    spread = spread || 10;
    const c = [n + 1, n - 1, n + 2, n - 2, n + spread, n - spread, n + 10, n - 10, n + 3, n - 3];
    return U.shuffle([...new Set(c)]).filter(x => x >= 0 && x !== n);
  },

  /**
   * Build a multiple-choice question with 4 unique options.
   * o = { q, correct, wrong: [...], fmt?, hint, explain, visual? }
   * Wrong values are tried in order; numeric answers are topped up with nearby numbers.
   */
  mcq(o) {
    const fmt = o.fmt || (x => String(x));
    const c = fmt(o.correct);
    const seen = new Set([c]);
    const opts = [c];
    const add = w => {
      if (opts.length >= 4 || w === undefined || w === null) return;
      if (typeof w === 'number' && (w < 0 || !Number.isFinite(w))) return;
      const s = fmt(w);
      if (!seen.has(s)) { seen.add(s); opts.push(s); }
    };
    (o.wrong || []).forEach(add);
    if (typeof o.correct === 'number') {
      for (let k = 1; opts.length < 4 && k < 50; k++) { add(o.correct + k); add(o.correct - k); }
    }
    // fixedOrder: show options in this exact order (e.g. parts of speech), otherwise shuffle
    const shuffled = o.fixedOrder ? o.fixedOrder.map(fmt).filter(s => opts.includes(s)) : U.shuffle(opts);
    return {
      q: o.q, visual: o.visual || '', options: shuffled, answer: shuffled.indexOf(c),
      hint: o.hint || '', explain: o.explain || ''
    };
  },
};

// ---------- Small SVG drawing helpers ----------
const SVG = {
  clock(h, m, opts) {
    opts = opts || {};
    const size = 170, c = size / 2, r = 76;
    let s = `<svg class="fig" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="clock">`;
    s += `<circle cx="${c}" cy="${c}" r="${r}" fill="#fffdf5" stroke="#3b3b6d" stroke-width="4"/>`;
    for (let i = 1; i <= 12; i++) {
      const a = (i * 30 - 90) * Math.PI / 180;
      s += `<text x="${(c + Math.cos(a) * (r - 16)).toFixed(1)}" y="${(c + Math.sin(a) * (r - 16) + 5).toFixed(1)}" text-anchor="middle" font-size="14" font-weight="700" fill="#3b3b6d">${i}</text>`;
    }
    for (let i = 0; i < 60; i++) {
      const a = (i * 6 - 90) * Math.PI / 180, inner = i % 5 === 0 ? r - 7 : r - 4;
      s += `<line x1="${(c + Math.cos(a) * inner).toFixed(1)}" y1="${(c + Math.sin(a) * inner).toFixed(1)}" x2="${(c + Math.cos(a) * r).toFixed(1)}" y2="${(c + Math.sin(a) * r).toFixed(1)}" stroke="#3b3b6d" stroke-width="${i % 5 === 0 ? 2 : 1}"/>`;
    }
    const ha = ((h % 12) * 30 + m * 0.5 - 90) * Math.PI / 180;
    const ma = (m * 6 - 90) * Math.PI / 180;
    s += `<line x1="${c}" y1="${c}" x2="${(c + Math.cos(ha) * 38).toFixed(1)}" y2="${(c + Math.sin(ha) * 38).toFixed(1)}" stroke="#e4572e" stroke-width="6" stroke-linecap="round"/>`;
    s += `<line x1="${c}" y1="${c}" x2="${(c + Math.cos(ma) * 60).toFixed(1)}" y2="${(c + Math.sin(ma) * 60).toFixed(1)}" stroke="#2e86ab" stroke-width="4" stroke-linecap="round"/>`;
    s += `<circle cx="${c}" cy="${c}" r="5" fill="#3b3b6d"/></svg>`;
    if (opts.mirror) s = `<div class="mirror">${s}</div>`;
    return s;
  },

  compass() {
    return `<svg class="fig small" viewBox="0 0 120 120" width="110" height="110" aria-label="compass">
      <circle cx="60" cy="60" r="44" fill="#f2f7ff" stroke="#9db4d8" stroke-width="2"/>
      <path d="M60 20 L66 60 L60 100 L54 60 Z" fill="#c8d6ee"/>
      <path d="M20 60 L60 54 L100 60 L60 66 Z" fill="#c8d6ee"/>
      <path d="M60 20 L66 60 L54 60 Z" fill="#e4572e"/>
      <text x="60" y="13" text-anchor="middle" font-size="13" font-weight="700" fill="#e4572e">N</text>
      <text x="60" y="117" text-anchor="middle" font-size="13" font-weight="700" fill="#3b3b6d">S</text>
      <text x="111" y="65" text-anchor="middle" font-size="13" font-weight="700" fill="#3b3b6d">E</text>
      <text x="9" y="65" text-anchor="middle" font-size="13" font-weight="700" fill="#3b3b6d">W</text>
    </svg>`;
  },

  // pts: [[x,y],...] in "map" units (y up). Draws the walk with start/end markers.
  path(pts) {
    const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
    const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
    const span = Math.max(maxX - minX, maxY - minY, 1);
    const W = 200, pad = 26, k = (W - 2 * pad) / span;
    const tx = x => pad + (x - minX) * k + ((W - 2 * pad) - (maxX - minX) * k) / 2;
    const ty = y => pad + (maxY - y) * k + ((W - 2 * pad) - (maxY - minY) * k) / 2;
    const d = pts.map(p => `${tx(p[0]).toFixed(1)},${ty(p[1]).toFixed(1)}`).join(' ');
    const [sx, sy] = [tx(pts[0][0]), ty(pts[0][1])];
    const last = pts[pts.length - 1];
    const [ex, ey] = [tx(last[0]), ty(last[1])];
    return `<svg class="fig" viewBox="0 0 ${W} ${W}" width="${W}" height="${W}" aria-label="path">
      <rect x="1" y="1" width="${W - 2}" height="${W - 2}" rx="12" fill="#f7fbff" stroke="#d6e2f3"/>
      <text x="${W - 14}" y="18" text-anchor="middle" font-size="12" font-weight="700" fill="#e4572e">N↑</text>
      <polyline points="${d}" fill="none" stroke="#2e86ab" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>
      <line x1="${sx}" y1="${sy}" x2="${ex}" y2="${ey}" stroke="#e4572e" stroke-width="2" stroke-dasharray="5 4"/>
      <circle cx="${sx}" cy="${sy}" r="8" fill="#3bb273"/><text x="${sx}" y="${sy + 4}" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">S</text>
      <circle cx="${ex}" cy="${ey}" r="8" fill="#e4572e"/><text x="${ex}" y="${ey + 4}" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">E</text>
    </svg>`;
  },

  fractionBar(n, d) {
    const W = 260, H = 46, w = (W - 4) / d;
    let s = `<svg class="fig" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" aria-label="fraction bar">`;
    for (let i = 0; i < d; i++) {
      s += `<rect x="${(2 + i * w).toFixed(1)}" y="2" width="${w.toFixed(1)}" height="${H - 4}" fill="${i < n ? '#f6ae2d' : '#ffffff'}" stroke="#3b3b6d" stroke-width="2"/>`;
    }
    return s + '</svg>';
  },

  fractionPie(n, d) {
    const S = 150, c = S / 2, r = 66;
    let s = `<svg class="fig" viewBox="0 0 ${S} ${S}" width="${S}" height="${S}" aria-label="fraction circle">`;
    for (let i = 0; i < d; i++) {
      const a1 = (i / d) * 2 * Math.PI - Math.PI / 2, a2 = ((i + 1) / d) * 2 * Math.PI - Math.PI / 2;
      const x1 = c + r * Math.cos(a1), y1 = c + r * Math.sin(a1), x2 = c + r * Math.cos(a2), y2 = c + r * Math.sin(a2);
      const large = (a2 - a1) > Math.PI ? 1 : 0;
      s += `<path d="M${c},${c} L${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 ${large} 1 ${x2.toFixed(1)},${y2.toFixed(1)} Z" fill="${i < n ? '#f6ae2d' : '#ffffff'}" stroke="#3b3b6d" stroke-width="2"/>`;
    }
    return s + '</svg>';
  },

  rect(l, b, unit, square) {
    const maxW = 220, maxH = 130;
    const k = Math.min(maxW / l, maxH / b);
    const w = Math.max(l * k, 40), h = Math.max(b * k, 30);
    const W = w + 70, H = h + 50;
    return `<svg class="fig" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" aria-label="${square ? 'square' : 'rectangle'}">
      <rect x="35" y="15" width="${w}" height="${h}" fill="#dff3e4" stroke="#3b3b6d" stroke-width="3"/>
      <text x="${35 + w / 2}" y="${15 + h + 22}" text-anchor="middle" font-size="15" font-weight="700" fill="#3b3b6d">${l} ${unit}</text>
      <text x="${30}" y="${15 + h / 2 + 5}" text-anchor="end" font-size="15" font-weight="700" fill="#3b3b6d">${b} ${unit}</text>
    </svg>`;
  },

  // L-shape: W x H rectangle with a w x h piece cut from the top-right corner.
  lshape(Wd, Ht, w, h, unit) {
    const k = Math.min(200 / Wd, 150 / Ht);
    const X = v => 40 + v * k, Y = v => 15 + v * k;
    const pts = [[0, 0], [Wd - w, 0], [Wd - w, h], [Wd, h], [Wd, Ht], [0, Ht]].map(p => `${X(p[0]).toFixed(1)},${Y(p[1]).toFixed(1)}`).join(' ');
    const SW = X(Wd) + 30, SH = Y(Ht) + 30;
    return `<svg class="fig" viewBox="0 0 ${SW} ${SH}" width="${SW}" height="${SH}" aria-label="L shape">
      <polygon points="${pts}" fill="#dff3e4" stroke="#3b3b6d" stroke-width="3"/>
      <text x="${X(Wd / 2)}" y="${Y(Ht) + 20}" text-anchor="middle" font-size="14" font-weight="700" fill="#3b3b6d">${Wd} ${unit}</text>
      <text x="${X(0) - 5}" y="${Y(Ht / 2) + 5}" text-anchor="end" font-size="14" font-weight="700" fill="#3b3b6d">${Ht} ${unit}</text>
      <text x="${X(Wd - w / 2)}" y="${Y(h) + 18}" text-anchor="middle" font-size="13" font-weight="700" fill="#e4572e">${w} ${unit}</text>
      <text x="${X(Wd - w) - 4}" y="${Y(h / 2) + 5}" text-anchor="end" font-size="13" font-weight="700" fill="#e4572e">${h} ${unit}</text>
    </svg>`;
  },

  grid(cols, rows, sw, sh) {
    const c = 26, W = cols * c + 4, H = rows * c + 4;
    let s = `<svg class="fig" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" aria-label="grid">`;
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
      const on = x < sw && y < sh;
      s += `<rect x="${2 + x * c}" y="${2 + y * c}" width="${c}" height="${c}" fill="${on ? '#6cc3d5' : '#fff'}" stroke="#9aa5c4" stroke-width="1"/>`;
    }
    return s + '</svg>';
  },
};

const GEN = {}; // id -> { id, section, title, icon, desc, gen(level) }
function registerGen(def) { GEN[def.id] = def; }
