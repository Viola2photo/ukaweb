import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import {
  company,
  cashPlan,
  featuredStores,
  flavors,
  contact,
  faq,
  creed,
  flashStalls,
  mascotGallery,
  products,
  regions,
  steps,
  storeFaq,
} from "@/lib/brand-data";
import { storeStructuredData } from "@/lib/structured-data";

describe("brand content", () => {
  it("answers the common questions with the confirmed facts", () => {
    expect(faq.length).toBeGreaterThanOrEqual(6);
    expect(faq.find((i) => i.q.includes("怎麼聯絡"))?.a).toContain("0980115055");
    expect(faq.find((i) => i.q.includes("加盟方案"))?.a).toContain("17.5 萬元");
    expect(cashPlan.value).toBe("17.5");
  });

  it("keeps the brand creed wording", () => {
    expect(creed.lines.join("")).toBe("鱈魚大叔用心用感情 創造好料理");
  });

  it("lists the five signature products in the confirmed order with three prices each", () => {
    expect(products.map((p) => p.name)).toEqual([
      "冠軍雙拼",
      "北海鱈花枝",
      "札幌墨魚燒",
      "鮮貝鱈蝦球",
      "牛蒡鱈魚燒",
    ]);
    expect(products.map((p) => p.prices)).toEqual([
      [100, 150, 200],
      [80, 150, 200],
      [70, 130, 180],
      [100, 160, 240],
      [60, 100, 150],
    ]);
  });

  it("has cross-section photos for the flower and shrimp products", () => {
    expect(products.filter((p) => p.cross).map((p) => p.name)).toEqual([
      "北海鱈花枝",
      "鮮貝鱈蝦球",
    ]);
  });

  it("keeps the five franchise steps with the confirmed amounts", () => {
    expect(steps).toHaveLength(5);
    expect(steps[1]?.items).toContain("教育費");
    expect(steps[2]?.items.at(-1)).toBe("及開辦時所有相關費用");
    expect(steps[4]?.note).toBeUndefined();
    expect(steps[4]?.body).toContain("12 期");
  });

  it("shows every fixed stall, the weekly stalls with their day, and Taitung under the east", () => {
    const items = regions.flatMap((r) => r.items);
    expect(items.filter((i) => i.day).map((i) => `${i.text}${i.day}`)).toEqual([
      "竹中口週一",
      "竹北興希望社區週二",
      "新埔週三",
      "二重埔週四",
      "新庄子週五",
      "竹東週六",
      "霧峰大東路夜市週二",
      "南投家樂福夜市週三",
      "南崗夜市週四",
      "草鞋墩夜市週五・六・日",
      "台南武聖 第五排15格週三・五・六",
      "屏東煙囪觀光夜市週日",
    ]);
    expect(regions.find((r) => r.name === "東部")?.items.map((i) => i.text)).toContain(
      "台東各夜市",
    );
    expect(items.map((i) => i.text)).toContain("南投家樂福夜市");
    expect(items).toHaveLength(27);
  });

  it("keeps the pop-up stalls separate from fixed stalls", () => {
    expect(flashStalls).toHaveLength(13);
    expect(flashStalls).not.toContain("台東各夜市");
    expect(flashStalls).not.toContain("屏東煙囪觀光夜市");
  });

  it("uses one phone number that is also the LINE ID, and the confirmed company details", () => {
    expect(contact.phone).toBe("0980115055");
    expect(contact.lineId).toBe(contact.phone);
    expect(company.taxId).toBe("80011102");
    expect(company.insurance.insurer).toBe("中國信託產險");
    expect(company.insurance.summary).toContain("1000 萬");
  });

  it("has four mascots", () => {
    expect(mascotGallery).toHaveLength(4);
  });
});

describe("featured stores", () => {
  it("has a unique slug and an address for every store page", () => {
    const slugs = featuredStores.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(featuredStores.every((s) => s.address && s.image.startsWith("/img/"))).toBe(true);
  });
});

describe("store pages are discoverable", () => {
  const root = resolve(__dirname, "../..");
  const sitemap = readFileSync(resolve(root, "public/sitemap.xml"), "utf8");
  const llms = readFileSync(resolve(root, "public/llms.txt"), "utf8");

  it("lists every store in the sitemap and llms.txt", () => {
    for (const store of featuredStores) {
      expect(sitemap).toContain(`https://ukaport.com/stores/${store.slug}`);
      expect(llms).toContain(`https://ukaport.com/stores/${store.slug}`);
    }
  });

  it("gives every store a full address, answers and valid JSON-LD", () => {
    for (const store of featuredStores) {
      expect(store.address).toContain(store.city + store.district);
      expect(storeFaq(store).length).toBeGreaterThanOrEqual(3);
      const graph = storeStructuredData(store)["@graph"];
      expect(graph.map((n) => n["@type"])).toEqual([
        "FoodEstablishment",
        "BreadcrumbList",
        "FAQPage",
      ]);
      expect(() => JSON.parse(JSON.stringify(storeStructuredData(store)))).not.toThrow();
    }
  });
});

describe("late-night stall", () => {
  it("shows 台中黎明路 as open 17:00–03:30 on the list and its store page", () => {
    const item = regions.flatMap((r) => r.items).find((i) => i.text.includes("黎明路三段26號"));
    expect(item?.hours).toBe("營業時間 17:00–03:30");
    expect(featuredStores.find((s) => s.slug === "taichung-liming")?.hours).toBe(
      "營業時間 17:00–03:30",
    );
  });
});

describe("flavors", () => {
  it("lists the salad and pepper-salt flavors on the menu, in the FAQ and in llms.txt", () => {
    expect(flavors.map((f) => f.label)).toEqual(["沙拉", "椒鹽"]);
    expect(faq.find((i) => i.q.includes("口味"))?.a).toContain("青花椒鹽");
    expect(readFileSync(resolve(__dirname, "../../public/llms.txt"), "utf8")).toContain("青花椒鹽");
  });
});
