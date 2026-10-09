import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Copy, MapPin, Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import {
  brandImages,
  businessHours,
  company,
  contact,
  flashStalls,
  franchiseFootnote,
  franchiseSummary,
  mascotGallery,
  menuTip,
  philosophy,
  priceSizes,
  privacyPolicy,
  products,
  regions,
  steps,
  story,
} from "@/lib/brand-data";
import { trackEvent } from "@/lib/analytics";
import { useCopyText } from "@/hooks/use-copy-text";
import { SocialLinks } from "@/components/social-links";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "鱈魚大叔｜從基隆出發的魚漿料理・招牌菜單・夜市據點・0元加盟方案" },
      {
        name: "description",
        content:
          "鱈魚大叔用鱈魚漿包進花枝、蝦仁、干貝，外酥內彈。看五款招牌與菜單價格、夜市據點，以及先營運、後付費的0元加盟方案。營運企業：烏卡港企業社，電話0980115055。",
      },
      { property: "og:title", content: "鱈魚大叔｜把好料包進你的夜市日常" },
      {
        property: "og:description",
        content:
          "五款招牌海鮮小吃、菜單與據點，還有先營運、後付費的0元加盟方案。歡迎來電0980115055。",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://ukaport.com/img/hero.jpg" },
      { property: "og:locale", content: "zh_TW" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://ukaport.com/img/hero.jpg" },
    ],
  }),
  component: Index,
});

type Mode = "products" | "franchise";

const nav = [
  { id: "products", label: "招牌好料" },
  { id: "franchise", label: "0元加盟方案" },
  { id: "story", label: "品牌故事" },
  { id: "locations", label: "尋找大叔" },
  { id: "contact", label: "聯絡我們" },
] as const;

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("products");
  const [productIndex, setProductIndex] = useState(0);
  const [showCross, setShowCross] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const line = useCopyText(contact.lineId);

  const openMode = useCallback((next: Mode, scroll = true) => {
    setMode(next);
    trackEvent(next === "franchise" ? "view_franchise" : "view_products");
    if (scroll)
      requestAnimationFrame(() =>
        document.getElementById("stage")?.scrollIntoView({ behavior: "smooth" }),
      );
  }, []);

  // Deep links (#franchise, #products, #privacy) work even though only one stage panel is visible at a time.
  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash;
      if (hash === "#franchise" || hash === "#products") {
        setMode(hash === "#franchise" ? "franchise" : "products");
        requestAnimationFrame(() => document.getElementById("stage")?.scrollIntoView());
      } else if (hash === "#privacy") {
        setPrivacyOpen(true);
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const goTo = (id: string) => (event: React.MouseEvent) => {
    setMenuOpen(false);
    if (id === "products" || id === "franchise") {
      event.preventDefault();
      window.history.replaceState(null, "", `#${id}`);
      openMode(id);
    }
  };

  const pickProduct = (index: number) => {
    setProductIndex(index);
    setShowCross(false);
  };
  const product = products[productIndex];
  const step = steps[stepIndex];
  if (!product || !step) return null;
  const crossOn = showCross && !!product.cross;
  const photo = crossOn ? product.cross!.image : product.image;
  const photoAlt = crossOn ? product.cross!.alt : product.alt;
  const mascot = crossOn ? product.cross!.mascot : product.mascot;
  const text = crossOn ? product.cross!.text : product.description;

  const onCopy = async () => {
    const ok = await line.copy();
    if (ok) trackEvent("copy_line");
    else document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };
  const copyButton = (variant: "ink" | "line" = "ink") => (
    <Button variant={variant} onClick={onCopy}>
      {line.state === "success" ? <Check /> : <Copy />}
      {line.state === "success" ? "LINE ID 已複製" : "複製 LINE ID"}
    </Button>
  );
  const callLink = (where: string) => ({
    href: contact.phoneHref,
    onClick: () => trackEvent("click_call", { location: where }),
  });

  return (
    <div className="brand-site" id="top">
      <header className="site-header">
        <div className="container-brand header-inner">
          <a href="#stage" className="brand-link" aria-label="鱈魚大叔，回到最上方">
            <img src={brandImages.logo} alt="" />
            <span className="brand-word">
              {company.brand}
              <small>UNCLE COD・烏卡港</small>
            </span>
          </a>
          <nav className="desktop-nav" aria-label="主要導覽">
            {nav.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={goTo(item.id)}>
                {item.label}
              </a>
            ))}
          </nav>
          <Button variant="brand" asChild className="header-call">
            <a {...callLink("header")}>
              <Phone />
              來電 {contact.phone}
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="mobile-toggle"
            aria-label={menuOpen ? "關閉選單" : "開啟選單"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        {menuOpen && (
          <nav id="mobile-navigation" className="mobile-nav" aria-label="手機導覽">
            {nav.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={goTo(item.id)}>
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main>
        <section id="stage" className="stage wave wave-drift" aria-labelledby="hero-title">
          <div className="container-brand">
            <div className="stage-intro">
              <p>從基隆出發的魚漿料理・{company.brand}</p>
              <h1 id="hero-title">一口咬下，海鮮好料一起登場。</h1>
            </div>
            <div className="mode-switches" role="group" aria-label="切換內容">
              <Button
                variant="mode"
                aria-pressed={mode === "products"}
                onClick={() => openMode("products", false)}
              >
                <span className="mode-title">招牌好料</span>
                <span className="mode-sub">五款招牌・菜單價格</span>
              </Button>
              <Button
                variant="mode"
                aria-pressed={mode === "franchise"}
                onClick={() => openMode("franchise", false)}
              >
                <span className="mode-title">0元加盟方案</span>
                <span className="mode-sub">先營運、後付費</span>
              </Button>
            </div>

            <div hidden={mode !== "products"} id="products">
              <div className="tabs" role="group" aria-label="選擇招牌品項">
                {products.map((p, i) => (
                  <Button
                    key={p.id}
                    variant="tab"
                    aria-pressed={i === productIndex}
                    onClick={() => pickProduct(i)}
                  >
                    <img src={p.image} alt="" loading="lazy" />
                    <span>
                      0{i + 1} {p.name}
                    </span>
                  </Button>
                ))}
              </div>
              <article className="card detail" key={`${product.id}-${crossOn}`}>
                <div className="detail-photo">
                  <img className="photo pop" src={photo} alt={photoAlt} />
                  {product.tag && <span className="tag rise">{product.tag}</span>}
                  {mascot && <img className="detail-mascot bob" src={mascot.image} alt="" />}
                </div>
                <div>
                  <div className="detail-no rise">0{productIndex + 1}</div>
                  <h2 className="rise d1">{product.name}</h2>
                  <p className="sub rise d1">{product.subtitle}</p>
                  <p className="text rise d2">{text}</p>
                  <div className="prices rise d3">
                    {priceSizes.map((size, i) => (
                      <div key={size}>
                        <small>{size}</small>
                        <b>{product.prices[i]}</b>
                      </div>
                    ))}
                  </div>
                  <div className="detail-actions">
                    {product.cross && (
                      <Button variant="brand" onClick={() => setShowCross(!showCross)}>
                        {crossOn ? "看成品" : "看剖面"}
                      </Button>
                    )}
                    <Button
                      variant="inkline"
                      size="icon"
                      aria-label="上一款"
                      onClick={() =>
                        pickProduct((productIndex + products.length - 1) % products.length)
                      }
                    >
                      <ChevronLeft />
                    </Button>
                    <Button
                      variant="inkline"
                      size="icon"
                      aria-label="下一款"
                      onClick={() => pickProduct((productIndex + 1) % products.length)}
                    >
                      <ChevronRight />
                    </Button>
                  </div>
                </div>
              </article>

              <div className="card menu-card">
                <div className="menu-head">
                  <h2>大叔的美味菜單</h2>
                  <span>點選品項看介紹・價格單位：新臺幣／元</span>
                </div>
                <div className="menu-cols" aria-hidden="true">
                  <span>品項</span>
                  {priceSizes.map((size) => (
                    <span key={size}>{size}</span>
                  ))}
                </div>
                {products.map((p, i) => (
                  <Button
                    key={p.id}
                    variant="row"
                    aria-pressed={i === productIndex}
                    onClick={() => pickProduct(i)}
                  >
                    <span className="name">
                      0{i + 1} {p.name}
                    </span>
                    {p.prices.map((price, j) => (
                      <span
                        className="price"
                        key={priceSizes[j]}
                        aria-label={`${priceSizes[j]} ${price} 元`}
                      >
                        {price}
                      </span>
                    ))}
                  </Button>
                ))}
                <p className="menu-tip">{menuTip}</p>
              </div>
              <SocialLinks
                variant="line"
                place="menu"
                label={contact.socialLabel}
                className="stage-social"
              />
            </div>

            <div hidden={mode !== "franchise"} id="franchise">
              <div className="fr-head rise">
                <div>
                  <p className="kicker">和大叔一起，把好料帶到更多街口</p>
                  <h2>先營運、後付費</h2>
                </div>
                <p>
                  先把開店準備做好，再一步步開始。數字清楚寫進合約，讓想起步的人能用最低的門檻入門。
                </p>
              </div>
              <div className="price3">
                {franchiseSummary.map((item, i) => (
                  <div key={item.label} className={`card price-card rise d${i + 1}`}>
                    <small>{item.label}</small>
                    <div className="v">
                      {item.value}
                      <span>{item.unit}</span>
                    </div>
                    <p>{item.note}</p>
                  </div>
                ))}
              </div>
              <div className="track">
                <div className="track-line" aria-hidden="true" />
                <div
                  className="track-fill"
                  aria-hidden="true"
                  style={{ width: `${stepIndex * 20}%` }}
                />
                <div className="track-steps" role="group" aria-label="加盟五步驟">
                  {steps.map((s, i) => (
                    <Button
                      key={s.title}
                      variant="step"
                      aria-pressed={i === stepIndex}
                      data-done={i < stepIndex}
                      onClick={() => {
                        setStepIndex(i);
                        trackEvent("franchise_step", { step: i + 1 });
                      }}
                    >
                      <span className="dot">{i + 1}</span>
                      <span className="label">{s.title}</span>
                    </Button>
                  ))}
                </div>
              </div>
              <article className="card step-card rise" key={stepIndex}>
                <div>
                  <div className="n">STEP {stepIndex + 1}</div>
                  <h3>{step.title}</h3>
                  <p className="body">{step.body}</p>
                </div>
                <div>
                  <ul className="checklist">
                    {step.items.map((item) => (
                      <li key={item}>
                        <Check size={20} strokeWidth={3} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {step.note && <p className="step-note">{step.note}</p>}
                  {step.quote && <p className="step-quote">「{step.quote}」</p>}
                </div>
                <div className="step-actions">
                  <Button
                    variant="inkline"
                    onClick={() => setStepIndex((stepIndex + steps.length - 1) % steps.length)}
                  >
                    上一步
                  </Button>
                  <Button
                    variant="ink"
                    onClick={() => setStepIndex((stepIndex + 1) % steps.length)}
                  >
                    下一步
                  </Button>
                </div>
              </article>
              <p className="footnote">{franchiseFootnote}</p>
              <div className="cta-row">
                <Button variant="paper" asChild>
                  <a {...callLink("franchise")}>
                    <Phone />
                    來電了解加盟
                  </a>
                </Button>
                {copyButton("ink")}
                <Button variant="line" asChild>
                  <a href="#philosophy">0元加盟方案的設計初衷</a>
                </Button>
              </div>
              <SocialLinks
                variant="line"
                place="franchise"
                label={contact.socialLabel}
                className="stage-social"
              />
            </div>
          </div>
        </section>
        <div className="edge" aria-hidden="true" />

        <section id="story" className="section">
          <div className="container-brand two">
            <div className="story-photo">
              <div className="arch wave" aria-hidden="true" />
              <img
                className="chef"
                src={brandImages.chef}
                alt="身穿黑色廚師服、端著鱈魚料理微笑的鱈魚大叔"
                loading="lazy"
              />
              <img
                className="sticker bob"
                src={brandImages.logo}
                alt="Q版鱈魚大叔：端著鱈魚料理比讚"
                loading="lazy"
              />
            </div>
            <div className="story-copy">
              <p className="kicker-dark">{story.kicker}</p>
              <h2 className="section-heading">
                {story.heading[0]}
                <br />
                {story.heading[1]}
              </h2>
              {story.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p className="story-sign">{story.signature}</p>
            </div>
          </div>
        </section>

        <section id="philosophy" className="container-brand" style={{ paddingBottom: 88 }}>
          <div className="philosophy">
            <div className="two" style={{ alignItems: "start" }}>
              <div>
                <p className="kicker-gold">{philosophy.kicker}</p>
                <h2 className="section-heading">
                  {philosophy.heading[0]}
                  <br />
                  {philosophy.heading[1]}
                </h2>
                <p className="quote">{philosophy.quote}</p>
              </div>
              <div className="copy">
                {philosophy.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="edge-up" aria-hidden="true" />
        <section className="mascots-band wave" aria-labelledby="mascot-title">
          <div className="container-brand">
            <h2 id="mascot-title">大叔的好夥伴</h2>
            <div className="mascots">
              {mascotGallery.map((m, i) => (
                <div className="mascot" key={m.name}>
                  <div className="frame">
                    <img
                      className={i % 2 ? "bob2" : "bob"}
                      src={m.image}
                      alt={m.alt}
                      loading="lazy"
                    />
                  </div>
                  <p>{m.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <div className="edge" aria-hidden="true" />

        <section id="locations" className="section locations">
          <div className="container-brand">
            <p className="kicker-dark">夜市見，大叔在這裡</p>
            <h2 className="section-heading" style={{ marginBottom: 12 }}>
              尋找你的海味日常
            </h2>
            <p style={{ margin: "0 0 36px", fontSize: 16, lineHeight: 1.8 }}>
              北中南東都有固定據點，另有不定期的臨時快閃攤。{businessHours}
            </p>
            <div className="regions">
              {regions.map((region) => (
                <div key={region.name} className="card region">
                  <div className="region-head">
                    <h3>{region.name}</h3>
                    <span>{region.items.length} 個據點</span>
                  </div>
                  <ul>
                    {region.items.map((item) => (
                      <li key={item.text} data-location>
                        <MapPin size={16} aria-hidden="true" />
                        <span className="t">{item.text}</span>
                        {item.day && <span className="day">{item.day}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="flash">
              <div className="flash-head">
                <h3>臨時快閃攤</h3>
                <span>時間不固定</span>
              </div>
              <ul>
                {flashStalls.map((stall) => (
                  <li key={stall}>{stall}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <div className="edge-up" aria-hidden="true" />
        <section id="contact" className="contact wave">
          <div className="container-brand">
            <img className="sticker pop" src={brandImages.logo} alt="Q版鱈魚大叔" loading="lazy" />
            <h2>想吃好料，還是想一起開店？</h2>
            <p>找大叔聊聊吧。商品、據點與加盟問題，歡迎直接聯絡。</p>
            <div className="cta-row">
              <Button variant="paper" asChild>
                <a {...callLink("contact")}>
                  <Phone />
                  電話 {contact.phone}
                </a>
              </Button>
              {copyButton("ink")}
            </div>
            <p className="line-id">電話 {contact.phone}（也是 LINE ID）</p>
            <div className="copy-feedback" role="status" aria-live="polite">
              {line.state === "success"
                ? `已複製 LINE ID：${contact.lineId}`
                : line.state === "fallback"
                  ? "無法自動複製，請選取下方 LINE ID 手動複製。"
                  : ""}
            </div>
            {line.state === "fallback" && (
              <label className="copy-backup">
                LINE ID
                <input
                  readOnly
                  value={contact.lineId}
                  onFocus={(e) => e.currentTarget.select()}
                  aria-label="手動複製 LINE ID"
                />
              </label>
            )}
            <SocialLinks variant="line" place="contact" className="social-center" />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container-brand">
          <div className="two">
            <div>
              <div className="footer-title">
                {company.brand}｜加盟方／營運企業：{company.operator}
              </div>
              <div>統一編號：{company.taxId}</div>
              <div>
                電話：<a href={contact.phoneHref}>{contact.phone}</a>（也是 LINE ID）
              </div>
            </div>
            <div>
              <div>食品業者登錄字號：{company.foodRegistration}</div>
              <div>{company.insurance.summary}</div>
              <div>投保單位：{company.insurance.insurer}</div>
              <div>保單號碼：{company.insurance.policyNo}</div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              © {company.brand}・{company.operator} |
              <button type="button" className="linklike" onClick={() => setPrivacyOpen(true)}>
                隱私權政策
              </button>
            </span>
            <a href="#top">回到頂端 ↑</a>
          </div>
        </div>
      </footer>

      <div className="mobile-contact">
        <Button variant="brand" asChild>
          <a {...callLink("mobile-bar")}>
            <Phone />
            來電找大叔
          </a>
        </Button>
        {copyButton("ink")}
      </div>

      <Dialog open={privacyOpen} onOpenChange={setPrivacyOpen}>
        <DialogContent className="max-h-[85dvh] overflow-auto policy">
          <DialogTitle>{privacyPolicy.title}</DialogTitle>
          <DialogDescription>最後更新：{privacyPolicy.updated}</DialogDescription>
          {privacyPolicy.sections.map((section) => (
            <div key={section.heading}>
              <h3>{section.heading}</h3>
              <p>{section.body}</p>
            </div>
          ))}
        </DialogContent>
      </Dialog>
    </div>
  );
}
