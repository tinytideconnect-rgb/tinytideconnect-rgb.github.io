/*
 * Визуальные эффекты сайта. Не влияют на работу страниц:
 * если этот файл убрать, сайт продолжит работать, просто «тише».
 * app.js сообщает о каждой отрисовке событием "page:render".
 */
(function () {
  "use strict";

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(pointer: fine)").matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  /* ---------- Полоса прогресса прокрутки ---------- */

  const progress = document.createElement("div");
  progress.className = "scroll-progress";
  document.body.appendChild(progress);

  /* ---------- Мягкое свечение за курсором ---------- */

  const glow = document.createElement("div");
  glow.className = "cursor-glow";
  if (finePointer && !reduced) document.body.appendChild(glow);

  const mouse = { x: innerWidth / 2, y: innerHeight / 3 };
  const glowPos = { x: mouse.x, y: mouse.y };
  addEventListener("pointermove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });

  /* ---------- Подсветка карточек под курсором ---------- */

  document.addEventListener("pointermove", (e) => {
    const el = e.target.closest && e.target.closest(".spot");
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, { passive: true });

  /* ---------- 3D-наклон «окна» ---------- */

  const tilt = { rx: 0, ry: 0, trx: 0, try: 0 };

  function updateWindow() {
    const win = $("#showcase");
    if (!win) return;
    const r = win.getBoundingClientRect();

    // Пока окно ниже середины экрана — оно слегка «лежит», при прокрутке выпрямляется.
    const p = clamp((innerHeight - r.top) / (innerHeight * 0.75), 0, 1);
    const scrollRx = reduced ? 0 : (1 - p) * 16;

    if (finePointer && !reduced) {
      const inside = mouse.y > r.top - 120 && mouse.y < r.bottom + 120;
      tilt.trx = inside ? clamp(-(mouse.y - (r.top + r.height / 2)) / r.height, -0.6, 0.6) * 6 : 0;
      tilt.try = inside ? clamp((mouse.x - (r.left + r.width / 2)) / r.width, -0.6, 0.6) * 8 : 0;
      win.style.setProperty("--gx", `${mouse.x - r.left}px`);
      win.style.setProperty("--gy", `${mouse.y - r.top}px`);
    }
    tilt.rx = lerp(tilt.rx, tilt.trx, 0.08);
    tilt.ry = lerp(tilt.ry, tilt.try, 0.08);

    win.style.transform =
      `perspective(1600px) rotateX(${(scrollRx + tilt.rx).toFixed(2)}deg) rotateY(${tilt.ry.toFixed(2)}deg) scale(${(0.94 + 0.06 * p).toFixed(3)})`;
  }

  /* ---------- «Магнитные» кнопки ---------- */

  function updateMagnets() {
    if (!finePointer || reduced) return;
    $$(".magnet").forEach((b) => {
      const r = b.getBoundingClientRect();
      const dx = mouse.x - (r.left + r.width / 2);
      const dy = mouse.y - (r.top + r.height / 2);
      const near = Math.hypot(dx, dy) < 140;
      const cx = parseFloat(b.dataset.mx || 0);
      const cy = parseFloat(b.dataset.my || 0);
      const nx = lerp(cx, near ? dx * 0.18 : 0, 0.15);
      const ny = lerp(cy, near ? dy * 0.25 : 0, 0.15);
      b.dataset.mx = nx;
      b.dataset.my = ny;
      b.style.translate = `${nx.toFixed(2)}px ${ny.toFixed(2)}px`;
    });
  }

  /* ---------- Главный цикл ---------- */

  function frame() {
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;

    if (glow.isConnected) {
      glowPos.x = lerp(glowPos.x, mouse.x, 0.12);
      glowPos.y = lerp(glowPos.y, mouse.y, 0.12);
      glow.style.transform = `translate(${glowPos.x - 300}px, ${glowPos.y - 300}px)`;
    }
    updateWindow();
    updateMagnets();
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  /* ---------- Пузырьки в hero ---------- */

  function startBubbles() {
    const bg = $(".hero-bg:not(.short)");
    if (!bg || reduced || $(".bubbles", bg)) return;

    const canvas = document.createElement("canvas");
    canvas.className = "bubbles";
    bg.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let w = 0, h = 0, visible = true;

    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    addEventListener("resize", resize);

    const count = Math.round(clamp(w / 28, 18, 60));
    const make = (initial) => ({
      x: Math.random() * w,
      y: initial ? h * (0.35 + Math.random() * 0.65) : h + 10,
      r: 0.6 + Math.random() * 1.9,
      s: 0.15 + Math.random() * 0.45,
      a: 0.15 + Math.random() * 0.5,
      ph: Math.random() * Math.PI * 2,
      c: Math.random() < 0.5 ? "12,242,201" : "47,180,242",
    });
    const dots = Array.from({ length: count }, () => make(true));

    new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(bg);

    (function tick(t) {
      if (!canvas.isConnected) return removeEventListener("resize", resize);
      if (visible) {
        ctx.clearRect(0, 0, w, h);
        for (const d of dots) {
          d.y -= d.s;
          d.x += Math.sin(t / 1400 + d.ph) * 0.25;
          // ближе к верху пузырьки тают
          const fade = clamp((d.y - h * 0.3) / (h * 0.3), 0, 1);
          if (d.y < h * 0.3) Object.assign(d, make(false));
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${d.c},${(d.a * fade).toFixed(3)})`;
          ctx.fill();
        }
      }
      requestAnimationFrame(tick);
    })(0);
  }

  /* ---------- Счётчики ---------- */

  const counterIO = new IntersectionObserver((entries) =>
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      counterIO.unobserve(e.target);
      const el = e.target;
      const to = parseInt(el.dataset.count, 10) || 0;
      if (reduced || to === 0) return;
      const start = performance.now();
      const dur = 1400;
      (function step(now) {
        const k = clamp((now - start) / dur, 0, 1);
        el.textContent = Math.round(to * (1 - Math.pow(2, -10 * k)));
        if (k < 1) requestAnimationFrame(step);
        else el.textContent = to;
      })(start);
    }), { threshold: 0.6 });

  /* ---------- Каскадное появление ---------- */

  function stagger() {
    const groups = new Map();
    $$(".reveal:not(.in)").forEach((el) => {
      const list = groups.get(el.parentElement) || [];
      list.push(el);
      groups.set(el.parentElement, list);
    });
    groups.forEach((list) => list.forEach((el, i) => (el.style.transitionDelay = `${Math.min(i, 8) * 80}ms`)));
  }

  /* ---------- Уведомление о загрузке ---------- */

  const toast = document.createElement("div");
  toast.className = "toast";
  document.body.appendChild(toast);
  let toastTimer;

  document.addEventListener("click", (e) => {
    const a = e.target.closest && e.target.closest("a[download]");
    if (!a) return;
    const tr = (k) => (window.I18N ? window.I18N.t(k) : k);
    const name = a.getAttribute("download") || tr("file");
    toast.innerHTML =
      '<span class="toast-icon"><svg viewBox="0 0 24 24"><path d="M9.5 16.2 5.3 12l-1.4 1.4 5.6 5.6L20.1 8.4 18.7 7z"/></svg></span>' +
      "<span><strong></strong><small></small></span>";
    toast.querySelector("strong").textContent = tr("downloadStarted");
    toast.querySelector("small").textContent = name;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3500);
  });

  /* ---------- Ctrl+K — поиск ---------- */

  addEventListener("keydown", (e) => {
    // По коду клавиши — работает и на русской раскладке.
    if ((e.ctrlKey || e.metaKey) && e.code === "KeyK") {
      e.preventDefault();
      const focus = () => {
        const input = $("#searchInput");
        if (!input) return;
        $("#projects").scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
        setTimeout(() => input.focus({ preventScroll: true }), 350);
      };
      if ($("#searchInput")) focus();
      else { location.hash = "#/projects"; setTimeout(focus, 100); }
    }
  });

  /* ---------- После каждой отрисовки ---------- */

  document.addEventListener("page:render", () => {
    $$(".hero-actions .btn, .cta .btn").forEach((b) => b.classList.add("magnet"));
    $$("[data-count]").forEach((el) => counterIO.observe(el));
    stagger();
    startBubbles();
  });
})();
