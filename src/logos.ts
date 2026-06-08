export interface PresetLogo {
  id: string;
  name: string;
  description: string;
  svgMarkup: string;
}

export const PRESET_LOGOS: PresetLogo[] = [
  {
    id: 'alpine',
    name: 'Alpine Trails Co.',
    description: 'Triangular outdoor mountaineering brand emblem.',
    svgMarkup: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <defs>
        <clipPath id="circle-clip"><circle cx="50" cy="50" r="46"/></clipPath>
      </defs>
      <circle cx="50" cy="50" r="48" fill="none" stroke="#1E293B" stroke-width="2"/>
      <circle cx="50" cy="50" r="44" fill="#0F172A"/>
      <g clip-path="url(#circle-clip)">
        <polygon points="50,18 85,82 15,82" fill="#334155"/>
        <polygon points="50,38 72,82 28,82" fill="#94A3B8"/>
        <circle cx="50" cy="55" r="9" fill="#F59E0B"/>
        <polygon points="50,44 60,65 40,65" fill="#F8FAFC"/>
      </g>
      <text x="50" y="90" font-family="'Inter', sans-serif" font-weight="900" font-size="7.5" fill="#F1F5F9" text-anchor="middle" letter-spacing="1">ALPINE TRAILS</text>
    </svg>`,
  },
  {
    id: 'zenbrew',
    name: 'Zen Brew Coffee',
    description: 'Elegant typographic cafe insignia.',
    svgMarkup: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <circle cx="50" cy="50" r="45" fill="none" stroke="#8B5CF6" stroke-width="3.5" stroke-dasharray="8 3"/>
      <circle cx="50" cy="50" r="39" fill="#1E1B4B"/>
      {/* Handcrafted teacup shape */}
      <path d="M 32,45 C 32,68, 68,68, 68,45 Z" fill="#8B5CF6"/>
      {/* Wave steam vapors */}
      <path d="M 42,35 Q 45,28 42,22" fill="none" stroke="#A78BFA" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M 50,35 Q 53,28 50,22" fill="none" stroke="#A78BFA" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M 58,35 Q 61,28 58,22" fill="none" stroke="#A78BFA" stroke-width="2.5" stroke-linecap="round"/>
      {/* Handle */}
      <path d="M 68,49 C 76,49, 76,57, 68,57" fill="none" stroke="#8B5CF6" stroke-width="3.5"/>
      <text x="50" y="80" font-family="'Inter', sans-serif" font-weight="800" font-size="8.5" fill="#F5F3FF" text-anchor="middle" letter-spacing="1.5">ZEN BREW</text>
    </svg>`,
  },
  {
    id: 'cosmic',
    name: 'Cosmic Studio',
    description: 'Sacred geometry outline tech emblem.',
    svgMarkup: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <rect x="22" y="22" width="56" height="56" rx="6" fill="none" stroke="#0D9488" stroke-width="2.5" transform="rotate(45 50 50)" />
      <rect x="25" y="25" width="50" height="50" rx="4" fill="none" stroke="#14B8A6" stroke-width="1" stroke-dasharray="3, 3" transform="rotate(45 50 50)" />
      <circle cx="50" cy="50" r="23" fill="none" stroke="#2DD4BF" stroke-width="2" />
      <polygon points="50,35 63,58 37,58" fill="#0D9488" opacity="0.8"/>
      <circle cx="50" cy="50" r="5" fill="#F8FAFC"/>
      <text x="50" y="93" font-family="'Inter', sans-serif" font-weight="700" font-size="7" fill="#111827" text-anchor="middle" letter-spacing="2.5">COSMIC</text>
    </svg>`,
  },
  {
    id: 'retrowave',
    name: 'Retro 1988 Sunset',
    description: 'Vibrant neon synthwave horizon design.',
    svgMarkup: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <defs>
        <linearGradient id="cyberSunset" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#F43F5E"/>
          <stop offset="60%" stop-color="#D946EF"/>
          <stop offset="100%" stop-color="#EAB308"/>
        </linearGradient>
      </defs>
      <circle cx="50" cy="46" r="38" fill="url(#cyberSunset)"/>
      {/* Retro Horizon Blackout Gridlines */}
      <rect x="10" y="52" width="80" height="3" fill="#0F172A"/>
      <rect x="10" y="59" width="80" height="2.5" fill="#0F172A"/>
      <rect x="10" y="65" width="80" height="2" fill="#0F172A"/>
      <rect x="10" y="70" width="80" height="1.5" fill="#0F172A"/>
      <rect x="10" y="74" width="80" height="1" fill="#0F172A"/>
      
      {/* Graphic palm silhouette */}
      <path d="M 28,76 Q 35,55, 30,42 L 34,42 Q 38,55, 32,76 Z" fill="#0F172A"/>
      <path d="M 31,52 Q 18,48, 14,56 Q 25,56, 31,52 Z" fill="#0F172A"/>
      <path d="M 32,46 Q 22,38, 18,45 Q 26,48, 32,46 Z" fill="#0F172A"/>

      <text x="50" y="90" font-family="'Inter', sans-serif" font-weight="900" font-size="9" fill="#F43F5E" text-anchor="middle" letter-spacing="2">RETRO</text>
    </svg>`,
  },
];

export const getLogoDataUrl = (svgMarkup: string): string => {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgMarkup)}`;
};
