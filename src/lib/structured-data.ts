import { company, contact, faq, siteUrl } from "@/lib/brand-data";

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
      sameAs: contact.social.map((s) => s.href),
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
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};
