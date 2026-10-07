# 鱈魚大叔品牌網站

由烏卡港企業社營運的品牌網站，包含五款產品、文字菜單、23項據點與行程、先營運後付費加盟五步及企業頁尾。

## 開發
```sh
npm install
npm run dev
npm run build
```

技術：TanStack Start、React、TypeScript、Tailwind CSS。

## 同步來源
Lovable 專案：https://lovable.dev/projects/bbab39a5-2515-4f41-bf13-9cc50ca28a1f
來源版本：eb1563e1d24651606dc2bb69f6e6bb4d8e95c0ba
本次為一次性程式與素材備份，不代表已設定 Lovable 與 GitHub 雙向自動同步，也未正式發布網站。

## 圖片
src/assets/*.asset.json 保留 Lovable 持久素材的原始指標，網站原始碼依這些指標呈現圖片。assets/originals 保存使用者提供的原始照片及設計参考。
Lovable 專用 /__l5e/assets-v1/ 路徑需要對應服務支援；已同步七張商品照片及黑廚師形象照至 public/__l5e/assets-v1/ 對應路徑，讓相同圖片網址可由靜態檔案提供；其餘素材在其他主機部署時仍需匯出實際素材。
去背Q版標誌、生成紙紋及預設favicon的實際二進位檔，因目前素材下載受限尚未匯出；原始品牌圖已保留。此限制不影響原Lovable預覽。
完整網站規畫、內部加盟契約與其他非公開文件不存於本公開儲存庫。
