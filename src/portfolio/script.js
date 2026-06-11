


window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.style.opacity = "0";

    setTimeout(() => {
      loader.style.display = "none";
    }, 500); // matches CSS transition
  }, 7000); // 7 seconds
});
// ===== Year =====
document.getElementById('year').textContent = new Date().getFullYear();
// ===== Theme toggle =====
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
themeToggle.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});
// ===== Mobile menu =====
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menuBtn.classList.remove('open');
  navLinks.classList.remove('open');
}));
// ===== Navbar scroll + scroll progress + back to top =====
const navbar = document.getElementById('navbar');
const progress = document.getElementById('scrollProgress');
const backTop = document.getElementById('backTop');
const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
function onScroll() {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 20);
  const h = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${(y / h) * 100}%`;
  backTop.classList.toggle('show', y > 500);
  // active nav
  let current = '';
  sections.forEach(s => {
    if (y >= s.offsetTop - 120) current = s.id;
  });
  navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current}`));
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
// ===== Custom cursor (disabled on touch devices) =====
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
if (isTouch) {
  if (cursor) cursor.style.display = 'none';
  if (cursorDot) cursorDot.style.display = 'none';
  document.body.style.cursor = 'auto';
} else {
  let cx = 0, cy = 0, tx = 0, ty = 0;
  window.addEventListener('mousemove', e => {
    tx = e.clientX; ty = e.clientY;
    cursorDot.style.transform = `translate(${tx}px,${ty}px) translate(-50%,-50%)`;
  });
  function animateCursor() {
    cx += (tx - cx) * 0.18;
    cy += (ty - cy) * 0.18;
    cursor.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
  document.querySelectorAll('a, button, input, textarea, .project, .cert').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

// ===== Typing effect =====
const typed = document.getElementById('typed');
const phrases = ['Programmer', 'Designer', 'Frontend Developer', 'Backend Developer'];
let pi = 0, ci = 0, deleting = false;
function tick() {
  const w = phrases[pi];
  typed.textContent = w.slice(0, ci);
  if (!deleting && ci < w.length) { ci++; setTimeout(tick, 80); }
  else if (deleting && ci > 0) { ci--; setTimeout(tick, 40); }
  else {
    deleting = !deleting;
    if (!deleting) pi = (pi + 1) % phrases.length;
    setTimeout(tick, deleting ? 1400 : 300);
  }
}
tick();
// ===== Reveal on scroll =====
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      // counter
      if (e.target.classList.contains('stat')) {
        const num = e.target.querySelector('.stat-num');
        const target = +num.dataset.count;
        let cur = 0;
        const step = Math.max(1, Math.ceil(target / 50));
        const t = setInterval(() => {
          cur += step;
          if (cur >= target) { cur = target; clearInterval(t); }
          num.textContent = cur + (target >= 25 ? '+' : '');
        }, 30);
      }
      // skill bars
      e.target.querySelectorAll('.bar').forEach(b => b.classList.add('in'));
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
// ===== Particles =====
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
function initParticles() {
  particles = [];
  const count = Math.min(80, Math.floor(window.innerWidth / 18));
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      c: Math.random() > 0.5 ? '139,92,246' : '6,182,212',
    });
  }
}
initParticles();
window.addEventListener('resize', initParticles);
function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.c},0.6)`;
    ctx.fill();
  });
  // connect close particles
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const d = Math.hypot(dx, dy);
      if (d < 120) {
        ctx.strokeStyle = `rgba(139,92,246,${0.12 * (1 - d / 120)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();
// ===== Hero profile parallax =====
const profileCard = document.querySelector('.profile-card');
if (profileCard) {
  document.querySelector('.hero').addEventListener('mousemove', e => {
    const r = profileCard.getBoundingClientRect();
    const rx = ((e.clientY - r.top - r.height / 2) / r.height) * -10;
    const ry = ((e.clientX - r.left - r.width / 2) / r.width) * 10;
    profileCard.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  document.querySelector('.hero').addEventListener('mouseleave', () => {
    profileCard.style.transform = '';
  });
}
// ===== Projects =====
const projects = [
  { id: 1, title: 'Alumni Tracing Manage System', cat: 'web', desc: 'A platform connecting university alumni with events, jobs, and mentorship.', tech: ['React', 'Node', 'Postgres'], icon: 'AT' },
  // { id: 2, title: 'E-Commerce Platform', cat: 'web', desc: 'Full-featured store with Stripe payments and admin dashboard.', tech: ['Next.js', 'Stripe', 'MongoDB'], icon: 'EC' },
  // { id: 3, title: 'School Management System', cat: 'app', desc: 'Manage students, teachers, grades, and attendance in one place.', tech: ['Laravel', 'MySQL', 'Vue'], icon: 'SM' },
  // { id: 4, title: 'AI Assistant Dashboard', cat: 'ai', desc: 'A control panel for managing multiple AI agents and prompts.', tech: ['Next.js', 'OpenAI', 'TS'], icon: 'AI' },
  { id: 2, title: 'Portfolio Website', cat: 'ui', desc: 'High-end portfolio template inspired by Apple and Linear.', tech: ['HTML', 'CSS', 'JS'], icon: 'PF' },
  // { id: 6, title: 'Realtime Analytics', cat: 'web', desc: 'Live event tracking dashboard with sub-second latency.', tech: ['Node', 'Redis', 'React'], icon: 'RA' },
];
const projectsGrid = document.getElementById('projectsGrid');
function renderProjects(list) {
  projectsGrid.innerHTML = list.map(p => `
    <article class="project reveal" data-cat="${p.cat}">
      <div class="project-img"><span>${p.icon}</span></div>
      <div class="project-body">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="tech">${p.tech.map(t => `<span>${t}</span>`).join('')}</div>
        <div class="project-actions">
          <a href="https://github.com/javiernarn" target="_blank" rel="noopener">GitHub</a>
          <a href="#" target="_blank" rel="noopener">Live Demo</a>
          <button data-id="${p.id}">Details</button>
        </div>
      </div>
    </article>
  `).join('');
  projectsGrid.querySelectorAll('.reveal').forEach(el => io.observe(el));
  projectsGrid.querySelectorAll('button[data-id]').forEach(b => {
    b.addEventListener('click', () => openProject(+b.dataset.id));
  });
}
renderProjects(projects);
const filters = document.getElementById('filters');
const searchInput = document.getElementById('projectSearch');
let activeFilter = 'all';
function applyFilters() {
  const q = searchInput.value.toLowerCase().trim();
  const filtered = projects.filter(p =>
    (activeFilter === 'all' || p.cat === activeFilter) &&
    (p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.tech.join(' ').toLowerCase().includes(q))
  );
  renderProjects(filtered);
}
filters.addEventListener('click', e => {
  const b = e.target.closest('.filter');
  if (!b) return;
  filters.querySelectorAll('.filter').forEach(f => f.classList.remove('active'));
  b.classList.add('active');
  activeFilter = b.dataset.filter;
  applyFilters();
});
searchInput.addEventListener('input', applyFilters);
// ===== Project modal =====
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
function openProject(id) {
  const p = projects.find(x => x.id === id);
  if (!p) return;
  modalBody.innerHTML = `
    <h2>${p.title}</h2>
    <div class="tech">${p.tech.map(t => `<span>${t}</span>`).join('')}</div>
    <div class="modal-img">${p.icon}</div>
    <p>${p.desc}</p>
    <p>This project demonstrates end-to-end product engineering — from architecture decisions to a polished, accessible interface. Built with performance, scalability, and maintainability in mind.</p>
    <div class="project-actions" style="margin-top:18px">
      <a href="https://github.com/javiernarn" target="_blank" rel="noopener" class="btn btn-ghost">View on GitHub</a>
      <a href="#" target="_blank" rel="noopener" class="btn btn-primary">Live Demo</a>
    </div>
  `;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
modal.addEventListener('click', e => {
  if (e.target.hasAttribute('data-close')) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { modal.classList.remove('open'); document.body.style.overflow = ''; }
});
// ===== Certificates =====
const certs = [
  { t: 'AWS Certified Developer', i: 'Amazon', d: 'Mar 2024', ic: 'AWS' },
  { t: 'Meta Front-End Developer', i: 'Meta', d: 'Aug 2023', ic: 'META' },
  { t: 'Google UX Design', i: 'Google', d: 'Jan 2023', ic: 'UX' },
  { t: 'MongoDB Developer', i: 'MongoDB', d: 'Nov 2022', ic: 'DB' },
  { t: 'Scrum Master', i: 'Scrum.org', d: 'Jun 2022', ic: 'SM' },
  { t: 'TypeScript Pro', i: 'Frontend Masters', d: 'Feb 2022', ic: 'TS' },
];
const certGrid = document.getElementById('certGrid');
certGrid.innerHTML = certs.map(c => `
  <div class="cert reveal">
    <div class="cert-img">${c.ic}</div>
    <div class="cert-body">
      <h4>${c.t}</h4>
      <p>${c.i} · ${c.d}</p>
    </div>
  </div>
`).join('');
certGrid.querySelectorAll('.reveal').forEach(el => io.observe(el));
// ===== Testimonials =====
const tTrack = document.getElementById('tTrack');
const tDots = document.getElementById('tDots');
const slides = tTrack.children.length;
let tIndex = 0, tTimer;
for (let i = 0; i < slides; i++) {
  const b = document.createElement('button');
  if (i === 0) b.classList.add('active');
  b.addEventListener('click', () => goTo(i));
  tDots.appendChild(b);
}
function goTo(i) {
  tIndex = (i + slides) % slides;
  tTrack.style.transform = `translateX(-${tIndex * 100}%)`;
  [...tDots.children].forEach((d, j) => d.classList.toggle('active', j === tIndex));
}
document.getElementById('tPrev').addEventListener('click', () => { goTo(tIndex - 1); reset(); });
document.getElementById('tNext').addEventListener('click', () => { goTo(tIndex + 1); reset(); });
function reset() { clearInterval(tTimer); tTimer = setInterval(() => goTo(tIndex + 1), 6000); }
reset();
// ===== Contact form =====
const form = document.getElementById('contactForm');
form.addEventListener('submit', e => {
  e.preventDefault();
  let ok = true;
  form.querySelectorAll('.field').forEach(f => {
    const input = f.querySelector('input, textarea');
    const err = f.querySelector('.err');
    f.classList.remove('invalid');
    err.textContent = '';
    if (!input.checkValidity()) {
      ok = false;
      f.classList.add('invalid');
      if (input.validity.valueMissing) err.textContent = 'This field is required.';
      else if (input.validity.typeMismatch) err.textContent = 'Please enter a valid email.';
      else if (input.validity.tooShort) err.textContent = `Minimum ${input.minLength} characters.`;
    }
  });
  if (!ok) return;
  const success = document.getElementById('formSuccess');
  success.classList.add('show');
  form.reset();
  setTimeout(() => success.classList.remove('show'), 5000);
});



