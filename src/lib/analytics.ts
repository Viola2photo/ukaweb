// Google tag (GA4 + Google Ads). Both IDs are public identifiers, set as VITE_* env vars.
// Without them nothing loads, so the site works the same before the ads account is ready.
const GA_ID = import.meta.env["VITE_GA_MEASUREMENT_ID"] as string | undefined;
const ADS_ID = import.meta.env["VITE_GOOGLE_ADS_ID"] as string | undefined;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let started = false;

export function initAnalytics() {
  const primary = GA_ID || ADS_ID;
  if (started || typeof window === "undefined" || !primary) return;
  started = true;
  window.dataLayer = window.dataLayer || [];
  // gtag.js only treats `arguments` objects pushed to dataLayer as commands; a plain array is
  // ignored as ordinary data, so this must not be rewritten with rest parameters.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };
  window.gtag("js", new Date());
  if (GA_ID) window.gtag("config", GA_ID);
  if (ADS_ID) window.gtag("config", ADS_ID);
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(primary)}`;
  document.head.appendChild(script);
}

export type TrackedEvent =
  | "click_call"
  | "copy_line"
  | "view_franchise"
  | "view_products"
  | "franchise_step"
  | "click_social";

export function trackEvent(name: TrackedEvent, params?: Record<string, string | number>) {
  window.gtag?.("event", name, params);
}
