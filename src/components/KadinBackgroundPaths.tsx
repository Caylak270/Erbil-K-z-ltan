"use client";

// Background Paths — 21st.dev @kokonutd/background-paths ilhâmıyla
// Kadın temasına özel: rose-pink & amethyst renkli zarif SVG yollar

export default function KadinBackgroundPaths() {
  // Her path farklı animasyon süresi ve gecikme ile yavaşça kayıyor
  const paths = [
    {
      d: "M-50 200 C100 80, 300 320, 500 150 S700 80, 900 200 S1100 320, 1350 180",
      color: "rgba(72,217,255,0.7)", /* Parlak Cyan */
      strokeWidth: 2.5,
      duration: 18,
      delay: 0,
    },
    {
      d: "M-80 350 C80 180, 280 480, 480 260 S680 100, 880 330 S1080 480, 1400 300",
      color: "rgba(255,105,180,0.6)", /* Magenta / Hot Pink */
      strokeWidth: 2,
      duration: 22,
      delay: -4,
    },
    {
      d: "M-30 500 C150 340, 350 600, 550 400 S750 200, 950 450 S1150 600, 1400 420",
      color: "rgba(138,43,226,0.65)", /* Deep Blue / Purple */
      strokeWidth: 1.8,
      duration: 25,
      delay: -8,
    },
    {
      d: "M50 150 C200 30, 400 280, 600 100 S800 -20, 1000 150 S1200 280, 1400 120",
      color: "rgba(255,180,120,0.7)", /* Peach */
      strokeWidth: 2.2,
      duration: 30,
      delay: -12,
    },
    {
      d: "M-100 600 C50 440, 250 700, 450 520 S650 340, 850 560 S1050 700, 1400 540",
      color: "rgba(72,217,255,0.6)", /* Cyan */
      strokeWidth: 1.5,
      duration: 20,
      delay: -6,
    },
    {
      d: "M200 -30 C300 120, 500 -10, 700 140 S900 300, 1100 80 S1300 -30, 1500 100",
      color: "rgba(255,105,180,0.55)", /* Magenta */
      strokeWidth: 2,
      duration: 35,
      delay: -15,
    },
    {
      d: "M-200 400 C0 240, 200 460, 400 300 S600 120, 800 360 S1000 520, 1400 380",
      color: "rgba(138,43,226,0.55)", /* Deep Purple */
      strokeWidth: 2.5,
      duration: 28,
      delay: -2,
    },
    {
      d: "M100 700 C280 520, 480 760, 680 580 S880 400, 1080 620 S1280 760, 1500 600",
      color: "rgba(255,180,120,0.6)", /* Peach */
      strokeWidth: 1.5,
      duration: 32,
      delay: -18,
    },
  ];

  return (
    <svg
      viewBox="0 0 1400 800"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {paths.map((path, i) => (
        <g key={i}>
          {/* Glowing layer (blur + thicker) */}
          <path
            d={path.d}
            fill="none"
            stroke={path.color}
            strokeWidth={path.strokeWidth * 6}
            strokeLinecap="round"
            filter="url(#glow)"
            style={{
              animation: `bgPathDrift ${path.duration}s ease-in-out infinite alternate`,
              animationDelay: `${path.delay}s`,
            }}
          />
          {/* Sharp layer */}
          <path
            d={path.d}
            fill="none"
            stroke={path.color}
            strokeWidth={path.strokeWidth}
            strokeLinecap="round"
            style={{
              animation: `bgPathDrift ${path.duration}s ease-in-out infinite alternate`,
              animationDelay: `${path.delay}s`,
            }}
          />
        </g>
      ))}

      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <style>{`
        @keyframes bgPathDrift {
          0%   { transform: translateY(0px) translateX(0px); }
          33%  { transform: translateY(-18px) translateX(8px); }
          66%  { transform: translateY(12px) translateX(-6px); }
          100% { transform: translateY(-8px) translateX(14px); }
        }
      `}</style>
    </svg>
  );
}
