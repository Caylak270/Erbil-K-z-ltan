import StudioPage from '@/components/StudioPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Kuaför Erbil Kızıltan | Kadın Saç Tasarım & Güzellik Hizmetleri",
  description: "Ümraniye'de modern, şık ve profesyonel kadın kuaförü ve güzellik hizmetleri. Balayaj, ombré, keratin bakımı, lazer epilasyon ve gelin saçı tasarımı. Hemen bilgi veya randevu alın.",
  keywords: "kadın kuaförü, ümraniye kadın berberi, saç kesimi kadın, balayaj ümraniye, keratin saç bakımı, lazer epilasyon ümraniye, gelin saçı erbil kızıltan",
};

export default function KadinPage() {
  return <StudioPage gender="kadin" />;
}
