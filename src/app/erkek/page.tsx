import StudioPage from '@/components/StudioPage';
import type { Metadata } from 'next';

const PAGE_URL = "https://www.erbilkiziltan.com/erkek";

export const metadata: Metadata = {
  title: "Erkek Saç Tasarımı & Anatomik Kesim | Erbil Kızıltan — Ümraniye",
  description:
    "Ümraniye'de TV ve sahne deneyimli erkek kuaförü Erbil Kızıltan. Sanatçı tıraşı, anatomik saç kesimi, sakal ve bıyık tasarımı, özel styling. Kişiye özel modern imaj.",
  keywords: [
    "erkek kuaförü ümraniye",
    "erkek saç kesimi",
    "anatomik kesim",
    "sakal tasarımı",
    "sanatçı tıraşı",
    "erkek styling",
    "berber ümraniye",
    "kuaförüm sensin erbil",
    "modern erkek tıraşı",
    "erbil kızıltan erkek",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: PAGE_URL,
    siteName: "Kuaför Erbil Kızıltan",
    title: "Erkek Saç Tasarımı & Anatomik Kesim | Erbil Kızıltan",
    description:
      "Ümraniye'de Erbil Kızıltan'ın erkek şubesinde anatomik kesim, sakal tasarımı ve TV deneyimli sanatçı tıraşı. Modern, kişiye özel erkek styling.",
    images: [
      {
        url: "/unluler/unluler-image-3.jpeg",
        width: 1200,
        height: 630,
        alt: "Erbil Kızıltan Erkek Saç Tasarımı — Ümraniye",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Erkek Saç & Sakal | Erbil Kızıltan Ümraniye",
    description:
      "Anatomik kesim, sakal tasarımı ve sanatçı tıraşı. Erbil Kızıltan — Ümraniye.",
    images: ["/unluler/unluler-image-3.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ErkekPage() {
  return <StudioPage gender="erkek" />;
}
