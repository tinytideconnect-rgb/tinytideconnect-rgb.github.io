/*
 * ============================================================
 *  ДАННЫЕ САЙТА
 *  Чтобы добавить новый проект — скопируйте один блок { ... }
 *  в массив PROJECTS и поменяйте значения. Больше ничего
 *  трогать не нужно: каталог, поиск, страницы и меню
 *  обновятся сами.
 * ============================================================
 */

window.SITE = {
  name: "Tiny Tide",
  // Заголовок на главной: первая строка обычная, вторая — с градиентом
  tagline: "Небольшие проекты,",
  taglineAccent: "которые делают волну",
  about: "Здесь я публикую свои проекты. Все программы можно бесплатно скачать для Windows и Android.",
};

/*
 * Поля проекта:
 *  id           — уникальный идентификатор латиницей (используется в адресе страницы)
 *  title        — название
 *  short        — короткое описание (для карточки)
 *  description  — полное описание (можно несколько абзацев через \n\n)
 *  category     — категория ("Игра", "Утилита", "Приложение" ...)
 *  tags         — список тегов
 *  colors       — два цвета для обложки, если нет картинки
 *  icon         — путь к иконке (необязательно), например "assets/projects/myapp/icon.png"
 *  cover        — путь к обложке (необязательно), например "assets/projects/myapp/cover.jpg"
 *  screenshots  — скриншоты (необязательно): путь "assets/..." или { src: "assets/...", caption: "подпись" };
 *                 для вертикальных снимков с телефона добавьте phone: true
 *  featured     — true, чтобы показать в большом баннере на главной
 *  version      — текущая версия
 *  updated      — дата обновления "ГГГГ-ММ-ДД"
 *  downloads    — файлы для скачивания по платформам (windows / android).
 *                 url: "" — кнопка покажет «Скоро».
 *  requirements — системные требования по платформам (необязательно)
 *  changelog    — история версий (необязательно)
 */

// Установщики и APK лежат в GitHub Releases: <RELEASES><тег релиза>/<имя файла>
const RELEASES = "https://github.com/tinytideconnect-rgb/tinytideconnect-rgb.github.io/releases/download/";

window.PROJECTS = [
  {
    // Черновик: проект ещё в работе. Когда будут готовы файлы —
    // убрать upcoming, вписать url/size, версию, дату и скриншоты.
    id: "lumovibe",
    title: "LumoVibe",
    short: "Бесплатный музыкальный плеер: найдите трек — он заиграет сразу и сохранится в библиотеку.",
    description:
      "LumoVibe — бесплатный музыкальный плеер для телефона и компьютера. Найдите трек по названию или вставьте ссылку: музыка начнёт играть через пару секунд, а файл параллельно сохранится в вашу библиотеку.\n\n" +
      "Скачанное слушается без интернета. Плейлисты, страницы исполнителей, тексты песен, фоновое воспроизведение с управлением из уведомления, а на Windows — сворачивание в трей и медиа-клавиши клавиатуры.\n\n" +
      "Библиотеку можно синхронизировать между устройствами через свой аккаунт Google.",
    category: "Музыка",
    tags: ["Плеер", "Офлайн", "Плейлисты", "Тексты песен"],
    colors: ["#2a1352", "#FF4F8B"],
    icon: "assets/projects/lumovibe/icon.svg",
    cover: "assets/projects/lumovibe/cover.svg",
    screenshots: [],
    featured: true,
    upcoming: true,
    version: "0.1.0",
    updated: "2026-11-21",
    downloads: {
      windows: { url: "", size: "", file: "LumoVibe-Setup-0.1.0.exe" },
      android: { url: "", size: "", file: "LumoVibe.apk" },
    },
    extraFiles: [
      { platform: "android", label: "APK для старых 32-битных телефонов", url: "", size: "", file: "LumoVibe-old-32bit-phones.apk" },
    ],
    requirements: {
      windows: [
        "Windows 10 / 11 (64-bit)",
        "Java уже внутри — ничего доустанавливать не нужно",
        "Интернет при первом запуске: скачается yt-dlp (~15 МБ) и, если нет VLC, портативный VLC (~45 МБ)",
      ],
      android: [
        "Android 8.0 и выше",
        "Первый поиск занимает несколько секунд — распаковывается yt-dlp",
      ],
    },
    changelog: [],
  },
  {
    id: "project-manager",
    title: "Менеджер проектов",
    short: "Все проекты для Claude Code в одном окне — запуск в терминале одним кликом.",
    description:
      "Менеджер проектов собирает все ваши папки с проектами в одном окне и запускает в них Claude Code одним кликом (или двойным щелчком по карточке). Новое окно терминала откроется сразу в нужной папке — Windows Terminal, если он установлен, иначе обычная консоль.\n\n" +
      "Для каждого проекта можно задать свою команду: «claude», «claude --continue», «claude --resume» или любую другую.\n\n" +
      "Тип проекта определяется автоматически по содержимому папки: сайт, Godot, приложение, мобильное, бот / AI, скрипт, библиотека. Проекты группируются по типу, сортируются по алфавиту или по последнему запуску, есть быстрый поиск (Ctrl+F). Обложку проект подхватит сам из icon.png или logo.png в папке — или выберите любую картинку.\n\n" +
      "Тёмный интерфейс, без интернета и аккаунтов: список проектов хранится локально, рядом с программой.",
    category: "Для разработчиков",
    tags: ["Claude Code", "Терминал", "Проекты"],
    colors: ["#14102a", "#7c5cff"],
    icon: "assets/projects/project-manager/icon.svg",
    cover: "assets/projects/project-manager/cover.svg",
    screenshots: [
      { src: "assets/projects/project-manager/screen-1.png", caption: "Все проекты, сгруппированные по типу" },
      { src: "assets/projects/project-manager/screen-2.png", caption: "Добавление нового проекта" },
      { src: "assets/projects/project-manager/screen-3.png", caption: "Редактирование: обложка, тип, папка и команда запуска" },
    ],
    featured: true,
    version: "1.0.0",
    updated: "2026-11-18",
    downloads: {
      windows: { url: RELEASES + "project-manager-v1.0.0/ProjectManager-Setup-1.0.0.exe", size: "15 МБ", file: "ProjectManager-Setup-1.0.0.exe" },
    },
    requirements: {
      windows: [
        "Windows 10 / 11 (64-bit)",
        "Установленный Claude Code (или другая команда для запуска)",
        "Права администратора не нужны",
      ],
    },
    changelog: [
      {
        version: "1.0.0",
        date: "2026-11-18",
        notes: [
          "Первый релиз",
          "Запуск Claude Code в папке проекта одним кликом",
          "Автоопределение типа проекта и обложки",
          "Группировка, сортировка и поиск",
        ],
      },
    ],
  },
  {
    id: "syfl",
    title: "SYFL",
    short: "Send Your Files Locally — передача файлов между ПК и телефоном без интернета.",
    description:
      "SYFL (Send Your Files Locally) передаёт файлы, папки и текст между компьютером и телефоном напрямую — без интернета, облаков и регистрации. Достаточно, чтобы устройства были в одной сети или соединены кабелем.\n\n" +
      "Три канала связи, выбираются автоматически: Wi-Fi / точка доступа телефона, USB-модем и USB-туннель через adb (самый быстрый и стабильный). Устройства находят друг друга сами, а если нет — можно подключиться по QR-коду или ввести адрес вручную.\n\n" +
      "На Windows файлы можно просто перетащить в окно. Есть мастер настройки файрвола и типа сети, пошаговые инструкции по включению отладки по USB, а нужные инструменты adb приложение скачает само.\n\n" +
      "Три стиля интерфейса на выбор: «Карточки», «Карта связи» и «Терминал».",
    category: "Утилита",
    tags: ["Передача файлов", "Без интернета", "Wi-Fi", "USB"],
    colors: ["#0a1a2e", "#0175C2"],
    icon: "assets/projects/syfl/icon.svg",
    cover: "assets/projects/syfl/cover.svg",
    screenshots: [
      { src: "assets/projects/syfl/pc-1-cards.png", caption: "Стиль «Карточки»: устройства рядом и перетаскивание файлов" },
      { src: "assets/projects/syfl/pc-2-text.png", caption: "Текст с телефона приходит прямо в окно" },
      { src: "assets/projects/syfl/pc-3-radar.png", caption: "Стиль «Карта связи»" },
      { src: "assets/projects/syfl/pc-4-offer.png", caption: "Телефон хочет отправить файл — принять или отклонить" },
      { src: "assets/projects/syfl/pc-5-terminal.png", caption: "Стиль «Терминал»" },
      { src: "assets/projects/syfl/phone-1-radar.jpg", caption: "Android: карта связи и отправка на ПК", phone: true },
      { src: "assets/projects/syfl/phone-2-actions.jpg", caption: "Android: действия с устройством и проверка соединения", phone: true },
      { src: "assets/projects/syfl/phone-3-text.jpg", caption: "Android: отправка текста на компьютер", phone: true },
      { src: "assets/projects/syfl/phone-4-terminal.jpg", caption: "Android: стиль «Терминал»", phone: true },
    ],
    featured: true,
    version: "1.0.0",
    updated: "2026-11-18",
    downloads: {
      windows: { url: RELEASES + "syfl-v1.0.0/SYFL-Setup-1.0.0.exe", size: "12 МБ", file: "SYFL-Setup-1.0.0.exe" },
      android: { url: RELEASES + "syfl-v1.0.0/SYFL-android.apk", size: "66 МБ", file: "SYFL-android.apk" },
    },
    requirements: {
      windows: [
        "Windows 10 / 11 (64-bit)",
        "Установщик может сразу разрешить SYFL в брандмауэре",
        "Для USB-туннеля — включённая отладка по USB на телефоне",
      ],
      android: [
        "Android 7.0 и выше",
        "Доступ ко всем файлам — для отправки папок",
        "Камера — для сканирования QR-кода (необязательно)",
      ],
    },
    changelog: [
      {
        version: "1.0.0",
        date: "2026-11-18",
        notes: [
          "Первый релиз",
          "Передача файлов, папок и текста",
          "Каналы: Wi-Fi / хотспот, USB-модем, USB-туннель (adb)",
          "Подключение по QR-коду",
          "Три стиля интерфейса",
        ],
      },
    ],
  },
];
