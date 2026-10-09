import { describe, expect, it } from "vitest";

import {
  company,
  contact,
  flashStalls,
  mascotGallery,
  products,
  regions,
  steps,
} from "@/lib/brand-data";

describe("brand content", () => {
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
      "青草湖週三",
      "二重埔週四",
      "竹東週六",
      "大溪週日",
    ]);
    expect(regions.find((r) => r.name === "東部")?.items.map((i) => i.text)).toContain(
      "台東各夜市",
    );
    expect(items.map((i) => i.text)).toContain("南投家樂福");
    expect(items).toHaveLength(24);
  });

  it("keeps the pop-up stalls separate from fixed stalls", () => {
    expect(flashStalls).toHaveLength(14);
    expect(flashStalls).not.toContain("台東各夜市");
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
