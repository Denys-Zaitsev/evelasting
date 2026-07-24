"use client";

import Script from "next/script";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  ANALYTICS_CONSENT_KEY,
  GA_MEASUREMENT_ID,
  initializeAnalytics,
  trackAnalyticsEvent,
} from "@/lib/analytics";

type Consent = "accepted" | "declined" | null;

function deleteAnalyticsCookies() {
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0]?.trim();

    if (name === "_ga" || name?.startsWith("_ga_")) {
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${location.hostname}; SameSite=Lax`;
    }
  });
}

export default function GoogleAnalytics() {
  const [consent, setConsent] = useState<Consent>(null);
  const [isChoiceKnown, setIsChoiceKnown] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  useEffect(() => {
    const hydrationTimer = window.setTimeout(() => {
      const savedConsent = localStorage.getItem(ANALYTICS_CONSENT_KEY);

      if (savedConsent === "accepted" || savedConsent === "declined") {
        setConsent(savedConsent);
      }

      setIsChoiceKnown(true);
    }, 0);

    return () => window.clearTimeout(hydrationTimer);
  }, []);

  useEffect(() => {
    if (consent !== "accepted") return;

    initializeAnalytics();

    const trackLinkClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const href = link.getAttribute("href") || "";
      const label =
        link.getAttribute("aria-label") || link.textContent?.trim() || "link";

      if (href.startsWith("#")) {
        trackAnalyticsEvent("navigation_click", {
          section: href.slice(1) || "top",
          link_text: label.slice(0, 100),
        });
        return;
      }

      if (
        link.href &&
        (link.origin !== window.location.origin || href.startsWith("mailto:"))
      ) {
        trackAnalyticsEvent("outbound_click", {
          destination: link.hostname || "email",
          link_text: label.slice(0, 100),
          link_url: link.href,
        });
      }
    };

    document.addEventListener("click", trackLinkClick);
    return () => document.removeEventListener("click", trackLinkClick);
  }, [consent]);

  function saveConsent(nextConsent: Exclude<Consent, null>) {
    localStorage.setItem(ANALYTICS_CONSENT_KEY, nextConsent);
    setConsent(nextConsent);
    setIsPreferencesOpen(false);

    if (nextConsent === "accepted") {
      initializeAnalytics();
    }

    if (nextConsent === "declined") {
      window.gtag?.("consent", "update", {
        analytics_storage: "denied",
      });
      deleteAnalyticsCookies();
      window.evelastingGaConfigured = false;
    }
  }

  const shouldShowDialog =
    isChoiceKnown && (consent === null || isPreferencesOpen);

  return (
    <>
      {consent === "accepted" && (
        <Script
          id="google-analytics"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
          onLoad={initializeAnalytics}
          onReady={initializeAnalytics}
        />
      )}

      {shouldShowDialog && (
        <section
          aria-label="Analytics cookie preferences"
          className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[100] mx-auto max-h-[calc(100svh-1.5rem)] max-w-3xl overflow-y-auto rounded-2xl border border-white/15 bg-[#111]/95 p-4 text-white shadow-2xl shadow-black/60 backdrop-blur-md sm:inset-x-4 sm:p-6"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <h2 className="text-base font-semibold tracking-wide">
                Analytics cookies
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Evelasting uses Google Analytics to understand site visits and
                improve the experience. Analytics only starts after you accept.
              </p>
              <Link
                href="/privacy"
                className="mt-2 inline-block text-xs text-white/50 underline decoration-white/25 underline-offset-4 transition hover:text-white"
              >
                Privacy Policy
              </Link>
            </div>
            <div className="flex shrink-0 flex-col gap-2 min-[420px]:flex-row">
              <button
                type="button"
                onClick={() => saveConsent("declined")}
                className="min-h-11 rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold transition hover:border-white/55 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => saveConsent("accepted")}
                className="min-h-11 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Accept
              </button>
            </div>
          </div>
        </section>
      )}

      {isChoiceKnown && consent !== null && !isPreferencesOpen && (
        <button
          type="button"
          onClick={() => setIsPreferencesOpen(true)}
          className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-3 z-[90] min-h-10 rounded-full border border-white/15 bg-black/75 px-3 py-1.5 text-[11px] font-medium text-white/60 backdrop-blur transition hover:border-white/35 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Cookies
        </button>
      )}
    </>
  );
}
