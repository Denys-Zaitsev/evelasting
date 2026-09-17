"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { useLanguage } from "@/app/components/LanguageContext";

export default function ReleasePageChrome({ children }: { children: ReactNode }) {
  const { t } = useLanguage();

  return (
    <main id="main-content" className="relative min-h-screen overflow-hidden bg-[#050505] px-4 py-5 text-white sm:px-8 sm:py-8 lg:px-12">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(190,24,62,0.2),transparent_34%),radial-gradient(circle_at_82%_70%,rgba(80,20,38,0.14),transparent_38%)]" />
      <div className="relative mx-auto max-w-6xl">
        <header className="flex items-center justify-between gap-4 border-b border-white/10 pb-5 sm:pb-7">
          <Link href="/" className="text-xs font-semibold tracking-[0.26em] transition-opacity hover:opacity-60 sm:text-sm sm:tracking-[0.34em]">EVELASTING</Link>
          <Link href="/#music" className="inline-flex min-h-11 items-center rounded-full border border-white/15 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/60 transition hover:border-white/35 hover:text-white sm:text-[10px] sm:tracking-[0.18em]">
            {t("allReleases")}
          </Link>
        </header>

        {children}

        <footer className="flex flex-col gap-4 border-t border-white/10 py-8 text-[10px] uppercase tracking-[0.2em] text-white/25 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Evelasting</p>
          <Link href="/privacy" className="transition hover:text-white">{t("privacy")}</Link>
        </footer>
      </div>
    </main>
  );
}
