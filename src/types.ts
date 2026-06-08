export type ProductType = 'mug' | 'tshirt' | 'hoodie' | 'tote' | 'bottle' | 'notebook' | 'cap' | 'custom';

export interface LogoConfig {
  url: string; // Base64 or object URL of the logo
  name: string;
  size: number; // File size
  // Adjustments
  x: number; // percentage from center (-100 to 100)
  y: number; // percentage from center (-100 to 100)
  scale: number; // 0.1 to 3
  rotation: number; // degrees
  opacity: number; // 0 to 1
  blendMode: 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'color-burn';
  colorTint: string | null; // Hex color for color overlay filter, or null for original
  isCircularMask: boolean; // Crop logo circularly if needed
  threshold: number; // For black/white rendering adjustments if needed
}

export interface ProductPreset {
  id: ProductType;
  name: string;
  category: string;
  description: string;
  defaultColor: string;
  allowedColors: string[];
  logoBoundaries: {
    width: string; // CSS width percentage
    height: string; // CSS height percentage
    top: string; // CSS top offset percentage
    left: string; // CSS left offset percentage
    borderRadius?: string;
    transform?: string; // e.g. cylinder distortion or perspective skew representation
  };
}

export interface MockupProject {
  id: string;
  name: string;
  productType: ProductType;
  productColor: string;
  secondaryColor?: string; // Cap brim, mug interior, etc.
  logo: LogoConfig;
  customBackgroundUrl?: string; // For completely custom product backgrounds
  createdAt: number;
}
