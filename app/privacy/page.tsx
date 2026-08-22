import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy and cookie information for the official Evelasting website.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    title: "1. Who is responsible for your data",
    body: (
      <>
        This website is operated by Evelasting, an independent music artist.
        For privacy questions or requests, contact{" "}
        <a
          className="text-white/75 underline decoration-white/25 underline-offset-4 transition hover:text-white"
          href={siteConfig.links.email}
        >
          deniszaitsev536@gmail.com
        </a>
        .
      </>
    ),
  },
  {
    title: "2. Information collected",
    body: (
      <>
        The website does not require an account and does not directly request
        your name, address, or payment information. Cookieless, aggregated
        traffic information may be collected through Vercel Web Analytics. If
        you consent to Google Analytics, additional information such as visited
        pages, approximate location, browser and device type, referral source,
        session activity, navigation clicks, external-link clicks, and
        music-player interactions may be collected. Music events can include
        starting a track and reaching listening milestones.
      </>
    ),
  },
  {
    title: "3. Vercel Web Analytics",
    body: (
      <>
        This website uses Vercel Web Analytics, provided by Vercel Inc., to
        understand aggregate traffic and improve the website. It does not use
        cookies and does not collect personal identifiers that track visitors
        across websites. Page views may include the visited route, referral
        source, approximate location, browser, operating system, and device
        type. Learn more in the{" "}
        <a
          className="text-white/75 underline decoration-white/25 underline-offset-4 transition hover:text-white"
          href="https://vercel.com/docs/analytics/privacy-policy"
          target="_blank"
          rel="noreferrer"
        >
          Vercel Web Analytics privacy documentation
        </a>
        .
      </>
    ),
  },
  {
    title: "4. Google Analytics",
    body: (
      <>
        This website uses Google Analytics 4, provided by Google LLC, to
        understand how the site is used and improve its content and
        performance. Google Analytics is not loaded until you select
        <span className="text-white"> Accept</span> in the cookie notice. The
        site does not use Analytics for personalised advertising. Google may
        process information on servers outside your country under its
        applicable data-protection safeguards. Learn more in the{" "}
        <a
          className="text-white/75 underline decoration-white/25 underline-offset-4 transition hover:text-white"
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noreferrer"
        >
          Google Privacy Policy
        </a>
        .
      </>
    ),
  },
  {
    title: "5. Cookies and consent",
    body: (
      <>
        Analytics cookies are optional. They are created only after consent and
        help distinguish visits and produce usage statistics. Your choice is
        stored in your browser. You can change it at any time using the
        <span className="text-white"> Cookies</span> button in the lower-left
        corner of the website. If you decline after previously accepting,
        analytics is disabled and the site attempts to remove its Google
        Analytics cookies. You can also delete cookies through your browser
        settings.
      </>
    ),
  },
  {
    title: "6. SoundCloud and external services",
    body: (
      <>
        The music player uses the SoundCloud widget. SoundCloud may process
        technical information when its player is loaded or used according to
        its own policies. Links to Spotify, YouTube, Apple Music, TikTok,
        Instagram, Telegram, SoundCloud, and other external services take you
        to websites controlled by those providers. Their privacy practices are
        governed by their own policies.
      </>
    ),
  },
  {
    title: "7. Legal basis and retention",
    body: (
      <>
        Google Analytics processing is based on your consent. You may withdraw
        that consent at any time without affecting processing that occurred
        before withdrawal. Vercel Web Analytics is used for the legitimate
        interest of understanding aggregate website traffic and improving site
        performance. Analytics information is retained according to the
        settings and policies of the respective provider. Contact messages are
        used only to respond to the request and are retained only as reasonably
        necessary.
      </>
    ),
  },
  {
    title: "8. Your rights",
    body: (
      <>
        Depending on the law that applies to you, you may have rights to request
        access, correction, deletion, restriction, or portability of your
        personal data, to object to certain processing, and to withdraw
        consent. You may also contact your local data-protection authority. To
        make a request, email{" "}
        <a
          className="text-white/75 underline decoration-white/25 underline-offset-4 transition hover:text-white"
          href={siteConfig.links.email}
        >
          deniszaitsev536@gmail.com
        </a>
        .
      </>
    ),
  },
  {
    title: "9. Changes to this policy",
    body: (
      <>
        This policy may be updated when the website, its analytics setup, or
        legal requirements change. The latest version will always be published
        on this page with its effective date.
      </>
    ),
  },
] as const;

export default function PrivacyPage() {
  return (
    <main
      id="main-content"
      className="min-h-screen bg-[#050505] px-4 py-5 text-white sm:px-8 sm:py-8 lg:px-12"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(185,28,65,0.16),transparent_36%),radial-gradient(circle_at_85%_70%,rgba(70,20,35,0.12),transparent_38%)]"
      />

      <div className="relative mx-auto max-w-4xl">
        <header className="flex items-center justify-between gap-4 border-b border-white/10 pb-5 sm:pb-7">
          <Link
            href="/"
            className="text-xs font-semibold tracking-[0.26em] transition-opacity hover:opacity-60 sm:text-sm sm:tracking-[0.34em]"
          >
            EVELASTING
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center rounded-full border border-white/15 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-white/60 transition hover:border-white/35 hover:text-white sm:text-[10px] sm:tracking-[0.18em]"
          >
            Back to website
          </Link>
        </header>

        <section className="py-12 sm:py-24">
          <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-red-400/75">
            Legal · Privacy
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
            This policy explains how information is handled when you visit the
            official Evelasting website, how cookieless traffic statistics are
            collected, and how you can choose whether to enable optional
            analytics cookies.
          </p>
          <p className="mt-5 text-[10px] uppercase tracking-[0.22em] text-white/30">
            Effective: 22 August 2026
          </p>
        </section>

        <div className="space-y-4 pb-20">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 sm:p-8"
            >
              <h2 className="text-lg font-semibold tracking-[-0.02em] sm:text-xl">
                {section.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/55">
                {section.body}
              </p>
            </section>
          ))}
        </div>

        <footer className="flex flex-col gap-4 border-t border-white/10 py-8 text-[10px] uppercase tracking-[0.2em] text-white/25 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Evelasting</p>
          <Link href="/" className="transition hover:text-white">
            evelasting.com
          </Link>
        </footer>
      </div>
    </main>
  );
}
