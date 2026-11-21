/*
 * ============================================================
 *  ДАННЫЕ САЙТА
 *  Чтобы добавить новый проект — скопируйте один блок { ... }
 *  в массив PROJECTS и поменяйте значения. Больше ничего
 *  трогать не нужно: каталог, поиск, страницы и меню
 *  обновятся сами.
 *
 *  ПЕРЕВОД: любой текст можно записать на двух языках —
 *  { ru: "по-русски", en: "in English" }. Если оставить просто
 *  строку, она будет показана на обоих языках.
 * ============================================================
 */

window.SITE = {
  name: "Tiny Tide",
  // Заголовок на главной: первая строка обычная, вторая — с градиентом
  tagline: { ru: "Небольшие проекты,", en: "Tiny projects" },
  taglineAccent: { ru: "которые делают волну", en: "that make big waves" },
  about: {
    ru: "Здесь я публикую свои проекты. Все программы можно бесплатно скачать для Windows и Android.",
    en: "This is where I publish my projects. Every app is free to download for Windows and Android.",
  },
  // Куда приходят письма с кнопки «Сообщить об ошибке» (пусто — кнопка скрыта)
  bugEmail: "tinytide.connect@gmail.com",
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
 *  upcoming     — true, если проект ещё не вышел (метка «Скоро», кнопки неактивны)
 *  version      — текущая версия
 *  updated      — дата обновления "ГГГГ-ММ-ДД"
 *  downloads    — файлы для скачивания по платформам (windows / android).
 *                 url: "" — кнопка покажет «скоро».
 *  extraFiles   — дополнительные файлы: { platform, label, url, size, file }
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
    short: {
      ru: "Бесплатный музыкальный плеер: найдите трек — он заиграет сразу и сохранится в библиотеку.",
      en: "A free music player: find a track — it starts playing right away and is saved to your library.",
    },
    description: {
      ru:
        "LumoVibe — бесплатный музыкальный плеер для телефона и компьютера. Найдите трек по названию или вставьте ссылку: музыка начнёт играть через пару секунд, а файл параллельно сохранится в вашу библиотеку.\n\n" +
        "Скачанное слушается без интернета. Плейлисты, страницы исполнителей, тексты песен, фоновое воспроизведение с управлением из уведомления, а на Windows — сворачивание в трей и медиа-клавиши клавиатуры.\n\n" +
        "Библиотеку можно синхронизировать между устройствами через свой аккаунт Google.",
      en:
        "LumoVibe is a free music player for your phone and PC. Search for a track by name or paste a link: the music starts in a couple of seconds while the file is saved to your library in the background.\n\n" +
        "Everything you download plays offline. Playlists, artist pages, lyrics, background playback with notification controls, and on Windows — minimize to tray and keyboard media keys.\n\n" +
        "Your library can be synced between devices with your Google account.",
    },
    category: { ru: "Музыка", en: "Music" },
    tags: { ru: ["Плеер", "Офлайн", "Плейлисты", "Тексты песен"], en: ["Player", "Offline", "Playlists", "Lyrics"] },
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
      {
        platform: "android",
        label: { ru: "APK для старых 32-битных телефонов", en: "APK for older 32-bit phones" },
        url: "",
        size: "",
        file: "LumoVibe-old-32bit-phones.apk",
      },
    ],
    requirements: {
      windows: {
        ru: [
          "Windows 10 / 11 (64-bit)",
          "Java уже внутри — ничего доустанавливать не нужно",
          "Интернет при первом запуске: скачается yt-dlp (~15 МБ) и, если нет VLC, портативный VLC (~45 МБ)",
        ],
        en: [
          "Windows 10 / 11 (64-bit)",
          "Java is bundled — nothing else to install",
          "Internet on first launch: yt-dlp (~15 MB) and, if VLC is missing, portable VLC (~45 MB) are downloaded",
        ],
      },
      android: {
        ru: ["Android 8.0 и выше", "Первый поиск занимает несколько секунд — распаковывается yt-dlp"],
        en: ["Android 8.0 or newer", "The first search takes a few seconds while yt-dlp is unpacked"],
      },
    },
    changelog: [],
  },
  {
    id: "project-manager",
    title: { ru: "Менеджер проектов", en: "Project Manager" },
    short: {
      ru: "Все проекты для Claude Code в одном окне — запуск в терминале одним кликом.",
      en: "All your Claude Code projects in one window — launch in a terminal with one click.",
    },
    description: {
      ru:
        "Менеджер проектов собирает все ваши папки с проектами в одном окне и запускает в них Claude Code одним кликом (или двойным щелчком по карточке). Новое окно терминала откроется сразу в нужной папке — Windows Terminal, если он установлен, иначе обычная консоль.\n\n" +
        "Для каждого проекта можно задать свою команду: «claude», «claude --continue», «claude --resume» или любую другую.\n\n" +
        "Тип проекта определяется автоматически по содержимому папки: сайт, Godot, приложение, мобильное, бот / AI, скрипт, библиотека. Проекты группируются по типу, сортируются по алфавиту или по последнему запуску, есть быстрый поиск (Ctrl+F). Обложку проект подхватит сам из icon.png или logo.png в папке — или выберите любую картинку.\n\n" +
        "Тёмный интерфейс, без интернета и аккаунтов: список проектов хранится локально, рядом с программой.",
      en:
        "Project Manager keeps all your project folders in one window and launches Claude Code in any of them with a single click (or a double-click on the card). A new terminal window opens right in the project folder — Windows Terminal if it's installed, otherwise the classic console.\n\n" +
        "Each project can have its own command: “claude”, “claude --continue”, “claude --resume” or anything else.\n\n" +
        "The project type is detected automatically from the folder contents: website, Godot, app, mobile, bot / AI, script, library. Projects are grouped by type, sorted alphabetically or by last launch, and there's quick search (Ctrl+F). A cover is picked up from icon.png or logo.png in the folder — or choose any image.\n\n" +
        "Dark interface, no internet and no accounts: your project list is stored locally, next to the app.",
    },
    category: { ru: "Для разработчиков", en: "Developer tools" },
    tags: { ru: ["Claude Code", "Терминал", "Проекты"], en: ["Claude Code", "Terminal", "Projects"] },
    colors: ["#14102a", "#7c5cff"],
    icon: "assets/projects/project-manager/icon.svg",
    cover: "assets/projects/project-manager/cover.svg",
    screenshots: [
      { src: "assets/projects/project-manager/screen-1.png", caption: { ru: "Все проекты, сгруппированные по типу", en: "All projects, grouped by type" } },
      { src: "assets/projects/project-manager/screen-2.png", caption: { ru: "Добавление нового проекта", en: "Adding a new project" } },
      { src: "assets/projects/project-manager/screen-3.png", caption: { ru: "Редактирование: обложка, тип, папка и команда запуска", en: "Editing: cover, type, folder and launch command" } },
    ],
    featured: true,
    version: "1.0.0",
    updated: "2026-11-18",
    downloads: {
      windows: { url: RELEASES + "project-manager-v1.0.0/ProjectManager-Setup-1.0.0.exe", size: "15 МБ", file: "ProjectManager-Setup-1.0.0.exe" },
    },
    requirements: {
      windows: {
        ru: ["Windows 10 / 11 (64-bit)", "Установленный Claude Code (или другая команда для запуска)", "Права администратора не нужны"],
        en: ["Windows 10 / 11 (64-bit)", "Claude Code installed (or any other launch command)", "No administrator rights required"],
      },
    },
    changelog: [
      {
        version: "1.0.0",
        date: "2026-11-18",
        notes: {
          ru: ["Первый релиз", "Запуск Claude Code в папке проекта одним кликом", "Автоопределение типа проекта и обложки", "Группировка, сортировка и поиск"],
          en: ["First release", "Launch Claude Code in a project folder with one click", "Automatic project type and cover detection", "Grouping, sorting and search"],
        },
      },
    ],
  },
  {
    id: "syfl",
    title: "SYFL",
    short: {
      ru: "Send Your Files Locally — передача файлов между ПК и телефоном без интернета.",
      en: "Send Your Files Locally — transfer files between your PC and phone without the internet.",
    },
    description: {
      ru:
        "SYFL (Send Your Files Locally) передаёт файлы, папки и текст между компьютером и телефоном напрямую — без интернета, облаков и регистрации. Достаточно, чтобы устройства были в одной сети или соединены кабелем.\n\n" +
        "Три канала связи, выбираются автоматически: Wi-Fi / точка доступа телефона, USB-модем и USB-туннель через adb (самый быстрый и стабильный). Устройства находят друг друга сами, а если нет — можно подключиться по QR-коду или ввести адрес вручную.\n\n" +
        "На Windows файлы можно просто перетащить в окно. Есть мастер настройки файрвола и типа сети, пошаговые инструкции по включению отладки по USB, а нужные инструменты adb приложение скачает само.\n\n" +
        "Три стиля интерфейса на выбор: «Карточки», «Карта связи» и «Терминал».",
      en:
        "SYFL (Send Your Files Locally) sends files, folders and text between your computer and phone directly — no internet, no cloud, no sign-up. The devices just need to be on the same network or connected with a cable.\n\n" +
        "Three connection channels, chosen automatically: Wi-Fi / phone hotspot, USB tethering and a USB tunnel via adb (the fastest and most stable). Devices find each other on their own; if not, connect with a QR code or enter the address manually.\n\n" +
        "On Windows you can simply drag files into the window. There's a firewall and network-type setup wizard, step-by-step USB debugging instructions, and the app downloads the adb tools it needs by itself.\n\n" +
        "Three interface styles to choose from: “Cards”, “Link map” and “Terminal”.",
    },
    category: { ru: "Утилита", en: "Utility" },
    tags: { ru: ["Передача файлов", "Без интернета", "Wi-Fi", "USB"], en: ["File transfer", "Offline", "Wi-Fi", "USB"] },
    colors: ["#0a1a2e", "#0175C2"],
    icon: "assets/projects/syfl/icon.svg",
    cover: "assets/projects/syfl/cover.svg",
    screenshots: [
      { src: "assets/projects/syfl/pc-1-cards.png", caption: { ru: "Стиль «Карточки»: устройства рядом и перетаскивание файлов", en: "“Cards” style: nearby devices and drag-and-drop" } },
      { src: "assets/projects/syfl/pc-2-text.png", caption: { ru: "Текст с телефона приходит прямо в окно", en: "Text from the phone arrives right in the window" } },
      { src: "assets/projects/syfl/pc-3-radar.png", caption: { ru: "Стиль «Карта связи»", en: "“Link map” style" } },
      { src: "assets/projects/syfl/pc-4-offer.png", caption: { ru: "Телефон хочет отправить файл — принять или отклонить", en: "The phone wants to send a file — accept or decline" } },
      { src: "assets/projects/syfl/pc-5-terminal.png", caption: { ru: "Стиль «Терминал»", en: "“Terminal” style" } },
      { src: "assets/projects/syfl/phone-1-radar.jpg", caption: { ru: "Android: карта связи и отправка на ПК", en: "Android: link map and sending to the PC" }, phone: true },
      { src: "assets/projects/syfl/phone-2-actions.jpg", caption: { ru: "Android: действия с устройством и проверка соединения", en: "Android: device actions and connection check" }, phone: true },
      { src: "assets/projects/syfl/phone-3-text.jpg", caption: { ru: "Android: отправка текста на компьютер", en: "Android: sending text to the computer" }, phone: true },
      { src: "assets/projects/syfl/phone-4-terminal.jpg", caption: { ru: "Android: стиль «Терминал»", en: "Android: “Terminal” style" }, phone: true },
    ],
    featured: true,
    version: "1.0.0",
    updated: "2026-11-18",
    downloads: {
      windows: { url: RELEASES + "syfl-v1.0.0/SYFL-Setup-1.0.0.exe", size: "12 МБ", file: "SYFL-Setup-1.0.0.exe" },
      android: { url: RELEASES + "syfl-v1.0.0/SYFL-android.apk", size: "66 МБ", file: "SYFL-android.apk" },
    },
    requirements: {
      windows: {
        ru: ["Windows 10 / 11 (64-bit)", "Установщик может сразу разрешить SYFL в брандмауэре", "Для USB-туннеля — включённая отладка по USB на телефоне"],
        en: ["Windows 10 / 11 (64-bit)", "The installer can allow SYFL through the firewall right away", "For the USB tunnel — USB debugging enabled on the phone"],
      },
      android: {
        ru: ["Android 7.0 и выше", "Доступ ко всем файлам — для отправки папок", "Камера — для сканирования QR-кода (необязательно)"],
        en: ["Android 7.0 or newer", "All-files access — to send folders", "Camera — to scan QR codes (optional)"],
      },
    },
    changelog: [
      {
        version: "1.0.0",
        date: "2026-11-18",
        notes: {
          ru: ["Первый релиз", "Передача файлов, папок и текста", "Каналы: Wi-Fi / хотспот, USB-модем, USB-туннель (adb)", "Подключение по QR-коду", "Три стиля интерфейса"],
          en: ["First release", "Transfer files, folders and text", "Channels: Wi-Fi / hotspot, USB tethering, USB tunnel (adb)", "Connect with a QR code", "Three interface styles"],
        },
      },
    ],
  },
];
