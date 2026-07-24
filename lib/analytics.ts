export const GA_MEASUREMENT_ID = "G-RVTYHZS8Q2";
export const ANALYTICS_CONSENT_KEY = "evelasting-analytics-consent";

export type AnalyticsParameters = Record<
  string,
  string | number | boolean | undefined
>;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    evelastingGaConfigured?: boolean;
  }
}

export function initializeAnalytics() {
  if (typeof window === "undefined" || window.evelastingGaConfigured) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      // Google Tag expects the native Arguments object for queued commands.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };

  window.gtag("js", new Date());
  window.gtag("consent", "update", {
    analytics_storage: "granted",
  });
  window.gtag("config", GA_MEASUREMENT_ID, {
    anonymize_ip: true,
    send_page_view: true,
  });
  window.evelastingGaConfigured = true;
}

export function trackAnalyticsEvent(
  eventName: string,
  parameters: AnalyticsParameters = {},
) {
  if (
    typeof window === "undefined" ||
    window.localStorage.getItem(ANALYTICS_CONSENT_KEY) !== "accepted"
  ) {
    return;
  }

  window.gtag?.("event", eventName, parameters);
}
