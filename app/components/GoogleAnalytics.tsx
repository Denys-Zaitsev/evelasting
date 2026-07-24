"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const MEASUREMENT_ID = "G-RVTYHZS8Q2";
const CONSENT_KEY = "evelasting-analytics-consent";

type Consent = "accepted" | "declined" | null;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

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
      const savedConsent = localStorage.getItem(CONSENT_KEY);

      if (savedConsent === "accepted" || savedConsent === "declined") {
        setConsent(savedConsent);
      }

      setIsChoiceKnown(true);
    }, 0);

    return () => window.clearTimeout(hydrationTimer);
  }, []);

  function saveConsent(nextConsent: Exclude<Consent, null>) {
    localStorage.setItem(CONSENT_KEY, nextConsent);
    setConsent(nextConsent);
    setIsPreferencesOpen(false);

    if (nextConsent === "declined") {
      window.gtag?.("consent", "update", {
        analytics_storage: "denied",
      });
      deleteAnalyticsCookies();
    }
  }

  function configureAnalytics() {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("consent", "update", {
      analytics_storage: "granted",
    });
    window.gtag("config", MEASUREMENT_ID, {
      anonymize_ip: true,
    });
  }

  const shouldShowDialog =
    isChoiceKnown && (consent === null || isPreferencesOpen);

  return (
    <>
      {consent === "accepted" && (
        <Script
          id="google-analytics"
          src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
          strategy="afterInteractive"
          onLoad={configureAnalytics}
        />
      )}

      {shouldShowDialog && (
        <section
          aria-label="Analytics cookie preferences"
          className="fixed inset-x-4 bottom-4 z-[100] mx-auto max-w-3xl rounded-2xl border border-white/15 bg-[#111]/95 p-5 text-white shadow-2xl shadow-black/60 backdrop-blur-md sm:p-6"
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
            </div>
            <div className="flex shrink-0 flex-col gap-2 min-[420px]:flex-row">
              <button
                type="button"
                onClick={() => saveConsent("declined")}
                className="rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold transition hover:border-white/55 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => saveConsent("accepted")}
                className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
          className="fixed bottom-3 left-3 z-[90] rounded-full border border-white/15 bg-black/75 px-3 py-1.5 text-[11px] font-medium text-white/60 backdrop-blur transition hover:border-white/35 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Cookies
        </button>
      )}
    </>
  );
}
