"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { trackAnalyticsEvent } from "@/lib/analytics";
import { useLanguage } from "./LanguageContext";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    document.body.classList.add("mobile-menu-open");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("mobile-menu-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const sectionHref = (section: string) =>
    pathname === "/" ? `#${section}` : `/#${section}`;

  const navigation = [
    { href: sectionHref("music"), label: t("music") },
    { href: sectionHref("story"), label: t("story") },
    { href: "/about", label: t("about") },
    { href: sectionHref("contact"), label: t("contact") },
  ];

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") {
      return;
    }

    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <header
      className={`site-header
        fixed left-0 top-0 z-50 w-full
        border-b transition-[background-color,border-color,backdrop-filter]
        duration-500
        ${
          isScrolled
            ? "border-white/[0.06] bg-black/55 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }
      `}
    >
      <div
        className="site-header-inner
          mx-auto flex max-w-7xl
          items-center justify-between
          px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6
        "
      >
        <Link
          href="/"
          onClick={handleLogoClick}
          aria-label={t("returnHome")}
          className="site-wordmark
            group/logo relative
            text-sm font-semibold tracking-[0.26em] sm:text-base sm:tracking-[0.34em] lg:text-lg lg:tracking-[0.4em]
            text-white outline-none
            transition-[transform,text-shadow,opacity]
            duration-300
            hover:scale-[1.015]
            hover:text-shadow-[0_0_18px_rgba(255,255,255,0.35)]
            focus-visible:ring-2
            focus-visible:ring-red-500
            focus-visible:ring-offset-4
            focus-visible:ring-offset-black
          "
        >
          <span
            aria-hidden="true"
            className="
              pointer-events-none absolute
              -bottom-2 left-1/2
              h-px w-0 -translate-x-1/2
              bg-red-500
              opacity-0 blur-[1px]
              transition-[width,opacity]
              duration-300
              group-hover/logo:w-3/4
              group-hover/logo:opacity-80
            "
          />

          EVELASTING
        </Link>

        <nav
          aria-label={t("mainNavigation")}
          className="
            hidden gap-10
            text-sm uppercase tracking-[0.2em]
            text-white/65 md:flex
          "
        >
          {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={pathname === item.href ? "page" : undefined}
            className="
              group/nav relative py-2
              outline-none
              transition-colors duration-300
              hover:text-white
              focus-visible:text-white
            "
          >
            {item.label}

            <span
              aria-hidden="true"
              className="
                pointer-events-none absolute
                bottom-0 left-0
                h-px w-full
                origin-left scale-x-0
                bg-red-500
                transition-transform duration-300
                ease-[cubic-bezier(0.22,1,0.36,1)]
                group-hover/nav:scale-x-100
                group-focus-visible/nav:scale-x-100
              "
            />
          </Link>
          ))}
        </nav>

        <div className="site-header-actions ml-auto flex items-center gap-2 md:ml-2">
        <div className="language-switch flex shrink-0 items-center rounded-full border border-white/10 bg-black/30 p-1 text-[10px] font-semibold tracking-[0.18em] text-white/45 backdrop-blur-xl">
          {(["en", "uk"] as const).map((item) => (
            <button key={item} type="button" onClick={() => {
              setLanguage(item);
              trackAnalyticsEvent("language_change", {
                language: item,
              });
            }} aria-pressed={language === item} className={`rounded-full px-2.5 py-2 sm:px-3 transition ${language === item ? "bg-white text-black" : "hover:text-white"}`}>
              {item === "en" ? "ENG" : "UA"}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="mobile-menu-button grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-black/35 text-white md:hidden"
          aria-label={isMenuOpen ? t("closeNavigation") : t("openNavigation")}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((value) => !value)}
        >
          <span className="sr-only">{isMenuOpen ? t("close") : t("menu")}</span>
          <span aria-hidden="true" className="relative block h-4 w-5">
            <span className={`absolute left-0 top-0 h-px w-5 bg-current transition ${isMenuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`absolute left-0 top-[7px] h-px w-5 bg-current transition ${isMenuOpen ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 top-[14px] h-px w-5 bg-current transition ${isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </span>
        </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`border-t border-white/10 bg-black/95 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl transition md:hidden ${
          isMenuOpen ? "visible opacity-100" : "invisible absolute w-full -translate-y-2 opacity-0"
        }`}
      >
        <nav aria-label={t("mobileNavigation")} className="mx-auto grid max-w-7xl gap-1">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              aria-current={pathname === item.href ? "page" : undefined}
              className="flex min-h-12 items-center justify-between rounded-xl px-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/75 transition hover:bg-white/[0.06] hover:text-white"
            >
              {item.label}
              <span aria-hidden="true" className="text-red-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
