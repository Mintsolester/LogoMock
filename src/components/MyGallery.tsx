import React from 'react';
import { MockupProject } from '../types';
import { PRODUCT_PRESETS } from '../presets';
import { ProductSVG } from './ProductSVG';
import { Download, Trash2, FolderOpen, Grid, Smile } from 'lucide-react';

interface MyGalleryProps {
  projects: MockupProject[];
  onLoadProject: (project: MockupProject) => void;
  onDeleteProject: (projectId: string) => void;
  onClearAll: () => void;
}

export const MyGallery: React.FC<MyGalleryProps> = ({
  projects,
  onLoadProject,
  onDeleteProject,
  onClearAll,
}) => {
  // Helper to resolve preset details
  const getPresetName = (type: string) => {
    if (type === 'custom') return 'Custom Backdrop';
    const preset = PRODUCT_PRESETS.find(p => p.id === type);
    return preset ? preset.name : type;
  };

  return (
    <div id="gallery-root" className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 transition-colors duration-200">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-5 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 rounded-xl">
            <Grid id="gallery-icon" className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white leading-tight">My Saved Showcase</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Your personalized mockups stored securely in your browser cache.</p>
          </div>
        </div>

        {projects.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to discard your entire collection? This cannot be undone.')) {
                onClearAll();
              }
            }}
            id="clear-gallery-btn"
            className="text-xs text-rose-600 hover:text-rose-700 font-medium px-3 py-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors border border-transparent hover:border-rose-100 dark:hover:border-rose-900/40 cursor-pointer"
          >
            Clear Collection
          </button>
        )}
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-950/30">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 mb-3.5">
            <Smile className="w-6 h-6 stroke-[1.5]" />
          </div>
          <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">No mockups saved yet</h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1.5 max-w-xs">
            Start by uploading your logo, adjusting the placement on a product, and clicking <strong>"Save Design"</strong> above to populate your gallery.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const hasCustomBg = project.productType === 'custom' && project.customBackgroundUrl;
            const preset = PRODUCT_PRESETS.find(p => p.id === project.productType);
            const bounds = preset?.logoBoundaries || { width: '30%', height: '30%', top: '35%', left: '35%' };

            return (
              <div
                key={project.id}
                id={`gallery-project-${project.id}`}
                className="group relative bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col"
              >
                {/* Visual Thumbnail Frame */}
                <div className="aspect-square w-full relative flex items-center justify-center bg-radial from-white dark:from-slate-800 to-slate-100 dark:to-slate-950 p-4 border-b border-slate-200/40 dark:border-slate-800/60">
                  <div className="w-full h-full max-w-[80%] max-h-[80%] relative flex items-center justify-center pointer-events-none">
                    {hasCustomBg ? (
                      <img
                        src={project.customBackgroundUrl}
                        alt="Custom container"
                        className="w-full h-full object-contain rounded-md"
                      />
                    ) : (
                      <ProductSVG
                        type={project.productType as any}
                        color={project.productColor}
                        secondaryColor={project.secondaryColor}
                        className="w-full h-full drop-shadow-md"
                      />
                    )}

                    {/* Miniature Printed Logo */}
                    <div
                      className="absolute pointer-events-none flex items-center justify-center"
                      style={{
                        width: bounds.width,
                        height: bounds.height,
                        top: bounds.top,
                        left: bounds.left,
                      }}
                    >
                      <img
                        src={project.logo.url}
                        alt="Mini logo"
                        referrerPolicy="no-referrer"
                        className="max-w-full max-h-full object-contain"
                        style={{
                          transform: `translate(${project.logo.x}%, ${project.logo.y}%) scale(${project.logo.scale}) rotate(${project.logo.rotation}deg)`,
                          opacity: project.logo.opacity,
                          mixBlendMode: project.logo.blendMode as any,
                          // Render simple grayscale or tint filter in miniature if specified
                          filter: project.logo.colorTint 
                            ? `sepia(1) saturate(10) hue-rotate(${parseInt(project.logo.colorTint.replace('#',''), 16) % 360}deg)` 
                            : undefined,
                        }}
                      />
                    </div>
                  </div>

                  {/* Quick Load/Discard Overlay Actions on Hover */}
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
                    <button
                      onClick={() => onLoadProject(project)}
                      title="Load design in Editor"
                      className="p-2.5 bg-white hover:bg-slate-100 text-slate-800 rounded-lg shadow-sm transition-transform active:scale-95 flex items-center justify-center cursor-pointer"
                    >
                      <FolderOpen className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteProject(project.id)}
                      title="Discard Design"
                      className="p-2.5 bg-rose-600 text-white hover:bg-rose-700 rounded-lg shadow-sm transition-transform active:scale-95 flex items-center justify-center cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Info and Metadata label panel */}
                <div className="p-3.5 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider font-mono">
                        {preset?.category || 'Custom Space'}
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-550 font-mono">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate mt-1">
                      {project.name}
                    </h4>

                    {/* Pill Configuration Specifications */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <div className="flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 text-[10px] font-medium text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded">
                        <div
                          className="w-2.5 h-2.5 rounded-full border border-slate-300 dark:border-slate-700"
                          style={{ backgroundColor: project.productColor }}
                        />
                        {project.productColor}
                      </div>

                      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 text-[10px] font-medium text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded capitalize font-mono">
                        {getPresetName(project.productType)}
                      </div>
                    </div>
                  </div>

                  {/* Reload direct trigger block */}
                  <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between">
                    <button
                      onClick={() => onLoadProject(project)}
                      className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                    >
                      <FolderOpen className="w-3.5 h-3.5" />
                      Configure
                    </button>

                    <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate max-w-[120px]" title={project.logo.name}>
                      Logo: {project.logo.name}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
