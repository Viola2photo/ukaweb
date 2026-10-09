import { afterEach, describe, expect, it, vi } from "vitest";

describe("analytics", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
    delete window.dataLayer;
    delete window.gtag;
    document.head.innerHTML = "";
  });

  it("does nothing without a measurement ID", async () => {
    vi.stubEnv("VITE_GA_MEASUREMENT_ID", "");
    vi.stubEnv("VITE_GOOGLE_ADS_ID", "");
    const { initAnalytics, trackEvent } = await import("@/lib/analytics");
    initAnalytics();
    trackEvent("click_call");
    expect(window.dataLayer).toBeUndefined();
    expect(document.head.querySelector("script")).toBeNull();
  });

  it("queues gtag commands as `arguments` objects, which is what gtag.js executes", async () => {
    vi.stubEnv("VITE_GA_MEASUREMENT_ID", "G-TEST123");
    vi.stubEnv("VITE_GOOGLE_ADS_ID", "");
    const { initAnalytics, trackEvent } = await import("@/lib/analytics");
    initAnalytics();
    trackEvent("click_call", { location: "header" });

    const queue = window.dataLayer ?? [];
    expect(
      queue.every((item) => Object.prototype.toString.call(item) === "[object Arguments]"),
    ).toBe(true);
    expect(queue.map((item) => Array.from(item as ArrayLike<unknown>)[0])).toEqual([
      "js",
      "config",
      "event",
    ]);
    expect(Array.from(queue[2] as ArrayLike<unknown>)).toEqual([
      "event",
      "click_call",
      { location: "header" },
    ]);
    expect(document.head.querySelector("script")?.getAttribute("src")).toContain("id=G-TEST123");
  });

  it("only loads the tag once", async () => {
    vi.stubEnv("VITE_GA_MEASUREMENT_ID", "G-TEST123");
    const { initAnalytics } = await import("@/lib/analytics");
    initAnalytics();
    initAnalytics();
    expect(document.head.querySelectorAll("script").length).toBe(1);
  });
});
