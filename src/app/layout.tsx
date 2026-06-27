import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Kuaför Erbil Kızıltan | Profesyonel Saç ve Sakal Tasarımı",
  description: "Ümraniye'de modern, şık ve profesyonel erkek kuaförü. Anatomiye uygun saç kesimi, sakal tasarımı ve daha fazlası. Hemen randevu alın.",
  keywords: "kuaför erbil kızıltan, ümraniye berber, erkek kuaförü, saç kesimi, sakal tasarımı, kuaförüm sensin erbil kızıltan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={outfit.variable} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
