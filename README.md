# 鱈魚大叔品牌網站

由烏卡港企業社營運的品牌網站：可切換的「招牌好料／0元加盟方案」動畫舞台、品牌故事與設計初衷、吉祥物、據點（含每週固定日與臨時快閃攤）、聯絡方式、企業頁尾與隱私權政策。

技術：TanStack Start、React、TypeScript、Tailwind CSS，部署到 Cloudflare Workers。本專案獨立運作，不依賴 Lovable 或任何第三方建置平台。

## 開發

```sh
bun install
bun run dev      # 本機開發
bun run build    # 輸出 .output/（含 wrangler.json）
bun run test
bun run lint
```

## 內容與圖片

- 品項、價格、據點、加盟步驟、公司資訊都集中在 `src/lib/brand-data.ts`，頁面與測試都讀同一份資料。
- 所有圖片為 `public/img/` 內的靜態檔；`assets/originals/` 保存原始照片與設計參考。

## 部署（Cloudflare）

- 建置會輸出 `.output/server/wrangler.json`，可直接用 Cloudflare Workers Builds 連接 GitHub 儲存庫部署。
- 建置指令 `bun run build`，部署指令 `npx wrangler deploy`，Worker 名稱需與 wrangler.json 的 `name` 相同。

## 廣告追蹤

- 複製 `.env.example`，在 Cloudflare 的**建置變數**設定 `VITE_GA_MEASUREMENT_ID`（GA4，`G-` 開頭）與 `VITE_GOOGLE_ADS_ID`（Google Ads，`AW-` 開頭）。兩者為公開識別碼，未設定時不載入任何追蹤。
- 已記錄的事件：`click_call`、`copy_line`、`view_franchise`、`view_products`、`franchise_step`、`click_social`。
- 廣告最後頁面建議使用 `/#franchise`，會直接開啟加盟方案。
