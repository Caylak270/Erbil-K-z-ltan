import Link from 'next/link';
import Image from 'next/image';
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
        <span className={styles.logoSubtitle}>Hair &amp; Styling</span>
      </div>

      {/* ─── KADIN TARAFI ─── */}
      <Link href="/kadin" className={`${styles.half} ${styles.kadinHalf}`}>
        <div className={styles.glow} />

        {/* Yüzen Fotoğraf Kolajı */}
        <div className={styles.photoLayer} aria-hidden="true">
          {/* Büyük merkez foto */}
          <div className={`${styles.photo} ${styles.photoMain}`}>
            <Image
              src="/media/kadin/kadin-backstage-sag.jpg"
              alt=""
              fill
              sizes="280px"
              style={{ objectFit: 'cover' }}
            />
            <div className={styles.photoSheen} />
          </div>
          {/* Sağ üst küçük foto */}
          <div className={`${styles.photo} ${styles.photoTopRight}`}>
            <Image
              src="/media/kadin/kadin-img-2026-06-29-at-19.41.36.jpeg"
              alt=""
              fill
              sizes="180px"
              style={{ objectFit: 'cover' }}
            />
            <div className={styles.photoSheen} />
          </div>
          {/* Sol alt küçük foto */}
          <div className={`${styles.photo} ${styles.photoBottomLeft}`}>
            <Image
              src="/media/kadin/kadin-about.jpeg"
              alt=""
              fill
              sizes="160px"
              style={{ objectFit: 'cover' }}
            />
            <div className={styles.photoSheen} />
          </div>
          {/* Genel karartma maskesi */}
          <div className={styles.photoLayerMask} />
        </div>

        {/* İçerik */}
        <div className={styles.content}>
          <h2 className={styles.title}>KADIN</h2>
          <p className={styles.subtitle}>Premium Saç Tasarım &amp; Styling</p>
          <span className={styles.button}>
            Kadın Hizmetleri
            <svg className={styles.buttonArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </span>
        </div>
        <span className={styles.hintLabel}>Keşfetmek için tıkla</span>
      </Link>

      {/* ─── ERKEK TARAFI ─── */}
      <Link href="/erkek" className={`${styles.half} ${styles.erkekHalf}`}>
        <div className={styles.glow} />

        {/* Yüzen Fotoğraf Kolajı */}
        <div className={styles.photoLayer} aria-hidden="true">
          {/* Büyük merkez foto */}
          <div className={`${styles.photo} ${styles.photoMain}`}>
            <Image
              src="/media/erkek/erkek-fb-626274197.jpg"
              alt=""
              fill
              sizes="280px"
              style={{ objectFit: 'cover' }}
            />
            <div className={styles.photoSheen} />
          </div>
          {/* Sol üst küçük foto */}
          <div className={`${styles.photo} ${styles.photoTopRight}`}>
            <Image
              src="/media/erkek/erkek-fb-624710684.jpg"
              alt=""
              fill
              sizes="180px"
              style={{ objectFit: 'cover' }}
            />
            <div className={styles.photoSheen} />
          </div>
          {/* Sağ alt küçük foto */}
          <div className={`${styles.photo} ${styles.photoBottomLeft}`}>
            <Image
              src="/media/erkek/erkek-img-2026-06-29-at-19.46.39.jpeg"
              alt=""
              fill
              sizes="160px"
              style={{ objectFit: 'cover' }}
            />
            <div className={styles.photoSheen} />
          </div>
          {/* Genel karartma maskesi */}
          <div className={styles.photoLayerMask} />
        </div>

        {/* İçerik */}
        <div className={styles.content}>
          <h2 className={styles.title}>ERKEK</h2>
          <p className={styles.subtitle}>Anatomik Kesim &amp; Artistik Tasarım</p>
          <span className={styles.button}>
            Erkek Hizmetleri
            <svg className={styles.buttonArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </span>
        </div>
        <span className={styles.hintLabel}>Keşfetmek için tıkla</span>
      </Link>
    </div>
  );
}
