import StudioPage from '@/components/StudioPage';
import type { Metadata } from 'next';

const PAGE_URL = "https://www.erbilkiziltan.com/kadin";

export const metadata: Metadata = {
  title: "Kadın Saç Tasarımı & Güzellik Hizmetleri | Erbil Kızıltan — Ümraniye",
  description:
    "Ümraniye'de uzman kadın kuaförü Erbil Kızıltan. Balayaj, ombré, keratin saç botoksu, lazer epilasyon, gelin ve davet saçı tasarımı. Profesyonel, kişiye özel styling.",
  keywords: [
    "kadın kuaförü ümraniye",
    "kadın saç kesimi",
    "balayaj ümraniye",
    "ombré saç boyama",
    "keratin saç bakımı",
    "saç botoksu",
    "lazer epilasyon ümraniye",
    "gelin saçı erbil kızıltan",
    "davet saçı ümraniye",
    "kadın styling",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: PAGE_URL,
    siteName: "Kuaför Erbil Kızıltan",
    title: "Kadın Saç Tasarımı & Güzellik | Erbil Kızıltan",
    description:
      "Ümraniye'de Erbil Kızıltan'ın kadın şubesinde balayaj, keratin, lazer epilasyon, gelin saçı ve daha fazlası. TV deneyimli sanatçı, kişiye özel styling.",
    images: [
      {
        url: "/unluler/unluler-image-1.jpg",
        width: 1200,
        height: 630,
        alt: "Erbil Kızıltan Kadın Saç Tasarımı — Ümraniye",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kadın Saç & Güzellik | Erbil Kızıltan Ümraniye",
    description:
      "Balayaj, keratin, lazer epilasyon ve gelin saçı hizmetleri. Erbil Kızıltan — Ümraniye.",
    images: ["/unluler/unluler-image-1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function KadinPage() {
  return <StudioPage gender="kadin" />;
}
