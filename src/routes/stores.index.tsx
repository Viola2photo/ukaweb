import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { brandImages, company, featuredStores, siteUrl } from "@/lib/brand-data";
import { hubStructuredData, hubUrl } from "@/lib/structured-data";

const title = `${company.brand}新加盟點位｜全台夜市據點故事與每週行程`;
const description = `看看鱈魚大叔最近新加入的 ${featuredStores.length} 個加盟點位：${featuredStores
  .map((s) => s.name)
  .join("、")}，每個點位都有地址或每週行程、介紹影片與常見問題。`;

export const Route = createFileRoute("/stores/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: hubUrl },
      { property: "og:image", content: `${siteUrl}${featuredStores[0]?.image.slice(1) ?? ""}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: hubUrl }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(hubStructuredData()) }],
  }),
  component: StoresHub,
});

function StoresHub() {
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
            首頁據點
          </Link>
        </div>
      </header>

      <main className="container-brand store-hub">
        <nav className="store-crumbs" aria-label="麵包屑">
          <Link to="/">{company.brand}</Link>
          <span aria-hidden="true">›</span>
          <span aria-current="page">新加盟點位</span>
        </nav>
        <h1 className="section-heading">鱈魚大叔新加盟點位</h1>
        <p className="store-text">
          鱈魚大叔的加盟夥伴一個個加入，這裡整理每個新點位的故事。點進去可以看到位置或每週行程、介紹影片，以及這個點位的常見問題。
        </p>
        <ul className="store-hub-grid">
          {featuredStores.map((store) => (
            <li key={store.slug}>
              <Link
                to="/stores/$slug"
                params={{ slug: store.slug }}
                className="card store-feature"
              >
                <img src={store.image} alt="" loading="lazy" />
                <span className="store-feature-body">
                  <strong>{store.name}</strong>
                  <small>{store.address}</small>
                  {store.days && <small>營業日：{store.days}</small>}
                  <span className="store-feature-text">{store.intro[0]}</span>
                  <span className="store-card-more">看新據點介紹 →</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
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
