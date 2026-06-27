import StudioPage from '@/components/StudioPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Kuaför Erbil Kızıltan | Erkek Saç Tasarım & Anatomik Kesim",
  description: "Ümraniye'de modern, şık ve profesyonel erkek kuaförü. Anatomiye uygun saç kesimi, sakal tasarımı ve TV/sahne deneyimli sanatçı tıraşı. Hemen randevu alın.",
  keywords: "erkek kuaförü, ümraniye berber, saç kesimi erkek, sakal tasarımı, anatomik kesim, sanatçı tıraşı, erbil kızıltan",
};

export default function ErkekPage() {
  return <StudioPage gender="erkek" />;
}
