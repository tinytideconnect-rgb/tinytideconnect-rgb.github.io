/*
 * Перевод сайта. Язык выбирается по региону браузера (русский для ru/uk/be/kk,
 * для остальных — английский), а переключатель RU / EN в шапке запоминает выбор.
 *
 * Тексты проектов в projects.js можно писать на двух языках: { ru: "...", en: "..." }.
 * Если перевода нет, показывается русский вариант.
 */
(function () {
  "use strict";

  const LANGS = ["ru", "en"];
  const STORE_KEY = "tt-lang";

  function detect() {
    try {
      const saved = localStorage.getItem(STORE_KEY);
      if (LANGS.includes(saved)) return saved;
    } catch (e) { /* хранилище недоступно — определяем по браузеру */ }
    const list = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || "en"];
    return list.some((l) => /^(ru|uk|be|kk)\b/i.test(l)) ? "ru" : "en";
  }

  // Русские формы множественного числа: [1 проект, 2 проекта, 5 проектов]
  function ruPlural(n, forms) {
    const a = Math.abs(n) % 100, b = a % 10;
    if (a > 10 && a < 20) return forms[2];
    if (b > 1 && b < 5) return forms[1];
    if (b === 1) return forms[0];
    return forms[2];
  }

  const DICT = {
    ru: {
      "nav.projects": "Проекты",
      "nav.install": "Как установить",
      "nav.search": "Поиск",
      "nav.menu": "Меню",
      soon: "скоро",
      soonBadge: "Скоро",
      downloadFor: "Скачать для {0}",
      project: "Проект",
      nothingFound: "Ничего не найдено",
      more: "Подробнее",
      outNow: "{0} — уже доступен",
      myProjects: "Мои проекты",
      browse: "Смотреть проекты",
      howToInstall: "Как установить",
      "f1.title": "Бесплатно",
      "f1.text": "Все проекты можно скачать без регистрации, подписок и рекламы.",
      "f2.title": "Windows и Android",
      "f2.text": "Установщики для компьютера и APK для телефона — выбирайте свою платформу.",
      "f3.title": "Обновления",
      "f3.text": "Проекты развиваются: у каждого есть история версий с описанием изменений.",
      "catalog.eyebrow": "Каталог",
      "catalog.title": "Все проекты",
      "catalog.sub": "Выберите проект, чтобы узнать подробности и скачать его.",
      all: "Все",
      searchPlaceholder: "Поиск проектов",
      "install.eyebrow": "Установка",
      "install.sub": "Пара шагов — и всё готово.",
      "install.win": [
        "Скачайте установщик (.exe) на странице проекта.",
        "Запустите его. Если появится окно SmartScreen — нажмите «Подробнее» → «Выполнить в любом случае».",
        "Следуйте шагам мастера установки. Ярлык появится в меню «Пуск» и на рабочем столе.",
      ],
      "install.android": [
        "Скачайте файл .apk прямо на телефон.",
        "Откройте его из уведомления или папки «Загрузки».",
        "Если телефон спросит — разрешите браузеру установку неизвестных приложений и нажмите «Установить».",
      ],
      "stats.eyebrow": "В цифрах",
      "stats.title": "{0} сегодня",
      "stats.projects": (n) => ruPlural(n, ["проект", "проекта", "проектов"]),
      "stats.files": (n) => ruPlural(n, ["файл для скачивания", "файла для скачивания", "файлов для скачивания"]),
      "stats.platforms": (n) => ruPlural(n, ["платформа", "платформы", "платформ"]),
      "stats.updated": "последнее обновление",
      "cta.eyebrow": "Готовы?",
      "cta.sub": "Выберите проект и скачайте его бесплатно.",
      "cta.button": "К проектам",
      slide: "Слайд {0}",
      openFull: "Открыть на весь экран",
      screenshot: "Скриншот {0}",
      changelog: "История версий",
      versions: "Версии",
      whatsNew: "Что нового в {0}",
      allChanges: "Все изменения",
      currentVersion: "Текущая",
      downloadThis: "Скачать версию {0}",
      downloadOld: "Скачать старую версию {0}",
      allProjects: "Все проекты",
      noFiles: "Файлы пока недоступны",
      version: "Версия",
      updated: "Обновлено",
      description: "Описание",
      files: "Файлы",
      requirements: "Системные требования",
      "bug.title": "Нашли ошибку?",
      "bug.text": "Напишите — письмо уже заполнено: тема, приложение и устройство.",
      "bug.button": "Сообщить об ошибке",
      "bug.inBrowser": "или в браузере",
      "bug.otherMail": "или другой почтой",
      "bug.subject": "[Ошибка] {0}",
      "bug.body": [
        "Приложение: {0}",
        "Устройство: {1}",
        "",
        "Что случилось:",
        "",
        "",
        "Как повторить:",
        "1. ",
        "2. ",
        "",
        "Что ожидали увидеть:",
        "",
        "",
        "(Если есть скриншот — прикрепите его к письму)",
      ],
      close: "Закрыть",
      prev: "Назад",
      next: "Вперёд",
      "notFound.title": "Не найдено",
      "notFound.text": "Страница не найдена",
      home: "На главную",
      downloadStarted: "Загрузка началась",
      file: "файл",
    },
    en: {
      "nav.projects": "Projects",
      "nav.install": "How to install",
      "nav.search": "Search",
      "nav.menu": "Menu",
      soon: "soon",
      soonBadge: "Soon",
      downloadFor: "Download for {0}",
      project: "Project",
      nothingFound: "Nothing found",
      more: "Details",
      outNow: "{0} is out now",
      myProjects: "My projects",
      browse: "Browse projects",
      howToInstall: "How to install",
      "f1.title": "Free",
      "f1.text": "Every project can be downloaded with no sign-up, subscriptions or ads.",
      "f2.title": "Windows & Android",
      "f2.text": "Installers for your PC and APKs for your phone — pick your platform.",
      "f3.title": "Updates",
      "f3.text": "Projects keep growing: each one has a version history with release notes.",
      "catalog.eyebrow": "Catalog",
      "catalog.title": "All projects",
      "catalog.sub": "Pick a project to see the details and download it.",
      all: "All",
      searchPlaceholder: "Search projects",
      "install.eyebrow": "Installation",
      "install.sub": "A couple of steps and you're done.",
      "install.win": [
        "Download the installer (.exe) from the project page.",
        "Run it. If a SmartScreen window appears, click “More info” → “Run anyway”.",
        "Follow the setup wizard. A shortcut will appear in the Start menu and on the desktop.",
      ],
      "install.android": [
        "Download the .apk file directly to your phone.",
        "Open it from the notification or the Downloads folder.",
        "If your phone asks, allow your browser to install unknown apps and tap “Install”.",
      ],
      "stats.eyebrow": "By the numbers",
      "stats.title": "{0} today",
      "stats.projects": (n) => (n === 1 ? "project" : "projects"),
      "stats.files": (n) => (n === 1 ? "file to download" : "files to download"),
      "stats.platforms": (n) => (n === 1 ? "platform" : "platforms"),
      "stats.updated": "last update",
      "cta.eyebrow": "Ready?",
      "cta.sub": "Pick a project and download it for free.",
      "cta.button": "To projects",
      slide: "Slide {0}",
      openFull: "Open full screen",
      screenshot: "Screenshot {0}",
      changelog: "Version history",
      versions: "Versions",
      whatsNew: "What's new in {0}",
      allChanges: "All changes",
      currentVersion: "Current",
      downloadThis: "Download version {0}",
      downloadOld: "Download older version {0}",
      allProjects: "All projects",
      noFiles: "Files are not available yet",
      version: "Version",
      updated: "Updated",
      description: "Description",
      files: "Files",
      requirements: "System requirements",
      "bug.title": "Found a bug?",
      "bug.text": "Let us know — the email is already filled in: subject, app and device.",
      "bug.button": "Report a bug",
      "bug.inBrowser": "or in the browser",
      "bug.otherMail": "or another mail app",
      "bug.subject": "[Bug] {0}",
      "bug.body": [
        "App: {0}",
        "Device: {1}",
        "",
        "What happened:",
        "",
        "",
        "Steps to reproduce:",
        "1. ",
        "2. ",
        "",
        "What you expected:",
        "",
        "",
        "(If you have a screenshot, please attach it)",
      ],
      close: "Close",
      prev: "Previous",
      next: "Next",
      "notFound.title": "Not found",
      "notFound.text": "Page not found",
      home: "Home",
      downloadStarted: "Download started",
      file: "file",
    },
  };

  let lang = detect();

  const fill = (s, args) => String(s).replace(/\{(\d)\}/g, (_, i) => (args[i] ?? ""));

  // t("key", ...args): строка, массив строк или функция от числа (для «2 проекта»).
  function t(key, ...args) {
    const v = DICT[lang][key] ?? DICT.ru[key] ?? key;
    if (typeof v === "function") return v(...args);
    if (Array.isArray(v)) return v.map((s) => fill(s, args));
    return fill(v, args);
  }

  // L(value): выбирает перевод из { ru, en }; строки и массивы без перевода возвращает как есть.
  function L(v) {
    if (v && typeof v === "object" && !Array.isArray(v) && ("ru" in v || "en" in v)) return v[lang] ?? v.ru;
    return v;
  }

  const size = (s) => (lang === "en" ? String(s || "").replace(/МБ/g, "MB").replace(/КБ/g, "KB").replace(/ГБ/g, "GB") : s || "");

  function setLang(l) {
    if (!LANGS.includes(l) || l === lang) return;
    lang = l;
    try { localStorage.setItem(STORE_KEY, l); } catch (e) { /* выбор просто не запомнится */ }
    document.dispatchEvent(new CustomEvent("lang:change"));
  }

  window.I18N = {
    t, L, size, setLang,
    get lang() { return lang; },
    get locale() { return lang === "ru" ? "ru-RU" : "en-US"; },
  };
})();
