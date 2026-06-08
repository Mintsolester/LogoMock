import React from 'react';

interface ProductSVGProps {
  type: 'mug' | 'tshirt' | 'hoodie' | 'tote' | 'bottle' | 'notebook' | 'cap';
  color: string;
  secondaryColor?: string;
  className?: string;
}

export const ProductSVG: React.FC<ProductSVGProps> = ({
  type,
  color,
  secondaryColor = 'matching',
  className = 'w-full h-full',
}) => {
  // Resolve actual secondary color for two-tone elements like cap visor, mug interior/handle
  const resolvedSecondary = secondaryColor === 'matching' ? color : secondaryColor;

  switch (type) {
    case 'tshirt':
      return (
        <svg
          viewBox="0 0 400 400"
          className={className}
          aria-label="T-Shirt Mockup Template"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Soft lighting from top-left */}
            <linearGradient id="tshirtShade" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity={0.25} />
              <stop offset="40%" stopColor="#ffffff" stopOpacity={0.0} />
              <stop offset="85%" stopColor="#000000" stopOpacity={0.12} />
              <stop offset="100%" stopColor="#000000" stopOpacity={0.25} />
            </linearGradient>

            {/* Sleeve/torso crease shadows */}
            <radialGradient id="armpitShadowLeft" cx="20%" cy="35%" r="15%">
              <stop offset="0%" stopColor="#000000" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#000000" stopOpacity={0.0} />
            </radialGradient>
            <radialGradient id="armpitShadowRight" cx="80%" cy="35%" r="15%">
              <stop offset="0%" stopColor="#000000" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#000000" stopOpacity={0.0} />
            </radialGradient>

            {/* Cotton linen texture */}
            <pattern id="cottonTexture" width="4" height="4" patternUnits="userSpaceOnUse">
              <rect width="4" height="4" fill="none" />
              <line x1="0" y1="2" x2="4" y2="2" stroke="#000000" strokeWidth="0.5" strokeOpacity={0.035} />
              <line x1="2" y1="0" x2="2" y2="4" stroke="#000000" strokeWidth="0.5" strokeOpacity={0.035} />
            </pattern>
          </defs>

          {/* Main T-Shirt Body */}
          <path
            d="M 140 30 
               C 155 45, 245 45, 260 30 
               L 315 55 
               C 335 65, 350 110, 310 120 
               L 290 115
               L 293 370 
               C 293 378, 107 378, 107 370 
               L 110 115 
               L 90 120 
               C 50 110, 65 65, 85 55 
               Z"
            fill={color}
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinejoin="round"
            style={{ transition: 'fill 0.3s ease' }}
          />

          {/* Collar Band Trim */}
          <path
            d="M 140 30 C 145 48, 255 48, 260 30 C 255 42, 145 42, 140 30 Z"
            fill="#000000"
            fillOpacity={0.08}
            stroke="#000000"
            strokeWidth="0.75"
          />
          {/* Inner Collar Back Dark Shadow */}
          <path
            d="M 140 30 C 160 15, 240 15, 260 30 C 248 36, 152 36, 140 30 Z"
            fill="#000000"
            fillOpacity={0.25}
          />

          {/* Sleeve Stitch lines */}
          <path d="M 103 103 C 100 85, 80 80, 77 62" stroke="#000000" strokeWidth="0.5" strokeDasharray="3,2" strokeOpacity={0.3} />
          <path d="M 297 103 C 300 85, 320 80, 323 62" stroke="#000000" strokeWidth="0.5" strokeDasharray="3,2" strokeOpacity={0.3} />

          {/* Bottom Hem stitch lines */}
          <path d="M 109 363 L 291 363" stroke="#000000" strokeWidth="0.5" strokeDasharray="3,2" strokeOpacity={0.3} />
          <path d="M 109 366 L 291 366" stroke="#000000" strokeWidth="0.5" strokeDasharray="3,2" strokeOpacity={0.3} />

          {/* Creases and folds lines */}
          <path d="M 110 115 C 130 140, 140 150, 135 180" stroke="#000000" strokeWidth="1" strokeOpacity={0.08} fill="none" />
          <path d="M 290 115 C 270 140, 260 150, 265 180" stroke="#000000" strokeWidth="1" strokeOpacity={0.08} fill="none" />
          
          <path d="M 125 350 C 150 340, 175 345, 200 355" stroke="#000000" strokeWidth="1.5" strokeOpacity={0.06} fill="none" />
          <path d="M 190 358 C 220 345, 250 348, 275 352" stroke="#000000" strokeWidth="1.5" strokeOpacity={0.06} fill="none" />

          {/* Fabric texture overlay */}
          <path
            d="M 140 30 C 155 45, 245 45, 260 30 L 315 55 C 335 65, 350 110, 310 120 L 290 115 L 293 370 C 293 378, 107 378, 107 370 L 110 115 L 90 120 C 50 110, 65 65, 85 55 Z"
            fill="url(#cottonTexture)"
          />

          {/* Armpit radial shadow overlays */}
          <path d="M 110 115 A 15 15 0 0 0 125 102 Z" fill="url(#armpitShadowLeft)" style={{ mixBlendMode: 'multiply' }} />
          <path d="M 290 115 A 15 15 0 0 1 275 102 Z" fill="url(#armpitShadowRight)" style={{ mixBlendMode: 'multiply' }} />

          {/* Solid shading layer with multiply/overlay simulation */}
          <path
            d="M 140 30 C 155 45, 245 45, 260 30 L 315 55 C 335 65, 350 110, 310 120 L 290 115 L 293 370 C 293 378, 107 378, 107 370 L 110 115 L 90 120 C 50 110, 65 65, 85 55 Z"
            fill="url(#tshirtShade)"
            style={{ mixBlendMode: 'multiply' }}
          />
        </svg>
      );

    case 'hoodie':
      return (
        <svg
          viewBox="0 0 400 400"
          className={className}
          aria-label="Hoodie Mockup Template"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="hoodieShade" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity={0.22} />
              <stop offset="50%" stopColor="#ffffff" stopOpacity={0.0} />
              <stop offset="85%" stopColor="#000000" stopOpacity={0.16} />
              <stop offset="100%" stopColor="#000000" stopOpacity={0.35} />
            </linearGradient>
            <pattern id="heavyKnit" width="6" height="6" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="6" y2="6" stroke="#000000" strokeWidth="0.5" strokeOpacity={0.025} />
              <line x1="6" y1="0" x2="0" y2="6" stroke="#000000" strokeWidth="0.5" strokeOpacity={0.025} />
            </pattern>
          </defs>

          {/* Hoodie body silhouette */}
          <path
            d="M 150 78 
               C 115 80, 85 75, 75 92 
               L 42 125 
               C 27 140, 42 185, 57 180 
               L 80 155 
               L 82 355 
               C 85 363, 315 363, 318 355 
               L 320 155 
               L 343 180 
               C 358 185, 373 140, 358 125 
               L 325 92 
               C 315 75, 285 80, 250 78 
               Z"
            fill={color}
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinejoin="round"
            style={{ transition: 'fill 0.3s ease' }}
          />

          {/* Hood - Left and Right Overlap Panels */}
          {/* Back neck area */}
          <path d="M 148 78 C 120 20, 280 20, 252 78 Z" fill={color} filter="brightness(0.85)" stroke="#000000" strokeWidth="1" />
          <path d="M 148 78 C 170 30, 230 30, 252 78 C 220 85, 180 85, 148 78 Z" fill="#111" fillOpacity={0.2} />

          {/* Left Hood Overlap Panel */}
          <path d="M 148 78 C 135 70, 140 38, 165 30 C 190 22, 205 50, 190 85 Z" fill={color} filter="brightness(0.95)" stroke="#000000" strokeWidth="0.75" />
          {/* Right Hood Overlap Panel */}
          <path d="M 252 78 C 265 70, 260 38, 235 30 C 210 22, 195 50, 210 85 Z" fill={color} filter="brightness(0.95)" stroke="#000000" strokeWidth="0.75" />

          {/* Ribbed Cuffs around wrists */}
          <path d="M 50 162 L 67 173" stroke="#000000" strokeWidth="3" strokeOpacity={0.2} />
          <path d="M 350 162 L 333 173" stroke="#000000" strokeWidth="3" strokeOpacity={0.2} />

          {/* Kangaroo Pocket */}
          <path
            d="M 130 255 
               C 130 240, 140 230, 155 230 
               L 245 230 
               C 260 230, 270 240, 270 255 
               L 285 295 
               C 285 305, 275 315, 265 315 
               L 135 315 
               C 125 315, 115 305, 115 295 
               Z"
            fill={color}
            filter="brightness(0.93)"
            stroke="#000000"
            strokeWidth="1"
          />
          {/* Kangaroo Pocket Stitch Openings */}
          <path d="M 130 255 L 115 295" stroke="#000000" strokeWidth="0.5" strokeDasharray="3, 2" strokeOpacity={0.4} />
          <path d="M 270 255 L 285 295" stroke="#000000" strokeWidth="0.5" strokeDasharray="3, 2" strokeOpacity={0.4} />
          <path d="M 155 230 L 245 230" stroke="#000000" strokeWidth="0.5" strokeDasharray="3, 2" strokeOpacity={0.4} />

          {/* Drawstrings with silver ends */}
          {/* Hanging Left */}
          <path d="M 185 82 C 175 120, 185 155, 178 175" fill="none" stroke="#FFFFFF" strokeWidth="3.5" filter="drop-shadow(1px 1px 1px rgba(0,0,0,0.15))" />
          <path d="M 185 82 C 175 120, 185 155, 178 175" fill="none" stroke="#E5E7EB" strokeWidth="3" />
          <rect x="175" y="171" width="6" height="5" rx="1" fill="#9CA3AF" /> {/* metal tip */}

          {/* Hanging Right */}
          <path d="M 215 82 C 225 110, 210 145, 222 170" fill="none" stroke="#FFFFFF" strokeWidth="3.5" filter="drop-shadow(1px 1px 1px rgba(0,0,0,0.15))" />
          <path d="M 215 82 C 225 110, 210 145, 222 170" fill="none" stroke="#E5E7EB" strokeWidth="3" />
          <rect x="219" y="166" width="6" height="5" rx="1" fill="#9CA3AF" /> {/* metal tip */}

          {/* Ribbed Bottom Band Hem */}
          <path d="M 85 348 L 315 348" stroke="#000000" strokeWidth="1" strokeOpacity={0.15} />
          <path d="M 85 352 L 315 352" stroke="#000000" strokeWidth="1" strokeOpacity={0.15} />

          {/* Heavy Knit texture overlay */}
          <path
            d="M 150 78 C 115 80, 85 75, 75 92 L 42 125 C 27 140, 42 185, 57 180 L 80 155 L 82 355 C 85 363, 315 363, 318 355 L 320 155 L 343 180 C 358 185, 373 140, 358 125 L 325 92 C 315 75, 285 80, 250 78 Z"
            fill="url(#heavyKnit)"
          />

          {/* Realistic shading overlay */}
          <path
            d="M 150 78 C 115 80, 85 75, 75 92 L 42 125 C 27 140, 42 185, 57 180 L 80 155 L 82 355 C 85 363, 315 363, 318 355 L 320 155 L 343 180 C 358 185, 373 140, 358 125 L 325 92 C 315 75, 285 80, 250 78 Z"
            fill="url(#hoodieShade)"
            style={{ mixBlendMode: 'multiply' }}
          />

          {/* Arm Folds for premium look */}
          <path d="M 82 155 Q 65 130 55 120" stroke="#000" strokeWidth="1" strokeOpacity={0.1} fill="none" />
          <path d="M 318 155 Q 335 130 345 120" stroke="#000" strokeWidth="1" strokeOpacity={0.1} fill="none" />
        </svg>
      );

    case 'mug':
      return (
        <svg
          viewBox="0 0 400 400"
          className={className}
          aria-label="Coffee Mug Mockup"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Cylinder-wrap shadow */}
            <linearGradient id="mugCylinderShade" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#000000" stopOpacity={0.25} />
              <stop offset="12%" stopColor="#FFFFFF" stopOpacity={0.1} />
              <stop offset="30%" stopColor="#FFFFFF" stopOpacity={0.3} />
              <stop offset="55%" stopColor="#FFFFFF" stopOpacity={0.0} />
              <stop offset="85%" stopColor="#000000" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#000000" stopOpacity={0.4} />
            </linearGradient>

            {/* Specular gloss highlight */}
            <linearGradient id="mugSpecular" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0} />
              <stop offset="18%" stopColor="#FFFFFF" stopOpacity={0.55} />
              <stop offset="21%" stopColor="#FFFFFF" stopOpacity={0.55} />
              <stop offset="28%" stopColor="#FFFFFF" stopOpacity={0} />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
            </linearGradient>

            {/* General shadow below mug */}
            <radialGradient id="dropShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#000000" stopOpacity={0.22} />
              <stop offset="70%" stopColor="#000000" stopOpacity={0.07} />
              <stop offset="100%" stopColor="#000000" stopOpacity={0.0} />
            </radialGradient>
          </defs>

          {/* Ground soft drop shadow */}
          <ellipse cx="200" cy="350" rx="100" ry="12" fill="url(#dropShadow)" />

          {/* Mug Handle (Drawn slightly behind first, or overlaid) */}
          <path
            d="M 270 140 
               C 340 140, 350 290, 270 290 
               C 310 275, 310 155, 270 140"
            fill={resolvedSecondary}
            stroke="#000"
            strokeWidth="1.25"
            style={{ transition: 'fill 0.3s ease' }}
          />
          {/* Handle shadow/depth wrap */}
          <path
            d="M 270 140 C 340 140, 350 290, 270 290 C 310 275, 310 155, 270 140"
            fill="black"
            fillOpacity={0.12}
          />
          <path
            d="M 270 140 C 340 140, 350 290, 270 290 C 310 275, 310 155, 270 140"
            fill="url(#mugCylinderShade)"
            style={{ mixBlendMode: 'multiply' }}
          />

          {/* Clean Cylinder Body */}
          <path
            d="M 120 120 
               L 120 310 
               C 120 335, 280 335, 280 310 
               L 280 120 
               Z"
            fill={color}
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinejoin="round"
            style={{ transition: 'fill 0.3s ease' }}
          />

          {/* Mug Interior Wall (visible when looking slightly down) */}
          <ellipse
            cx="200"
            cy="120"
            rx="80"
            ry="20"
            fill={resolvedSecondary}
            stroke="#000000"
            strokeWidth="1.25"
            style={{ transition: 'fill 0.3s ease' }}
          />
          {/* Shadow inside the cup rim */}
          <ellipse
            cx="200"
            cy="120"
            rx="80"
            ry="20"
            fill="none"
            stroke="#000"
            strokeWidth="1.5"
          />
          <ellipse
            cx="200"
            cy="124"
            rx="75"
            ry="17"
            fill="#000000"
            fillOpacity={0.15}
          />

          {/* 3D Round Cylinder shading overlay */}
          <path
            d="M 120 120 L 120 310 C 120 335, 280 335, 280 310 L 280 120 Z"
            fill="url(#mugCylinderShade)"
            style={{ mixBlendMode: 'multiply' }}
          />

          {/* Specular Glow Reflection (Glossy ceramic finish) */}
          <path
            d="M 120 120 L 120 310 C 120 335, 280 335, 280 310 L 280 120 Z"
            fill="url(#mugSpecular)"
            style={{ mixBlendMode: 'screen' }}
          />

          {/* Bottom curve rim line */}
          <path
            d="M 120 310 C 120 335, 280 335, 280 310"
            fill="none"
            stroke="#000"
            strokeWidth="1"
            strokeOpacity={0.2}
          />
        </svg>
      );

    case 'bottle':
      return (
        <svg
          viewBox="0 0 400 400"
          className={className}
          aria-label="Insulated Flask Model"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Mirror reflection */}
            <linearGradient id="flaskShine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#000000" stopOpacity={0.35} />
              <stop offset="15%" stopColor="#FFFFFF" stopOpacity={0.2} />
              <stop offset="28%" stopColor="#FFFFFF" stopOpacity={0.5} />
              <stop offset="38%" stopColor="#FFFFFF" stopOpacity={0.0} />
              <stop offset="70%" stopColor="#000000" stopOpacity={0.0} />
              <stop offset="90%" stopColor="#000000" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#000000" stopOpacity={0.45} />
            </linearGradient>
            <radialGradient id="flaskShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#000000" stopOpacity={0.28} />
              <stop offset="75%" stopColor="#000000" stopOpacity={0.0} />
            </radialGradient>
          </defs>

          {/* Ground drop shadow */}
          <ellipse cx="200" cy="365" rx="55" ry="8" fill="url(#flaskShadow)" />

          {/* Stopper Cap base */}
          <path d="M 180 80 Q 200 78 220 80 L 216 98 Q 200 102 184 98 Z" fill="#4B5563" stroke="#1F2937" strokeWidth="1" />
          {/* Silver metallic twist lid */}
          <rect x="186" y="60" width="28" height="20" rx="3" fill="#D1D5DB" stroke="#374151" strokeWidth="1" />
          <line x1="193" y1="60" x2="193" y2="80" stroke="#9CA3AF" />
          <line x1="200" y1="60" x2="200" y2="80" stroke="#9CA3AF" />
          <line x1="207" y1="60" x2="207" y2="80" stroke="#9CA3AF" />
          {/* Metal carrying loop handle */}
          <path d="M 214 70 C 235 70, 240 95, 215 95" fill="none" stroke="#9CA3AF" strokeWidth="3" strokeLinecap="round" />

          {/* Bottle Shoulders and Tall Cylindrical Body */}
          <path
            d="M 183 98 
               Q 200 102 217 98 
               C 224 110, 245 125, 248 140 
               L 248 340 
               C 248 355, 152 355, 152 340 
               L 152 140 
               C 155 125, 176 110, 183 98 
               Z"
            fill={color}
            stroke="#111827"
            strokeWidth="1.5"
            strokeLinejoin="round"
            style={{ transition: 'fill 0.3s ease' }}
          />

          {/* Bottle Collar Accents */}
          <path d="M 174 110 Q 200 115 226 110" fill="none" stroke="#000" strokeWidth="0.75" strokeOpacity={0.2} />

          {/* Shading reflect filter overlay */}
          <path
            d="M 183 98 Q 200 102 217 98 C 224 110, 245 125, 248 140 L 248 340 C 248 355, 152 355, 152 340 L 152 140 C 155 125, 176 110, 183 98 Z"
            fill="url(#flaskShine)"
          />
        </svg>
      );

    case 'tote':
      return (
        <svg
          viewBox="0 0 400 400"
          className={className}
          aria-label="Tote Bag Mockup"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="linenTexture" width="6" height="6" patternUnits="userSpaceOnUse">
              <rect width="6" height="6" fill="none" />
              <line x1="0" y1="3" x2="6" y2="3" stroke="#000000" strokeWidth="0.75" strokeOpacity={0.03} />
              <line x1="3" y1="0" x2="3" y2="6" stroke="#000000" strokeWidth="0.75" strokeOpacity={0.03} />
            </pattern>
            <linearGradient id="toteLighting" x1="15%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.16} />
              <stop offset="45%" stopColor="#FFFFFF" stopOpacity={0.0} />
              <stop offset="85%" stopColor="#000000" stopOpacity={0.18} />
              <stop offset="100%" stopColor="#000000" stopOpacity={0.3} />
            </linearGradient>
            <radialGradient id="toteDropShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#000000" stopOpacity={0.18} />
              <stop offset="80%" stopColor="#000000" stopOpacity={0.0} />
            </radialGradient>
          </defs>

          {/* Soft drop shadow on coordinates */}
          <ellipse cx="200" cy="380" rx="122" ry="10" fill="url(#toteDropShadow)" />

          {/* Strap Left */}
          <path
            d="M 155 145 C 150 20, 195 18, 195 40 Q 195 80, 163 145 Z"
            fill="none"
            stroke={resolvedSecondary}
            strokeWidth="11"
            strokeLinecap="square"
            style={{ transition: 'stroke 0.3s ease' }}
          />
          <path
            d="M 155 145 C 150 20, 195 18, 195 40 Q 195 80, 163 145 Z"
            fill="none"
            stroke="#000000"
            strokeWidth="11"
            strokeOpacity={0.08}
          />
          <path
            d="M 155 145 C 150 20, 195 18, 195 40 Q 195 80, 163 145 Z"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeDasharray="2,3"
            strokeOpacity={0.4}
          />

          {/* Strap Right */}
          <path
            d="M 237 145 C 230 20, 248 18, 205 40 Q 205 80, 245 145 Z"
            fill="none"
            stroke={resolvedSecondary}
            strokeWidth="11"
            strokeLinecap="square"
            style={{ transition: 'stroke 0.3s ease' }}
          />
          <path
            d="M 237 145 C 230 20, 248 18, 205 40 Q 205 80, 245 145 Z"
            fill="none"
            stroke="#000000"
            strokeWidth="11"
            strokeOpacity={0.08}
          />
          <path
            d="M 237 145 C 230 20, 248 18, 205 40 Q 205 80, 245 145 Z"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeDasharray="2,3"
            strokeOpacity={0.4}
          />

          {/* Tote Canvas Bag Main Body */}
          <path
            d="M 100 140 
               L 300 140 
               C 305 140, 310 148, 308 160 
               L 288 360 
               C 285 373, 275 377, 260 377 
               L 140 377 
               C 125 377, 115 373, 112 360 
               L 92 160 
               C 90 148, 95 140, 100 140 
               Z"
            fill={color}
            stroke="#4A3B32"
            strokeWidth="1.5"
            strokeLinejoin="round"
            style={{ transition: 'fill 0.3s ease' }}
          />

          {/* Stitching and folding details */}
          {/* Top border hem stitching */}
          <line x1="97" y1="150" x2="303" y2="150" stroke="#000" strokeWidth="0.5" strokeDasharray="3, 2" strokeOpacity={0.25} />
          <line x1="95" y1="155" x2="305" y2="155" stroke="#000" strokeWidth="0.5" strokeDasharray="3, 2" strokeOpacity={0.25} />

          {/* Pocket attachments reinforcement box on Straps */}
          {/* Left Strap box anchor */}
          <rect x="150" y="140" width="12" height="18" fill="none" stroke="#000000" strokeWidth="0.5" strokeOpacity={0.4} />
          <line x1="150" y1="140" x2="162" y2="158" stroke="#000000" strokeWidth="0.5" strokeOpacity={0.4} />
          <line x1="162" y1="140" x2="150" y2="158" stroke="#000000" strokeWidth="0.5" strokeOpacity={0.4} />

          {/* Right Strap box anchor */}
          <rect x="238" y="140" width="12" height="18" fill="none" stroke="#000000" strokeWidth="0.5" strokeOpacity={0.4} />
          <line x1="238" y1="140" x2="250" y2="158" stroke="#000000" strokeWidth="0.5" strokeOpacity={0.4} />
          <line x1="250" y1="140" x2="238" y2="158" stroke="#000000" strokeWidth="0.5" strokeOpacity={0.4} />

          {/* Linen Webbing Texture Layer */}
          <path
            d="M 100 140 L 300 140 C 305 140, 310 148, 308 160 L 288 360 C 285 373, 275 377, 260 377 L 140 377 C 125 377, 115 373, 112 360 L 92 160 C 90 148, 95 140, 100 140 Z"
            fill="url(#linenTexture)"
          />

          {/* Shadow folds down vertical body */}
          <path d="M 130 140 Z" />
          <path d="M 152 140 Q 148 250 135 377" fill="none" stroke="#000000" strokeWidth="1" strokeOpacity={0.06} />
          <path d="M 248 140 Q 252 250 265 377" fill="none" stroke="#000000" strokeWidth="1" strokeOpacity={0.06} />
          <path d="M 195 140 Q 200 250 205 377" fill="none" stroke="#000000" strokeWidth="1" strokeOpacity={0.05} />

          {/* Generative Lighting mask */}
          <path
            d="M 100 140 L 300 140 C 305 140, 310 148, 308 160 L 288 360 C 285 373, 275 377, 260 377 L 140 377 C 125 377, 115 373, 112 360 L 92 160 C 90 148, 95 140, 100 140 Z"
            fill="url(#toteLighting)"
            style={{ mixBlendMode: 'multiply' }}
          />
        </svg>
      );

    case 'notebook':
      return (
        <svg
          viewBox="0 0 400 400"
          className={className}
          aria-label="Notebook Journal Template"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="notebookLighting" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.25} />
              <stop offset="4%" stopColor="#FFFFFF" stopOpacity={0.1} />
              <stop offset="12%" stopColor="#FFFFFF" stopOpacity={0.0} />
              <stop offset="85%" stopColor="#000000" stopOpacity={0.18} />
              <stop offset="100%" stopColor="#000000" stopOpacity={0.4} />
            </linearGradient>
            <radialGradient id="bookShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#000000" stopOpacity={0.25} />
              <stop offset="85%" stopColor="#000000" stopOpacity={0.0} />
            </radialGradient>
            {/* Fine leather grain */}
            <pattern id="grainTexture" width="4" height="4" patternUnits="userSpaceOnUse">
              <rect width="4" height="4" fill="none" />
              <circle cx="2" cy="2" r="0.75" fill="#000000" fillOpacity={0.025} />
            </pattern>
          </defs>

          {/* Realistic Book shadow */}
          <rect x="110" y="70" width="190" height="275" rx="8" fill="url(#bookShadow)" transform="matrix(1 0.02 -0.02 1 6 3)" opacity={0.6} />

          {/* Pages visible slightly at bottom and right */}
          <rect x="135" y="64" width="160" height="275" rx="3" fill="#FAF9F6" stroke="#D1D5DB" strokeWidth="0.5" />
          <line x1="295" y1="68" x2="295" y2="335" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="1,1" />

          {/* Bookmark Ribbon poking out from bottom */}
          <path d="M 215 330 C 215 365, 230 360, 225 385 L 237 385 C 242 360, 225 365, 225 330 Z" fill={resolvedSecondary} stroke="#000" strokeWidth="0.5" />

          {/* Main Leatherette Front Cover */}
          <rect
            x="130"
            y="60"
            width="164"
            height="276"
            rx="6"
            fill={color}
            stroke="#1F2937"
            strokeWidth="1"
            style={{ transition: 'fill 0.3s ease' }}
          />

          {/* Leatherette debossed spine ribbing on Left strip */}
          <path d="M 140 60 L 140 336" stroke="#000000" strokeWidth="1.5" strokeOpacity={0.25} />
          <path d="M 141 60 L 141 336" stroke="#FFFFFF" strokeWidth="0.75" strokeOpacity={0.15} />

          {/* Spine crease indented line */}
          <path d="M 148 60 L 148 336" stroke="#000000" strokeWidth="1" strokeOpacity={0.3} />
          <path d="M 149 60 L 149 336" stroke="#FFFFFF" strokeWidth="0.5" strokeOpacity={0.2} />

          {/* Fine Leather Grain Overlay */}
          <rect x="130" y="60" width="164" height="276" rx="6" fill="url(#grainTexture)" />

          {/* Elastic Band Closure on right hook (Customizable color) */}
          <rect x="268" y="60" width="10" height="276" rx="1" fill="#2D3748" stroke="#1A202C" strokeWidth="0.5" />
          {/* Elastic weaves lines */}
          <line x1="271" y1="60" x2="271" y2="336" stroke="#4A5568" strokeWidth="0.5" />
          <line x1="273" y1="60" x2="273" y2="336" stroke="#4A5568" strokeWidth="0.5" />
          <line x1="275" y1="60" x2="275" y2="336" stroke="#4A5568" strokeWidth="0.5" />

          {/* Debossed cover border outline */}
          <rect x="134" y="64" width="156" height="268" rx="4" fill="none" stroke="#000" strokeWidth="0.75" strokeOpacity={0.15} />
          <rect x="135" y="65" width="156" height="268" rx="4" fill="none" stroke="#fff" strokeWidth="0.5" strokeOpacity={0.08} />

          {/* Photorealistic Lighting & 3D Shading gradient overlay */}
          <rect
            x="130"
            y="60"
            width="164"
            height="276"
            rx="6"
            fill="url(#notebookLighting)"
            style={{ mixBlendMode: 'multiply' }}
          />
        </svg>
      );

    case 'cap':
      return (
        <svg
          viewBox="0 0 400 400"
          className={className}
          aria-label="Baseball Cap Template"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="capShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#000000" stopOpacity={0.24} />
              <stop offset="80%" stopColor="#000000" stopOpacity={0.0} />
            </radialGradient>
            <linearGradient id="visorLighting" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.15} />
              <stop offset="35%" stopColor="#FFFFFF" stopOpacity={0.0} />
              <stop offset="70%" stopColor="#000000" stopOpacity={0.05} />
              <stop offset="100%" stopColor="#000000" stopOpacity={0.3} />
            </linearGradient>
            <linearGradient id="crownLighting" x1="30%" y1="10%" x2="70%" y2="90%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.22} />
              <stop offset="45%" stopColor="#FFFFFF" stopOpacity={0.0} fillOpacity={0} />
              <stop offset="90%" stopColor="#000000" stopOpacity={0.28} />
              <stop offset="100%" stopColor="#000000" stopOpacity={0.45} />
            </linearGradient>
          </defs>

          {/* Cap ground drop shadow */}
          <ellipse cx="200" cy="305" rx="100" ry="9" fill="url(#capShadow)" />

          {/* Visor / Brim - Located at bottom (Colored with resolvedSecondary!) */}
          <path
            d="M 125 240 
               C 105 242, 85 258, 85 272 
               C 85 292, 140 300, 200 300 
               C 260 300, 315 292, 315 272 
               C 315 258, 295 242, 275 240
               C 255 258, 145 258, 125 240 Z"
            fill={resolvedSecondary}
            stroke="#1F2937"
            strokeWidth="1.25"
            strokeLinejoin="round"
            style={{ transition: 'fill 0.3s ease' }}
          />
          {/* Visor Stitching Lines */}
          <path d="M 98 274 C 115 288, 285 288, 302 274" fill="none" stroke="#FFF" strokeWidth="0.75" strokeOpacity={0.25} strokeDasharray="3,2" />
          <path d="M 112 281 C 135 292, 265 292, 288 281" fill="none" stroke="#FFF" strokeWidth="0.75" strokeOpacity={0.25} strokeDasharray="3,2" />

          {/* Visor shading accent */}
          <path
            d="M 125 240 C 105 242, 85 258, 85 272 C 85 292, 140 300, 200 300 C 260 300, 315 292, 315 272 C 315 258, 295 242, 275 240 C 255 258, 145 258, 125 240 Z"
            fill="url(#visorLighting)"
          />

          {/* Main Crown dome (6 panels structured) */}
          <path
            d="M 120 240 
               C 105 200, 115 115, 200 115 
               C 285 115, 295 200, 280 240 
               C 260 252, 140 252, 120 240 Z"
            fill={color}
            stroke="#1F2937"
            strokeWidth="1.5"
            style={{ transition: 'fill 0.3s ease' }}
          />

          {/* Crown Seams Panel Lines */}
          {/* Vertical center seam */}
          <path d="M 200 115 Q 200 182 200 248" fill="none" stroke="#000" strokeWidth="0.75" strokeOpacity={0.2} />
          {/* Diagonal Left Panel seam */}
          <path d="M 200 115 Q 160 180 148 243" fill="none" stroke="#000" strokeWidth="0.75" strokeOpacity={0.2} />
          {/* Diagonal Right Panel seam */}
          <path d="M 200 115 Q 240 180 252 243" fill="none" stroke="#000" strokeWidth="0.75" strokeOpacity={0.2} />

          {/* Stitched Eyelets circles on panels */}
          <circle cx="160" cy="165" r="3" fill="none" stroke="#000" strokeWidth="1" strokeOpacity={0.25} />
          <circle cx="200" cy="155" r="3" fill="none" stroke="#000" strokeWidth="1" strokeOpacity={0.25} />
          <circle cx="240" cy="165" r="3" fill="none" stroke="#000" strokeWidth="1" strokeOpacity={0.25} />

          {/* Top covered button matching the visor/brim secondary color */}
          <ellipse cx="200" cy="115" rx="8" ry="4" fill={resolvedSecondary} stroke="#000" strokeWidth="1" style={{ transition: 'fill 0.3s ease' }} />
          <ellipse cx="200" cy="115" rx="8" ry="4" fill="black" fillOpacity={0.12} />

          {/* Crown Photorealistic 3D Lighting shading overlay */}
          <path
            d="M 120 240 C 105 200, 115 115, 200 115 C 285 115, 295 200, 280 240 C 260 252, 140 252, 120 240 Z"
            fill="url(#crownLighting)"
            style={{ mixBlendMode: 'multiply' }}
          />
        </svg>
      );

    default:
      return null;
  }
};
