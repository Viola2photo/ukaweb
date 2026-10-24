import {
  company,
  contact,
  faq,
  featuredStores,
  siteUrl,
  storeFaq,
  type FeaturedStore,
} from "@/lib/brand-data";

export const storeUrl = (store: FeaturedStore) => `${siteUrl}stores/${store.slug}`;

// JSON-LD for search engines and AI answer engines. Built from the shared content module.
export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}#organization`,
      name: company.brand,
      legalName: company.operator,
      taxID: company.taxId,
      url: siteUrl,
      logo: `${siteUrl}img/uncle-sticker.png`,
      telephone: contact.phone,
      slogan: "鱈魚大叔用心用感情 創造好料理",
      sameAs: [...contact.social.map((s) => s.href), contact.lineUrl],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}#website`,
      url: siteUrl,
      name: `${company.brand}官方網站`,
      inLanguage: "zh-TW",
      publisher: { "@id": `${siteUrl}#organization` },
    },
    {
      "@type": "ItemList",
      name: "鱈魚大叔新加盟點位",
      itemListElement: featuredStores.map((store, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: store.name,
        url: storeUrl(store),
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

// JSON-LD for one store page: the stall itself, its breadcrumb and its FAQ.
export function storeStructuredData(store: FeaturedStore) {
  const url = storeUrl(store);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FoodEstablishment",
        "@id": `${url}#store`,
        name: `${company.brand}${store.name}`,
        url,
        image: `${siteUrl}${store.image.slice(1)}`,
        description: store.intro.join(""),
        servesCuisine: ["台灣小吃", "魚漿炸物", "海鮮"],
        hasMenu: `${siteUrl}#products`,
        hasMap: store.mapUrl,
        parentOrganization: { "@id": `${siteUrl}#organization` },
        address: {
          "@type": "PostalAddress",
          addressCountry: "TW",
          addressRegion: store.city,
          addressLocality: store.district,
          streetAddress: store.address.replace(`${store.city}${store.district}`, ""),
        },
        sameAs: store.facebookVideoUrl ? [store.facebookVideoUrl] : undefined,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: company.brand, item: siteUrl },
          { "@type": "ListItem", position: 2, name: store.name, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: storeFaq(store).map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
}
