"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Language = "en" | "uk";

const copy = {
  music: { en: "Music", uk: "Музика" }, story: { en: "Story", uk: "Історія" }, contact: { en: "Contact", uk: "Контакти" },
  latest: { en: "Latest release", uk: "Останній реліз" }, available: { en: "Available now", uk: "Вже доступно" }, producer: { en: "Independent Ukrainian Producer", uk: "Незалежний український продюсер" },
  totalPlays: { en: "Total plays", uk: "Усього прослуховувань" }, discover: { en: "Discover the story", uk: "Відкрити історію" }, liveSelection: { en: "Live selection", uk: "Жива добірка" },
  nowPlaying: { en: "Now playing", uk: "Зараз грає" }, minimize: { en: "Minimize", uk: "Згорнути" }, expandPlayer: { en: "Expand player", uk: "Розгорнути плеєр" }, collapsePlayer: { en: "Collapse player", uk: "Згорнути плеєр" }, open: { en: "Open", uk: "Відкрити" }, loadingShort: { en: "Loading", uk: "Завантаження" },
  originRelease: { en: "Origin release", uk: "Перший реліз" }, storyBegins: { en: "The Story Begins", uk: "Історія починається" }, storyBeginsDescription: { en: "The release that introduced the first chapter of Evelasting remains here as a permanent part of the artist story.", uk: "Реліз, із якого почався перший розділ Evelasting, назавжди залишається частиною історії артиста." },
  published: { en: "Published", uk: "Опубліковано" }, genre: { en: "Genre", uk: "Жанр" }, play: { en: "Play", uk: "Слухати" }, playing: { en: "Playing", uk: "Грає" }, playingNow: { en: "Playing now", uk: "Зараз грає" }, playRelease: { en: "Play release", uk: "Слухати реліз" }, loadingRelease: { en: "Loading release", uk: "Завантаження релізу" }, loadingOfficial: { en: "Loading official releases", uk: "Завантаження офіційних релізів" }, pauseEvelasting: { en: "Pause Evelasting", uk: "Призупинити Evelasting" }, playEvelasting: { en: "Play Evelasting", uk: "Увімкнути Evelasting" },
  musicIntro: { en: "The music page follows the official SoundCloud playlist. Switch a track and the artwork, metadata and atmosphere update automatically.", uk: "Музична сторінка синхронізована з офіційним плейлистом SoundCloud. Змініть трек — обкладинка, метадані та атмосфера оновляться автоматично." },
  discography: { en: "Discography", uk: "Дискографія" }, allReleases: { en: "All releases", uk: "Усі релізи" }, chooseRelease: { en: "Choose a cover to play it here. The SoundCloud button opens the original release page.", uk: "Оберіть обкладинку, щоб запустити реліз. Кнопка SoundCloud відкриває оригінальну сторінку." },
  loading: { en: "Loading SoundCloud releases…", uk: "Завантаження релізів SoundCloud…" }, choose: { en: "Choose a release", uk: "Оберіть реліз" }, active: { en: "Active", uk: "Активний" }, carouselHint: { en: "Swipe · drag · scroll", uk: "Свайп · перетягування · прокрутка" }, previousReleases: { en: "Previous releases", uk: "Попередні релізи" }, nextReleases: { en: "Next releases", uk: "Наступні релізи" },
  searchReleases: { en: "Search releases…", uk: "Пошук релізів…" }, releaseFilters: { en: "Release filters", uk: "Фільтри релізів" }, filterAll: { en: "All", uk: "Усі" }, filterAggressive: { en: "Aggressive", uk: "Агресивні" }, filterCollab: { en: "Collaborations", uk: "Колаборації" }, filterSingle: { en: "Singles", uk: "Сингли" }, noReleasesFound: { en: "No releases found", uk: "Релізів не знайдено" }, verticalHint: { en: "Scroll inside · 6 releases visible", uk: "Прокручуйте всередині · видно 6 релізів" }, connecting: { en: "Connecting", uk: "Підключення" }, trackProgress: { en: "Track progress", uk: "Прогрес треку" },
  enterSound: { en: "Enter the sound", uk: "Увійти у звук" }, behindMusic: { en: "Behind the music", uk: "За музикою" }, nextChapter: { en: "The next chapter", uk: "Наступний розділ" },
  storyEyebrow: { en: "The story", uk: "Історія" }, storyTitle1: { en: "A producer who", uk: "Продюсер, який" }, storyTitle2: { en: "chose to return.", uk: "обрав повернутися." }, soundReturns: { en: "The sound always returns.", uk: "Звук завжди повертається." },
  endingBrand: { en: "Evelasting", uk: "Evelasting" }, endingTitle1: { en: "The sound", uk: "Звук" }, endingTitle2: { en: "always returns.", uk: "завжди повертається." }, endingNotEnd: { en: "This isn’t the end of the story.", uk: "Це не кінець історії." }, endingReturn: { en: "It’s the return.", uk: "Це повернення." },
  fromKryvyiRih: { en: "From Kryvyi Rih", uk: "З Кривого Рогу" }, toWorld: { en: "To the world.", uk: "До всього світу." }, continueListening: { en: "Continue the story through sound.", uk: "Продовжуйте історію через звук." }, availableOn: { en: "Available on", uk: "Доступно на" },
  listenStory: { en: "Listen to the story", uk: "Слухати історію" }, watchVisuals: { en: "Watch the visuals", uk: "Дивитися візуали" }, followProcess: { en: "Follow the process", uk: "Стежити за процесом" }, openCatalog: { en: "Open the catalog", uk: "Відкрити каталог" }, enterArchive: { en: "Enter the archive", uk: "Відкрити архів" }, receiveUpdates: { en: "Receive updates", uk: "Отримувати новини" }, startConversation: { en: "Start a conversation", uk: "Почати розмову" },
  process: { en: "The process", uk: "Процес" },
  everyTrackBegins: { en: "Every track begins", uk: "Кожен трек починається" },
  withSingleIdea: { en: "with a single idea.", uk: "з однієї ідеї." },
  searchingIdea: { en: "Searching for the first idea.", uk: "Пошук першої ідеї." },
  searchingIdeaDescription: { en: "Before the arrangement, there is only silence and a direction.", uk: "До аранжування існують лише тиша та напрямок." },
  findingMelody: { en: "Finding the melody.", uk: "Пошук мелодії." },
  findingMelodyDescription: { en: "A few notes become the foundation for everything that follows.", uk: "Кілька нот стають основою всього, що з’явиться далі." },
  buildingAtmosphere: { en: "Building the atmosphere.", uk: "Створення атмосфери." },
  buildingAtmosphereDescription: { en: "Layers and textures begin shaping the identity of the track.", uk: "Шари й текстури поступово формують характер треку." },
  addingRhythm: { en: "Adding rhythm and energy.", uk: "Додавання ритму та енергії." },
  addingRhythmDescription: { en: "Drums and bass transform the idea into something physical.", uk: "Ударні та бас перетворюють ідею на щось відчутне." },
  trackExists: { en: "The track begins to exist.", uk: "Трек починає існувати." },
  trackExistsDescription: { en: "What started as a moment becomes a finished world of sound.", uk: "Те, що почалося з миті, стає завершеним світом звуку." },
  creativeProcessLabel: { en: "Evelasting creative process", uk: "Творчий процес Evelasting" },
  location: { en: "Kryvyi Rih, Ukraine", uk: "Кривий Ріг, Україна" }, backTop: { en: "Back to the top", uk: "На початок" }, footerNav: { en: "Footer navigation", uk: "Навігація внизу сторінки" },
} as const;

type CopyKey = keyof typeof copy;
type LanguageContextValue = { language: Language; setLanguage: (language: Language) => void; t: (key: CopyKey) => string };
const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  useEffect(() => { const saved = window.localStorage.getItem("evelasting-language"); if (saved === "uk" || saved === "en") setLanguage(saved); }, []);
  useEffect(() => { window.localStorage.setItem("evelasting-language", language); document.documentElement.lang = language === "uk" ? "uk" : "en"; }, [language]);
  const value = useMemo(() => ({ language, setLanguage, t: (key: CopyKey) => copy[key][language] }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() { const context = useContext(LanguageContext); if (!context) throw new Error("useLanguage must be used inside LanguageProvider"); return context; }
