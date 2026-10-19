// Every deployment (Amplify and GitHub Pages) points search engines at the one public origin.
export const SITE_ORIGIN = "https://www.ip-6.net";
export const og = (url: string) => ({ url, siteName: "IP-6 Research", type: "website" as const, locale: "en_US" });

export const organization = {
  "@type": "Organization",
  "@id": `${SITE_ORIGIN}/#organization`,
  name: "IP-6 Research, Inc.",
  alternateName: "IP-6 Research",
  url: `${SITE_ORIGIN}/`,
  logo: `${SITE_ORIGIN}/apple-touch-icon.png`,
  email: "info@ip-6.net",
  telephone: "+1-410-878-2221",
  address: { "@type": "PostalAddress", addressLocality: "Lutherville", addressRegion: "MD", postalCode: "21093", addressCountry: "US" },
  founder: { "@id": `${SITE_ORIGIN}/scientist/#person` },
  sameAs: ["https://twitter.com/IP6Research", "https://www.facebook.com/pages/IP-6-Research-Inc/241284989246005"],
};

export const jsonLd = (data: object) => ({ __html: JSON.stringify({ "@context": "https://schema.org", ...data }).replace(/</g, "\u003c") });
