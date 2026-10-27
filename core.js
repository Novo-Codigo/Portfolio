const $ = s => document.querySelector(s), RM = matchMedia('(prefers-reduced-motion:reduce)').matches;

/* ---- violin ---- */
const cv = $('#cv'), cx = cv.getContext('2d'), stage = $('#stage');
const F = [196, 293.66, 440, 659.25], ST = [['Model', 'G'], ['API', 'D'], ['App', 'A'], ['Deploy', 'E']];
const S = F.map(() => ({ a: 0, p: 0, prev: null, t: 0 }));
const TOP = .07, BOT = .88, TX = [.36, .45, .55, .64], BX = [.14, .38, .62, .86];
let W, H, col = {}, got = new Set(), muted = false, ac, vis = true;
const lerp = (a, b, t) => a + (b - a) * t, xAt = (i, y) => lerp(TX[i], BX[i], (y / H - TOP) / (BOT - TOP)) * W;

function cols() {
  const s = getComputedStyle(document.documentElement);
  ['ink', 'mute', 'line', 'panel', 'brass', 'mint'].forEach(k => col[k] = s.getPropertyValue('--' + k).trim());
}

function size() {
  const d = Math.min(devicePixelRatio || 1, 2);
  W = cv.clientWidth;
  H = cv.clientHeight;
  cv.width = W * d;
  cv.height = H * d;
  cx.setTransform(d, 0, 0, d, 0, 0);
}

$('#labs').innerHTML = ST.map((s, i) => `<button style="left:${BX[i] * 100}%" data-i="${i}" aria-label="Play string ${s[1]}: ${s[0]}">${s[0]}<small>${s[1]}</small></button>`).join('');
$('#labs').onclick = e => {
  const b = e.target.closest('button');
  if (b) pluck(+b.dataset.i, .9);
};

function note(f, v) {
  if (muted) return;
  ac = ac || new (window.AudioContext || window.webkitAudioContext)();
  if (ac.state === 'suspended') ac.resume();
  const t = ac.currentTime, g = ac.createGain(), lp = ac.createBiquadFilter(), o = ac.createOscillator(), o2 = ac.createOscillator();
  o.type = 'sawtooth';
  o2.type = 'triangle';
  o.frequency.value = f;
  o2.frequency.value = f * 1.004;
  lp.type = 'lowpass';
  lp.frequency.setValueAtTime(3400, t);
  lp.frequency.exponentialRampToValueAtTime(500, t + 1);
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(.16 * v, t + .006);
  g.gain.exponentialRampToValueAtTime(.0001, t + 1.7);
  o.connect(lp);
  o2.connect(lp);
  lp.connect(g);
  g.connect(ac.destination);
  o.start(t);
  o2.start(t);
  o.stop(t + 1.8);
  o2.stop(t + 1.8);
}

function pluck(i, v, quiet) {
  const s = S[i];
  s.a = Math.max(s.a, Math.min(1, v));
  if (quiet) return;
  note(F[i], v);
  got.add(i);
  document.querySelectorAll('#pips i')[i].classList.add('on');
  $('#labs').children[i].classList.add('got');
  if (got.size === 4 && !pluck.done) {
    pluck.done = 1;
    toast('Achievement unlocked: full-cycle', 'Model, API, app, and deploy. From zero to deploy.');
  }
}

function toast(a, b) {
  const t = $('#toast');
  t.innerHTML = `<b>${a}</b>${b}`;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 4800);
}

cv.addEventListener('pointermove', e => {
  const x = e.offsetX, y = e.offsetY;
  if (y < TOP * H || y > BOT * H) {
    S.forEach(s => s.prev = null);
    return;
  }
  S.forEach((s, i) => {
    const d = x - xAt(i, y), n = performance.now();
    if (s.prev !== null && s.prev * d < 0 && n - s.t > 140) {
      s.t = n;
      pluck(i, .5 + Math.min(.5, Math.abs(e.movementX || 8) / 40));
    }
    s.prev = d;
  });
});

cv.addEventListener('pointerleave', () => S.forEach(s => s.prev = null));
cv.addEventListener('pointerdown', e => {
  let b = 0, m = 1e9;
  S.forEach((s, i) => {
    const d = Math.abs(e.offsetX - xAt(i, e.offsetY));
    if (d < m) {
      m = d;
      b = i;
    }
  });
  if (m < 36) pluck(b, 1);
});

$('#snd').onclick = e => {
  muted = !muted;
  e.target.textContent = muted ? 'sound off' : 'sound on';
  e.target.setAttribute('aria-pressed', !muted);
};

function draw(dt) {
  cx.clearRect(0, 0, W, H);
  const yT = TOP * H, yB = BOT * H, L0 = TX[0] * W - 26, R0 = TX[3] * W + 26, L1 = BX[0] * W - 44, R1 = BX[3] * W + 44;
  cx.fillStyle = col.panel;
  cx.beginPath();
  cx.moveTo(L0, yT);
  cx.lineTo(R0, yT);
  cx.lineTo(R1, yB);
  cx.lineTo(L1, yB);
  cx.fill();
  cx.strokeStyle = col.line;
  cx.lineWidth = 1;
  for (let k = 1; k < 7; k++) {
    const t = Math.pow(k / 7, 1.7);
    cx.beginPath();
    cx.moveTo(lerp(L0, L1, t), lerp(yT, yB, t));
    cx.lineTo(lerp(R0, R1, t), lerp(yT, yB, t));
    cx.stroke();
  }
  cx.strokeStyle = col.mute;
  cx.lineWidth = 5;
  cx.beginPath();
  cx.moveTo(L0, yT);
  cx.lineTo(R0, yT);
  cx.stroke();
  cx.strokeStyle = col.ink;
  cx.lineWidth = 7;
  cx.beginPath();
  cx.moveTo(L1 - 8, yB);
  cx.lineTo(R1 + 8, yB);
  cx.stroke();
  S.forEach((s, i) => {
    s.p += dt * (15 + i * 5);
    s.a *= Math.pow(.16, dt);
    if (s.a < .003) s.a = 0;
    cx.strokeStyle = i === 3 ? col.brass : col.ink;
    cx.lineWidth = [3.6, 3, 2.3, 1.7][i];
    cx.lineCap = 'round';
    cx.shadowColor = col.mint;
    cx.shadowBlur = s.a > .05 ? 14 * s.a : 0;
    cx.beginPath();
    for (let k = 0; k <= 28; k++) {
      const u = k / 28, y = lerp(yT, yB, u), x = xAt(i, y) + s.a * 40 * Math.sin(Math.PI * u) * Math.cos(s.p) * (.4 + .6 * u);
      k ? cx.lineTo(x, y) : cx.moveTo(x, y);
    }
    cx.stroke();
    cx.shadowBlur = 0;
  });
}

let last = 0;
function loop(n) {
  const dt = Math.min(.05, (n - last) / 1000 || 0);
  last = n;
  if (vis) draw(dt);
  requestAnimationFrame(loop);
}

cols();
size();
addEventListener('resize', size);
matchMedia('(prefers-color-scheme:dark)').addEventListener('change', cols);
new IntersectionObserver(e => vis = e[0].isIntersecting).observe(stage);
requestAnimationFrame(loop);

if (!RM) [0, 1, 2, 3].forEach(i => setTimeout(() => pluck(i, .55, true), 500 + i * 320));

/* ---- pads ---- */
const PF = [392, 523.25, 659.25, 783.99];
document.querySelectorAll('.pad').forEach((b, i) => b.addEventListener('click', () => {
  note(PF[i], .9);
  b.classList.remove('hit');
  void b.offsetWidth;
  b.classList.add('hit');
}));

/* ---- cases ---- */
const C = [
  { id: 'nix', n: 'Nix', d: 'Electoral campaign management on Android, iOS, and web, with live production subscriptions.' },
  { id: 'click', n: 'ClickCidadão', d: 'Municipal services, public transit, and local business app, published on App Store and Google Play.' },
  { id: 'carnaval', n: 'CarnavalRio', d: 'Schedule, samba schools, and public voting guide for Rio Carnival, on Android and iOS.' }
];

$('#tabs').innerHTML = C.map(c => `<button class="tab" role="tab" data-k="${c.id}" aria-selected="false" aria-controls="${c.id === 'nix' ? 'case-nix' : c.id === 'carnaval' ? 'case-carnaval' : c.id === 'click' ? 'case-click' : 'case-other'}"><span class="logo-slot tab-logo" aria-label="Logo slot for ${c.n}">${c.logo ? `<img src="${c.logo}" alt="${c.n} Logo">` : 'logo'}</span><b>${c.n}</b><span>${c.d}</span></button>`).join('');

function show(k) {
  document.querySelectorAll('.tab').forEach(t => t.setAttribute('aria-selected', t.dataset.k === k));
  const o = $('#case-other'), P = { nix: '#case-nix', carnaval: '#case-carnaval', click: '#case-click' };
  ['#case-nix', '#case-carnaval', '#case-click', '#case-other'].forEach(s => $(s).hidden = s !== (P[k] || '#case-other'));
  if (!P[k]) {
    const c = C.find(x => x.id === k);
    o.innerHTML = `<h3 class="ct">${c.n}</h3><p class="sub">${c.d}</p><div class="res"><h3>Want the full case study?</h3><p>I can walk through the problem, technical decisions, and results of ${c.n} in a quick conversation.</p><a class="btn" href="https://wa.me/5521998837786?text=${encodeURIComponent('Hi Samuel, I would like to see the ' + c.n + ' case study')}" target="_blank" rel="noopener">Request case study for ${c.n}</a></div>`;
  }
}

$('#tabs').onclick = e => {
  const t = e.target.closest('.tab');
  if (t) show(t.dataset.k);
};

show('nix');
