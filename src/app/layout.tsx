import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

const BASE_URL = "https://www.erbilkiziltan.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Kuaför Erbil Kızıltan | Profesyonel Saç & Styling Sanatçısı — Ümraniye",
    template: "%s | Erbil Kızıltan",
  },
  description:
    "Ümraniye'de TV ve sahne deneyimli profesyonel kuaför Erbil Kızıltan. Kadın ve erkek saç kesimi, sakal tasarımı, balayaj, keratin bakımı ve gelin saçı. 20+ yıl deneyim. Hemen randevu alın.",
  keywords: [
    "kuaför erbil kızıltan",
    "ümraniye kuaför",
    "ümraniye berber",
    "erkek kuaförü",
    "kadın kuaförü",
    "saç kesimi ümraniye",
    "sakal tasarımı",
    "anatomik kesim",
    "sanatçı tıraşı",
    "balayaj ümraniye",
    "keratin saç bakımı",
    "gelin saçı",
    "kuaförüm sensin",
    "erbil kızıltan",
  ],
  authors: [{ name: "Erbil Kızıltan", url: BASE_URL }],
  creator: "Erbil Kızıltan",
  publisher: "Erbil Kızıltan",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: BASE_URL,
    siteName: "Kuaför Erbil Kızıltan",
    title: "Kuaför Erbil Kızıltan | Profesyonel Saç & Styling Sanatçısı",
    description:
      "TV ve sahne deneyimli Erbil Kızıltan'ın Ümraniye stüdyosunda premium saç ve styling hizmetleri. 20+ yıl deneyim, 5.0 Google puanı.",
    images: [
      {
        url: "/hero-erbil.jpg",
        width: 1200,
        height: 630,
        alt: "Kuaför Erbil Kızıltan — Profesyonel Saç ve Styling Sanatçısı",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kuaför Erbil Kızıltan | Profesyonel Saç & Styling",
    description:
      "TV ve sahne deneyimli Erbil Kızıltan'dan premium saç ve styling hizmetleri. Ümraniye, İstanbul.",
    images: ["/hero-erbil.jpg"],
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

/* ─── JSON-LD Structured Data (LocalBusiness + Person) ─────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HairSalon",
      "@id": `${BASE_URL}/#salon`,
      name: "Kuaför Erbil Kızıltan",
      url: BASE_URL,
      telephone: "+905467922404",
      image: `${BASE_URL}/hero-erbil.jpg`,
      description:
        "Ümraniye'de TV ve sahne deneyimli profesyonel kuaför. Kadın ve erkek saç tasarımı, sakal, balayaj, keratin ve gelin saçı hizmetleri.",
      priceRange: "₺₺",
      currenciesAccepted: "TRY",
      paymentAccepted: "Cash, Credit Card",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Esenevler Mahallesi Yunus Emre Caddesi, Bala Sk. 8A",
        addressLocality: "Ümraniye",
        addressRegion: "İstanbul",
        postalCode: "34762",
        addressCountry: "TR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 41.0121,
        longitude: 29.0889,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday", "Tuesday", "Wednesday", "Thursday",
            "Friday", "Saturday", "Sunday",
          ],
          opens: "09:00",
          closes: "21:00",
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        ratingCount: "15",
        bestRating: "5",
        worstRating: "1",
      },
      sameAs: [
        "https://www.instagram.com/erbil.kzltan/",
        "https://g.co/kgs/erbilkiziltan",
      ],
    },
    {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Erbil Kızıltan",
      jobTitle: "Saç ve Styling Sanatçısı",
      worksFor: { "@id": `${BASE_URL}/#salon` },
      url: BASE_URL,
      sameAs: ["https://www.instagram.com/erbil.kzltan/"],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={outfit.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
