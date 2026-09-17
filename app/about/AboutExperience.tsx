"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import Footer from "../components/Footer";
import { useLanguage } from "../components/LanguageContext";
import Navbar from "../components/Navbar";

const aboutCopy = {
  en: {
    eyebrow: "The artist behind Evelasting",
    role: "Artist and producer behind Evelasting",
    intro:
      "An independent Ukrainian producer from Kryvyi Rih, turning contrast — calm and aggression, distance and emotion — into phonk.",
    born: "Born in 2005",
    place: "Kryvyi Rih, Ukraine",
    since: "Creating since 2022",
    beginningLabel: "Before the name",
    beginningTitle: "It began with a simple beat.",
    beginningBody:
      "In 2022, a friend asked Denys to make an instrumental. He opened FL Studio for the first time and built it from little more than a kick and an 808. The experiment ended that night — but the idea returned a month later. This time, he opened the program for himself.",
    nameLabel: "The name",
    nameTitle: "Why Evelasting?",
    nameBody:
      "The name grew from “Everlasting” — eternal. Its altered spelling made the project distinct, while the meaning became personal: returning through difficulties, continuing after silence, and leaving a sound that remains.",
    timelineLabel: "The path",
    timelineTitle: "A story still being written.",
    timeline: [
      {
        year: "2022",
        title: "The first beat",
        body: "A simple instrumental for a friend became the first step into music production.",
      },
      {
        year: "2022",
        title: "Rebirth",
        body: "“Rebirth of the Ukrainian Phonk” was finished in one evening — without a strategy, expectations, or a plan beyond the music itself.",
      },
      {
        year: "2023",
        title: "The first response",
        body: "Listeners found the track on SoundCloud and YouTube. Their reaction showed that independently made music could travel far beyond the room where it began.",
      },
      {
        year: "The pause",
        title: "Silence",
        body: "A catalogue setback interrupted the momentum and the project entered a long pause. Ideas remained unfinished, but the identity behind Evelasting never disappeared.",
      },
      {
        year: "Now",
        title: "The return",
        body: "Evelasting is building a new independent chapter — with a stronger visual world, a growing catalogue, and the freedom to move beyond a single mood.",
      },
    ],
    soundLabel: "The sound",
    soundTitle: "One genre. Opposite emotions.",
    soundBody:
      "Phonk became the right language because it could be melancholic and distant one moment, then aggressive and physical the next. That contrast still defines the Evelasting sound.",
    influencesLabel: "Influences",
    influences: "Kordhell · SHADXWBXRN",
    influencesBody:
      "Dark atmosphere, memorable melodies and powerful energy became reference points — not a formula to copy, but proof that phonk could reach listeners around the world.",
    finalLabel: "The next chapter",
    finalTitle: "The story was never finished.",
    finalBody: "It was only waiting to continue.",
    finalQuote: "The sound always returns.",
    listen: "Explore the music",
    home: "Return home",
    portraitAlt: "Denys Zaitsev, the artist and producer behind Evelasting",
  },
  uk: {
    eyebrow: "Артист, який стоїть за Evelasting",
    role: "Артист і продюсер проєкту Evelasting",
    intro:
      "Незалежний український продюсер із Кривого Рогу, який перетворює контрасти — спокій і агресію, відстороненість та емоції — на фонк.",
    born: "Народився у 2005 році",
    place: "Кривий Ріг, Україна",
    since: "Створює музику з 2022 року",
    beginningLabel: "До появи імені",
    beginningTitle: "Усе почалося з простого біта.",
    beginningBody:
      "У 2022 році друг попросив Дениса створити інструментал. Він уперше відкрив FL Studio й зібрав біт майже лише з кіка та 808-го басу. Того вечора експеримент завершився, але за місяць ідея повернулася. Цього разу він відкрив програму вже для себе.",
    nameLabel: "Ім’я",
    nameTitle: "Чому Evelasting?",
    nameBody:
      "Ім’я походить від слова “Everlasting” — вічний. Змінене написання зробило проєкт упізнаваним, а його значення стало особистим: повертатися попри труднощі, продовжувати після тиші й залишати звук, який не зникає.",
    timelineLabel: "Шлях",
    timelineTitle: "Історія, яка ще пишеться.",
    timeline: [
      {
        year: "2022",
        title: "Перший біт",
        body: "Простий інструментал для друга став першим кроком у музичному продакшені.",
      },
      {
        year: "2022",
        title: "Відродження",
        body: "“Rebirth of the Ukrainian Phonk” було завершено за один вечір — без стратегії, очікувань чи плану, окрім самої музики.",
      },
      {
        year: "2023",
        title: "Перша відповідь",
        body: "Слухачі знайшли трек на SoundCloud і YouTube. Їхня реакція показала, що незалежно створена музика може вийти далеко за межі кімнати, де вона народилася.",
      },
      {
        year: "Пауза",
        title: "Тиша",
        body: "Проблеми з каталогом перервали набраний темп, і проєкт надовго замовк. Ідеї залишалися незавершеними, але особистість Evelasting нікуди не зникла.",
      },
      {
        year: "Зараз",
        title: "Повернення",
        body: "Evelasting будує новий незалежний розділ — із цілісним візуальним світом, каталогом, що зростає, і свободою виходити за межі одного настрою.",
      },
    ],
    soundLabel: "Звучання",
    soundTitle: "Один жанр. Протилежні емоції.",
    soundBody:
      "Фонк став правильною мовою, бо в одну мить він може бути меланхолійним і віддаленим, а в наступну — агресивним і фізично відчутним. Цей контраст і досі визначає звучання Evelasting.",
    influencesLabel: "Впливи",
    influences: "Kordhell · SHADXWBXRN",
    influencesBody:
      "Темна атмосфера, мелодії, що запам’ятовуються, і потужна енергія стали орієнтирами — не формулою для копіювання, а доказом того, що фонк може досягати слухачів у всьому світі.",
    finalLabel: "Наступний розділ",
    finalTitle: "Ця історія ніколи не завершувалася.",
    finalBody: "Вона лише чекала на продовження.",
    finalQuote: "Звук завжди повертається.",
    listen: "Відкрити музику",
    home: "На головну",
    portraitAlt: "Денис Зайцев, артист і продюсер проєкту Evelasting",
  },
} as const;

const revealTransition = { duration: 0.85, ease: [0.22, 1, 0.36, 1] } as const;

export default function AboutExperience() {
  const { language } = useLanguage();
  const copy = aboutCopy[language];
  const reducedMotion = useReducedMotion();
  const reveal = reducedMotion ? undefined : { opacity: 1, y: 0 };

  return (
    <main id="main-content" className="overflow-x-clip bg-black text-white">
      <Navbar />

      <section className="relative isolate min-h-[100svh] overflow-hidden border-b border-white/10 px-6 pb-16 pt-28 sm:px-8 md:pb-24 md:pt-32 lg:px-12">
        <div aria-hidden className="absolute inset-0 -z-30 bg-black" />
        <div aria-hidden className="absolute -left-48 top-1/3 -z-20 h-[34rem] w-[34rem] rounded-full bg-red-700/10 blur-[150px]" />
        <div aria-hidden className="absolute right-[-16rem] top-[-12rem] -z-20 h-[48rem] w-[48rem] rounded-full bg-violet-700/20 blur-[160px]" />
        <div aria-hidden className="absolute inset-0 -z-10 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:72px_72px]" />

        <div className="mx-auto grid min-h-[calc(100svh-9rem)] max-w-7xl items-center gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 30 }}
            animate={reveal}
            transition={revealTransition}
            className="relative z-10 max-w-2xl"
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.34em] text-red-400 sm:text-xs">
              {copy.eyebrow}
            </p>
            <h1 className="mt-6 text-[clamp(3.7rem,10vw,8.5rem)] font-semibold leading-[0.82] tracking-[-0.075em] text-white">
              <span className="block">DENYS</span>
              <span className="block text-white/34">ZAITSEV</span>
            </h1>
            <p className="mt-7 text-xs uppercase tracking-[0.24em] text-white/55">
              {copy.role}
            </p>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/62 sm:text-lg">
              {copy.intro}
            </p>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-5 text-[10px] uppercase tracking-[0.22em] text-white/38">
              <span>{copy.born}</span>
              <span className="text-red-400/80">•</span>
              <span>{copy.place}</span>
              <span className="text-red-400/80">•</span>
              <span>{copy.since}</span>
            </div>
          </motion.div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 0.965, x: 24 }}
            animate={reducedMotion ? undefined : { opacity: 1, scale: 1, x: 0 }}
            transition={{ ...revealTransition, delay: 0.12 }}
            className="relative mx-auto aspect-square w-full max-w-[44rem] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] shadow-[0_40px_120px_rgba(69,20,170,.28)] sm:rounded-[2.8rem]"
          >
            <Image
              src="/about/denys-zaitsev.webp"
              alt={copy.portraitAlt}
              fill
              priority
              sizes="(max-width: 1023px) 92vw, 55vw"
              className="object-cover object-center"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/34 via-transparent to-black/10" />
            <div aria-hidden className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black/28 to-transparent" />
            <p className="absolute bottom-5 left-6 text-[9px] uppercase tracking-[0.3em] text-white/50 sm:bottom-7 sm:left-8">
              Evelasting · 2026
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-24 sm:px-8 md:py-36 lg:px-12">
        <div aria-hidden className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-red-500/55 to-transparent" />
        <div className="mx-auto grid max-w-6xl gap-20 lg:grid-cols-2 lg:gap-24">
          <motion.article
            initial={reducedMotion ? false : { opacity: 0, y: 34 }}
            whileInView={reveal}
            viewport={{ once: true, amount: 0.35 }}
            transition={revealTransition}
          >
            <p className="text-[10px] uppercase tracking-[0.34em] text-red-400">{copy.beginningLabel}</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
              {copy.beginningTitle}
            </h2>
            <p className="mt-7 text-base leading-8 text-white/52 sm:text-lg">{copy.beginningBody}</p>
          </motion.article>

          <motion.article
            initial={reducedMotion ? false : { opacity: 0, y: 34 }}
            whileInView={reveal}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ ...revealTransition, delay: 0.1 }}
            className="border-l border-white/10 pl-6 sm:pl-10"
          >
            <p className="text-[10px] uppercase tracking-[0.34em] text-violet-400">{copy.nameLabel}</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
              {copy.nameTitle}
            </h2>
            <p className="mt-7 text-base leading-8 text-white/52 sm:text-lg">{copy.nameBody}</p>
          </motion.article>
        </div>
      </section>

      <section className="relative border-y border-white/10 bg-white/[0.018] px-6 py-24 sm:px-8 md:py-36 lg:px-12">
        <div aria-hidden className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-red-700/[0.08] blur-[140px]" />
        <div className="relative mx-auto max-w-6xl">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 28 }}
            whileInView={reveal}
            viewport={{ once: true, amount: 0.45 }}
            transition={revealTransition}
            className="max-w-3xl"
          >
            <p className="text-[10px] uppercase tracking-[0.34em] text-red-400">{copy.timelineLabel}</p>
            <h2 className="mt-5 text-5xl font-semibold tracking-[-0.06em] text-white sm:text-6xl md:text-7xl">
              {copy.timelineTitle}
            </h2>
          </motion.div>

          <div className="mt-16 md:mt-24">
            {copy.timeline.map((item, index) => (
              <motion.article
                key={`${item.year}-${item.title}`}
                initial={reducedMotion ? false : { opacity: 0, y: 28 }}
                whileInView={reveal}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ ...revealTransition, delay: Math.min(index * 0.06, 0.2) }}
                className="group grid gap-4 border-t border-white/10 py-8 sm:grid-cols-[9rem_1fr] md:grid-cols-[11rem_0.8fr_1.2fr] md:items-start md:gap-8 md:py-10"
              >
                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-red-400/80">{item.year}</p>
                <h3 className="text-2xl font-semibold tracking-[-0.035em] text-white transition-colors duration-500 group-hover:text-red-300 sm:text-3xl">
                  {item.title}
                </h3>
                <p className="max-w-xl text-sm leading-7 text-white/48 sm:text-base">{item.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-24 sm:px-8 md:py-36 lg:px-12">
        <div aria-hidden className="absolute -left-48 bottom-0 h-[30rem] w-[30rem] rounded-full bg-violet-700/10 blur-[150px]" />
        <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 32 }}
            whileInView={reveal}
            viewport={{ once: true, amount: 0.35 }}
            transition={revealTransition}
          >
            <p className="text-[10px] uppercase tracking-[0.34em] text-red-400">{copy.soundLabel}</p>
            <h2 className="mt-5 max-w-3xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] text-white sm:text-6xl md:text-7xl">
              {copy.soundTitle}
            </h2>
            <p className="mt-8 max-w-2xl text-base leading-8 text-white/52 sm:text-lg">{copy.soundBody}</p>
          </motion.div>

          <motion.aside
            initial={reducedMotion ? false : { opacity: 0, y: 32 }}
            whileInView={reveal}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ ...revealTransition, delay: 0.12 }}
            className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.055] to-violet-800/[0.07] p-7 backdrop-blur-xl sm:p-10"
          >
            <p className="text-[10px] uppercase tracking-[0.34em] text-violet-300">{copy.influencesLabel}</p>
            <p className="mt-6 text-2xl font-semibold tracking-[-0.035em] text-white sm:text-3xl">{copy.influences}</p>
            <p className="mt-6 text-sm leading-7 text-white/48 sm:text-base">{copy.influencesBody}</p>
          </motion.aside>
        </div>
      </section>

      <section className="relative isolate overflow-hidden border-t border-white/10 px-6 py-28 text-center sm:px-8 md:py-44 lg:px-12">
        <div aria-hidden className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_55%,rgba(185,28,65,.18),transparent_42%)]" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-black/20 via-transparent to-black" />
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 36 }}
          whileInView={reveal}
          viewport={{ once: true, amount: 0.45 }}
          transition={revealTransition}
          className="mx-auto max-w-5xl"
        >
          <p className="text-[10px] uppercase tracking-[0.36em] text-red-400">{copy.finalLabel}</p>
          <h2 className="mt-7 text-[clamp(3.4rem,9vw,8rem)] font-semibold leading-[0.88] tracking-[-0.07em] text-white">
            {copy.finalTitle}
          </h2>
          <p className="mt-8 text-base leading-8 text-white/48 sm:text-lg">{copy.finalBody}</p>
          <p className="mt-3 text-lg font-medium text-white sm:text-xl">{copy.finalQuote}</p>
          <div className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/#music" className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 text-[10px] font-semibold uppercase tracking-[0.24em] text-black transition duration-300 hover:scale-[1.025] hover:bg-red-500 hover:text-white">
              {copy.listen}
            </Link>
            <Link href="/" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-7 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/70 transition duration-300 hover:border-white/35 hover:bg-white/[0.06] hover:text-white">
              {copy.home}
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
