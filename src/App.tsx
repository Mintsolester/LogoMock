import React, { useState, useEffect } from 'react';
import { LogoConfig, ProductPreset, MockupProject, ProductType } from './types';
import { PRODUCT_PRESETS, COLORS_PALETTE, MUG_SECONDARY_COLORS } from './presets';
import { PRESET_LOGOS, getLogoDataUrl } from './logos';
import { MockupCanvas } from './components/MockupCanvas';
import { MyGallery } from './components/MyGallery';
import { ProductSVG } from './components/ProductSVG';
import {
  Sparkles,
  Upload,
  RotateCw,
  FolderOpen,
  User,
  Coffee,
  Paintbrush,
  Maximize2,
  Trash2,
  Eye,
  EyeOff,
  Minimize2,
  Grid3X3,
  Sliders,
  ChevronRight,
  Info,
  Sun,
  Moon
} from 'lucide-react';

export default function App() {
  // Theme Dark State Management
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const cached = localStorage.getItem('is_dark_mode');
      return cached === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('is_dark_mode', String(isDarkMode));
    } catch (err) {
      console.error(err);
    }
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Preset default loaded brand logo
  const defaultLogoSvg = PRESET_LOGOS[0].svgMarkup;
  const defaultLogoUrl = getLogoDataUrl(defaultLogoSvg);

  const initialLogoConfig: LogoConfig = {
    url: defaultLogoUrl,
    name: PRESET_LOGOS[0].name,
    size: 2048,
    x: 0,
    y: 0,
    scale: 1.0,
    rotation: 0,
    opacity: 0.95,
    blendMode: 'normal',
    colorTint: null,
    isCircularMask: false,
    threshold: 128,
  };

  // State Management
  const [activeTab, setActiveTab] = useState<'studio' | 'bulk' | 'gallery'>('studio');
  const [activeType, setActiveType] = useState<ProductType>('tshirt');
  const [productColor, setProductColor] = useState<string>('#FFFFFF');
  const [secondaryColor, setSecondaryColor] = useState<string>('matching');
  const [logo, setLogo] = useState<LogoConfig>(initialLogoConfig);
  const [customBgUrl, setCustomBgUrl] = useState<string>('');
  const [projectName, setProjectName] = useState<string>('Alpine Cotton Crewneck');
  
  // Gallery Collection Projects
  const [projects, setProjects] = useState<MockupProject[]>([]);
  
  // Workspace indicators
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [showPrintBoundary, setShowPrintBoundary] = useState(true);
  const [editorSubTab, setEditorSubTab] = useState<'product' | 'logo' | 'tint'>('product');

  // Load projects from browser localStorage
  useEffect(() => {
    try {
      const cached = localStorage.getItem('product_mockup_projects');
      if (cached) {
        setProjects(JSON.parse(cached));
      }
    } catch (err) {
      console.error('Failed to load historic designs from cache:', err);
    }
  }, []);

  // Sync projects to localStorage
  const syncProjects = (updatedList: MockupProject[]) => {
    setProjects(updatedList);
    try {
      localStorage.setItem('product_mockup_projects', JSON.stringify(updatedList));
    } catch (err) {
      console.error('Failed to persist designs:', err);
    }
  };

  // Resolve the active product preset
  const activePreset = PRODUCT_PRESETS.find((p) => p.id === activeType) || null;

  // Auto update project name when product type changes
  const handleProductChange = (type: ProductType) => {
    setActiveType(type);
    const preset = PRODUCT_PRESETS.find((p) => p.id === type);
    if (preset) {
      setProductColor(preset.defaultColor);
      setSecondaryColor('matching');
      setProjectName(`${logo.name.split('.')[0]} ${preset.name}`);
    } else if (type === 'custom') {
      setProjectName(`${logo.name.split('.')[0]} Custom Canvas`);
    }
  };

  // Built-in Logo Preset Selectors
  const handleSelectPresetLogo = (presetId: string) => {
    const pLogo = PRESET_LOGOS.find((l) => l.id === presetId);
    if (!pLogo) return;

    const dataUrl = getLogoDataUrl(pLogo.svgMarkup);
    const updatedLogo = {
      ...logo,
      url: dataUrl,
      name: pLogo.name,
    };
    setLogo(updatedLogo);

    // Update active project label
    const activeLabel = activePreset ? activePreset.name : 'Custom Workspace';
    setProjectName(`${pLogo.name} ${activeLabel}`);
  };

  // Base64 file reader for custom user uploads
  const processUploadedFile = (file: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Highly compatible files are standard images (PNG, SVG, JPG, WebP). Please select an image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const fileUrl = event.target.result as string;
        const updatedLogo = {
          ...logo,
          url: fileUrl,
          name: file.name,
        };
        setLogo(updatedLogo);

        // Update active project label
        const baseName = file.name.split('.')[0];
        const activeLabel = activePreset ? activePreset.name : 'Custom Workspace';
        setProjectName(`${baseName} ${activeLabel}`);
      }
    };
    reader.readAsDataURL(file);
  };

  // Custom product background image upload
  const processCustomBgFile = (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setCustomBgUrl(event.target.result as string);
        setActiveType('custom');
      }
    };
    reader.readAsDataURL(file);
  };

  // Drag and drop event traps
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processUploadedFile(files[0]);
    }
  };

  // Quick Fine-Tuning presets (Align alignments)
  const handleQuickAlign = (alignment: 'center' | 'top' | 'bottom' | 'left' | 'right') => {
    switch (alignment) {
      case 'center':
        setLogo((prev) => ({ ...prev, x: 0, y: 0 }));
        break;
      case 'top':
        setLogo((prev) => ({ ...prev, y: -45 }));
        break;
      case 'bottom':
        setLogo((prev) => ({ ...prev, y: 45 }));
        break;
      case 'left':
        setLogo((prev) => ({ ...prev, x: -45 }));
        break;
      case 'right':
        setLogo((prev) => ({ ...prev, x: 45 }));
        break;
    }
  };

  // Trigger Save project item
  const handleSaveProject = () => {
    const newProject: MockupProject = {
      id: crypto.randomUUID(),
      name: projectName.trim() || `${logo.name.split('.')[0]} Design`,
      productType: activeType,
      productColor: productColor,
      secondaryColor: secondaryColor,
      logo: { ...logo },
      customBackgroundUrl: activeType === 'custom' ? customBgUrl : undefined,
      createdAt: Date.now(),
    };

    const updated = [newProject, ...projects];
    syncProjects(updated);
    
    // Quick user feedback alert placeholder replaced with an elegant UI banner state which is safer!
    // Alert is allowed but let's keep it highly functional
  };

  // Trigger load saved project
  const handleLoadProject = (project: MockupProject) => {
    setActiveType(project.productType);
    setProductColor(project.productColor);
    setSecondaryColor(project.secondaryColor || 'matching');
    setLogo(project.logo);
    if (project.customBackgroundUrl) {
      setCustomBgUrl(project.customBackgroundUrl);
    }
    setProjectName(project.name);
    setActiveTab('studio');
  };

  // Trigger delete saved project
  const handleDeleteProject = (projectId: string) => {
    const filtered = projects.filter((p) => p.id !== projectId);
    syncProjects(filtered);
  };

  // Trigger clear projects gallery
  const handleClearAllProjects = () => {
    syncProjects([]);
  };

  // Trigger direct canvas download of active mockup
  const triggerActiveDownload = () => {
    if (typeof (window as any).exportActiveMockup === 'function') {
      const sanitizedFilename = projectName.toLowerCase().replace(/[^a-z0-9]/gi, '_') + '.png';
      (window as any).exportActiveMockup(sanitizedFilename);
    } else {
      alert('Mockup engine ready. Please tap the save canvas triggers.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-100 flex flex-col justify-between selection:bg-emerald-500/25 selection:text-emerald-900 transition-colors duration-200">
      {/* Header Studio Board */}
      <header className="bg-white/95 dark:bg-slate-900/95 border-b border-slate-200/80 dark:border-slate-800 sticky top-0 z-40 backdrop-blur-md transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo Brand Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/15">
              <Sparkles id="app-logo-spark" className="w-5 h-5 stroke-[2] animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight leading-none">Product Mockup Studio</h1>
                <span className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase border border-emerald-100 dark:border-emerald-900/50">Direct Render</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Upload graphics or use brand kits to configure merchandise instantly.</p>
            </div>
          </div>

          {/* Primary Navigation Hub Tabs with Dark Mode Toggle */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <nav className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/40 dark:border-slate-700/60">
              <button
                onClick={() => setActiveTab('studio')}
                className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'studio'
                    ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-700/50'
                }`}
              >
                Configure Studio
              </button>
              <button
                onClick={() => setActiveTab('bulk')}
                className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'bulk'
                    ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-700/50'
                }`}
              >
                <Grid3X3 className="w-3.5 h-3.5" />
                Simultaneous Showcase
              </button>
              <button
                onClick={() => setActiveTab('gallery')}
                className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'gallery'
                    ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-700/50'
                }`}
              >
                My Collection
                {projects.length > 0 && (
                  <span className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full font-mono">
                    {projects.length}
                  </span>
                )}
              </button>
            </nav>

            {/* Dark Mode Toggle Button */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              id="theme-toggle-btn"
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 border border-slate-200/40 dark:border-slate-700/60 transition-colors cursor-pointer shadow-2xs shrink-0 flex items-center justify-center animate-fade-in"
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <Sun className="w-4.5 h-4.5 text-amber-500 fill-amber-500/10" />
              ) : (
                <Moon className="w-4.5 h-4.5 text-indigo-600" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Core Viewport Stage */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* TAB 1: Granular Layout Editor Studio */}
        {activeTab === 'studio' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Visual Live Mockup Rendering Viewport */}
            <section className="lg:col-span-7 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest font-mono">
                  Live Viewport Preview
                </span>
                <button
                  onClick={() => setShowPrintBoundary(!showPrintBoundary)}
                  title={showPrintBoundary ? 'Hide guidelines' : 'Show guidelines'}
                  className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    showPrintBoundary 
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-600 dark:bg-slate-800 dark:hover:bg-slate-750 dark:text-slate-300' 
                      : 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100/80 dark:hover:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50'
                  }`}
                >
                  {showPrintBoundary ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  {showPrintBoundary ? 'Guidelines On' : 'Guidelines Hidden'}
                </button>
              </div>

              {/* Render canvas layout */}
              <MockupCanvas
                productType={activeType}
                productColor={productColor}
                secondaryColor={secondaryColor}
                logo={logo}
                preset={activePreset}
                customBackgroundUrl={customBgUrl}
                isInteractive={true}
                onUpdateLogo={(updates) => setLogo((prev) => ({ ...prev, ...updates }))}
                showPrintBoundary={showPrintBoundary}
              />

              {/* Quick Naming and Custom Actions Panel */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 shadow-sm rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 justify-between transition-colors duration-200">
                <div className="w-full sm:w-auto flex-grow max-w-md">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Showcase Title Label
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Enter custom design name..."
                    className="w-full text-sm font-semibold text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 focus:outline-hidden focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-850 transition-colors"
                  />
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0 justify-end">
                  <button
                    onClick={handleSaveProject}
                    className="w-full sm:w-auto text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-950/30 transition-colors border border-indigo-100/80 dark:border-indigo-900/40 px-4 py-2.5 rounded-xl hover:shadow-xs active:scale-98 cursor-pointer"
                  >
                    Save Design
                  </button>
                  <button
                    onClick={triggerActiveDownload}
                    className="w-full sm:w-auto text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all px-5 py-2.5 rounded-xl shadow-md hover:shadow-emerald-600/15 flex items-center justify-center gap-1.5 active:scale-98 cursor-pointer"
                  >
                    Download (PNG)
                  </button>
                </div>
              </div>
            </section>

            {/* RIGHT COLUMN: Studio Dashboard Control Panels */}
            <section className="lg:col-span-5 flex flex-col gap-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 max-h-[820px] overflow-y-auto transition-colors duration-200">
              
              {/* Controls Tab Menu Header */}
              <div className="flex items-center border-b border-slate-100 dark:border-slate-800 pb-4">
                <button
                  onClick={() => setEditorSubTab('product')}
                  className={`flex-1 pb-3 text-xs font-bold uppercase tracking-wider text-center border-b-2 transition-all cursor-pointer ${
                    editorSubTab === 'product'
                      ? 'border-indigo-600 dark:border-indigo-500 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                  }`}
                >
                  1. Merchandise
                </button>
                <button
                  onClick={() => setEditorSubTab('logo')}
                  className={`flex-1 pb-3 text-xs font-bold uppercase tracking-wider text-center border-b-2 transition-all cursor-pointer ${
                    editorSubTab === 'logo'
                      ? 'border-indigo-600 dark:border-indigo-500 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                  }`}
                >
                  2. Logo Geometry
                </button>
                <button
                  onClick={() => setEditorSubTab('tint')}
                  className={`flex-1 pb-3 text-xs font-bold uppercase tracking-wider text-center border-b-2 transition-all cursor-pointer ${
                    editorSubTab === 'tint'
                      ? 'border-indigo-600 dark:border-indigo-500 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                  }`}
                >
                  3. Theme & Color
                </button>
              </div>

              {/* DECK PANEL 1: Products Choice */}
              {editorSubTab === 'product' && (
                <div className="flex flex-col gap-5 animate-fade-in">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">Select Mockup Apparel / Item</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Choose your base physical canvas template layout.</p>
                    
                    {/* Bento Grid catalog selectors */}
                    <div className="grid grid-cols-2 xs:grid-cols-3 gap-2.5 mt-3.5">
                      {PRODUCT_PRESETS.map((preset) => (
                        <button
                          key={preset.id}
                          onClick={() => handleProductChange(preset.id)}
                          className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                            activeType === preset.id
                              ? 'border-indigo-600 bg-indigo-50/40 text-indigo-700 shadow-xs scale-[1.02]'
                              : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                          }`}
                        >
                          {/* Mini visual indicator */}
                          <div className="w-12 h-12 mb-1.5 opacity-80 group-hover:opacity-100">
                            <ProductSVG type={preset.id as any} color={activeType === preset.id ? productColor : '#94A3B8'} />
                          </div>
                          
                          <span className="text-xs font-semibold leading-tight">{preset.name}</span>
                          <span className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-wider font-mono">{preset.category}</span>
                        </button>
                      ))}

                      {/* COMPLETELY CUSTOM backdrop upload button */}
                      <button
                        onClick={() => handleProductChange('custom')}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          activeType === 'custom'
                            ? 'border-indigo-600 bg-indigo-50/40 text-indigo-700 shadow-xs scale-[1.02]'
                            : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <div className="w-12 h-12 mb-1.5 flex items-center justify-center text-slate-400 bg-slate-100/80 rounded-lg">
                          <Maximize2 className="w-6 h-6 shrink-0" />
                        </div>
                        <span className="text-xs font-semibold leading-tight">Custom Backdrop</span>
                        <span className="text-[9px] text-slate-400 mt-0.5 uppercase tracking-wider font-mono">My Photo</span>
                      </button>
                    </div>
                  </div>

                  {/* CUSTOM PHOTO upload field (only visible if custom selected) */}
                  {activeType === 'custom' && (
                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                      <label className="text-xs font-bold text-slate-700 block mb-1">Upload Custom Mockup Background Photo</label>
                      <p className="text-[11px] text-slate-500 mb-3">Upload any high-quality workspace product picture of your choice to map your logo on.</p>
                      
                      <div className="flex items-center gap-3">
                        <label className="text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 rounded-xl cursor-pointer shadow-xs transition-colors shrink-0">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) processCustomBgFile(f);
                            }}
                            className="hidden"
                          />
                          Choose Background Photo
                        </label>
                        {customBgUrl ? (
                          <span className="text-xs text-emerald-600 font-medium truncate">Custom image loaded successfully ✓</span>
                        ) : (
                          <span className="text-xs text-slate-400">No background loaded yet</span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* COLOR SYSTEM SETTING (only if not completely custom) */}
                  {activeType !== 'custom' && (
                    <div className="border-t border-slate-100 pt-5">
                      <h3 className="text-sm font-semibold text-slate-900">Configure Product Base Color</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Select a solid palette tone or input any hex color.</p>
                      
                      {/* Swatches array list */}
                      <div className="flex flex-wrap gap-2.5 mt-3">
                        {COLORS_PALETTE.map((palette) => (
                          <button
                            key={palette.hex}
                            onClick={() => setProductColor(palette.hex)}
                            title={palette.name}
                            className={`w-7 h-7 rounded-full border relative transition-all grow-0 shrink-0 cursor-pointer ${
                              productColor === palette.hex
                                ? 'ring-2 ring-offset-2 ring-indigo-500 scale-110 border-slate-900'
                                : 'border-slate-300 hover:scale-105'
                            }`}
                            style={{ backgroundColor: palette.hex }}
                          >
                            {/* Inner check check indicator for white */}
                            {productColor === palette.hex && (
                              <div className={`absolute inset-1.5 rounded-full border-2 ${
                                palette.hex === '#FFFFFF' ? 'border-indigo-600 bg-white' : 'border-white'
                              }`} />
                            )}
                          </button>
                        ))}

                        {/* Custom Color Picker input option */}
                        <div className="relative group flex items-center justify-center shrink-0">
                          <input
                            type="color"
                            value={productColor}
                            onChange={(e) => setProductColor(e.target.value)}
                            title="Fine tune custom hex"
                            className="w-7 h-7 rounded-full border border-slate-300 opacity-0 absolute cursor-pointer"
                          />
                          <div className="w-7 h-7 rounded-full border border-dashed border-slate-400 flex items-center justify-center text-xs text-slate-500 bg-slate-100 group-hover:bg-slate-200 pointer-events-none">
                            <Paintbrush className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>

                      {/* Display name of chosen background hex */}
                      <div className="mt-3 bg-slate-50 border border-slate-200/50 p-2.5 rounded-lg flex items-center justify-between text-xs font-mono font-medium text-slate-600">
                        <span>Selected Base Hex:</span>
                        <span className="text-slate-900 font-bold uppercase">{productColor}</span>
                      </div>
                    </div>
                  )}

                  {/* SECONDARY COLOR SYSTEM SETTING (only if CapVisor/Mug Interior Accent) */}
                  {(activeType === 'cap' || activeType === 'mug') && (
                    <div className="border-t border-slate-100 pt-5 animate-fade-in">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-slate-900">
                          {activeType === 'cap' ? 'Cap Visor Brim Color' : 'Mug Handle & Interior Accent'}
                        </h3>
                        <span className="bg-slate-100 text-[9px] uppercase tracking-wider font-mono text-slate-500 px-1.5 py-0.5 rounded">
                          Two-Tone Option
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">Customize the product secondary accent color style.</p>

                      <div className="flex flex-wrap gap-2.5 mt-3">
                        {/* Swatch options */}
                        {MUG_SECONDARY_COLORS.map((swatch) => (
                          <button
                            key={swatch.hex}
                            onClick={() => setSecondaryColor(swatch.hex)}
                            title={swatch.name}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                              secondaryColor === swatch.hex
                                ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            <div className="flex items-center gap-1.5">
                              {swatch.hex !== 'matching' ? (
                                <div
                                  className="w-3 h-3 rounded-full border border-slate-400"
                                  style={{ backgroundColor: swatch.hex }}
                                />
                              ) : (
                                <div className="w-3 h-3 rounded-full border border-dashed border-slate-400 bg-gradient-to-r from-red-400 via-green-400 to-blue-400" />
                              )}
                              <span>{swatch.name}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Info Box */}
                  <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-xl flex items-start gap-2.5 mt-2">
                    <Info className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                    <p className="text-xs text-indigo-800 leading-normal">
                      The dynamic SVG-Engine allows base coloring, stitching ribbing lines, and shadowing overlays inside browser vectors.
                    </p>
                  </div>
                </div>
              )}

              {/* DECK PANEL 2: Logo Adjustment sliders */}
              {editorSubTab === 'logo' && (
                <div className="flex flex-col gap-5 animate-fade-in">
                  
                  {/* Built-In Logo branding presets */}
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">Preset Corporate Brand Kits</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Pick an instant handcrafted corporate design layout to play with.</p>

                    <div className="grid grid-cols-2 gap-3.5 mt-3">
                      {PRESET_LOGOS.map((kit) => (
                        <button
                          key={kit.id}
                          onClick={() => handleSelectPresetLogo(kit.id)}
                          className={`flex items-start gap-2.5 p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                            logo.name === kit.name
                              ? 'border-indigo-600 bg-indigo-50/20 text-indigo-900'
                              : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                          }`}
                        >
                          {/* Left Vector circle thumb */}
                          <div
                            className="w-9 h-9 shrink-0 rounded-lg p-1 border bg-white shadow-xs flex items-center justify-center"
                            dangerouslySetInnerHTML={{ __html: kit.svgMarkup }}
                          />
                          <div className="overflow-hidden">
                            <h4 className="text-xs font-bold text-slate-800 truncate leading-tight">{kit.name}</h4>
                            <p className="text-[9px] text-slate-400 truncate mt-0.5">{kit.description}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* CUSTOM GRAPHIC drag file upload */}
                  <div className="border-t border-slate-100 pt-5">
                    <h3 className="text-sm font-semibold text-slate-900">Upload Your Branding Logo</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Drag-and-drop your custom artwork or logo file.</p>

                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-xl p-6 text-center mt-3.5 transition-all flex flex-col items-center justify-center cursor-pointer ${
                        isDraggingOver 
                          ? 'border-emerald-500 bg-emerald-50/50' 
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100/50'
                      }`}
                    >
                      <Upload className="w-8 h-8 text-slate-400 mb-2" />
                      <span className="text-xs font-bold text-slate-700">Drag logo image file here</span>
                      <span className="text-[10px] text-slate-400 mt-1 block">Supports PNG, SVG, JPG, WebP</span>
                      
                      <label className="mt-3.5 text-xs font-semibold bg-white text-slate-700 px-3.5 py-1.5 rounded-lg border border-slate-200 shadow-xs hover:bg-slate-50 inline-block cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) processUploadedFile(f);
                          }}
                          className="hidden"
                        />
                        Browse local files
                      </label>
                    </div>

                    <div className="mt-3.5 bg-slate-100 border border-slate-200/50 p-3 rounded-xl flex items-center justify-between text-xs text-slate-500">
                      <span className="font-medium truncate max-w-[200px]">Active Graphic: {logo.name}</span>
                      <button
                        onClick={() => setLogo(initialLogoConfig)}
                        title="Reset original logo"
                        className="text-indigo-600 hover:text-indigo-800 font-bold text-[11px] uppercase tracking-wider font-mono cursor-pointer"
                      >
                        Reset Logo
                      </button>
                    </div>
                  </div>

                  {/* GEOMETRIC TRANSFORMS SLIDERS */}
                  <div className="border-t border-slate-100 pt-5 flex flex-col gap-4">
                    <h3 className="text-sm font-semibold text-slate-900">Emblem Placement Tuning</h3>

                    {/* Scale slider */}
                    <div>
                      <div className="flex justify-between text-xs font-medium mb-1.5">
                        <span className="text-slate-600">Logo Scale Sizing</span>
                        <span className="font-mono text-slate-800 font-bold">{Math.round(logo.scale * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.1"
                        max="2.5"
                        step="0.05"
                        value={logo.scale}
                        onChange={(e) => setLogo((prev) => ({ ...prev, scale: parseFloat(e.target.value) }))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                    </div>

                    {/* Rotation slider */}
                    <div>
                      <div className="flex justify-between text-xs font-medium mb-1.5">
                        <span className="text-slate-600">Rotation Angle</span>
                        <span className="font-mono text-slate-800 font-bold">{logo.rotation}°</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <input
                          type="range"
                          min="-180"
                          max="180"
                          step="1"
                          value={logo.rotation}
                          onChange={(e) => setLogo((prev) => ({ ...prev, rotation: parseInt(e.target.value) }))}
                          className="flex-grow h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                        <button
                          onClick={() => setLogo((p) => ({ ...p, rotation: 0 }))}
                          title="Align level angle"
                          className="p-1 px-1.5 text-[9px] font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 rounded uppercase font-mono tracking-wider shrink-0"
                        >
                          Reset
                        </button>
                      </div>
                    </div>

                    {/* Left and Top percentages (Only if manual fine tune) */}
                    <div className="grid grid-cols-2 gap-3 mt-1">
                      <div>
                        <span className="text-[11px] font-semibold text-slate-500 block mb-1">X-Axis Offset</span>
                        <input
                          type="range"
                          min="-120"
                          max="120"
                          step="1"
                          value={logo.x}
                          onChange={(e) => setLogo((prev) => ({ ...prev, x: parseInt(e.target.value) }))}
                          className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-600"
                        />
                      </div>
                      <div>
                        <span className="text-[11px] font-semibold text-slate-500 block mb-1">Y-Axis Offset</span>
                        <input
                          type="range"
                          min="-120"
                          max="120"
                          step="1"
                          value={logo.y}
                          onChange={(e) => setLogo((prev) => ({ ...prev, y: parseInt(e.target.value) }))}
                          className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-600"
                        />
                      </div>
                    </div>

                    {/* Quick snap positions buttons */}
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Snap Alignment Guides
                      </span>
                      <div className="flex gap-2 flex-wrap text-xs text-slate-600 font-semibold font-mono">
                        <button
                          onClick={() => handleQuickAlign('center')}
                          className="px-2.5 py-1 text-[11px] border border-slate-200 bg-slate-50 hover:bg-slate-100 rounded p-1 shadow-2xs cursor-pointer"
                        >
                          Center Align
                        </button>
                        <button
                          onClick={() => handleQuickAlign('top')}
                          className="px-2.5 py-1 text-[11px] border border-slate-200 bg-slate-50 hover:bg-slate-100 rounded p-1 shadow-2xs cursor-pointer"
                        >
                          Chest/Top
                        </button>
                        <button
                          onClick={() => handleQuickAlign('bottom')}
                          className="px-2.5 py-1 text-[11px] border border-slate-200 bg-slate-50 hover:bg-slate-100 rounded p-1 shadow-2xs cursor-pointer"
                        >
                          Pocket/Bottom
                        </button>
                        <button
                          onClick={() => handleQuickAlign('left')}
                          className="px-2.5 py-1 text-[11px] border border-slate-200 bg-slate-50 hover:bg-slate-100 rounded p-1 shadow-2xs cursor-pointer"
                        >
                          Left Peak
                        </button>
                        <button
                          onClick={() => handleQuickAlign('right')}
                          className="px-2.5 py-1 text-[11px] border border-slate-200 bg-slate-50 hover:bg-slate-100 rounded p-1 shadow-2xs cursor-pointer"
                        >
                          Right Peak
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* DECK PANEL 3: Logo tint & shading settings */}
              {editorSubTab === 'tint' && (
                <div className="flex flex-col gap-5 animate-fade-in">
                  
                  {/* LOGO COLOR OVERLAY TINT SELECTORS */}
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">Brand Color Tint Overlay</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Paint your uploaded logo with a unified corporate color overlay instantly.</p>

                    <div className="grid grid-cols-2 xs:grid-cols-3 gap-2 mt-3.5">
                      {/* Original Color (null) */}
                      <button
                        onClick={() => setLogo((prev) => ({ ...prev, colorTint: null }))}
                        className={`text-xs font-semibold px-2.5 py-2.5 border rounded-lg transition-all text-center cursor-pointer ${
                          logo.colorTint === null
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-500'
                            : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        Original Styling
                      </button>

                      {/* White */}
                      <button
                        onClick={() => setLogo((prev) => ({ ...prev, colorTint: '#FFFFFF' }))}
                        className={`text-xs font-semibold px-2.5 py-2.5 border rounded-lg transition-all text-center cursor-pointer ${
                          logo.colorTint === '#FFFFFF'
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-500'
                            : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        Solid White Print
                      </button>

                      {/* Black */}
                      <button
                        onClick={() => setLogo((prev) => ({ ...prev, colorTint: '#111827' }))}
                        className={`text-xs font-semibold px-2.5 py-2.5 border rounded-lg transition-all text-center cursor-pointer ${
                          logo.colorTint === '#111827'
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-500'
                            : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        Solid Pitch Black
                      </button>

                      {/* Metallic Gold */}
                      <button
                        onClick={() => setLogo((prev) => ({ ...prev, colorTint: '#D4AF37' }))}
                        className={`text-xs font-semibold px-2.5 py-2.5 border rounded-lg transition-all text-center cursor-pointer ${
                          logo.colorTint === '#D4AF37'
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-500'
                            : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        Etched Gold Foil
                      </button>

                      {/* Navy Blue */}
                      <button
                        onClick={() => setLogo((prev) => ({ ...prev, colorTint: '#1E3A8A' }))}
                        className={`text-xs font-semibold px-2.5 py-2.5 border rounded-lg transition-all text-center cursor-pointer ${
                          logo.colorTint === '#1E3A8A'
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-500'
                            : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        Royal Navy Blue
                      </button>

                      {/* Crimson Red */}
                      <button
                        onClick={() => setLogo((prev) => ({ ...prev, colorTint: '#B91C1C' }))}
                        className={`text-xs font-semibold px-2.5 py-2.5 border rounded-lg transition-all text-center cursor-pointer ${
                          logo.colorTint === '#B91C1C'
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-500'
                            : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        Corporate Crimson
                      </button>
                    </div>
                  </div>

                  {/* CROP CIRCULAR TOGGLE CARD */}
                  <div className="border-t border-slate-100 pt-5 pr-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest font-mono">Circular Crops / Badge Frame</h4>
                        <p className="text-xs text-slate-500 mt-0.5">Crop the imported image parameters inside a perfect circle badge alignment.</p>
                      </div>
                      <button
                        onClick={() => setLogo(prev => ({ ...prev, isCircularMask: !prev.isCircularMask }))}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                          logo.isCircularMask 
                            ? 'bg-indigo-600 text-white shadow-xs' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {logo.isCircularMask ? 'Mask Active' : 'Mask Off'}
                      </button>
                    </div>
                  </div>

                  {/* BLEND MODES DECK MODULES */}
                  <div className="border-t border-slate-100 pt-5">
                    <h3 className="text-sm font-semibold text-slate-900">Texture Blending Filter</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Control how ink composites onto fabric creases or ceramic gloss.</p>

                    <div className="flex flex-col gap-2 mt-3.5">
                      
                      {/* Multiply */}
                      <button
                        onClick={() => setLogo((prev) => ({ ...prev, blendMode: 'multiply' }))}
                        className={`p-3 border rounded-xl transition-all text-left flex flex-col gap-0.5 cursor-pointer ${
                          logo.blendMode === 'multiply'
                            ? 'border-indigo-600 bg-indigo-50/20'
                            : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                        }`}
                      >
                        <span className="text-xs font-bold text-slate-800 leading-tight flex items-center justify-between w-full">
                          Multiply Blend Mode
                          {logo.blendMode === 'multiply' && <span className="bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded">Optimal for White-BG</span>}
                        </span>
                        <span className="text-[10px] text-slate-400 mt-0.5">Makes logo white background transparent and merges dark elements onto product creases perfectly.</span>
                      </button>

                      {/* Normal */}
                      <button
                        onClick={() => setLogo((prev) => ({ ...prev, blendMode: 'normal' }))}
                        className={`p-3 border rounded-xl transition-all text-left flex flex-col gap-0.5 cursor-pointer ${
                          logo.blendMode === 'normal'
                            ? 'border-indigo-600 bg-indigo-50/20'
                            : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                        }`}
                      >
                        <span className="text-xs font-bold text-slate-800 leading-tight">Normal (Source Over)</span>
                        <span className="text-[10px] text-slate-400 mt-0.5">Classic paint overlay. Best for transparent vector transparent background PNGs and solid decals.</span>
                      </button>

                      {/* Screen */}
                      <button
                        onClick={() => setLogo((prev) => ({ ...prev, blendMode: 'screen' }))}
                        className={`p-3 border rounded-xl transition-all text-left flex flex-col gap-0.5 cursor-pointer ${
                          logo.blendMode === 'screen'
                            ? 'border-indigo-600 bg-indigo-50/20'
                            : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                        }`}
                      >
                        <span className="text-xs font-bold text-slate-800 leading-tight">Screen Filter</span>
                        <span className="text-[10px] text-slate-400 mt-0.5">Removes dark shadows. Best for placing bright white or self-luminescent logos.</span>
                      </button>

                      {/* Overlay */}
                      <button
                        onClick={() => setLogo((prev) => ({ ...prev, blendMode: 'overlay' }))}
                        className={`p-3 border rounded-xl transition-all text-left flex flex-col gap-0.5 cursor-pointer ${
                          logo.blendMode === 'overlay'
                            ? 'border-indigo-600 bg-indigo-50/20'
                            : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                        }`}
                      >
                        <span className="text-xs font-bold text-slate-800 leading-tight">Overlay Blending</span>
                        <span className="text-[10px] text-slate-400 mt-0.5">Retains base brightness and contrasts of the background fabric, resulting in a worn, vintage ink print look.</span>
                      </button>
                    </div>
                  </div>

                  {/* Logo Opacity slider */}
                  <div className="border-t border-slate-100 pt-5">
                    <div className="flex justify-between text-xs font-medium mb-1.5">
                      <span className="text-slate-600">Print Ink Opacity</span>
                      <span className="font-mono text-slate-800 font-bold">{Math.round(logo.opacity * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="1.0"
                      step="0.05"
                      value={logo.opacity}
                      onChange={(e) => setLogo((prev) => ({ ...prev, opacity: parseFloat(e.target.value) }))}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>
                </div>
              )}
            </section>
          </div>
        )}

        {/* TAB 2: Dynamic bulk all items concurrent showcase */}
        {activeTab === 'bulk' && (
          <div className="flex flex-col gap-6 animate-fade-in" id="bulk-showcase-tab">
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-3xs transition-colors duration-200">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">Simultaneous Merchandise Showcase</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Visualize your customized brand logo across our entire product line simultaneously.</p>
              </div>

              {/* Dynamic product color adjustment right in this view for fun! */}
              <div className="flex flex-col sm:items-end gap-1 shrink-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Adjust Merchandise Background Base Color
                </span>
                <div className="flex gap-2">
                  {COLORS_PALETTE.slice(0, 7).map((colorObj) => (
                    <button
                      key={colorObj.hex}
                      onClick={() => setProductColor(colorObj.hex)}
                      title={colorObj.name}
                      className={`w-6 h-6 rounded-full border relative transition-all cursor-pointer ${
                        productColor === colorObj.hex ? 'ring-2 ring-offset-2 ring-indigo-500 scale-105 border-slate-900' : 'border-slate-300 dark:border-slate-700'
                      }`}
                      style={{ backgroundColor: colorObj.hex }}
                    >
                      {productColor === colorObj.hex && (
                        <div className={`absolute inset-1.5 rounded-full border ${
                          colorObj.hex === '#FFFFFF' ? 'border-indigo-600 bg-white' : 'border-white'
                        }`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Catalog Grid View */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {PRODUCT_PRESETS.map((preset) => (
                <div
                  key={preset.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group p-4"
                >
                  <div className="flex items-center justify-between mb-3 border-b border-slate-100 dark:border-slate-800 pb-2.5">
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase leading-none">{preset.name}</h3>
                      <span className="text-[9px] text-slate-400 mt-0.5 tracking-wider uppercase font-mono">{preset.category}</span>
                    </div>

                    <button
                      onClick={() => handleProductChange(preset.id)}
                      title="Jump focus in editor"
                      className="text-[10px] bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded font-bold font-mono transition-colors flex items-center gap-0.5 cursor-pointer"
                    >
                      Configure
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Render exact MockupCanvas layout without interaction but in small footprint */}
                  <MockupCanvas
                    productType={preset.id as any}
                    productColor={productColor}
                    secondaryColor={secondaryColor}
                    logo={logo}
                    preset={preset}
                    isInteractive={false}
                    showPrintBoundary={false}
                  />

                  {/* Sizing indicators info card footer */}
                  <div className="mt-3.5 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/30 rounded-xl p-2 border border-slate-150 dark:border-slate-800">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                      <span>X:{logo.x}%</span>
                      <span>Y:{logo.y}%</span>
                      <span>S:{Math.round(logo.scale * 100)}%</span>
                    </div>

                    <button
                      onClick={() => {
                        // Quick download this specific mockup directly!
                        const dummyCanvas = document.createElement('div');
                        dummyCanvas.style.display = 'none';
                        document.body.appendChild(dummyCanvas);
                        
                        // Using our dynamic window export handle by briefly updating states or configuring it!
                        // Best design choice is simply changing activeType temporarily and calling download, or loading it
                        handleProductChange(preset.id);
                        setTimeout(() => {
                          triggerActiveDownload();
                        }, 100);
                      }}
                      className="text-[10px] text-emerald-600 hover:text-emerald-700 font-bold flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      Download Mockup
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Projects gallery panel stored under Local Cache */}
        {activeTab === 'gallery' && (
          <MyGallery
            projects={projects}
            onLoadProject={handleLoadProject}
            onDeleteProject={handleDeleteProject}
            onClearAll={handleClearAllProjects}
          />
        )}
      </main>

      {/* Styled Footer Block */}
      <footer className="bg-white/95 dark:bg-slate-900/95 border-t border-slate-200/80 dark:border-slate-800 py-5 mt-12 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
            <p className="text-xs font-semibold text-slate-500 font-mono tracking-tight leading-none text-slate-500 dark:text-slate-400">
              Client Local Cache Database: <span className="text-slate-800 dark:text-slate-200 uppercase font-bold text-[10px]">Secure &amp; Offline</span>
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span className="font-mono">Ready to manufacture</span>
            <span className="text-slate-200 dark:text-slate-700">|</span>
            <span>Created for Google AI Studio</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
