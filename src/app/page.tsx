import Link from 'next/link';
import styles from './portal.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Kuaför Erbil Kızıltan | Hair & Styling Artist",
  description: "Ümraniye'nin en iyi kuaför salonu. Kadın ve erkek için anatomik saç kesimi, boya, lazer ve profesyonel styling hizmetleri.",
};

export default function PortalPage() {
  return (
    <div className={styles.container}>
      <div className={styles.noise} />
      
      {/* Center Logo */}
      <div className={styles.centerLogo}>
        <span className={styles.logoText}>ERBİL KIZILTAN</span>
        <span className={styles.logoSubtitle}>Hair & Styling</span>
      </div>

      {/* Kadın Half */}
      <Link href="/kadin" className={`${styles.half} ${styles.kadinHalf}`}>
        <div className={styles.glow} />
        <div className={styles.content}>
          <h2 className={styles.title}>KADIN</h2>
          <p className={styles.subtitle}>Premium Saç Tasarım & Styling</p>
          <span className={styles.button}>Kadın Hizmetleri</span>
        </div>
      </Link>

      {/* Erkek Half */}
      <Link href="/erkek" className={`${styles.half} ${styles.erkekHalf}`}>
        <div className={styles.glow} />
        <div className={styles.content}>
          <h2 className={styles.title}>ERKEK</h2>
          <p className={styles.subtitle}>Anatomik Kesim & Artistik Tasarım</p>
          <span className={styles.button}>Erkek Hizmetleri</span>
        </div>
      </Link>
    </div>
  );
}
