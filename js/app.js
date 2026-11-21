(function () {
  "use strict";

  const SITE = window.SITE || {};
  const PROJECTS = (window.PROJECTS || []).slice();

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const app = $("#app");

  const PLATFORMS = {
    windows: {
      label: "Windows",
      icon: '<svg viewBox="0 0 24 24"><path d="M3 5.5 10.5 4.5v7H3zM12 4.3 21 3v8.5h-9zM3 12.5h7.5v7L3 18.5zM12 12.5h9V21l-9-1.3z"/></svg>',
    },
    android: {
      label: "Android",
      icon: '<svg viewBox="0 0 24 24"><path d="M6 10h12v7a1 1 0 0 1-1 1h-1v3h-2v-3h-4v3H8v-3H7a1 1 0 0 1-1-1zM4 10h1.5v6H4zM18.5 10H20v6h-1.5zM6.2 9a6 6 0 0 1 11.6 0z"/></svg>',
    },
  };

  const ICONS = {
    download: '<svg viewBox="0 0 24 24"><path d="M11 3h2v9.2l3.3-3.3 1.4 1.4L12 16l-5.7-5.7 1.4-1.4 3.3 3.3zM4 18h16v2H4z"/></svg>',
    arrow: '<svg viewBox="0 0 24 24"><path d="M13.2 5.3 19.9 12l-6.7 6.7-1.4-1.4 4.3-4.3H4v-2h12.1l-4.3-4.3z"/></svg>',
    back: '<svg viewBox="0 0 24 24"><path d="M10.8 5.3 4.1 12l6.7 6.7 1.4-1.4L7.9 13H20v-2H7.9l4.3-4.3z"/></svg>',
    spark: '<svg viewBox="0 0 24 24"><path d="M11 2h2v7.6l5.4-5.4 1.4 1.4-5.4 5.4H22v2h-7.6l5.4 5.4-1.4 1.4-5.4-5.4V22h-2v-7.6l-5.4 5.4-1.4-1.4L9.6 13H2v-2h7.6L4.2 5.6l1.4-1.4L11 9.6z"/></svg>',
    gift: '<svg viewBox="0 0 24 24"><path d="M20 7h-2.2A3 3 0 0 0 12 3.8 3 3 0 0 0 6.2 7H4a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1v8a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zM15 5a1 1 0 1 1 0 2h-2a2 2 0 0 1 2-2zM9 5a2 2 0 0 1 2 2H9a1 1 0 1 1 0-2zM5 9h6v2H5zm1 4h5v6H6zm7 6v-6h5v6zm6-8h-6V9h6z"/></svg>',
    devices: '<svg viewBox="0 0 24 24"><path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3h-2V5H5v9h8v2H5a2 2 0 0 1-2-2zm-1 13h11v2H2zm14-8h5a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1zm1 2v6h3v-6z"/></svg>',
    refresh: '<svg viewBox="0 0 24 24"><path d="M12 4a8 8 0 0 1 7.7 6h-2.1A6 6 0 0 0 7.8 7.8L10 10H4V4l2.4 2.4A8 8 0 0 1 12 4zm-7.7 10h2.1a6 6 0 0 0 9.8 2.2L14 14h6v6l-2.4-2.4A8 8 0 0 1 4.3 14z"/></svg>',
    search: '<svg viewBox="0 0 24 24"><path d="M10 3a7 7 0 1 0 4.2 12.6l5.1 5.1 1.4-1.4-5.1-5.1A7 7 0 0 0 10 3zm0 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10z"/></svg>',
  };

  const userPlatform = /android/i.test(navigator.userAgent) ? "android" : "windows";

  /* ---------- Утилиты ---------- */

  function esc(str) {
    return String(str ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function formatDate(iso, short) {
    if (!iso) return "";
    const d = new Date(iso + "T00:00:00");
    if (isNaN(d)) return iso;
    return d.toLocaleDateString("ru-RU", short ? { day: "numeric", month: "short" } : { day: "numeric", month: "long", year: "numeric" });
  }

  const platformsOf = (p) => Object.keys(p.downloads || {}).filter((k) => PLATFORMS[k]);
  const byDate = (a, b) => (b.updated || "").localeCompare(a.updated || "");
  const projectUrl = (p) => `#/project/${encodeURIComponent(p.id)}`;

  function coverStyle(p) {
    const [a, b] = p.colors || ["#1a1a1f", "#09090b"];
    const img = p.cover ? `url('${esc(p.cover)}') center/cover, ` : "";
    return `background: ${img}linear-gradient(135deg, ${a}, ${b});`;
  }

  function iconHTML(p, cls) {
    if (p.icon) return `<img class="p-icon ${cls}" src="${esc(p.icon)}" alt="">`;
    const [a, b] = p.colors || ["#333", "#111"];
    return `<span class="p-icon ${cls}" style="background:linear-gradient(135deg,${a},${b})">${esc(p.title.charAt(0))}</span>`;
  }

  const platformBadges = (p) =>
    platformsOf(p).map((k) => `<span class="platform-badge" title="${PLATFORMS[k].label}">${PLATFORMS[k].icon}</span>`).join("");

  // Волны: путь повторяется каждые 720px, поэтому сдвиг на половину ширины даёт бесшовную петлю.
  const WAVE = "M0 60 Q180 20 360 60 T720 60 T1080 60 T1440 60 T1800 60 T2160 60 T2520 60 T2880 60 V120 H0Z";
  const waves = () => `
    <div class="waves" aria-hidden="true">
      <svg class="wave w1" viewBox="0 0 2880 120" preserveAspectRatio="none"><path d="${WAVE}"/></svg>
      <svg class="wave w2" viewBox="0 0 2880 120" preserveAspectRatio="none"><path d="${WAVE}"/></svg>
      <svg class="wave w3" viewBox="0 0 2880 120" preserveAspectRatio="none"><path d="${WAVE}"/></svg>
    </div>`;

  const heroBg = (short) =>
    `<div class="hero-bg ${short ? "short" : ""}"><div class="g1"></div><div class="g2"></div><div class="blob b3"></div><div class="blob b1"></div><div class="blob b2"></div><div class="noise"></div>${short ? "" : waves()}</div>`;

  const words = (text, from) =>
    String(text || "").split(/\s+/).filter(Boolean).map((w, i) => `<span class="w" style="--i:${from + i}">${esc(w)}</span>`).join(" ");

  /* ---------- Кнопки скачивания ---------- */

  function downloadButton(p, key, primary, small) {
    const d = p.downloads[key];
    const pl = PLATFORMS[key];
    const size = small ? " btn-sm" : "";
    if (!d.url) return `<span class="btn btn-disabled${size}">${pl.icon}<span>${pl.label} · скоро</span></span>`;
    return `<a class="btn ${primary ? "btn-primary" : "btn-outline"}${size}" href="${esc(d.url)}" download="${esc(d.file || "")}">
      ${pl.icon}<span>Скачать для ${pl.label}</span>${d.size && !small ? `<span class="btn-sub">${esc(d.size)}</span>` : ""}
    </a>`;
  }

  function downloadButtons(p, small) {
    const keys = platformsOf(p).sort((a, b) => (a === userPlatform ? -1 : b === userPlatform ? 1 : 0));
    return keys.map((k, i) => downloadButton(p, k, i === 0, small)).join("");
  }

  /* ---------- Карточка ---------- */

  function card(p) {
    return `
      <a class="card spot reveal" href="${projectUrl(p)}">
        <div class="card-cover">
          <div class="cc-bg" style="${coverStyle(p)}"></div>
          ${p.cover ? "" : `<span class="card-cover-title">${esc(p.title)}</span>`}
          ${p.upcoming ? '<span class="soon-badge">Скоро</span>' : ""}
          <div class="card-platforms">${platformBadges(p)}</div>
        </div>
        <div class="card-body">
          <div class="card-top">
            ${iconHTML(p, "p-icon-sm")}
            <span class="card-title">${esc(p.title)}</span>
            <span class="chip">${esc(p.category || "Проект")}</span>
          </div>
          <p class="card-desc">${esc(p.short)}</p>
          <div class="card-meta"><span>v${esc(p.version)}</span><span>${formatDate(p.updated)}</span></div>
        </div>
      </a>`;
  }

  /* ---------- Главная ---------- */

  const catalog = { filter: "all", query: "" };

  function filteredProjects() {
    const q = catalog.query.trim().toLowerCase();
    return PROJECTS.filter((p) => {
      if (PLATFORMS[catalog.filter] && !platformsOf(p).includes(catalog.filter)) return false;
      if (catalog.filter.startsWith("cat:") && p.category !== catalog.filter.slice(4)) return false;
      if (q && ![p.title, p.short, p.category, ...(p.tags || [])].join(" ").toLowerCase().includes(q)) return false;
      return true;
    }).sort(byDate);
  }

  function gridHTML() {
    const list = filteredProjects();
    if (!list.length) return `<div class="empty">${ICONS.search}<span>Ничего не найдено</span></div>`;
    return `<div class="grid">${list.map(card).join("")}</div>`;
  }

  function showSlide(p, active) {
    return `
      <div class="slide ${active ? "active" : ""}">
        <div class="show-bg" style="${coverStyle(p)}"></div>
        <div class="show-shade"></div>
        <div class="show-inner">
          ${iconHTML(p, "p-icon-md")}
          <div class="show-info">
            <h2 class="show-title">${esc(p.title)}</h2>
            <p class="show-desc">${esc(p.short)}</p>
            <div class="show-actions">
              <a class="btn btn-primary btn-sm" href="${projectUrl(p)}">Подробнее ${ICONS.arrow}</a>
              ${downloadButtons(p, true).replace(/btn-primary/g, "btn-outline")}
            </div>
          </div>
        </div>
      </div>`;
  }

  function pageHome() {
    const featured = PROJECTS.filter((p) => p.featured);
    const slides = (featured.length ? featured : PROJECTS.slice().sort(byDate)).slice(0, 5);
    // «Уже доступен» и дата обновления — только по вышедшим проектам.
    const latest = PROJECTS.filter((p) => !p.upcoming).sort(byDate)[0];
    const categories = [...new Set(PROJECTS.map((p) => p.category).filter(Boolean))];
    const files = PROJECTS.reduce((n, p) => n + platformsOf(p).filter((k) => p.downloads[k].url).length, 0);

    const filters = [
      ["all", "Все"],
      ["windows", "Windows"],
      ["android", "Android"],
      ...(categories.length > 1 ? categories.map((c) => ["cat:" + c, c]) : []),
    ];

    const html = `
      <section class="hero">
        ${heroBg()}
        <div class="hero-head">
          ${latest ? `<a class="pill rise" style="--d:0" href="${projectUrl(latest)}"><span class="live-dot"></span><span>${esc(latest.title)} ${esc(latest.version)} — уже доступен</span>${ICONS.arrow}</a>` : ""}
          <h1 class="hero-title">${words(SITE.tagline || "Мои проекты", 1)}<br><span class="grad rise" style="--d:5">${esc(SITE.taglineAccent || "")}</span></h1>
          <p class="hero-sub rise" style="--d:7">${esc(SITE.about)}</p>
          <div class="hero-actions rise" style="--d:9">
            <a class="btn btn-primary" href="#/projects">${ICONS.download}<span>Смотреть проекты</span></a>
            <a class="btn btn-outline" href="#/install">Как установить</a>
          </div>
        </div>

        <div class="showcase-wrap rise" style="--d:11">
          <div class="window" id="showcase">
            <div class="window-bar">
              <div class="dots"><i></i><i></i><i></i></div>
              <span class="window-title" id="showTitle"></span>
            </div>
            <div id="showSlot"></div>
          </div>
        </div>

        <div class="container">
          <div class="features">
            <div class="feature reveal">
              <div class="feature-head"><span class="feature-icon">${ICONS.gift}</span><h3>Бесплатно</h3></div>
              <p>Все проекты можно скачать без регистрации, подписок и рекламы.</p>
            </div>
            <div class="feature reveal">
              <div class="feature-head"><span class="feature-icon">${ICONS.devices}</span><h3>Windows и Android</h3></div>
              <p>Установщики для компьютера и APK для телефона — выбирайте свою платформу.</p>
            </div>
            <div class="feature reveal">
              <div class="feature-head"><span class="feature-icon">${ICONS.refresh}</span><h3>Обновления</h3></div>
              <p>Проекты развиваются: у каждого есть история версий с описанием изменений.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section container" id="projects">
        <div class="section-head reveal">
          <span class="eyebrow">Каталог</span>
          <h2 class="section-title">Все проекты</h2>
          <p class="section-sub">Выберите проект, чтобы узнать подробности и скачать его.</p>
        </div>
        <div class="toolbar">
          <div class="filters">
            ${filters.map(([v, l]) => `<button class="filter ${catalog.filter === v ? "active" : ""}" data-filter="${esc(v)}">${esc(l)}</button>`).join("")}
          </div>
          <label class="search">${ICONS.search}<input type="search" id="searchInput" placeholder="Поиск проектов" value="${esc(catalog.query)}" autocomplete="off"><kbd>Ctrl K</kbd></label>
        </div>
        <div id="gridSlot">${gridHTML()}</div>
      </section>

      <section class="section container" id="install">
        <div class="section-head reveal">
          <span class="eyebrow">Установка</span>
          <h2 class="section-title">Как установить</h2>
          <p class="section-sub">Пара шагов — и всё готово.</p>
        </div>
        <div class="install">
          <div class="panel spot reveal">
            <h3>${PLATFORMS.windows.icon}Windows</h3>
            <ol class="steps">
              <li>Скачайте установщик (.exe) на странице проекта.</li>
              <li>Запустите его. Если появится окно SmartScreen — нажмите «Подробнее» → «Выполнить в любом случае».</li>
              <li>Следуйте шагам мастера установки. Ярлык появится в меню «Пуск» и на рабочем столе.</li>
            </ol>
          </div>
          <div class="panel spot reveal">
            <h3>${PLATFORMS.android.icon}Android</h3>
            <ol class="steps">
              <li>Скачайте файл .apk прямо на телефон.</li>
              <li>Откройте его из уведомления или папки «Загрузки».</li>
              <li>Если телефон спросит — разрешите браузеру установку неизвестных приложений и нажмите «Установить».</li>
            </ol>
          </div>
        </div>
      </section>

      <section class="section container">
        <div class="section-head reveal">
          <span class="eyebrow">В цифрах</span>
          <h2 class="section-title">${esc(SITE.name)} сегодня</h2>
        </div>
        <div class="stats">
          <div class="stat reveal"><strong data-count="${PROJECTS.length}">${PROJECTS.length}</strong><span>проектов</span></div>
          <div class="stat reveal"><strong data-count="${files}">${files}</strong><span>файлов для скачивания</span></div>
          <div class="stat reveal"><strong data-count="2">2</strong><span>платформы</span></div>
          <div class="stat reveal"><strong>${latest ? formatDate(latest.updated, true) : "—"}</strong><span>последнее обновление</span></div>
        </div>
      </section>

      <section class="container">
        <div class="cta reveal">
          ${waves()}
          <span class="eyebrow">Готовы?</span>
          <h2>${esc(SITE.name)}</h2>
          <p class="section-sub" style="color:var(--muted-2)">Выберите проект и скачайте его бесплатно.</p>
          <a class="btn btn-primary" href="#/projects">${ICONS.download}<span>К проектам</span></a>
        </div>
      </section>`;

    return { title: SITE.name, html, after: () => { bindCatalog(); startShowcase(slides); } };
  }

  function bindCatalog() {
    $$("[data-filter]").forEach((b) =>
      b.addEventListener("click", () => {
        catalog.filter = b.dataset.filter;
        $$("[data-filter]").forEach((x) => x.classList.toggle("active", x === b));
        refreshGrid();
      })
    );
    $("#searchInput").addEventListener("input", (e) => {
      catalog.query = e.target.value;
      refreshGrid();
    });
  }

  function refreshGrid() {
    $("#gridSlot").innerHTML = gridHTML();
    observeReveal();
    document.dispatchEvent(new CustomEvent("page:render"));
  }

  // Слайды лежат стопкой и переключаются плавным перекрёстным затуханием.
  const SLIDE_MS = 7000;
  let showTimer = null;
  function startShowcase(slides) {
    clearInterval(showTimer);
    const slot = $("#showSlot");
    if (!slides.length) return $("#showcase").remove();

    slot.innerHTML = `<div class="show-stack">${slides.map((p, j) => showSlide(p, j === 0)).join("")}
      ${slides.length > 1 ? `<div class="show-nav">${slides.map((_, j) => `<button aria-label="Слайд ${j + 1}"><i></i></button>`).join("")}</div>` : ""}
    </div>`;
    const slideEls = $$(".slide", slot);
    const dots = $$(".show-nav button", slot);
    let i = 0;
    let paused = false;

    const go = (n) => {
      i = (n + slides.length) % slides.length;
      slideEls.forEach((s, j) => s.classList.toggle("active", j === i));
      dots.forEach((d, j) => {
        d.classList.remove("active");
        if (j === i) {
          void d.offsetWidth; // перезапуск анимации полоски прогресса
          d.classList.add("active");
        }
      });
      $("#showTitle").textContent = `${SITE.name} — ${slides[i].title}`;
    };
    const restart = () => {
      clearInterval(showTimer);
      if (slides.length > 1) showTimer = setInterval(() => !paused && go(i + 1), SLIDE_MS);
    };

    dots.forEach((d, j) => d.addEventListener("click", () => { go(j); restart(); }));
    const win = $("#showcase");
    win.addEventListener("mouseenter", () => { paused = true; win.classList.add("paused"); });
    win.addEventListener("mouseleave", () => { paused = false; win.classList.remove("paused"); });

    go(0);
    restart();
  }

  /* ---------- Страница проекта ---------- */

  function pageProject(id) {
    const p = PROJECTS.find((x) => x.id === id);
    if (!p) return pageNotFound();

    const paragraphs = (p.description || p.short || "").split(/\n\s*\n/).map((t) => `<p>${esc(t)}</p>`).join("");

    // Скриншоты показываются прямо в «окне»; без них там будет обложка.
    const shotList = shotsOf(p);
    const viewer = shotList.length
      ? `<div class="viewer">
          <button class="viewer-stage" data-open aria-label="Открыть на весь экран">
            ${shotList.map((s, i) => `
              <div class="vs ${s.phone ? "phone" : ""} ${i ? "" : "active"}">
                ${s.phone ? `<img class="vs-bg" src="${esc(s.src)}" alt="" ${i ? 'loading="lazy"' : ""}>` : ""}
                <img class="vs-img" src="${esc(s.src)}" alt="${esc(s.caption)}" ${i ? 'loading="lazy"' : ""}>
              </div>`).join("")}
            <span class="viewer-zoom"><svg viewBox="0 0 24 24"><path d="M4 4h6v2H6v4H4zm10 0h6v6h-2V6h-4zM4 14h2v4h4v2H4zm14 0h2v6h-6v-2h4z"/></svg></span>
          </button>
          ${shotList.length > 1 || shotList[0].caption ? `
          <div class="viewer-bar">
            <span class="viewer-caption" id="viewerCaption">${esc(shotList[0].caption)}</span>
            ${shotList.length > 1 ? `<div class="thumbs">${shotList.map((s, i) => `<button class="thumb ${s.phone ? "phone" : ""} ${i ? "" : "active"}" data-thumb="${i}" aria-label="Скриншот ${i + 1}"><img src="${esc(s.src)}" alt="" loading="lazy"></button>`).join("")}</div>` : ""}
          </div>` : ""}
        </div>`
      : `<div class="show" style="${coverStyle(p)}"></div>`;

    const changelog = (p.changelog || []).length
      ? `<div class="panel spot"><h4>История версий</h4>${p.changelog
          .map(
            (c) => `<div class="change">
              <div class="change-head"><strong>v${esc(c.version)}</strong><span class="muted">${formatDate(c.date)}</span></div>
              <ul>${(c.notes || []).map((n) => `<li>${esc(n)}</li>`).join("")}</ul>
            </div>`
          )
          .join("")}</div>`
      : "";

    const files = platformsOf(p)
      .map((k) => {
        const d = p.downloads[k];
        return `<div class="file-row"><span class="file-pl">${PLATFORMS[k].icon}${esc(d.file || PLATFORMS[k].label)}</span><span class="muted">${esc(d.size || "")}</span></div>`;
      })
      .join("") +
      extrasOf(p)
        .map((x) => `<div class="file-row"><span class="file-pl">${PLATFORMS[x.platform] ? PLATFORMS[x.platform].icon : ""}${esc(x.file || x.label)}</span><span class="muted">${esc(x.size || "")}</span></div>`)
        .join("");

    // Дополнительные файлы (например, APK для старых телефонов) — скромными ссылками под кнопками.
    const extraLinks = extrasOf(p)
      .filter((x) => x.url)
      .map((x) => `<a class="extra-link" href="${esc(x.url)}" download="${esc(x.file || "")}">${PLATFORMS[x.platform] ? PLATFORMS[x.platform].icon : ""}${esc(x.label)}${x.size ? ` · ${esc(x.size)}` : ""}</a>`)
      .join("");

    const reqs = p.requirements
      ? Object.entries(p.requirements)
          .filter(([k]) => PLATFORMS[k])
          .map(([k, items]) => `<div class="req"><div class="req-head">${PLATFORMS[k].icon}${PLATFORMS[k].label}</div><ul>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div>`)
          .join("")
      : "";

    const html = `
      <div class="page">
        ${heroBg(true)}
        <div class="container">
          <a class="back" href="#/projects">${ICONS.back}Все проекты</a>
          <div class="p-head">
            ${iconHTML(p, "p-icon-lg")}
            <div>
              <h1 class="p-title">${esc(p.title)}</h1>
              <p class="p-short">${esc(p.short)}</p>
              <div class="p-tags">
                ${p.upcoming ? '<span class="chip chip-soon">Скоро</span>' : ""}
                <span class="chip">${esc(p.category || "Проект")}</span>
                ${(p.tags || []).map((t) => `<span class="chip">${esc(t)}</span>`).join("")}
              </div>
            </div>
          </div>

          <div class="p-actions">
            <div>
              <div class="p-downloads">${downloadButtons(p) || '<span class="muted">Файлы пока недоступны</span>'}</div>
              ${extraLinks ? `<div class="extra-links">${extraLinks}</div>` : ""}
            </div>
            <div class="p-meta">
              <div>Версия<strong>${esc(p.version)}</strong></div>
              <div>Обновлено<strong>${formatDate(p.updated)}</strong></div>
            </div>
          </div>

          <div class="window">
            <div class="window-bar">
              <div class="dots"><i></i><i></i><i></i></div>
              <span class="window-title">${esc(p.title)} ${esc(p.version)}</span>
            </div>
            ${viewer}
          </div>

          <div class="p-layout">
            <div class="p-main">
              <div class="panel spot"><h4>Описание</h4><div class="prose">${paragraphs}</div></div>
              ${changelog}
            </div>
            <aside class="p-side">
              <div class="panel spot"><h4>Файлы</h4>${files}</div>
              ${reqs ? `<div class="panel spot"><h4>Системные требования</h4>${reqs}</div>` : ""}
            </aside>
          </div>
        </div>
      </div>`;

    return { title: `${p.title} — ${SITE.name}`, html, after: () => bindViewer(shotList) };
  }

  const extrasOf = (p) => p.extraFiles || [];

  // Скриншот может быть строкой-путём или объектом { src, caption }.
  const shotsOf = (p) =>
    (p.screenshots || []).map((s) => (typeof s === "string" ? { src: s, caption: "" } : { src: s.src, caption: s.caption || "", phone: !!s.phone }));

  function bindViewer(list) {
    if (!list.length) return;
    let cur = 0;
    const imgs = $$(".viewer-stage .vs");
    const thumbs = $$("[data-thumb]");

    const show = (n) => {
      cur = (n + list.length) % list.length;
      imgs.forEach((im, i) => im.classList.toggle("active", i === cur));
      thumbs.forEach((t, i) => t.classList.toggle("active", i === cur));
      const cap = $("#viewerCaption");
      if (cap) cap.textContent = list[cur].caption;
    };
    thumbs.forEach((t) =>
      t.addEventListener("click", () => {
        show(+t.dataset.thumb);
        t.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      })
    );
    $("[data-open]").addEventListener("click", () => openLightbox(list, cur, show));
  }

  // Полноэкранный просмотр: стрелки, Esc, клик по фону закрывает.
  function openLightbox(list, start, onChange) {
    let cur = start;
    const box = document.createElement("div");
    box.className = "lightbox";
    box.innerHTML = `
      <figure class="lb-figure"><img alt=""><figcaption></figcaption></figure>
      <span class="lb-count"></span>
      <button class="lb-btn lb-close" aria-label="Закрыть"><svg viewBox="0 0 24 24"><path d="m6.4 5 5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19 5 17.6l5.6-5.6L5 6.4z"/></svg></button>
      ${list.length > 1 ? `
      <button class="lb-btn lb-prev" aria-label="Назад">${ICONS.back}</button>
      <button class="lb-btn lb-next" aria-label="Вперёд">${ICONS.arrow}</button>` : ""}`;
    const img = $("img", box);
    const draw = () => {
      img.src = list[cur].src;
      $("figcaption", box).textContent = list[cur].caption;
      $(".lb-count", box).textContent = list.length > 1 ? `${cur + 1} / ${list.length}` : "";
      onChange(cur);
    };
    const step = (d) => { cur = (cur + d + list.length) % list.length; draw(); };
    const close = () => {
      box.classList.remove("open");
      removeEventListener("keydown", onKey);
      setTimeout(() => box.remove(), 300);
    };
    const onKey = (e) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };

    box.addEventListener("click", (e) => {
      if (e.target.closest(".lb-prev")) step(-1);
      else if (e.target.closest(".lb-next")) step(1);
      else if (e.target.closest(".lb-close") || !e.target.closest(".lb-figure img")) close();
    });
    addEventListener("keydown", onKey);
    document.body.appendChild(box);
    draw();
    requestAnimationFrame(() => box.classList.add("open"));
  }

  function pageNotFound() {
    return {
      title: `Не найдено — ${SITE.name}`,
      html: `<div class="page">${heroBg(true)}<div class="container empty"><h1 class="p-title">Страница не найдена</h1><a class="btn btn-outline" href="#/">На главную</a></div></div>`,
    };
  }

  /* ---------- Роутер ---------- */
  // #/                — главная
  // #/projects        — главная, прокрутка к каталогу
  // #/windows, #/android — каталог с фильтром по платформе
  // #/install         — главная, прокрутка к инструкции
  // #/project/<id>    — страница проекта

  let currentPage = null;

  function render() {
    const [page, arg] = location.hash.replace(/^#\/?/, "").split("/").map(decodeURIComponent);
    const homeSections = { projects: "projects", windows: "projects", android: "projects", install: "install" };

    if (!page || homeSections[page]) {
      if (PLATFORMS[page]) catalog.filter = page;
      else if (page === "projects") catalog.filter = "all";

      if (currentPage !== "home") mount(pageHome(), "home");
      else {
        $$("[data-filter]").forEach((x) => x.classList.toggle("active", x.dataset.filter === catalog.filter));
        refreshGrid();
      }
      const target = homeSections[page];
      if (target) requestAnimationFrame(() => $("#" + target).scrollIntoView({ behavior: "smooth" }));
      else window.scrollTo({ top: 0 });
    } else if (page === "project") {
      mount(pageProject(arg), "project:" + arg);
      window.scrollTo({ top: 0 });
    } else {
      mount(pageNotFound(), "404");
      window.scrollTo({ top: 0 });
    }

    $$(".nav-links a").forEach((a) => a.classList.toggle("active", a.dataset.route === page));
    $("#navLinks").classList.remove("open");
  }

  function mount(view, key) {
    clearInterval(showTimer);
    app.innerHTML = view.html;
    document.title = view.title;
    currentPage = key;
    view.after && view.after();
    observeReveal();
    document.dispatchEvent(new CustomEvent("page:render"));
  }

  /* ---------- Появление при прокрутке ---------- */

  const io = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))), { rootMargin: "0px 0px -40px" })
    : null;

  function observeReveal() {
    $$(".reveal:not(.in)").forEach((el) => (io ? io.observe(el) : el.classList.add("in")));
  }

  /* ---------- Навигация ---------- */

  $("#menuBtn").addEventListener("click", () => $("#navLinks").classList.toggle("open"));
  $("#searchBtn").addEventListener("click", () => setTimeout(() => $("#searchInput") && $("#searchInput").focus({ preventScroll: true }), 400));

  // Панель прячется при прокрутке вниз и появляется при прокрутке вверх.
  let lastY = 0;
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    $("#nav").classList.toggle("hidden", y > lastY && y > 200 && !$("#navLinks").classList.contains("open"));
    lastY = y;
  }, { passive: true });

  $("#brandName").textContent = SITE.name;
  $("#footerName").textContent = SITE.name;
  $("#footerCopy").textContent = `© ${new Date().getFullYear()} ${SITE.name}`;

  window.addEventListener("hashchange", render);
  render();
})();
