import React, { useRef, useState, useEffect } from 'react';
import { LogoConfig, ProductPreset } from '../types';
import { ProductSVG } from './ProductSVG';

interface MockupCanvasProps {
  productType: 'mug' | 'tshirt' | 'hoodie' | 'tote' | 'bottle' | 'notebook' | 'cap' | 'custom';
  productColor: string;
  secondaryColor?: string;
  logo: LogoConfig | null;
  preset: ProductPreset | null;
  customBackgroundUrl?: string;
  isInteractive?: boolean; // Whether dragging/scaling handles are visible
  onUpdateLogo?: (updates: Partial<LogoConfig>) => void;
  showPrintBoundary?: boolean;
}

export const MockupCanvas: React.FC<MockupCanvasProps> = ({
  productType,
  productColor,
  secondaryColor = 'matching',
  logo,
  preset,
  customBackgroundUrl,
  isInteractive = true,
  onUpdateLogo,
  showPrintBoundary = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const boundaryRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, logoX: 0, logoY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Generate unique filter ID for specific logo color tinter to avoid collisions
  const tintFilterId = logo?.colorTint
    ? `tint-${logo.colorTint.replace('#', '')}`
    : '';

  // Get active boundaries (percentage layout parameters)
  const bounds = preset?.logoBoundaries || {
    width: '30%',
    height: '30%',
    top: '35%',
    left: '35%',
  };

  // Direct Drag Handler to position Logo
  const handleStartDrag = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isInteractive || !logo || !onUpdateLogo) return;
    
    e.preventDefault();
    setIsDragging(true);

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    setDragStart({
      x: clientX,
      y: clientY,
      logoX: logo.x,
      logoY: logo.y,
    });
  };

  useEffect(() => {
    const handleMoveDrag = (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !logo || !onUpdateLogo || !boundaryRef.current) return;

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - dragStart.x;
      const deltaY = clientY - dragStart.y;

      // Translate pixels to percentage scale relative to the printable area boundary's width and height
      const boundaryRect = boundaryRef.current.getBoundingClientRect();
      const pctXLength = boundaryRect.width / 2; // scale factor
      const pctYLength = boundaryRect.height / 2; // scale factor

      const newLogoX = dragStart.logoX + (deltaX / (pctXLength || 1)) * 100;
      const newLogoY = dragStart.logoY + (deltaY / (pctYLength || 1)) * 100;

      // Constrain within reason (-180 to +180 percentage range)
      onUpdateLogo({
        x: Math.max(-150, Math.min(150, newLogoX)),
        y: Math.max(-150, Math.min(150, newLogoY)),
      });
    };

    const handleEndDrag = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMoveDrag, { passive: false });
      window.addEventListener('mouseup', handleEndDrag);
      window.addEventListener('touchmove', handleMoveDrag, { passive: false });
      window.addEventListener('touchend', handleEndDrag);
    }

    return () => {
      window.removeEventListener('mousemove', handleMoveDrag);
      window.removeEventListener('mouseup', handleEndDrag);
      window.removeEventListener('touchmove', handleMoveDrag);
      window.removeEventListener('touchend', handleEndDrag);
    };
  }, [isDragging, logo, onUpdateLogo, dragStart]);

  // Helper utility to export high quality canvas mockups
  const handleExportMockup = async (downloadName = 'my-product-mockup.png') => {
    if (!containerRef.current) return;
    try {
      // Create offscreen canvas with high dpi representation
      const exportCanvas = document.createElement('canvas');
      exportCanvas.width = 1200;
      exportCanvas.height = 1200;
      const ctx = exportCanvas.getContext('2d');
      if (!ctx) return;

      // 1. Draw a beautiful background gradient representing the showcase studio card
      const bgGrad = ctx.createLinearGradient(0, 0, 0, 1200);
      bgGrad.addColorStop(0, '#FFFFFF');
      bgGrad.addColorStop(1, '#F3F4F6');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1200, 1200);

      // Draw studio floor shadow
      ctx.beginPath();
      ctx.ellipse(600, 1050, 450, 45, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fill();

      // 2. We can convert the inline Product SVG to an image source and render it onto canvas
      // Let's grab the SVG node inside the DOM and serialize it
      const svgElement = containerRef.current.querySelector('svg');
      if (svgElement && productType !== 'custom') {
        const svgString = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);
        
        await new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            ctx.drawImage(img, 100, 100, 1000, 1000);
            URL.revokeObjectURL(svgUrl);
            resolve();
          };
          img.onerror = () => {
            // Draw a fallback card if fail
            ctx.strokeStyle = '#D1D5DB';
            ctx.strokeRect(100, 100, 1000, 1000);
            URL.revokeObjectURL(svgUrl);
            resolve();
          };
          img.src = svgUrl;
        });
      } else if (productType === 'custom' && customBackgroundUrl) {
         // Draw custom uploaded user background
         await new Promise<void>((resolve) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            // Aspect ratio preserving zoom-to-fit
            const scale = Math.max(1000 / img.width, 1000 / img.height);
            const w = img.width * scale;
            const h = img.height * scale;
            const x = 100 + (1000 - w) / 2;
            const y = 100 + (1000 - h) / 2;
            
            ctx.save();
            ctx.beginPath();
            ctx.rect(100, 100, 1000, 1000);
            ctx.clip();
            ctx.drawImage(img, x, y, w, h);
            ctx.restore();
            resolve();
          };
          img.onerror = () => resolve();
          img.src = customBackgroundUrl;
        });
      }

      // 3. Draw placing Logo if exists
      if (logo) {
        await new Promise<void>((resolve) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            // Compute dimensions matching target preset boundaries on 1200x1200px export coordinate canvas
            // Standard bounding boxes are specified in percentage strings like "34%"
            const parsePct = (valStr: string) => parseFloat(valStr.replace('%', '')) / 100;
            
            const areaW = parsePct(bounds.width) * 1000;
            const areaH = parsePct(bounds.height) * 1000;
            const areaLeft = 100 + parsePct(bounds.left) * 1000;
            const areaTop = 100 + parsePct(bounds.top) * 1000;

            const cx = areaLeft + areaW / 2;
            const cy = areaTop + areaH / 2;

            // Compute standard logo sizing based on aspect ratio
            const imgAspect = img.width / img.height;
            let logoW = areaW * 0.9 * logo.scale;
            let logoH = logoW / imgAspect;

            if (logoH > areaH * 0.9 * logo.scale) {
              logoH = areaH * 0.9 * logo.scale;
              logoW = logoH * imgAspect;
            }

            // Apply positions
            const logoCx = cx + (logo.x / 100) * (areaW / 2);
            const logoCy = cy + (logo.y / 100) * (areaH / 2);

            ctx.save();
            
            // Clip within printable area if required
            // In canvas physical rendering, it's safer to allow overflow unless designated.
            // On mugs / tees, standard printable boundaries act as visual restrictions only, but we can clip!
            ctx.beginPath();
            ctx.rect(areaLeft, areaTop, areaW, areaH);
            ctx.clip();

            // Set blend mode
            if (logo.blendMode === 'multiply') {
              ctx.globalCompositeOperation = 'multiply';
            } else if (logo.blendMode === 'screen') {
              ctx.globalCompositeOperation = 'screen';
            } else if (logo.blendMode === 'overlay') {
              ctx.globalCompositeOperation = 'overlay';
            } else {
              ctx.globalCompositeOperation = 'source-over';
            }

            ctx.globalAlpha = logo.opacity;

            // Apply translations (Rotate and Translate)
            ctx.translate(logoCx, logoCy);
            ctx.rotate((logo.rotation * Math.PI) / 180);

            // Circular crop circle mask
            if (logo.isCircularMask) {
              ctx.beginPath();
              // Create dynamic circle encompassing bounding range
              const size = Math.max(logoW, logoH);
              ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
              ctx.clip();
            }

            // Draw logo centered
            ctx.drawImage(img, -logoW / 2, -logoH / 2, logoW, logoH);

            ctx.restore();

            // If we have logo colorTint, we can paint a color flood over the source pixels
            if (logo.colorTint) {
              // Reset composite to source-in over the printed logo area
              // But on standard canvas drawing we can do it via a pixel-level overlay or a simple re-draw pattern
              // Standard approach for direct canvas solid recolor is:
              // Draw the image first, then fill canvas with tint color using composite mode 'source-in'
              // Let us create an offscreen buffer canvas for the tinted logo
              const tintBuffer = document.createElement('canvas');
              tintBuffer.width = logoW;
              tintBuffer.height = logoH;
              const tCtx = tintBuffer.getContext('2d');
              if (tCtx) {
                tCtx.drawImage(img, 0, 0, logoW, logoH);
                tCtx.globalCompositeOperation = 'source-in';
                tCtx.fillStyle = logo.colorTint;
                tCtx.fillRect(0, 0, logoW, logoH);

                // Now paint this tint buffer onto primary canvas instead
                ctx.save();
                ctx.beginPath();
                ctx.rect(areaLeft, areaTop, areaW, areaH);
                ctx.clip();
                if (logo.blendMode === 'multiply') ctx.globalCompositeOperation = 'multiply';
                ctx.globalAlpha = logo.opacity;
                ctx.translate(logoCx, logoCy);
                ctx.rotate((logo.rotation * Math.PI) / 180);
                if (logo.isCircularMask) {
                  ctx.beginPath();
                  ctx.arc(0, 0, Math.max(logoW, logoH) / 2, 0, Math.PI * 2);
                  ctx.clip();
                }
                ctx.drawImage(tintBuffer, -logoW / 2, -logoH / 2, logoW, logoH);
                ctx.restore();
              }
            }

            resolve();
          };
          img.onerror = () => resolve();
          img.src = logo.url;
        });
      }

      // 4. Download file
      const link = document.createElement('a');
      link.download = downloadName;
      link.href = exportCanvas.toDataURL('image/png', 1.0);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error generating high res download:', err);
    }
  };

  // Expose download trigger to window for reference from parents
  useEffect(() => {
    if (isInteractive && typeof window !== 'undefined') {
      (window as any).exportActiveMockup = handleExportMockup;
    }
    return () => {
      if (typeof window !== 'undefined') {
        delete (window as any).exportActiveMockup;
      }
    };
  }, [logo, productType, productColor, secondaryColor, bounds, customBackgroundUrl]);

  return (
    <div
      ref={containerRef}
      id="mockup-frame"
      className="relative w-full aspect-square flex items-center justify-center bg-radial from-white dark:from-slate-800 via-slate-50 dark:via-slate-900 to-slate-100 dark:to-slate-950 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-md p-4 overflow-hidden group select-none transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsDragging(false);
      }}
    >
      {/* Studio lighting shadows and specular background lines for realistic presentation */}
      <div className="absolute inset-x-0 bottom-0 h-12 bg-radial from-black/5 to-transparent blur-md pointer-events-none" />

      {/* Dynamic SVG Recoloring Filter for Logo Tinting (Placed once safely) */}
      {logo?.colorTint && tintFilterId && (
        <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
          <defs>
            <filter id={tintFilterId} x="0%" y="0%" width="100%" height="100%">
              <feFlood floodColor={logo.colorTint} result="flood" />
              <feComposite in="flood" in2="SourceAlpha" operator="in" />
            </filter>
          </defs>
        </svg>
      )}

      {/* Render Product Base (Customized User Background or Preset SVG) */}
      <div className="w-full h-full max-w-[85%] max-h-[85%] flex items-center justify-center relative pointer-events-none">
        {productType === 'custom' && customBackgroundUrl ? (
          <img
            src={customBackgroundUrl}
            alt="Custom user mockup backdrop"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain rounded-lg shadow-sm"
          />
        ) : (
          <ProductSVG
            type={productType as any}
            color={productColor}
            secondaryColor={secondaryColor}
            className="w-full h-full drop-shadow-xl"
          />
        )}

        {/* Printable Imprint Zone bounding box overlay */}
        <div
          ref={boundaryRef}
          className={`absolute transition-all duration-300 pointer-events-auto rounded-xs ${
            showPrintBoundary && (isHovered || isDragging)
              ? 'border-2 border-dashed border-emerald-500/70 bg-emerald-500/[0.03]'
              : 'border border-transparent'
          }`}
          style={{
            width: bounds.width,
            height: bounds.height,
            top: bounds.top,
            left: bounds.left,
            cursor: logo ? (isDragging ? 'grabbing' : 'grab') : 'default',
          }}
          onMouseDown={handleStartDrag}
          onTouchStart={handleStartDrag}
        >
          {/* Print Zone Tag Hint */}
          {showPrintBoundary && (isHovered || isDragging) && (
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-emerald-600 text-[10px] uppercase tracking-wider text-white px-1.5 py-0.5 rounded font-mono font-bold shadow-sm whitespace-nowrap animate-fade-in">
              Logo Imprint Area
            </div>
          )}

          {/* Placed Logo Container */}
          {logo && (
            <div
              className={`absolute top-1/2 left-1/2 flex items-center justify-center transition-shadow ${
                logo.isCircularMask ? 'rounded-full overflow-hidden' : ''
              }`}
              style={{
                width: '90%', // Standard buffer
                height: '90%',
                transform: `translate(-50%, -50%) translate(${logo.x}%, ${logo.y}%) scale(${logo.scale}) rotate(${logo.rotation}deg)`,
                opacity: logo.opacity,
                mixBlendMode: logo.blendMode as any,
                filter: logo.colorTint ? `url(#${tintFilterId})` : undefined,
              }}
            >
              <img
                src={logo.url}
                alt={logo.name}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-full object-contain select-none pointer-events-none"
              />
            </div>
          )}

          {/* Centered target point if active editing */}
          {showPrintBoundary && isDragging && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="w-5 h-5 border border-emerald-500 rounded-full flex items-center justify-center bg-white/70">
                <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hover action guide overlay */}
      {isInteractive && !logo && (
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs flex flex-col items-center justify-center text-white p-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-10 h-10 mb-2 text-emerald-400 stroke-current animate-bounce" fill="none" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          <span className="font-medium text-sm">Upload a Logo first</span>
          <span className="text-xs text-slate-300 mt-1">Select a custom logo in the editor panel to preview</span>
        </div>
      )}

      {/* Direct Drag indicator trigger */}
      {logo && isInteractive && !isDragging && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-slate-800/80 backdrop-blur-xs text-[10px] text-white px-2 py-0.5 rounded-full pointer-events-none font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          ↔ Drag logo directly on product
        </div>
      )}
    </div>
  );
};
