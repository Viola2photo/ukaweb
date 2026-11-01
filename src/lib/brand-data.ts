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
  lineUrl: "https://lin.ee/8Ka2EIq",
  socialLabel: "來認識鱈魚大叔",
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
  lineQr: img("line-qrcode.png"),
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
      "北海鱈花枝＋札幌墨魚燒，一次吃到兩種海味。推薦芥末沙拉搭配微辣「黯然銷粉」，再加酸甜酸黃瓜，冠軍搭配一次愛上。",
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

export const flavors = [
  { label: "沙拉", options: ["原味", "芥末", "蜂蜜"] },
  { label: "椒鹽", options: ["星廚原味", "黯然銷粉（微辣）", "青花椒鹽"] },
] as const;

export const flavorNote = "每份皆可自由選擇、搭配多種沙拉與椒鹽。";

export const flavorSummary = flavors.map((f) => `${f.label}：${f.options.join("、")}`).join("；");

export const menuDownload = {
  file: img("uka-menu.jpg"),
  filename: "鱈魚大叔菜單.jpg",
  label: "下載完整菜單",
} as const;

// One tasting video shown beside the product details; it stays while the product changes.
export const productVideo = {
  facebookUrl: "https://www.facebook.com/reel/1762819641460488/",
  cover: img("video-tasting.jpg"),
  coverAlt: "鱈魚大叔產品試吃影片：別人說好吃才算，創造穩定長期財",
  title: "鱈魚大叔產品試吃影片",
} as const;

export const priceSizes = ["小份", "大份", "特大"] as const;
export const menuTip = "人氣 No.1 冠軍雙拼推薦吃法：芥末沙拉搭微辣「黯然銷粉」，再加酸甜酸黃瓜。";

export type Location = { text: string; day?: string; hours?: string };
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
      { text: "竹北興希望社區", day: "週二" },
      { text: "新埔", day: "週三" },
      { text: "二重埔", day: "週四" },
      { text: "新庄子", day: "週五" },
      { text: "竹東", day: "週六" },
    ],
  },
  {
    name: "中部",
    items: [
      { text: "銅鑼夜市" },
      { text: "台中黎明路三段26號", hours: "營業時間 17:00–03:30" },
      { text: "中港夜市D63" },
      { text: "台中西區中美街241號" },
      { text: "梧棲區雲集街33號" },
      { text: "東海遊園南路143巷12號" },
      { text: "霧峰大東路夜市", day: "週二" },
      { text: "南投家樂福夜市", day: "週三" },
      { text: "南崗夜市", day: "週四" },
      { text: "草鞋墩夜市", day: "週五・六・日" },
    ],
  },
  {
    name: "南部",
    items: [
      { text: "嘉義文化夜市" },
      { text: "台南永康區南台街13巷28號" },
      { text: "瑞豐夜市第三排158號" },
      { text: "台南武聖夜市 第五排第15號", day: "週三・五・六" },
      { text: "屏東煙囪觀光夜市", day: "週日" },
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
  "大員林市場",
  "彰化精誠夜市",
] as const;

export const businessHours = "通常營業 15:00–23:00，各點位依實際狀況調整，出發前歡迎先聯絡確認。";

export const franchiseSummary = [
  { label: "合約總金額", value: "24", unit: " 萬元", note: "設備、貨品、耗材與開辦費皆含" },
  { label: "分期付款", value: "12", unit: " 期 × 2 萬元", note: "簽約滿一個月後才付第一期" },
  { label: "提供開辦費", value: "5", unit: " 萬元", note: "已含於 24 萬元中，不另外加收" },
] as const;

export const cashPlan = {
  label: "另有現金方案",
  value: "17.5",
  unit: " 萬元",
  note: "方案內容與 0 元加盟方案相同；不提供 5 萬元開辦費，並扣除由第三方收取的分期手續費，讓加盟者減輕負擔。",
} as const;

export const noFees = {
  label: "四項費用，全部免收",
  items: ["加盟金", "保證金", "簽約金", "續約金"],
  note: "加盟費用全數用於方案內提供的攤車、設備、貨品、耗材與教育等物品與服務，不另收這四項費用。",
} as const;

export const noFeesSummary = `不收${noFees.items.join("、")}。${noFees.note}`;

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

// One video that explains the whole plan; it stays visible on every step.
export const franchiseVideo = {
  facebookUrl: "https://www.facebook.com/reel/1071647855702438/",
  cover: img("video-franchise-intro.jpg"),
  coverAlt: "鱈魚大叔介紹：一年半 50 間加盟店，鱈魚大叔怎麼做到？",
  title: "鱈魚大叔加盟方案完整說明影片",
} as const;

export const franchiseFootnote =
  "開業時程依實際準備情形；付款日期與合作內容以正式契約為準。首批貨品金額為可銷售金額說明，實際營收與獲利依經營情形而定。";

export const siteUrl = "https://ukaport.com/";

export const faq = [
  {
    q: "鱈魚大叔是什麼？",
    a: "鱈魚大叔在菜市場有 40 年經驗，在基隆長大，想把小時候魚漿工廠的經驗延續下去。從 2024 年中開始到處擺攤試賣，如今已有多個加盟點位，是一個魚漿炸物小攤品牌，由烏卡港企業社營運。",
  },
  {
    q: "鱈魚大叔賣什麼？",
    a: "五款招牌：冠軍雙拼、北海鱈花枝、札幌墨魚燒、鮮貝鱈蝦球、牛蒡鱈魚燒，菜單與價格請看本頁「招牌好料」。",
  },
  {
    q: "鱈魚大叔有哪些口味可以選？",
    a: `${flavorNote}口味有：${flavorSummary}。人氣推薦吃法是芥末沙拉搭配微辣的黯然銷粉，再加酸甜黃瓜碎。`,
  },
  {
    q: "哪裡可以吃到鱈魚大叔？",
    a: "在北、中、南、東各地夜市據點，每週固定日與地點請看本頁「據點」；另有時間不固定的臨時快閃攤。出發前歡迎先來電確認。",
  },
  {
    q: "鱈魚大叔有哪些加盟方案？",
    a: `0 元加盟方案採先營運、後付費：合約總金額 24 萬元，分 12 期、每期 2 萬元，簽約滿一個月後才付第一期，並提供 5 萬元開辦費。${noFeesSummary}另有現金方案 17.5 萬元，方案內容相同，不提供 5 萬元開辦費，並扣除第三方收取的手續費，讓加盟者減輕壓力。實際內容以正式契約為準。`,
  },
  {
    q: "加盟需要付加盟金、保證金嗎？",
    a: `不需要。${noFeesSummary}實際內容以正式契約為準。`,
  },
  {
    q: "想加盟的第一步是什麼？",
    a: "先了解 0 元加盟方案的內容，可直接聯繫取得完整說明，也鼓勵預約到現場了解攤位狀況與公司實際走訪，多方蒐集資訊來加強自己的判斷。",
  },
  {
    q: "想了解加盟，怎麼聯絡？",
    a: "來電 0980115055，這組號碼同時也是 LINE ID。",
  },
] as const;

export const creed = {
  kicker: "品牌精神",
  lines: ["鱈魚大叔", "用心用感情 創造好料理"],
} as const;

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

export type FeaturedStore = {
  slug: string;
  name: string;
  image: string;
  imageAlt: string;
  city: string;
  district: string;
  address: string;
  nearby: string;
  directions?: string;
  delivery?: string;
  hours?: string;
  days?: string;
  mapUrl?: string;
  roaming?: { area: string; schedule: readonly { place: string; day: string }[] };
  facebookVideoUrl?: string;
  intro: string[];
  highlightsTitle?: string;
  highlights?: readonly string[];
  note?: string;
  signature: string;
  tags: readonly string[];
};

// Franchise stalls that get their own page under /stores/<slug>.
export const featuredStores: readonly FeaturedStore[] = [
  {
    slug: "taichung-liming",
    name: "台中黎明路店",
    image: img("store-taichung-liming.jpg"),
    imageAlt: "鱈魚大叔在台中黎明路新加盟點位的攤位前介紹",
    city: "台中市",
    district: "南屯區",
    address: "台中市南屯區黎明路三段26號",
    nearby: "宏香火雞肉飯旁（原宏佳），鄰近朝馬",
    hours: "營業時間 17:00–03:30",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("台中市南屯區黎明路三段26號"),
    facebookVideoUrl: "https://www.facebook.com/reel/1399299159082457/",
    intro: [
      "台中的朋友，鱈魚大叔又多一個點啦！這次由海豚和海豚媽（小嬣）一起顧攤。",
      "認識我們，必點冠軍雙拼：搭配芥末沙拉、微辣的黯然銷粉及酸甜黃瓜碎，熱騰騰的鱈花枝、墨魚燒，等你來嚐嚐。",
      "所有附近的朋友、基隆同鄉，歡迎來捧場！幫這對努力的母女加加油，順便把肚子照顧好。",
    ],
    signature: "冠軍雙拼",
    tags: ["鱈魚大叔", "台中", "黎明路", "新據點", "逢甲"],
  },
  {
    slug: "taichung-donghai",
    name: "台中東海店",
    image: img("store-taichung-donghai.jpg"),
    imageAlt: "鱈魚大叔在台中東海商圈新加盟點位的大型招牌前介紹",
    city: "台中市",
    district: "龍井區",
    address: "台中市龍井區遊園南路143巷12號",
    nearby: "東海商圈遊園南路143巷內，看到鱈魚大叔的大型餐點招牌就到了",
    directions:
      "從「台灣大道」方向進入遊園南路，再找「遊園南路143巷」。巷內不是整排店面的商圈，看到鱈魚大叔的大型餐點招牌就到了。",
    delivery: "現場提供 Uber Eats 外送",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("台中市龍井區遊園南路143巷12號"),
    facebookVideoUrl: "https://www.facebook.com/reel/2261364914628414/",
    intro: [
      "東海的朋友注意，鱈魚大叔把香味飄進巷子裡了！這次的新攤位不在熱鬧大馬路邊，而是「一轉進去才發現原來這裡藏了好料」的地方。",
      "整面超大鱈魚料理招牌非常醒目，看到雙拼、鱈花枝、墨魚燒的照片，就代表你找對了。",
      "外皮炸得金黃酥脆，裡面是紮實的海鮮口感。想吃點有儀式感的下午茶、下課點心，或只是今天很需要一份炸物安慰，都可以來東海商圈找美味。不想出門也沒關係，現場有 Uber Eats，讓鱈魚大叔自己游去你家。",
    ],
    signature: "冠軍雙拼",
    tags: ["東海商圈", "鱈魚大叔", "台中", "加盟"],
  },
  {
    slug: "tainan-wusheng",
    name: "台南武聖夜市店",
    image: img("store-tainan-wusheng.jpg"),
    imageAlt: "鱈魚大叔在台南武聖夜市新加盟點位的攤位前介紹",
    city: "台南市",
    district: "中西區",
    address: "台南市中西區武聖夜市 第五排第15號",
    nearby: "武聖夜市第五排第15號，從影片中大樓正對面的第五排往內走，攤位在左手邊",
    directions: "從影片中大樓正對面的第五排往內走，攤位就在左手邊。",
    days: "週三・五・六",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("台南市中西區武聖夜市"),
    facebookVideoUrl: "https://www.facebook.com/reel/1751095429310895/",
    intro: [
      "台南的朋友，大叔來武聖夜市探班啦！這次來找新夥伴，當然不能只站在旁邊喊加油！大叔直接到攤前，從炸物出鍋、淋醬到擺盤，一邊動手、一邊分享小細節。餐點要好吃，端到客人面前也要讓人看了就想咬一口。",
      "探班的樂趣，就是能面對面聊聊。看看夥伴做得順不順、哪裡需要幫忙，也跟來逛夜市的客人介紹自家產品。想知道裡面包什麼、口味怎麼搭，儘管問！買一份炸物，也可以順便聊兩句，不用客氣。",
      "這次的新夥伴是一對一起打拚的夫妻。看著兩人穿上圍裙、一起顧攤，大叔也在現場陪著調整、分享經驗。加盟之後，還是要常走動、彼此照應，一起把攤位顧好。",
      "台南的朋友，逛武聖夜市時記得來找他們！還沒吃過的，來嘗鮮；吃過喜歡的，再帶朋友來，呷尬併軌！",
    ],
    signature: "冠軍雙拼",
    tags: ["鱈魚大叔", "武聖夜市", "台南美食", "台南", "斜槓"],
  },
  {
    slug: "hsinchu-roaming",
    name: "新竹區域跑攤 神鵰俠侶情侶檔",
    image: img("store-hsinchu-roaming.jpg"),
    imageAlt: "鱈魚大叔介紹新竹跑攤加盟的神鵰俠侶情侶檔",
    city: "新竹",
    district: "區域",
    address: "新竹區域跑攤（每週位置見專頁）",
    nearby: "新竹區域的夜市與社區，看到最亮、最香、前面還有人排隊的那一攤就是",
    roaming: {
      area: "新竹區域",
      schedule: [
        { place: "竹中口", day: "週一" },
        { place: "竹北興希望社區", day: "週二" },
        { place: "新埔", day: "週三" },
        { place: "二重埔", day: "週四" },
        { place: "新庄子", day: "週五" },
        { place: "竹東", day: "週六" },
      ],
    },
    facebookVideoUrl: "https://www.facebook.com/reel/913599771812685/",
    intro: [
      "鱈魚大叔的「神鵰俠侶情侶檔」出沒中！這次來到新竹青草湖夜市，除了介紹全新的攤位，也順便公開弘哲與凱莉一星期的行程。",
      "老闆在影片裡很認真介紹新餐車，但我們知道，大家最後看的還是那一盤炸物。畢竟攤位再漂亮，還是要吃進嘴裡，才算真正認識。",
      "新竹、竹東與桃園的朋友，記得先把時間和地點存起來！看到最亮、最香，前面還有人排隊的那一攤，不用懷疑，先來找鱈魚大叔就對了！",
    ],
    highlights: [
      "全新可拆式兩截餐車，整體更穩、更好看",
      "招牌高高掛，遠遠就能找到",
      "燈一打開，亮到肚子都知道該餓了",
      "鱈花枝現點現炸，香味完全不打算低調",
      "原本賣炸雙胞胎，現在改來跟鱈魚大叔一起「炸」出新人生",
    ],
    note: "實際出攤情況可能依天候及夜市安排調整。",
    signature: "北海鱈花枝",
    tags: [
      "鱈魚大叔",
      "鱈花枝",
      "新竹美食",
      "新竹夜市",
      "青草湖夜市",
      "二重埔夜市",
      "竹東沿河街夜市",
      "竹中口夜市",
      "大溪老街",
      "現點現炸",
      "夜市炸物",
      "新攤位報到",
    ],
  },
  {
    slug: "nantou-caotun",
    name: "南投草屯 阿芳哥",
    image: img("store-nantou-caotun.jpg"),
    imageAlt: "鱈魚大叔介紹南投草屯最新加盟點與攤車",
    city: "南投縣",
    district: "草屯鎮",
    address: "南投草屯一帶跑攤（每週位置見專頁）",
    nearby: "南投草屯、台中霧峰一帶的夜市，週五・六・日 18:00 後在草鞋墩人文夜市",
    roaming: {
      area: "南投草屯",
      schedule: [
        { place: "霧峰大東路夜市", day: "週二" },
        { place: "南投家樂福夜市", day: "週三" },
        { place: "南崗夜市", day: "週四" },
        { place: "草鞋墩夜市", day: "週五・六・日" },
      ],
    },
    facebookVideoUrl: "https://www.facebook.com/reel/2106092576997448/",
    intro: [
      "鱈魚大叔全台美食地圖再添一個新據點！這次帶大家來到南投草屯。據說現在全台灣只差雲林還沒解鎖，雲林的朋友們，加盟連線還不快快手刀聯繫起來！",
      "勵志斜槓加盟主阿芳哥，白天從事測量工作，為了給長大的孩子更好的生活，選擇晚上出來斜槓創業！未來甚至打算發展成全職事業，這份精神真的超值得大家掏出新台幣大力支持捧場！",
      "台中、彰化、南投、草屯、霧峰……所有喜歡鱈魚大叔的朋友們，心動不如馬上行動，下班下課趕快衝一波，給熱血斜槓的阿芳哥最直接的支持吧！",
    ],
    note: "每週五・六・日 18:00 後，阿芳哥會在旁邊熱鬧的草鞋墩人文夜市擺攤。",
    signature: "冠軍雙拼",
    tags: ["鱈魚大叔", "草屯", "南投", "草鞋墩", "加盟", "斜槓", "擺攤"],
  },
  {
    slug: "chiayi-culture",
    name: "嘉義文化夜市店",
    image: img("store-chiayi-culture.jpg"),
    imageAlt: "鱈魚大叔在嘉義文化夜市新加盟點位的攤車前介紹",
    city: "嘉義市",
    district: "西區",
    address: "嘉義市西區文化夜市（第三信用合作社正對面）",
    nearby: "文化夜市正中央，第三信用合作社正對面",
    directions:
      "我們就在文化夜市的正中央！抬頭找「第三信用合作社」，正對面那個香氣撲鼻、擺著誘人冠軍雙拼樣品的攤位就是。",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("嘉義文化夜市 第三信用合作社"),
    facebookVideoUrl: "https://www.facebook.com/reel/1973069320044113/",
    intro: [
      "鱈魚大叔插旗嘉義文化夜市啦！嘉義的鄉親朋友們，我們來啦！這幾天剛開幕就感受到大家滿滿的熱情，真的太感動了！",
      "眼尖的朋友可能會發現，影片裡顧攤的阿哲很眼熟（提示：蘆洲夜市）！但他今天只是來代班救援的。嘉義店真正的老闆，其實是阿哲的超人媽媽！這已經是他們開的第三間分店了，戰鬥力是不是超級高！",
      "開幕人潮強強滾，感謝嘉義鄉親！開幕第一天營收直接衝上 13,000 元，第二天生意也是一波接一波忙不停，嘉義人的熱情我們完全收到了！（以上為該攤開幕當日的情形，實際營收依經營情形而定。）",
      "全台拼圖快要大滿貫啦！現在台灣本島只差雲林還沒有鱈魚大叔的蹤影，雲林的朋友請再等等我們！",
      "大叔真心話時間：阿哲媽媽充滿活力、很願意為自己打拼，這份精神真的非常不簡單！而阿哲平時雖然要顧北部的攤位，一有空也是立刻南下來幫媽媽的忙，超級孝順！",
      "大家如果有逛到文化夜市，千萬別忘了來找我們，點份外酥內Q的冠軍雙拼，順便給這位熱血打拼的媽媽一個最溫暖的鼓勵吧！",
    ],
    signature: "冠軍雙拼",
    tags: ["鱈魚大叔", "嘉義", "文化夜市", "擺攤", "加盟"],
  },
  {
    slug: "taichung-wuqi",
    name: "台中梧棲第一市場店",
    image: img("store-taichung-wuqi.jpg"),
    imageAlt: "鱈魚大叔介紹台中梧棲第一市場新加盟點的攤位",
    city: "台中市",
    district: "梧棲區",
    address: "台中市梧棲區雲集街33號（梧棲第一市場）",
    nearby: "梧棲第一市場內",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("台中市梧棲區雲集街33號"),
    facebookVideoUrl: "https://www.facebook.com/reel/1745037463322378/",
    intro: [
      "梧棲鄉親看過來！各位海線的朋友們，鱈魚大叔在「梧棲第一市場」開新攤啦！",
      "這次由兩位超級認真、想要斜槓增加收入的年輕老闆（昶男＆銘浩）用心經營，大叔親自掛保證，這攤真的「不惜成本、超有特色」！",
      "在地人或是來海線及梧棲玩的朋友，拜託一定要用新台幣去支持一下這兩位用心、正向又肯努力的年輕人！",
    ],
    highlightsTitle: "必吃亮點",
    highlights: [
      "CP 值破表的佛心套餐：買大份或特大份餐點，只要加 40 元就能升級套餐（包含一份薯條＋一杯蔓越莓醋）。大叔偷偷算給你聽，外面光一杯醋飲就賣 65 元了，這加購價根本是交朋友的。",
      "不惜成本的「變形金剛」獨家紙盒：為了讓炸物外帶回家仍保持酥脆、不被熱氣悶爛，老闆自己找到成本貴一倍的特製盒。打開可以直接邊走邊吃，折起來就能完美加蓋外帶回家。",
    ],
    signature: "冠軍雙拼",
    tags: ["鱈魚大叔", "斜槓", "梧棲", "海線", "加盟", "擺攤"],
  },
  {
    slug: "taoyuan-tourist",
    name: "桃園觀光夜市店",
    image: img("store-taoyuan-tourist.jpg"),
    imageAlt: "鱈魚大叔在桃園觀光夜市介紹「靠加盟養活一家人」的雙寶媽（蓉蓉）第二間店",
    city: "桃園市",
    district: "桃園區",
    address: "桃園市桃園區北埔路133號路口（桃園觀光夜市）",
    nearby: "桃園觀光夜市，北埔路133號路口",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("桃園市桃園區北埔路133號"),
    facebookVideoUrl: "https://www.facebook.com/reel/1573398290498199/",
    intro: [
      "下著大雨的夜晚，大叔特地來到桃園觀光夜市，找在這裡擺攤的阿宏！",
      "即使是下雨天，阿宏依然樂觀面對生活，攤前的購買人數也維持著一定的人潮。這是阿宏的太太雙寶媽（蓉蓉）的第二間店，影片標題說的「靠加盟養活一家人」，就是這對夫妻努力的最好寫照。",
      "阿宏與雙寶媽是在桃園與中壢觀光夜市擺攤的正向小夫妻。桃園的朋友逛夜市時，有空請多多捧場，給這對樂觀打拚的小夫妻一點最直接的支持！",
    ],
    signature: "冠軍雙拼",
    tags: ["烏卡港", "鱈魚大叔", "夜市美食", "桃園", "桃園美食", "中壢", "中壢美食"],
  },
];

// Questions answered on every store page and in its FAQPage JSON-LD.
export function storeFaq(store: FeaturedStore) {
  const items: { q: string; a: string }[] = [
    {
      q: `鱈魚大叔${store.name}在哪裡？`,
      a: store.roaming
        ? `${store.roaming.area}跑攤，位置不固定。每週行程：${store.roaming.schedule.map((r) => `${r.place}（${r.day}）`).join("、")}。實際出攤情況可能依天候及夜市安排調整。`
        : `${store.address}。${store.directions ?? store.nearby}。`,
    },
    {
      q: `${store.name}賣什麼？`,
      a: `招牌是${store.signature}，另有北海鱈花枝、札幌墨魚燒、鮮貝鱈蝦球、牛蒡鱈魚燒，${flavorNote}口味有：${flavorSummary}。菜單與價格請看官方網站「招牌好料」。`,
    },
    {
      q: `${store.name}的營業時間？`,
      a: store.hours
        ? `${store.hours}。實際時間依現場狀況調整。`
        : store.days
          ? `營業日為${store.days}，通常營業 15:00–23:00，實際時間依現場狀況調整。`
          : `通常營業 15:00–23:00，實際時間依現場狀況調整。`,
    },
  ];
  if (store.delivery) {
    items.push({ q: `${store.name}可以外送嗎？`, a: `${store.delivery}。` });
  }
  return items;
}
