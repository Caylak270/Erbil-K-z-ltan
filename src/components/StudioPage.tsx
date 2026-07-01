'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/app/page.module.css';
import KadinBackgroundPaths from '@/components/KadinBackgroundPaths';

/* ─── Intersection Observer Hook ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

interface StudioPageProps {
  gender: 'kadin' | 'erkek';
}

export default function StudioPage({ gender }: StudioPageProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const bookingRef = useInView(0.05);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };


  /* Scroll listener */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Close mobile menu on resize */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMobileMenuOpen(false);
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* Section refs for animations */
  const statsRef = useInView();
  const aboutRef = useInView(0.1);
  const celebRef = useInView(0.1);
  const servicesRef = useInView(0.1);
  const galleryRef = useInView(0.1);
  const reviewsRef = useInView(0.1);
  const contactRef = useInView(0.1);

  /* Shared reviews list */
  const reviews = [
    { name: 'Mustafa Çaylak', initials: 'M', text: 'Uzun zamandır böyle özenli ve profesyonel bir berber bulamamıştım. Hem saç hem sakal tam istediğim gibi oldu. Hijyen, ilgi ve sohbet gerçekten çok iyiydi. Gönül rahatlığıyla herkese tavsiye ederim.', time: '6 ay önce' },
    { name: 'Erdem Çakmak', initials: 'E', role: 'Yerel Rehber', text: 'Saç kesimi çok özenliydi, özellikle sanatçı tıraşı ve anatomik kesim konusunda gerçekten başarılı. Yüz hatlarına uygun, modern ve temiz bir kesim oldu. Çok memnun kaldım.', time: '1 ay önce' },
    { name: 'Alim Bozkayalar', initials: 'A', role: 'Yerel Rehber · 187 yorum', text: 'Mahallemize yeni açılan bu mekana uğradım. İşletmecisi Erbil Bey, daha önce "Kuaförüm Sensin" programına da katılmış, işinin ehli birisi. Saç konusundaki uzmanlığı gerçekten dikkat çekici.', time: '4 ay önce' },
    { name: 'Onur Kutay', initials: 'O', text: 'Güler yüzlü karşılaması ile doğru kuaföre geldiğinizi hemen fark edeceksiniz. Hizmet kalitesi mükemmel. 😎', time: '4 ay önce' },
  ];

  const nextReview = useCallback(() => setReviewIndex(i => (i + 1) % reviews.length), [reviews.length]);
  const prevReview = useCallback(() => setReviewIndex(i => (i - 1 + reviews.length) % reviews.length), [reviews.length]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const t = setInterval(nextReview, 4500);
    return () => clearInterval(t);
  }, [isAutoPlaying, nextReview]);

  // Gender specific contents
  const isKadin = gender === 'kadin';

  const heroTitle = {
    line1: 'Erbil',
    line2: 'Kızıltan',
    subtitle: isKadin ? "Women's Hair & Styling Artist" : "Hair & Styling Artist",
    desc: isKadin 
      ? 'Kadın saç tasarımında TV ve sahne vizyonu — her anınızda göz alıcı zarafet.'
      : 'Ünlülerden sahneye, ekrandan sokağa — her ortamda premium imaj.'
  };

  const services = isKadin 
    ? [
        { icon: '✂️', title: 'Saç Kesim & Styling', desc: 'Bireysel saç yapınıza ve yüz anatomisine uygun, modern, hareketli ve hacimli kesim tasarımları.', tag: 'Popüler', whatsappOnly: false },
        { icon: '🎨', title: 'Boya & Renklendirme', desc: 'Balayaj, ombré, röfle, açma-boyama ve saç tonunuza en uygun ışıltı ve pigment uygulamaları.', tag: null, whatsappOnly: true },
        { icon: '⚡', title: 'Lazer Epilasyon', desc: 'Son teknoloji cihazlar ve uzman kontrolünde konforlu, etkili ve pürüzsüz cilt bakım uygulamaları.', tag: null, whatsappOnly: true },
        { icon: '💆', title: 'Keratin & Saç Botoksu', desc: 'Yıpranmış ve nemsiz kalmış saçları derinlemesine onaran, parlaklık ve ipeksi yumuşaklık kazandıran bakımlar.', tag: null, whatsappOnly: false },
        { icon: '👑', title: 'Gelin & Davet Saçı', desc: 'En özel günleriniz veya davetleriniz için tarzınızı yansıtan modern topuzlar, özel örgüler ve saç tasarımları.', tag: 'Yeni', whatsappOnly: true },
      ]
    : [
        { icon: '✂️', title: 'Sanatçı Tıraşı', desc: 'TV ve sahne deneyimiyle kazanılan tekniklerle sadece size özel, karakterinizi ortaya çıkaran modern saç kesimi.', tag: 'Popüler', whatsappOnly: false },
        { icon: '📐', title: 'Anatomik Kesim', desc: 'Kafa tası yapınıza ve yüz hatlarınıza uygun, dökülme yönlerine göre tasarlanmış bireysel kesim anlayışı.', tag: null, whatsappOnly: false },
        { icon: '🧔', title: 'Sakal & Bıyık', desc: 'Modern tekniklerle yüzünüze en uygun sakal ve bıyık şekillendirmesi. Tıraş sonrası bakım dahil.', tag: null, whatsappOnly: false },
        { icon: '💆', title: 'Özel Styling', desc: 'Daveti, etkinliği veya çekimi için saç şekillendirme ve profesyonel ürünlerle cilt bakım hizmetleri.', tag: 'Yeni', whatsappOnly: false },
      ];

  const galleryPhotos = isKadin
    ? [
        { src: '/unluler/unluler-image-1.jpg', label: 'Backstage Kadın Styling', type: 'image' },
        { src: '/unluler/unluler-image-2.jpg', label: 'Çekim Saç Tasarımı', type: 'image' },
        { src: '/unluler/unluler-image-5.jpeg', label: 'Özel Davet Saç Tasarımı', type: 'image' },
        { src: '/unluler/unluler-image-6.jpeg', label: 'Gelin & Davet Tasarımı', type: 'image' },
        { src: '/unluler/unluler-image-7.jpeg', label: 'Renklendirme & Styling', type: 'image' },
        { src: '/unluler/unluler-image-9.jpeg', label: 'Modern Topuz Tasarımı', type: 'image' },
        { src: '/unluler/unluler-image-10.jpeg', label: 'Profesyonel Kadın Styling', type: 'image' },
        { src: '/instagram/instagram-image-2.jpg', label: 'Özel Çekim Saç Tasarımı', type: 'image' },
        { src: '/instagram/instagram-image-4.jpg', label: 'Kuaförüm Sensin Kadın Tasarımı', type: 'image' },
        { src: '/unluler/unluler-video-1.mp4', label: 'Kadın Backstage Hazırlık', type: 'video' },
        { src: '/unluler/unluler-video-2.mp4', label: 'Kadın Styling Çalışması', type: 'video' },
      ]
    : [
        { src: '/unluler/unluler-image-3.jpeg', label: 'Artistik Erkek Saç Kesimi', type: 'image' },
        { src: '/unluler/unluler-image-4.jpeg', label: 'Modern Erkek Kesim & Tasarım', type: 'image' },
        { src: '/unluler/unluler-image-8.jpeg', label: 'Sakal Tasarımı & Bakım', type: 'image' },
        { src: '/instagram/instagram-image-1.jpg', label: 'Anatomik Erkek Tıraşı', type: 'image' },
        { src: '/instagram/instagram-image-3.jpg', label: 'Stüdyo Erkek Saç Tasarımı', type: 'image' },
      ];

  const bookingPerks = [
    { icon: '⚡', title: 'Anında Onay', desc: 'Randevunuz otomatik olarak onaylanır.' },
    { icon: '🕒', title: 'Zamanlama Kuralları', desc: 'En az 2 saat önceden randevu alınmalıdır.' },
    { icon: '⏳', title: '15 Dk Gecikme Kuralı', desc: 'Bilgi verilmediği takdirde 15 dk geciken randevular iptal edilir.' },
    { icon: '💎', title: 'Premium Deneyim', desc: 'Kişiye özel saç & styling hizmeti.' },
  ];

  const targetLink = isKadin ? '/erkek' : '/kadin';
  const targetLabel = isKadin ? 'Erkek Hizmetleri →' : 'Kadın Hizmetleri →';
  const themeClass = isKadin ? 'themeKadin' : 'themeErkek';

  const handleWhatsApp = (serviceTitle: string) => {
    const message = encodeURIComponent(`Merhaba, ${gender === 'kadin' ? 'Kadın' : 'Erkek'} şubeniz için "${serviceTitle}" hizmetiniz hakkında bilgi almak ve randevu oluşturmak istiyorum.`);
    window.open(`https://wa.me/905467922404?text=${message}`, '_blank');
  };

  return (
    <div className={`${styles.container} ${themeClass}`}>

      {/* ─────────────── NAVBAR ─────────────── */}
      <nav className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ''}`}>
        <Link href="/" className={styles.logo} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' }}>
          <img src="/logo.jpg" alt="EX Logo" style={{ width: '56px', height: '56px', objectFit: 'contain', borderRadius: '8px' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className={styles.logoText}>ERBİL KIZILTAN</span>
            <span className={styles.logoSubtitle}>{heroTitle.subtitle}</span>
          </div>
        </Link>
        <div className={styles.navLinks}>
          {['Hakkımızda', 'Hizmetler', 'Galeri', 'Yorumlar', 'İletişim'].map((item) => (
            <a key={item} href={`#${item === 'Hakkımızda' ? 'hakkimizda' : item === 'Hizmetler' ? 'hizmetler' : item === 'Galeri' ? 'galeri' : item === 'Yorumlar' ? 'yorumlar' : 'iletisim'}`} className={styles.navLink}>
              <span>{item}</span>
            </a>
          ))}
          <a href={targetLink} className={`${styles.navLink} ${styles.navLinkHighlight}`} style={{ color: 'var(--color-accent)', fontWeight: '600' }}>
            <span>{targetLabel}</span>
          </a>
        </div>
        <a href="#randevu" className={styles.navButton}>
          <span>Randevu Al</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
        <button
          className={styles.mobileMenuBtn}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menü"
        >
          <span className={mobileMenuOpen ? styles.burgerOpen : ''}></span>
          <span className={mobileMenuOpen ? styles.burgerOpen : ''}></span>
          <span className={mobileMenuOpen ? styles.burgerOpen : ''}></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuActive : ''}`}>
        <div className={styles.mobileMenuInner}>
          {[
            { label: 'Hakkımızda', href: '#hakkimizda' },
            { label: 'Hizmetler', href: '#hizmetler' },
            { label: 'Galeri', href: '#galeri' },
            { label: 'Yorumlar', href: '#yorumlar' },
            { label: 'İletişim', href: '#iletisim' },
          ].map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={styles.mobileMenuItem}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              {item.label}
            </a>
          ))}
          <a href={targetLink} onClick={() => setMobileMenuOpen(false)} className={styles.mobileMenuItem} style={{ color: 'var(--color-accent)', fontWeight: '600' }}>
            {targetLabel}
          </a>
          <a href="#randevu" onClick={() => setMobileMenuOpen(false)} className={`${styles.mobileMenuItem} ${styles.mobileMenuCta}`}>
            Randevu Al →
          </a>
        </div>
      </div>

      {/* ─────────────── HERO ─────────────── */}
      <header className={styles.hero}>
        <div className={styles.heroCanvas}>
          {!isKadin && (
            <video suppressHydrationWarning
              src="/media/erkek/erkek-vid-2026-06-29-at-19.37.17.mp4"
              autoPlay
              muted
              loop
              playsInline
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.25,
                zIndex: 0,
                pointerEvents: 'none',
                filter: 'grayscale(30%) contrast(1.1) brightness(0.8)'
              }}
            />
          )}

          {/* Kadın Tarafı Özel Arka Plan */}
          {isKadin && (
            <>
              {/* ── SOL SÜTUN ─────────────────────────────── */}
              {/* Sol üst fotoğraf */}
              <div style={{
                position: 'absolute', left: '1%', top: '5%',
                width: '220px', height: '310px', borderRadius: '20px', overflow: 'hidden',
                boxShadow: '0 30px 80px rgba(0,0,0,0.75)',
                border: '1px solid rgba(240,168,176,0.18)',
                animation: 'kadinPhotoFloat2 12s ease-in-out infinite alternate',
                zIndex: 0, pointerEvents: 'none',
                display: 'var(--kadin-side-photos, block)',
              }}>
                <Image src="/media/kadin/kadin-img-2026-06-29-at-19.41.36.jpeg" alt="" fill style={{ objectFit: 'cover', filter: 'brightness(0.9) saturate(1.1)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(22,10,15,0.0), rgba(22,10,15,0.35))' }} />
              </div>
              {/* Sol alt fotoğraf */}
              <div style={{
                position: 'absolute', left: '3%', bottom: '6%',
                width: '190px', height: '260px', borderRadius: '18px', overflow: 'hidden',
                boxShadow: '0 25px 70px rgba(0,0,0,0.7)',
                border: '1px solid rgba(240,168,176,0.12)',
                animation: 'kadinPhotoFloat3 15s ease-in-out infinite alternate-reverse',
                zIndex: 0, pointerEvents: 'none',
                display: 'var(--kadin-side-photos, block)',
              }}>
                <Image src="/media/kadin/kadin-about.jpeg" alt="" fill style={{ objectFit: 'cover', filter: 'brightness(0.88) saturate(1.15)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(22,10,15,0.0), rgba(22,10,15,0.3))' }} />
              </div>
              {/* Sol kenardan içe doğru gradient fade - Çok hafifletildi ki fotoğraflar saklanmasın */}
              <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0, width: '30%',
                background: 'linear-gradient(to right, rgba(22,10,15,0.2) 0%, transparent 100%)',
                zIndex: 1, pointerEvents: 'none',
              }} />

              {/* ── SAĞ SÜTUN ─────────────────────────────── */}
              {/* Sağ ana (büyük) fotoğraf */}
              <div style={{
                position: 'absolute', right: '1%', top: '8%',
                width: '260px', height: '390px', borderRadius: '22px', overflow: 'hidden',
                boxShadow: '0 35px 90px rgba(0,0,0,0.8)',
                border: '1px solid rgba(240,168,176,0.2)',
                animation: 'kadinPhotoFloat1 10s ease-in-out infinite alternate',
                zIndex: 0, pointerEvents: 'none',
                display: 'var(--kadin-side-photos, block)',
              }}>
                <Image src="/media/kadin/kadin-backstage-sag.jpg" alt="" fill style={{ objectFit: 'cover', filter: 'brightness(0.92) saturate(1.1)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to left, rgba(22,10,15,0.0), rgba(22,10,15,0.35))' }} />
              </div>
              {/* Sağ alt fotoğraf */}
              <div style={{
                position: 'absolute', right: '3%', bottom: '7%',
                width: '195px', height: '265px', borderRadius: '18px', overflow: 'hidden',
                boxShadow: '0 22px 65px rgba(0,0,0,0.7)',
                border: '1px solid rgba(240,168,176,0.1)',
                animation: 'kadinPhotoFloat3 17s ease-in-out infinite alternate',
                zIndex: 0, pointerEvents: 'none',
                display: 'var(--kadin-side-photos, block)',
              }}>
                <Image src="/media/kadin/kadin-img-2026-06-29-at-19.43.42.jpeg" alt="" fill style={{ objectFit: 'cover', filter: 'brightness(0.9) saturate(1.1)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to left, rgba(22,10,15,0.0), rgba(22,10,15,0.3))' }} />
              </div>
              {/* Sağ kenardan içe doğru gradient fade - Çok hafifletildi */}
              <div style={{
                position: 'absolute', right: 0, top: 0, bottom: 0, width: '30%',
                background: 'linear-gradient(to left, rgba(22,10,15,0.2) 0%, transparent 100%)',
                zIndex: 1, pointerEvents: 'none',
              }} />

              {/* ── BUBBLEGUM MESH GLOW (Yazının arkası için çoklu canlı renkler) ──────────── */}
              {/* Parlak Cyan Orb */}
              <div style={{
                position: 'absolute', left: '20%', top: '30%',
                width: '45vw', height: '45vw', maxWidth: '600px', maxHeight: '600px',
                borderRadius: '50%',
                background: 'radial-gradient(circle at center, rgba(72,217,255,0.22) 0%, transparent 70%)',
                filter: 'blur(70px)',
                animation: 'glowPulse1 12s ease-in-out infinite',
                zIndex: 0, pointerEvents: 'none',
              }} />
              {/* Canlı Pembe (Magenta) Orb */}
              <div style={{
                position: 'absolute', right: '15%', top: '15%',
                width: '50vw', height: '50vw', maxWidth: '700px', maxHeight: '700px',
                borderRadius: '50%',
                background: 'radial-gradient(circle at center, rgba(255,105,180,0.2) 0%, transparent 70%)',
                filter: 'blur(80px)',
                animation: 'glowPulse2 15s ease-in-out infinite',
                zIndex: 0, pointerEvents: 'none',
              }} />
              {/* Derin Mor/Mavi Orb */}
              <div style={{
                position: 'absolute', left: '40%', bottom: '0%',
                width: '40vw', height: '40vw', maxWidth: '550px', maxHeight: '550px',
                borderRadius: '50%',
                background: 'radial-gradient(circle at center, rgba(138,43,226,0.2) 0%, transparent 70%)',
                filter: 'blur(60px)',
                animation: 'glowPulse3 10s ease-in-out infinite',
                zIndex: 0, pointerEvents: 'none',
              }} />
              {/* Şeftali / Sıcak Sararmış Orb */}
              <div style={{
                position: 'absolute', left: '10%', bottom: '20%',
                width: '35vw', height: '35vw', maxWidth: '500px', maxHeight: '500px',
                borderRadius: '50%',
                background: 'radial-gradient(circle at center, rgba(255,180,120,0.18) 0%, transparent 70%)',
                filter: 'blur(50px)',
                animation: 'glowPulse1 14s ease-in-out infinite reverse',
                zIndex: 0, pointerEvents: 'none',
              }} />

              {/* ── Üst ve Alt ton bandı ──────────────────── */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to bottom, rgba(22,10,15,0.6) 0%, transparent 30%, transparent 70%, rgba(22,10,15,0.7) 100%)',
                zIndex: 1, pointerEvents: 'none',
              }} />
            </>
          )}

          {/* Erkek için noktalı grid kalsın, kadın için gösterme */}
          {!isKadin && <div className={styles.heroGlow1} style={{ zIndex: 1 }} />}
          {!isKadin && <div className={styles.heroGlow2} style={{ zIndex: 1 }} />}
          {!isKadin && <div className={styles.heroGlow3} style={{ zIndex: 1 }} />}
          {isKadin && <div className={styles.heroGlow1} style={{ zIndex: 1 }} />}
          <div className={styles.heroGrid} style={{ zIndex: 2, opacity: isKadin ? 0 : 1 }} />
          <div className={styles.heroNoise} style={{ zIndex: 3 }} />
          <div className={styles.heroLine1} style={{ zIndex: 4 }} />
          <div className={styles.heroLine2} style={{ zIndex: 4 }} />
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeDot} />
            TV & Ünlü Sanatçıların Tercihi
          </div>

          <h1 className={styles.heroTitle}>
            <span className={styles.heroTitleLine1}>{heroTitle.line1}</span>
            <span className={styles.heroTitleLine2}>{heroTitle.line2}</span>
          </h1>

          <p className={styles.heroSubtitle}>{heroTitle.subtitle}</p>

          <p className={styles.heroDescription} dangerouslySetInnerHTML={{ __html: heroTitle.desc }} />

          <div className={styles.heroButtons}>
            <a href="#randevu" className={styles.primaryButton}>
              <span>Hemen Randevu Al</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="#hakkimizda" className={styles.secondaryButton}>Hikayemi Öğren</a>
          </div>

          <div className={styles.heroTrust}>
            <div className={styles.heroTrustItem}>
              <span className={styles.heroTrustStar}>★★★★★</span>
              <span>5.0 Google</span>
            </div>
            <div className={styles.heroTrustDot} />
            <div className={styles.heroTrustItem}>
              <span>📺</span>
              <span>Kuaförüm Sensin</span>
            </div>
            <div className={styles.heroTrustDot} />
            <div className={styles.heroTrustItem}>
              <span>20+ yıl deneyim</span>
            </div>
          </div>
        </div>

        <div className={styles.heroTag1}>
          <span>🎥</span> Kuaförüm Sensin
        </div>
        <div className={styles.heroTag2}>
          <span>⭐</span> 5.0 Google Puan
        </div>
        <div className={styles.heroTag3}>
          <span>✂️</span> 20+ Yıl Deneyim
        </div>

        <div className={styles.scrollIndicator}>
          <span></span>
        </div>

        {/* 3D Image Gallery — Kadın hero sağ tarafı */}
        {isKadin && !isMobile && (
          <div style={{
            position: 'absolute',
            right: '2%',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 5,
            perspective: '900px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '380px',
            height: '520px',
            pointerEvents: 'none',
          }}>
            {/* Card 1 — arka sol */}
            <div style={{
              position: 'absolute',
              width: '200px',
              height: '280px',
              borderRadius: '16px',
              overflow: 'hidden',
              transform: 'rotateY(28deg) rotateX(4deg) translateX(-120px) translateZ(-80px)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
              border: '1px solid rgba(255,255,255,0.08)',
              opacity: 0.75,
            }}>
              <Image src="/media/kadin/kadin-img-2026-06-29-at-19.41.25.jpeg" alt="Kadın Styling" fill style={{ objectFit: 'cover', objectPosition: 'center top' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />
            </div>

            {/* Card 2 — ön orta (büyük, merkez) */}
            <div style={{
              position: 'absolute',
              width: '240px',
              height: '340px',
              borderRadius: '20px',
              overflow: 'hidden',
              transform: 'rotateY(0deg) rotateX(6deg) translateZ(40px)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.15)',
              zIndex: 2,
            }}>
              <Image src="/media/kadin/kadin-about.jpeg" alt="Kadın Ana" fill style={{ objectFit: 'cover', objectPosition: 'center top' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)' }} />
              <div style={{
                position: 'absolute',
                bottom: '1rem',
                left: '1rem',
                right: '1rem',
              }}>
                <p style={{ color: '#fff', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.9, margin: 0 }}>Erbil Kızıltan</p>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.6rem', letterSpacing: '1.5px', textTransform: 'uppercase', margin: 0 }}>Women's Artist</p>
              </div>
            </div>

            {/* Card 3 — arka sağ */}
            <div style={{
              position: 'absolute',
              width: '200px',
              height: '280px',
              borderRadius: '16px',
              overflow: 'hidden',
              transform: 'rotateY(-28deg) rotateX(4deg) translateX(120px) translateZ(-80px)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
              border: '1px solid rgba(255,255,255,0.08)',
              opacity: 0.75,
            }}>
              <Image src="/media/kadin/kadin-backstage-sag.jpg" alt="Kadın Backstage" fill style={{ objectFit: 'cover', objectPosition: 'center top' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />
            </div>

            {/* Card 4 — en arka küçük sol */}
            <div style={{
              position: 'absolute',
              width: '160px',
              height: '220px',
              borderRadius: '14px',
              overflow: 'hidden',
              transform: 'rotateY(42deg) rotateX(2deg) translateX(-220px) translateZ(-160px)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.05)',
              opacity: 0.45,
            }}>
              <Image src="/media/kadin/kadin-img-2026-06-29-at-19.41.36.jpeg" alt="Kadın Stil" fill style={{ objectFit: 'cover', objectPosition: 'center top' }} />
            </div>

            {/* Card 5 — en arka küçük sağ */}
            <div style={{
              position: 'absolute',
              width: '160px',
              height: '220px',
              borderRadius: '14px',
              overflow: 'hidden',
              transform: 'rotateY(-42deg) rotateX(2deg) translateX(220px) translateZ(-160px)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.05)',
              opacity: 0.45,
            }}>
              <Image src="/media/kadin/kadin-img-2026-06-29-at-19.43.42.jpeg" alt="Kadın Detay" fill style={{ objectFit: 'cover', objectPosition: 'center top' }} />
            </div>
          </div>
        )}
      </header>

      {/* ─────────────── STATS BAR ─────────────── */}
      <div
        className={`${styles.statsBar} ${statsRef.inView ? styles.visible : ''}`}
        ref={statsRef.ref as React.RefObject<HTMLDivElement>}
      >
        {[
          { num: '20+', label: 'Yıl Deneyim' },
          { num: '50+', label: 'Ünlü İsim' },
          { num: '5.0', label: '★ Google Puanı' },
          { num: 'TV', label: 'Program Deneyimi' },
        ].map((stat, i) => (
          <div key={stat.num} className={styles.statWrapper}>
            {i > 0 && <div className={styles.statDivider} />}
            <div className={styles.statItem} style={{ animationDelay: `${i * 0.1}s` }}>
              <span className={styles.statNumber}>{stat.num}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ─────────────── CELEBRITY MARQUEE ─────────────── */}
      <div className={styles.marqueeSection}>
        <div className={styles.marqueeLabel}>— Güvenilen İsimler</div>
        <div className={styles.marqueeTrack}>
          <div className={styles.marqueeContent}>
            {[
              'Okan & Volkan', 'Ece Mumay', 'Gökhan Türkmen', 'Zeynep Alkan', 'Kuaförüm Sensin', 'Set Produksiyonları',
              'Okan & Volkan', 'Ece Mumay', 'Gökhan Türkmen', 'Zeynep Alkan', 'Kuaförüm Sensin', 'Set Produksiyonları',
            ].map((name, i) => (
              <span key={i} className={styles.marqueeItem}>
                <span className={styles.marqueeIcon}>✦</span>
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─────────────── ABOUT ─────────────── */}
      <section
        id="hakkimizda"
        className={`${styles.section} ${aboutRef.inView ? styles.visible : ''}`}
        ref={aboutRef.ref as React.RefObject<HTMLElement>}
      >
        <div className={styles.aboutGrid}>
          <div className={styles.aboutImageSide}>
            <div className={styles.aboutImgMain}>
              <Image
                src={isKadin ? '/media/kadin/kadin-about.jpeg' : '/erbil-backstage-1.jpg'}
                alt="Erbil Kızıltan backstage çalışırken"
                fill
                quality={100}
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
              <div className={styles.aboutImgOverlay} />
            </div>
            <div className={styles.aboutImgAccent}>
              <Image
                src="/erbil-tv-program.jpg"
                alt="Erbil Kızıltan TV programında"
                fill
                quality={100}
                sizes="(max-width: 768px) 100vw, 25vw"
                style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
              />
              <div className={styles.accentLabel}>📺 Kuaförüm Sensin</div>
            </div>
          </div>
          <div className={styles.aboutText}>
            <div className={styles.sectionLabel}>— Hakkımızda</div>
            <h2 className={styles.sectionTitle}>İşin Sanatını<br />Ustasından Öğrenmek</h2>
            <p>
              Erbil Kızıltan, Türkiye'nin en prestijli kuaför yarışma programlarından biri olan
              {' '}<strong>"Kuaförüm Sensin"</strong> ekranlarında sahne almış, uzmanlığını milyonlara kanıtlamış bir saç ve styling sanatçısıdır.
            </p>
            <p>
              Yıllar içinde Türkiye'nin en tanınmış isimleri, sanatçıları ve medya figürleriyle özel olarak çalışmış;
              backstage'den sahneye, TV setlerinden özel davetlere kadar her ortamda <strong>premium imaj yaratmanın</strong> sırrını keşfetmiştir.
            </p>
            <p>
              Bugün kendi stüdyosunda, her müşterisine aynı özveri ve ustalıkla yaklaşmaya devam ediyor.
            </p>
            <div className={styles.aboutHighlights}>
              {[
                { icon: '📺', title: 'Kuaförüm Sensin', sub: 'TV Programı Yarışmacısı' },
                { icon: '⭐', title: 'Ünlü İsimlerin Kuaförü', sub: 'Sanatçılar ve Medya Figürleri' },
                { icon: '✂️', title: 'Anatomik & Artistik Kesim', sub: 'Kişiye Özel Tasarım' },
              ].map((h) => (
                <div key={h.title} className={styles.highlight}>
                  <span className={styles.highlightIcon}>{h.icon}</span>
                  <div>
                    <strong>{h.title}</strong>
                    <span>{h.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── PORTFOLIO SHOWCASE ─────────────── */}
      <section
        className={`${styles.section} ${styles.sectionDark} ${celebRef.inView ? styles.visible : ''}`}
        ref={celebRef.ref as React.RefObject<HTMLElement>}
      >
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>— Backstage & Sahneler</div>
          <h2 className={styles.sectionTitle}>
            {isKadin ? 'Sahnenin Arkasındaki Zarafet' : 'Sanatçı Ustalığının Kanıtı'}
          </h2>
          <p className={styles.sectionSubtitle}>
            {isKadin
              ? 'TV setlerinden özel çekimlere, Erbil Kızıltan kadın stilinin zirvesini temsil etmektedir.'
              : 'Ünlü isimlerden sahne prodüksiyonlarına, Erbil Kızıltan erkek imajının mimarıdır.'}
          </p>
        </div>

        {/* Magazine-style masonry portfolio */}
        <div className={styles.portfolioGrid}>

          {/* HERO — large left card */}
          <div className={styles.portfolioHero}>
            <div className={styles.portfolioImgWrapper}>
              <Image
                src={isKadin ? '/media/kadin/kadin-img-2026-06-29-at-19.39.22.jpeg' : '/media/unisex/unisex-img-2026-06-29-at-19.41.46.jpeg'}
                alt={isKadin ? 'Erbil Kızıltan — Kadın Backstage Styling' : 'Erbil Kızıltan — Artistik Erkek Saç Kesimi'}
                fill
                quality={100}
                sizes="(max-width: 768px) 100vw, 45vw"
                style={{ objectFit: 'cover', objectPosition: isKadin ? 'center top' : 'center 20%' }}
                priority
              />
              <div className={styles.portfolioOverlay}>
                <span className={styles.portfolioTag}>
                  {isKadin ? '🎬 Backstage' : '✂️ Sanatçı Tıraşı'}
                </span>
                <p>{isKadin ? 'Set hazırlığında mükemmel kadın styling' : 'Yüz hatlarına göre özelleştirilmiş anatomik kesim'}</p>
              </div>
            </div>
          </div>

          {/* Top-right card */}
          <div className={styles.portfolioCard}>
            <div className={styles.portfolioImgWrapper}>
              <Image
                src={isKadin ? '/media/kadin/kadin-fb-632363448.jpg' : '/media/erkek/erkek-fb-626274197.jpg'}
                alt={isKadin ? 'Özel Davet Saç Tasarımı' : 'Modern Erkek Kesim ve Tasarım'}
                fill
                quality={95}
                sizes="(max-width: 768px) 100vw, 30vw"
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
              />
              <div className={styles.portfolioOverlay}>
                <span className={styles.portfolioTag}>
                  {isKadin ? '💫 Özel Davet' : '📐 Modern Tasarım'}
                </span>
                <p>{isKadin ? 'Özel davetler için zarafet' : 'Güncel erkek saç trendleri'}</p>
              </div>
            </div>
          </div>

          {/* Top-right second card */}
          <div className={styles.portfolioCard}>
            <div className={styles.portfolioImgWrapper}>
              <Image
                src={isKadin ? '/media/unisex/unisex-img-2026-06-29-at-19.41.46.jpeg' : '/media/erkek/erkek-img-2026-06-29-at-19.46.39.jpeg'}
                alt={isKadin ? 'Kuaförüm Sensin Kadın Tasarımı' : 'Anatomik Erkek Tıraşı'}
                fill
                quality={95}
                sizes="(max-width: 768px) 100vw, 30vw"
                style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
              />
              <div className={styles.portfolioOverlay}>
                <span className={styles.portfolioTag}>
                  {isKadin ? '📺 TV & Instagram' : '🏆 Anatomik Kesim'}
                </span>
                <p>{isKadin ? 'Ekranların ve sosyal medyanın tercihi' : 'Karakterini ortaya çıkaran kesim sanatı'}</p>
              </div>
            </div>
          </div>

          {/* Wide bottom card — spans 2 right columns */}
          <div className={styles.portfolioWide}>
            <div className={styles.portfolioImgWrapper}>
              <Image
                src={isKadin ? '/media/alt-5-v2.jpg' : '/media/alt-6.jpg'}
                alt={isKadin ? 'Renklendirme ve Styling' : 'Erbil Kızıltan Özel Tasarım'}
                fill
                quality={100}
                sizes="(max-width: 768px) 100vw, 60vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
              <div className={styles.portfolioOverlay}>
                <span className={styles.portfolioTag}>
                  {isKadin ? '🎨 Renklendirme & Styling' : '✂️ Özel Kesim & Tasarım'}
                </span>
                <p>{isKadin ? 'Balayaj ve ombré ile ışıltılı dönüşüm' : 'Detaylarda gizli ustalık'}</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────── VIDEO CINEMA ─────────────── */}
      <section className={styles.videoSection}>
        <div className={styles.videoSectionBg}>
          <div className={styles.videoSectionGlow} />
        </div>
        <div className={styles.videoSectionInner}>
          <div className={`${styles.videoSectionHeader} ${styles.sectionHeader}`}>
            <div className={styles.sectionLabel}>— Backstage Anları</div>
            <h2 className={styles.sectionTitle}>
              {isKadin ? 'Sahneden Kameraya, Zarafet' : 'Ustalık ve Cool Tarz'}
            </h2>
            <p className={styles.sectionSubtitle}>
              TV ve prodüksiyon setlerinden kayıt altına alınan backstage çalışma anları.
            </p>
          </div>
          {/* Kadın: 3'lü layout — sol resim, orta video, sağ resim */}
          {isKadin ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.2fr 1fr',
              gap: '1.5rem',
              alignItems: 'stretch',
              maxWidth: '1100px',
              margin: '0 auto',
            }}>
              {/* Sol resim */}
              <div className={styles.videoCard} style={{ aspectRatio: '9/16', maxHeight: '580px' }}>
                <Image
                  src="/media/kadin/kadin-img-2026-06-29-at-19.41.25.jpeg"
                  alt="Kadın Styling Çekimi"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                />
                <div className={styles.videoCardOverlay}>
                  <span className={styles.videoCardBadge}>✨ Styling</span>
                  <p className={styles.videoCardTitle}>Sahne Hazırlığı</p>
                </div>
              </div>

              {/* Orta video */}
              <div className={styles.videoCard} style={{ aspectRatio: '9/16', maxHeight: '580px' }}>
                <video suppressHydrationWarning
                  src="/media/kadin/kadin-vid-2026-06-29-at-19.40.19.mp4"
                  className={styles.videoCardVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-label="Kadın Backstage Hazırlık"
                />
                <div className={styles.videoCardOverlay}>
                  <span className={styles.videoCardBadge}>🎬 Backstage</span>
                  <p className={styles.videoCardTitle}>Kadın Backstage Hazırlık</p>
                </div>
              </div>

              {/* Sağ resim */}
              <div className={styles.videoCard} style={{ aspectRatio: '9/16', maxHeight: '580px' }}>
                <Image
                  src="/media/kadin/kadin-backstage-sag.jpg"
                  alt="Kadın Backstage Detay"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                />
                <div className={styles.videoCardOverlay}>
                  <span className={styles.videoCardBadge}>📸 Detay</span>
                  <p className={styles.videoCardTitle}>Zarif Dokunuşlar</p>
                </div>
              </div>
            </div>
          ) : (
            /* Erkek: tek video ortada */
            <div className={styles.videoDuo} style={{ gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
                <div className={styles.videoCard} style={{ aspectRatio: '3/4', margin: '0 auto', width: '100%', maxWidth: '640px', boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}>
                  <video suppressHydrationWarning
                    src="/media/erkek/erkek-vid-2026-06-29-at-19.37.17.mp4"
                    className={styles.videoCardVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{ objectPosition: 'center 30%' }}
                    aria-label="Erkek Sanatçı Tıraşı"
                  />
                  <div className={styles.videoCardOverlay}>
                    <span className={styles.videoCardBadge}>✂️ Gökhan Türkmen</span>
                    <p className={styles.videoCardTitle}>Özel Kesim</p>
                  </div>
                </div>
                <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', color: '#fff', letterSpacing: '4px', fontWeight: 300, textTransform: 'uppercase', opacity: 0.85 }}>
                    Gökhan Türkmen
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', marginTop: '0.4rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 400, opacity: 0.6 }}>
                    Backstage
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─────────────── SERVICES ─────────────── */}
      <section
        id="hizmetler"
        className={`${styles.section} ${servicesRef.inView ? styles.visible : ''}`}
        ref={servicesRef.ref as React.RefObject<HTMLElement>}
      >
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>— Hizmetlerimiz</div>
          <h2 className={styles.sectionTitle}>Sanatçı Dokunuşu,<br />Her Detayda</h2>
        </div>
        <div className={styles.servicesGrid}>
          {services.map((s, i) => (
            <div key={i} className={styles.serviceCard} style={{ animationDelay: `${i * 0.1}s` }} onMouseMove={handleMouseMove}>
              {s.tag && <span className={styles.serviceTag}>{s.tag}</span>}
              <div className={styles.serviceIconWrap}>
                <span className={styles.serviceIcon}>{s.icon}</span>
                <div className={styles.serviceIconGlow} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              
              {s.whatsappOnly ? (
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: 'auto' }}>
                  <p style={{ fontSize: '0.78rem', color: 'var(--color-accent)', fontStyle: 'italic', marginTop: '0.75rem', marginBottom: '0.75rem', lineHeight: '1.4' }}>
                    Fiyat ve süre saç uzunluğu ile yapılacak işleme göre değişmektedir.
                  </p>
                  <button 
                    onClick={() => handleWhatsApp(s.title)} 
                    className={styles.navButton}
                    style={{ padding: '0.5rem 1rem', borderRadius: '8px', color: 'var(--color-bg)', background: 'var(--color-accent)', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', fontWeight: '600', alignSelf: 'flex-start' }}
                  >
                    <span>WhatsApp'tan Bilgi Al</span>
                    <span style={{ fontSize: '1rem' }}>💬</span>
                  </button>
                </div>
              ) : (
                <a href="#randevu" className={styles.serviceCardArrow}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              )}
            </div>
          ))}
        </div>
      </section>



      {/* ─────────────── REVIEWS CAROUSEL ─────────────── */}
      <section
        id="yorumlar"
        className={`${styles.section} ${reviewsRef.inView ? styles.visible : ''}`}
        ref={reviewsRef.ref as React.RefObject<HTMLElement>}
      >
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>— Yorumlar</div>
          <h2 className={styles.sectionTitle}>Müşteriler Ne Diyor?</h2>
          <div className={styles.ratingBadge}>
            <span className={styles.ratingStars}>★★★★★</span>
            <span className={styles.ratingScore}>5.0</span>
            <span className={styles.ratingCount}>Google'da 15 Yorum</span>
          </div>
        </div>

        {/* Carousel */}
        <div
          className={styles.reviewCarousel}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className={styles.reviewTrack} style={{ transform: `translateX(-${reviewIndex * 100}%)` }}>
            {reviews.map((r, i) => (
              <div key={i} className={styles.reviewSlide}>
                <div className={styles.reviewCard}>
                  <div className={styles.reviewQuoteIcon}>"</div>
                  <p className={styles.reviewText}>{r.text}</p>
                  <div className={styles.reviewFooter}>
                    <div className={styles.reviewAvatar}>{r.initials}</div>
                    <div className={styles.reviewMeta}>
                      <strong>{r.name}</strong>
                      {r.role && <span className={styles.reviewRole}>{r.role}</span>}
                      <div className={styles.reviewBottom}>
                        <span className={styles.reviewStars}>★★★★★</span>
                        <span className={styles.reviewTime}>· {r.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className={styles.reviewControls}>
            <button onClick={prevReview} className={styles.reviewBtn} aria-label="Önceki">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
            </button>
            <div className={styles.reviewDots}>
              {reviews.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.reviewDot} ${i === reviewIndex ? styles.reviewDotActive : ''}`}
                  onClick={() => { setReviewIndex(i); setIsAutoPlaying(false); }}
                  aria-label={`Yorum ${i + 1}`}
                />
              ))}
            </div>
            <button onClick={nextReview} className={styles.reviewBtn} aria-label="Sonraki">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Also show grid on larger screens */}
        <div className={styles.reviewsGrid}>
          {reviews.map((r, i) => (
            <div key={i} className={styles.reviewCardGrid} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className={styles.reviewQuoteMini}>"</div>
              <p className={styles.reviewText}>"{r.text}"</p>
              <div className={styles.reviewHeader}>
                <div className={styles.reviewAvatar}>{r.initials}</div>
                <div className={styles.reviewMeta}>
                  <strong>{r.name}</strong>
                  {r.role && <span className={styles.reviewRole}>{r.role}</span>}
                  <span className={styles.reviewTime}>{r.time}</span>
                </div>
              </div>
              <div className={styles.reviewStars}>★★★★★</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────── BOOKING ─────────────── */}
      <section
        id="randevu"
        className={`${styles.bookingSection} ${bookingRef.inView ? styles.visible : ''}`}
        ref={bookingRef.ref as React.RefObject<HTMLElement>}
      >
        <div className={styles.bookingBg}>
          <div className={styles.bookingGlow1} />
          <div className={styles.bookingGlow2} />
        </div>

        <div className={styles.bookingInner}>
          {/* ── Left: info panel ── */}
          <div className={styles.bookingInfo}>
            <div className={styles.sectionLabel}>— Randevu</div>
            <h2 className={styles.bookingTitle}>Yerinizi<br />Ayırtın</h2>
            <p className={styles.bookingSubtitle}>
              Aşağıdaki takvimden uygun gün ve saati seçerek dakikalar içinde randevunuzu oluşturun.
            </p>

            {/* Perks */}
            <div className={styles.bookingPerks}>
              {bookingPerks.map((p) => (
                <div key={p.title} className={styles.bookingPerk}>
                  <span className={styles.bookingPerkIcon}>{p.icon}</span>
                  <div>
                    <strong>{p.title}</strong>
                    <span>{p.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct contact */}
            <div className={styles.bookingDirectCta}>
              <span className={styles.bookingOrLine}>veya doğrudan ara</span>
              <a href="tel:05467922404" className={styles.bookingPhoneBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.08 2.18 2 2 0 012.09 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.91-.91a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
                </svg>
                0546 792 24 04
              </a>
            </div>
          </div>

          {/* ── Right: calendar iframe ── */}
          <div className={styles.bookingCalendarWrap}>
            <div className={styles.bookingCalendarCard}>
              <div className={styles.bookingCalendarHeader}>
                <div className={styles.bookingCalendarDots}>
                  <span /><span /><span />
                </div>
                <span className={styles.bookingCalendarTitle}>Takvimden Seç</span>
                <div />
              </div>
              <iframe
                src="https://cal.com/erbil-kiziltan-hw7xw6"
                width="100%"
                height="620"
                frameBorder="0"
                title="Randevu Formu - Erbil Kızıltan"
                style={{ display: 'block' }}
              ></iframe>
            </div>
            <div className={styles.bookingCardGlow} />
          </div>
        </div>
      </section>

      {/* ─────────────── CONTACT ─────────────── */}
      <section
        id="iletisim"
        className={`${styles.section} ${contactRef.inView ? styles.visible : ''}`}
        ref={contactRef.ref as React.RefObject<HTMLElement>}
      >
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>— İletişim</div>
          <h2 className={styles.sectionTitle}>Bizi Bulun</h2>
        </div>
        <div className={styles.contactGrid}>
          <div className={styles.contactInfo}>
            {[
              { icon: '📍', title: 'Adres', content: 'Esenevler Mahallesi Yunus Emre Caddesi, Bala Sk. 8A, 34762 Ümraniye / İstanbul' },
              { icon: '📞', title: 'Telefon', href: 'tel:05467922404', link: '0546 792 24 04' },
              { icon: '🕐', title: 'Çalışma Saatleri', content: 'Her Gün 09:00\'dan itibaren açık' },
              { icon: '📸', title: 'Instagram', href: 'https://www.instagram.com/erbil.kzltan/', link: '@erbil.kzltan', external: true },
            ].map((card) => (
              <div key={card.title} className={styles.contactCard} onMouseMove={handleMouseMove}>
                <span className={styles.contactIcon}>{card.icon}</span>
                <div>
                  <h4>{card.title}</h4>
                  {card.href ? (
                    <a href={card.href} className={styles.contactLink} target={card.external ? '_blank' : undefined} rel={card.external ? 'noopener noreferrer' : undefined}>
                      {card.link}
                    </a>
                  ) : (
                    <p>{card.content}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className={styles.mapWrapper}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.518882084534!2d29.088934776467245!3d41.01207309999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac9352f8f044b%3A0xda8fa81d0ca2e4b7!2sKuaf%C3%B6r%20Erbil%20K%C4%B1z%C4%B1ltan!5e0!3m2!1str!2str!4v1719086400000!5m2!1str!2str"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kuaför Erbil Kızıltan Konum"
            ></iframe>
          </div>
        </div>
      </section>

      {/* ─────────────── FOOTER ─────────────── */}
      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <div className={styles.logo}>
              <span className={styles.logoText}>ERBİL KIZILTAN</span>
              <span className={styles.logoSubtitle}>{heroTitle.subtitle}</span>
            </div>
            <p className={styles.footerTagline}>
              Premium saç & styling sanatı.<br />TV'den sahneye, her ortamda fark yaratır.
            </p>
            <a
              href="https://www.instagram.com/erbil.kzltan/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerSocial}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            @erbil.kzltan
          </a>
        </div>
        <div className={styles.footerLinks}>
          <div className={styles.footerCol}>
            <h5>Sayfalar</h5>
            <a href="#hakkimizda">Hakkımızda</a>
            <a href="#hizmetler">Hizmetler</a>
            <a href="#galeri">Galeri</a>
            <a href="#yorumlar">Yorumlar</a>
          </div>
          <div className={styles.footerCol}>
            <h5>İletişim</h5>
            <a href="tel:05467922404">0546 792 24 04</a>
            <a href="#iletisim">Adres & Konum</a>
            <a href="#randevu">Randevu Al</a>
          </div>
          <div className={styles.footerCol}>
            <h5>Hızlı Erişim</h5>
            <a href="https://www.instagram.com/erbil.kzltan/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://cal.com/erbil-kiziltan-hw7xw6" target="_blank" rel="noopener noreferrer">Çevrimiçi Randevu</a>
          </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
