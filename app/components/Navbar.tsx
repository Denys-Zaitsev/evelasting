"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { useLanguage } from "./LanguageContext";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
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
      className={`
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
        className="
          mx-auto flex max-w-7xl
          items-center justify-between
          px-8 py-6
        "
      >
        <Link
          href="/"
          onClick={handleLogoClick}
          aria-label="Return to the Evelasting homepage"
          className="
            group/logo relative
            text-lg font-semibold tracking-[0.4em]
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
          aria-label="Main navigation"
          className="
            hidden gap-10
            text-sm uppercase tracking-[0.2em]
            text-white/65 md:flex
          "
        >
          <a
            href="#music"
            className="
              group/nav relative py-2
              outline-none
              transition-colors duration-300
              hover:text-white
              focus-visible:text-white
            "
          >
            {t("music")}

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
          </a>

          <a
            href="#story"
            className="
              group/nav relative py-2
              outline-none
              transition-colors duration-300
              hover:text-white
              focus-visible:text-white
            "
          >
            {t("story")}

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
          </a>

          <a
            href="#contact"
            className="
              group/nav relative py-2
              outline-none
              transition-colors duration-300
              hover:text-white
              focus-visible:text-white
            "
          >
            {t("contact")}

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
          </a>
        </nav>

        <div className="ml-4 flex items-center rounded-full border border-white/10 bg-black/30 p-1 text-[10px] font-semibold tracking-[0.18em] text-white/45 backdrop-blur-xl">
          {(["en", "uk"] as const).map((item) => (
            <button key={item} type="button" onClick={() => setLanguage(item)} aria-pressed={language === item} className={`rounded-full px-3 py-2 transition ${language === item ? "bg-white text-black" : "hover:text-white"}`}>
              {item === "en" ? "ENG" : "UA"}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}