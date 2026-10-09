// All images are committed static files in public/img.
const img = (name: string) => `/img/${name}`;

export const company = {
  brand: "鱈魚大叔",
  operator: "烏卡港企業社",
  taxId: "80011102",
  foodRegistration: "F-202283558-00000-7",
  insurance: {
    summary: "投保產品責任保險 1000 萬（保險金額非理賠金額）",
    insurer: "中國信託產險",
    policyNo: "1812-26PR0000091",
  },
} as const;

export const contact = {
  phone: "0980115055",
  phoneHref: "tel:0980115055",
  lineId: "0980115055",
  social: [
    {
      id: "facebook",
      label: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61563511760365",
    },
    { id: "instagram", label: "@uka_port", href: "https://www.instagram.com/uka_port/" },
    { id: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@uka_port2882" },
  ],
} as const;

export const brandImages = {
  logo: img("uncle-sticker.png"),
  chef: img("uncle-chef.jpg"),
};

export type Mascot = { image: string; alt: string };

export type Product = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  alt: string;
  prices: readonly [small: number, large: number, xl: number];
  tag?: string;
  mascot?: Mascot;
  cross?: { image: string; alt: string; text: string; mascot?: Mascot };
};

export const mascots = {
  flowerCute: { image: img("mascot-cute.png"), alt: "可愛活潑的鱈花枝吉祥物" },
  flowerSalad: { image: img("mascot-salad.png"), alt: "淋上沙拉、調皮大笑的鱈花枝吉祥物" },
  shrimp: { image: img("mascot-shrimp.png"), alt: "握拳、很有個性的鱈蝦球吉祥物" },
  flowerCross: { image: img("mascot-cross.png"), alt: "展示剖面的鱈花枝吉祥物" },
} satisfies Record<string, Mascot>;

export const mascotGallery = [
  { name: "鱈花枝", ...mascots.flowerCute },
  { name: "淋醬鱈花枝", ...mascots.flowerSalad },
  { name: "鱈蝦球", ...mascots.shrimp },
  { name: "鱈花枝剖面", ...mascots.flowerCross },
] as const;

export const products: readonly Product[] = [
  {
    id: "duo",
    name: "冠軍雙拼",
    subtitle: "兩種海味・一次滿足",
    description:
      "北海鱈花枝＋札幌墨魚燒，一次吃到兩種海味。推薦芥末沙拉搭配小辣「黯然銷粉」，再加酸甜酸黃瓜，冠軍搭配一次愛上。",
    image: img("p-duo.jpg"),
    alt: "冠軍雙拼",
    prices: [100, 150, 200],
    tag: "No.1 人氣",
    mascot: mascots.flowerSalad,
  },
  {
    id: "flower",
    name: "北海鱈花枝",
    subtitle: "海味滿滿・外酥內彈",
    description:
      "鱈魚漿包進花枝、蝦仁、魷魚、干貝、荸薺與洋蔥。外層酥香，裡頭吃得到不同食材的口感。",
    image: img("p-flower.jpg"),
    alt: "北海鱈花枝",
    prices: [80, 150, 200],
    mascot: mascots.flowerCute,
    cross: {
      image: img("p-flower-cross.jpg"),
      alt: "北海鱈花枝剖面",
      text: "剖面看得見：外層是鮮嫩的鱈魚漿，裡面包著厚實Q彈的深海花枝。",
      mascot: mascots.flowerCross,
    },
  },
  {
    id: "squid",
    name: "札幌墨魚燒",
    subtitle: "酥香登場・海味日常",
    description:
      "墨魚、魷魚、干貝、松阪肉與鱈魚五種食材融合，保留咀嚼時的小顆粒口感。外酥內彈，咬下還有海鮮的鮮與多汁。",
    image: img("p-squid.jpg"),
    alt: "札幌墨魚燒",
    prices: [70, 130, 180],
  },
  {
    id: "shrimp",
    name: "鮮貝鱈蝦球",
    subtitle: "海鮮好料・咬開看看",
    description: "鱈魚漿包著整顆蝦仁，搭配大顆干貝、魷魚、荸薺與洋蔥。咬開酥香外皮，好料看得見。",
    image: img("p-shrimp.jpg"),
    alt: "鮮貝鱈蝦球",
    prices: [100, 160, 240],
    tag: "NEW",
    mascot: mascots.shrimp,
    cross: {
      image: img("p-shrimp-cross.jpg"),
      alt: "鮮貝鱈蝦球剖面",
      text: "剖面看得見整顆蝦仁，以及大顆干貝、魷魚、荸薺與洋蔥。",
      mascot: mascots.shrimp,
    },
  },
  {
    id: "burdock",
    name: "牛蒡鱈魚燒",
    subtitle: "牛蒡香氣・酥香滋味",
    description:
      "以鱈魚漿為底，牛蒡絲加量。炸起後外層酥脆，鱈魚漿與牛蒡的香氣越嚼越明顯，一口接一口。",
    image: img("p-burdock.jpg"),
    alt: "牛蒡鱈魚燒",
    prices: [60, 100, 150],
    tag: "NEW",
  },
];

export const priceSizes = ["小份", "大份", "特大"] as const;
export const menuTip = "人氣 No.1 冠軍雙拼推薦吃法：芥末沙拉搭小辣「黯然銷粉」，再加酸甜酸黃瓜。";

export type Location = { text: string; day?: string };
export type Region = { name: string; items: readonly Location[] };

// Fixed stalls grouped by region. Addresses are shown exactly as supplied.
export const regions: readonly Region[] = [
  {
    name: "北部",
    items: [
      { text: "南雅夜市：南雅東路52號對面" },
      { text: "五華夜市" },
      { text: "蘆洲得勝街76號" },
      { text: "桃園夜市：桃園區北埔路133號路口" },
      { text: "竹中口", day: "週一" },
      { text: "青草湖", day: "週三" },
      { text: "二重埔", day: "週四" },
      { text: "竹東", day: "週六" },
      { text: "大溪", day: "週日" },
    ],
  },
  {
    name: "中部",
    items: [
      { text: "銅鑼夜市" },
      { text: "台中黎明路三段26號" },
      { text: "中港夜市D63" },
      { text: "台中西區中美街241號" },
      { text: "梧棲區雲集街33號" },
      { text: "東海遊園南路143巷12號" },
      { text: "草屯草鞋墩" },
      { text: "埔里城" },
      { text: "南崗" },
      { text: "南投家樂福" },
    ],
  },
  {
    name: "南部",
    items: [
      { text: "嘉義文化夜市" },
      { text: "台南永康區南台街13巷28號" },
      { text: "瑞豐夜市第三排158號" },
    ],
  },
  { name: "東部", items: [{ text: "花蓮東大門" }, { text: "台東各夜市" }] },
];

// Pop-up stalls: visits are real but the dates are not fixed.
export const flashStalls = [
  "頭份建國夜市",
  "苑裡日南夜市",
  "苗栗通霄夜市",
  "竹南國泰夜市",
  "新竹花市",
  "彰化芬園夜市",
  "大里塗城夜市",
  "南投水里夜市／卓蘭夜市",
  "三義夜市",
  "東勢夜市",
  "後龍夜市",
  "屏東煙囪觀光夜市",
  "大員林市場",
  "彰化精誠夜市",
] as const;

export const businessHours = "通常營業 15:00–23:00，各點位依實際狀況調整，出發前歡迎先聯絡確認。";

export const franchiseSummary = [
  { label: "合約總金額", value: "24", unit: " 萬元", note: "設備、貨品、耗材與開辦費皆含" },
  { label: "分期付款", value: "12", unit: " 期 × 2 萬元", note: "簽約滿一個月後才付第一期" },
  { label: "提供開辦費", value: "5", unit: " 萬元", note: "已含於 24 萬元中，不另外加收" },
] as const;

export type Step = {
  title: string;
  body: string;
  items: readonly string[];
  note?: string;
  quote?: string;
};

export const steps: readonly Step[] = [
  {
    title: "來電了解、現場實察",
    body: "可來電或約時間，現場了解品牌營運狀況、攤位實際營運流程及檢視合約細項。",
    items: ["了解品牌營運狀況", "看攤位實際營運流程", "檢視合約細項"],
  },
  {
    title: "加盟方案內容",
    body: "合約總金額為 24 萬元，包含：",
    items: [
      "攤車",
      "炸台及抽風設備",
      "50 項以上出餐器具",
      "品牌廣告支援",
      "約可銷售 6 萬 6 千元的首批貨品",
      "約 1 萬元的營業耗材",
      "教育費",
    ],
  },
  {
    title: "提供 5 萬元開辦費",
    body: "簽約後提供 5 萬元，協助支應前期開店需求。5 萬元已含在 24 萬元合約總金額中，不另外加收。",
    items: ["攤位租金及押金", "購買冷凍櫃", "及開辦時所有相關費用"],
    note: "上述項目合計若超過 5 萬元，超出的部分才需要自行負擔。",
  },
  {
    title: "完成準備、開始營業",
    body: "設備、攤位及相關物品準備完成後，即可使用首批貨品與耗材開始營業。",
    items: ["設備、攤位及相關物品準備完成", "使用首批貨品與耗材開始營業"],
  },
  {
    title: "營業後再開始付款",
    body: "24 萬元分為 12 期，每期 2 萬元；簽約滿一個月後才開始支付第一期。",
    items: ["12 期 × 每期 2 萬元", "簽約滿一個月後付第一期"],
    quote:
      "正常情況下，開始繳款前應該已經正式營業並產生收入，讓創業者不用在尚未營運前，就先承擔全部加盟費用。",
  },
];

export const franchiseFootnote =
  "開業時程依實際準備情形；付款日期與合作內容以正式契約為準。首批貨品金額為可銷售金額說明，實際營收與獲利依經營情形而定。";

export const story = {
  kicker: "品牌故事｜為什麼叫「烏卡港」？",
  heading: ["基隆家鄉味", "帶到更多街口。"],
  paragraphs: [
    "大叔是基隆人，在安一路出生、長大。那一帶，在地人用台語叫它「烏卡港」，後來也成了我們的名字。",
    "基隆有很多好味道：大燒邁、大腸圈、豆干包、吉古拉……可是離開基隆，就不容易吃到。大叔一直放不下這件事，於是把熟悉的家鄉味揉進鱈魚漿裡：外層是鮮嫩的鱈魚漿，裡面包著厚實Q彈的深海花枝。",
    "心願其實很簡單：希望有一天，台灣每個角落都能吃到一份烏卡港的鱈魚漿料理，也讓更多人認識基隆的好味道。",
  ],
  signature: "— 鱈魚大叔",
} as const;

export const philosophy = {
  kicker: "0元加盟方案的設計初衷",
  heading: ["把門檻放低，", "把內容寫清楚。"],
  quote: "「把我知道、而且一直在用的方法，認真教給更多人。」",
  paragraphs: [
    "2006 年諾貝爾和平獎得主尤努斯，用小額貸款幫許多人踏出創業的第一步。先營運、後付費的方案沒有那麼偉大，但想讓有興趣的人能簡單起步的心意，是一樣的。",
    "現在連一杯飲料都能分期。分期只是工具，重要的是怎麼用。大叔能做的，是把方案內容完整攤開，把每個數字清楚寫進合約，讓開始付款的那天，不會有「當初這樣說、現在變那樣」的不確定。",
    "擺攤多年，大叔從不怕別人模仿，也願意把一路用到現在的方法，包括方向不對時怎麼即時修正，認真教給肯學的人。曾經跟著大叔學的人，如今有好幾位做得比大叔更好。",
    "大叔不覺得自己多了不起，只希望想起步的人，先用模仿的方式簡單入門，再慢慢長成自己的樣子。",
  ],
} as const;

export const privacyPolicy = {
  title: "隱私權政策",
  updated: "2026 年 10 月",
  sections: [
    {
      heading: "我們蒐集哪些資料",
      body: "本網站沒有會員或表單。你主動來電或透過 LINE 聯絡時，我們只會取得你提供的聯絡資訊與詢問內容。",
    },
    {
      heading: "網站流量與廣告成效",
      body: "本網站使用 Google Analytics 與 Google Ads 衡量流量與廣告成效，這些服務可能透過 Cookie 蒐集匿名的瀏覽資料，例如瀏覽的頁面、使用的裝置與大約地區。你可以在瀏覽器設定中停用或清除 Cookie。",
    },
    {
      heading: "資料的用途與分享",
      body: "資料僅用於回覆你的詢問、改善網站與評估廣告成效，不會出售給第三方。除法律要求外，不會將你主動提供的聯絡資訊提供給無關的第三方。",
    },
    {
      heading: "你的權利",
      body: "依個人資料保護法，你可以請求查詢、閱覽、更正或刪除我們持有的你的個人資料。",
    },
    {
      heading: "聯絡我們",
      body: `${company.operator}｜電話：${contact.phone}（也是 LINE ID）`,
    },
  ],
} as const;
