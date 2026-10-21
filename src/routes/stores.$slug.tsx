import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Clock, MapPin, Phone, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  brandImages,
  company,
  contact,
  featuredStores,
  siteUrl,
  storeFaq,
} from "@/lib/brand-data";
import { storeStructuredData, storeUrl } from "@/lib/structured-data";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/stores/$slug")({
  loader: ({ params }) => {
    const store = featuredStores.find((s) => s.slug === params.slug);
    if (!store) throw notFound();
    return { store };
  },
  head: ({ loaderData }) => {
    const store = loaderData?.store;
    if (!store) return {};
    const title = `${store.name}｜${store.district}鱈魚大叔 地址・營業時間・菜單`;
    const description = `鱈魚大叔${store.name}：${store.address}。${store.nearby}。招牌${store.signature}、鱈花枝、墨魚燒，${store.hours ?? "歡迎先來電確認營業時間"}。`;
    const url = storeUrl(store);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:image", content: `${siteUrl}${store.image.slice(1)}` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(storeStructuredData(store)) },
      ],
    };
  },
  component: StorePage,
});

function StorePage() {
  const { store } = Route.useLoaderData();
  const [playing, setPlaying] = useState(false);
  const video = store.facebookVideoUrl;
  const others = featuredStores.filter((o) => o.slug !== store.slug);

  return (
    <div className="brand-site store-page">
      <header className="site-header">
        <div className="container-brand header-inner">
          <Link to="/" className="brand-link" aria-label="鱈魚大叔，回到首頁">
            <img src={brandImages.logo} alt="" />
            <span className="brand-word">
              {company.brand}
              <small>UNCLE COD・烏卡港</small>
            </span>
          </Link>
          <Link to="/" hash="locations" className="store-back">
            <ArrowLeft size={16} aria-hidden="true" />
            全部據點
          </Link>
        </div>
      </header>

      <main className="container-brand store-main">
        <div className="store-cover">
          {video && playing ? (
            <iframe
              title={`${store.name}介紹影片`}
              src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(video)}&show_text=false&width=360`}
              className="store-video"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <>
              <img src={store.image} alt={store.imageAlt} />
              {video && (
                <button
                  type="button"
                  className="store-play"
                  onClick={() => {
                    setPlaying(true);
                    trackEvent("play_store_video", { location: `store-${store.slug}` });
                  }}
                >
                  <Play size={20} aria-hidden="true" />
                  播放介紹影片
                </button>
              )}
            </>
          )}
          {video && (
            <a className="store-video-link" href={video} target="_blank" rel="noreferrer">
              在 Facebook 觀看影片
            </a>
          )}
        </div>
        <div className="store-body">
          <span className="store-badge">{store.badge}</span>
          <h1 className="section-heading">{store.name}</h1>
          <ul className="store-facts">
            <li>
              <MapPin size={18} aria-hidden="true" />
              <span>
                {store.address}
                <small>{store.nearby}</small>
              </span>
            </li>
            {store.hours && (
              <li>
                <Clock size={18} aria-hidden="true" />
                <span>{store.hours}</span>
              </li>
            )}
          </ul>
          {store.intro.map((p) => (
            <p key={p} className="store-text">
              {p}
            </p>
          ))}
          {store.directions && (
            <>
              <h2 className="store-h2">怎麼去</h2>
              <p className="store-text">{store.directions}</p>
            </>
          )}
          {store.delivery && <p className="store-text">{store.delivery}。</p>}
          <div className="cta-row">
            <Button variant="brand" asChild>
              <a
                href={contact.phoneHref}
                onClick={() => trackEvent("click_call", { location: `store-${store.slug}` })}
              >
                <Phone />
                來電 {contact.phone}
              </a>
            </Button>
            <Button variant="paper" asChild>
              <a href={store.mapUrl} target="_blank" rel="noreferrer">
                <MapPin />
                開啟地圖導航
              </a>
            </Button>
          </div>
          <iframe
            title={`${store.name}地圖`}
            className="store-map"
            src={`https://www.google.com/maps?q=${encodeURIComponent(store.address)}&output=embed&hl=zh-TW`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <h2 className="store-h2">{store.name}常見問題</h2>
          <div className="faq-list">
            {storeFaq(store).map((item) => (
              <details key={item.q} className="card faq-item">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
          {others.length > 0 && (
            <>
              <h2 className="store-h2">其他新加盟點位</h2>
              <ul className="store-others">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link to="/stores/$slug" params={{ slug: o.slug }}>
                      {o.name}｜{o.address}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
          <p className="store-tags">{store.tags.map((t) => `#${t}`).join(" ")}</p>
        </div>
      </main>

      <footer className="site-footer">
        <div className="container-brand">
          <div className="footer-bottom">
            <span>
              © {company.brand}・{company.operator}
            </span>
            <Link to="/">回到首頁 ↑</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
