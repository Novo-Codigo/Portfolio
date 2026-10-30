const $ = s => document.querySelector(s);
const RM = matchMedia('(prefers-reduced-motion:reduce)').matches;

/* ---- ribbon: stack names, duplicated for a seamless loop ---- */
const STACK = ['Python', 'Django', 'FastAPI', 'Flutter', 'React Native', 'Expo', 'TypeScript', 'Next.js', 'PostgreSQL', 'Redis', 'Celery', 'AWS', 'GitHub Actions', 'Playwright'];
const run = STACK.map(x => `<span>${x}</span><i></i>`).join('');
$('#track').innerHTML = run + run;

/* ---- hero: stickers drift with the pointer (fine pointers only) ---- */
const stickers = document.querySelectorAll('#art [data-d]');
if (!RM && matchMedia('(pointer:fine)').matches) {
  addEventListener('pointermove', e => {
    const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
    stickers.forEach(s => s.style.translate = `${x * s.dataset.d}px ${y * s.dataset.d}px`);
  }, { passive: true });
}

/* ---- cases ---- */
const C = [
  {
    id: 'nix',
    n: 'Nix',
    line: 'Campaign management SaaS for political campaigns, on Android, iOS and web.',
    tags: ['Play Store', 'App Store', 'Web', 'Recurring billing'],
    problem: 'Campaigns tracked grassroots leaders, votes and expenses on paper and spreadsheets. Nix puts them in one app and web platform with subscription billing.',
    role: 'Tech lead of a four-person team (three interns), with a product owner defining requirements and design. I defined the stack, the 22-model data model, LGPD compliance and the integrations. I reviewed every PR and delivered core frontend and backend parts and all deployments.',
    dec: [
      ['Logical multi-tenancy', 'One database. Every queryset is scoped to the candidate, and cross-tenant requests return 404 instead of 403 to block ID enumeration.', 'Cost: isolation depends on scoping every endpoint.'],
      ['One session per device type', 'Each account allows one mobile and one desktop session. A new login ends the old one and sends an alert email. The device_id is in the JWT and validated by the backend.'],
      ['Daily AI cost cap per user', 'Gemini usage is metered per token, with a daily limit per user on top of Gemini’s monthly quota. Users see a cooldown or recharge notice at the limit.'],
      ['Billing with Mercado Pago webhooks', 'Webhooks update subscription state. Access control lives only on the backend.']
    ],
    result: 'Launched on Android, iOS and web with live recurring billing. It did not reach commercial scale because of go-to-market limits outside the technical scope.',
    stack: ['App: Expo, React Native, React Native Web, TypeScript', 'Backend: Django, Django REST Framework, PostgreSQL, Celery, Redis', 'Integrations: Mercado Pago, Apple StoreKit, Google Gemini, Google Maps, Firebase', 'Infra: AWS S3, Render']
  },
  {
    id: 'carnaval',
    n: 'CarnavalRio',
    line: 'Schedule, samba schools and public voting guide for Rio Carnival.',
    tags: ['Android', 'iOS', '500+ downloads on Google Play'],
    problem: 'Carnival fans had no single reliable source. The app brings schedules, samba school profiles, public polls and Sambadrome maps together.',
    role: 'Tech lead and sole senior developer on a three-person team with two backend interns. I designed and built the mobile app (Expo, 24 screens), architected the API and implemented authentication, voting and Celery tasks. I mentored the interns and ran final PR reviews and deploys.',
    dec: [
      ['Zero-downtime migration', 'Relational data moved to the new API first, then the app was repointed. Legacy app versions kept working in the meantime.', 'Cost: temporary backward compatibility.'],
      ['Vote integrity in the database', 'PostgreSQL unique constraints reject duplicate votes, even under concurrent traffic spikes.'],
      ['Redis ZSET leaderboard', 'Votes commit to PostgreSQL first, then update Redis. After a cache eviction, the ranking is rebuilt from the database.', 'Trade-off: a brief eventual-consistency window.'],
      ['OTP signup without early user creation', 'Pending signups live in Redis with a TTL and become users only after OTP verification, so no orphan accounts are left behind.', 'Cost: registration depends on Redis.']
    ],
    result: 'Live on Google Play and the App Store, with 500+ downloads on Google Play. The backend has 271 automated tests, run by CI on every push.',
    stack: ['App: Expo, React Native, TypeScript, Expo Router, TanStack Query, Zustand, Axios', 'Backend: Django, Django REST Framework, PostgreSQL, Celery, Redis', 'Infra: AWS S3, Render, Google Maps, GitHub Actions']
  },
  {
    id: 'click',
    n: 'ClickCidadão',
    line: 'Municipal services, public transit and local business discovery.',
    tags: ['App Store', 'Play Store', 'In public procurement'],
    problem: 'Citizens struggle to find municipal services and to file complaints with the right department. The app brings services, transit routes and local commerce together and emails each complaint to the responsible secretariat.',
    role: 'Tech lead and sole senior developer, directing two backend interns. I architected the system and the stack. I wrote about 90% of the React Native frontend, and all of it since May 2026, and I designed the Django backend, reviewed its PRs and built core services.',
    dec: [
      ['Two-tier cache for AI queries', 'Memory plus device storage with a 15-minute TTL per user cuts LLM API spend. Repeat queries return instantly instead of in 10 to 60 seconds.', 'Trade-off: the cache is per device and can be 15 minutes stale.'],
      ['AI assistant proxied by the backend', 'API keys never reach the client, and the server attaches the user identity for auditing and rate limiting.'],
      ['S3 upload outside the DB transaction', 'Uploads finish before the commit, so PostgreSQL connections are not held during slow transfers.', 'Cost: orphaned files need a Celery cleanup job.'],
      ['Auditable complaint email', 'Complaints go through internal SMTP with the citizen in CC and an audit BCC. That gives delivery proof without storing the complaint text.', 'Trade-off: no analytics database; analysis relies on mail logs.']
    ],
    result: 'Published on both stores and offered to municipal governments through public procurement. It has no active consumer users yet. The backend has 293 automated tests, and the frontend uses strict TypeScript and linting. CI/CD runs on GitHub Actions, with OTA hotfixes through EAS.',
    stack: ['App: React Native, Expo, Expo Router, TypeScript, Axios', 'Backend: Django, Django REST Framework, PostgreSQL 16, Celery, Redis', 'Infra: AWS S3, Render, Google Maps, Resend, GitHub Actions, EAS']
  }
];

const li = a => a.map(x => `<li>${x}</li>`).join('');

$('#tabs').innerHTML = C.map(c => `<button class="tab" role="tab" id="tab-${c.id}" data-k="${c.id}" aria-selected="false" aria-controls="panel"><!-- TODO: ${c.n} logo goes inside this slot --><span class="slot" aria-hidden="true"></span><b>${c.n}</b><span class="d">${c.line}</span></button>`).join('');

function show(k, animate) {
  const c = C.find(x => x.id === k), p = $('#panel');
  document.querySelectorAll('.tab').forEach(t => t.setAttribute('aria-selected', t.dataset.k === k));
  p.setAttribute('aria-labelledby', `tab-${k}`);
  p.innerHTML = `<!-- TODO: ${c.n} cover image goes inside this slot -->
<div class="img cover" role="img" aria-label="${c.n} cover placeholder"></div>
<h3 class="ct">${c.n}</h3>
<p class="meta">Built at Infinix</p>
<ul class="tags">${li(c.tags)}</ul>
<div class="cols"><div><h4>The problem</h4><p>${c.problem}</p></div><div><h4>My role</h4><p>${c.role}</p></div></div>
<h4>Key decisions</h4>
<div class="decs">${c.dec.map(d => `<div class="dec"><b>${d[0]}</b><p>${d[1]}</p>${d[2] ? `<p class="cost">${d[2]}</p>` : ''}</div>`).join('')}</div>
<h4>Result</h4><p>${c.result}</p>
<h4>Stack</h4><ul class="l">${li(c.stack)}</ul>`;
  if (animate && !RM) {
    p.classList.remove('swap');
    void p.offsetWidth;
    p.classList.add('swap');
  }
}

$('#tabs').onclick = e => {
  const t = e.target.closest('.tab');
  if (t) show(t.dataset.k, true);
};

show('nix');