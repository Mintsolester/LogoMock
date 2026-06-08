import { ProductPreset } from './types';

export const COLORS_PALETTE = [
  { name: 'Chalk White', hex: '#FFFFFF' },
  { name: 'Charcoal Black', hex: '#1E1E24' },
  { name: 'Heather Grey', hex: '#9AA0A6' },
  { name: 'Navy Blue', hex: '#1A365D' },
  { name: 'Crimson Red', hex: '#9B2C2C' },
  { name: 'Sage Green', hex: '#606C38' },
  { name: 'Mustard Yellow', hex: '#D97706' },
  { name: 'Lilac Pink', hex: '#F472B6' },
  { name: 'Mint Teal', hex: '#0D9488' },
  { name: 'Desert Beige', hex: '#DDB892' },
  { name: 'Ocean Spruce', hex: '#2C5E5A' },
  { name: 'Sunset Amber', hex: '#C2410C' },
];

export const MUG_SECONDARY_COLORS = [
  { name: 'Matching Base', hex: 'matching' },
  { name: 'Clean White', hex: '#FFFFFF' },
  { name: 'Pitch Black', hex: '#111827' },
  { name: 'Navy Blue', hex: '#1E3A8A' },
  { name: 'Dusty Pink', hex: '#FBCFE8' },
  { name: 'Gold Accent', hex: '#FBBF24' },
];

export const PRODUCT_PRESETS: ProductPreset[] = [
  {
    id: 'tshirt',
    name: 'Crewneck T-Shirt',
    category: 'Apparel',
    description: 'Classic fit short-sleeve organic cotton t-shirt with ribbed crewneck.',
    defaultColor: '#FFFFFF',
    allowedColors: COLORS_PALETTE.map(c => c.hex),
    logoBoundaries: {
      width: '28%',
      height: '34%',
      top: '18%',
      left: '36%',
    },
  },
  {
    id: 'hoodie',
    name: 'Premium Hoodie',
    category: 'Apparel',
    description: 'Heavyweight loopback cotton blend pullover hoodie with kangaroo pocket.',
    defaultColor: '#1E1E24',
    allowedColors: COLORS_PALETTE.map(c => c.hex),
    logoBoundaries: {
      width: '24%',
      height: '22%',
      top: '25%',
      left: '38%',
    },
  },
  {
    id: 'mug',
    name: 'Ceramic Coffee Mug',
    category: 'Drinkware',
    description: '11oz glazed ceramic coffee mug with a polished glossy finish and customizable color handle and interior.',
    defaultColor: '#FFFFFF',
    allowedColors: COLORS_PALETTE.map(c => c.hex),
    logoBoundaries: {
      width: '32%',
      height: '42%',
      top: '26%',
      left: '34%',
      borderRadius: '2px',
    },
  },
  {
    id: 'bottle',
    name: 'Insulated Flask',
    category: 'Drinkware',
    description: 'Double-walled stainless steel thermal leakproof water bottle with metallic accent cap.',
    defaultColor: '#0D9488',
    allowedColors: COLORS_PALETTE.map(c => c.hex),
    logoBoundaries: {
      width: '20%',
      height: '35%',
      top: '32%',
      left: '40%',
    },
  },
  {
    id: 'tote',
    name: 'Cotton Tote Bag',
    category: 'Lifestyle',
    description: 'Durable organic canvas tote bag with reinforced handles and cross stitching.',
    defaultColor: '#DDB892', // Cream Desert Beige by default
    allowedColors: COLORS_PALETTE.map(c => c.hex),
    logoBoundaries: {
      width: '42%',
      height: '42%',
      top: '34%',
      left: '29%',
    },
  },
  {
    id: 'notebook',
    name: 'A5 Hardcover Journal',
    category: 'Lifestyle',
    description: 'Ribbed leatherette cardboard spine cover journal with ribbon bookmark and elastic closure.',
    defaultColor: '#9B2C2C',
    allowedColors: COLORS_PALETTE.map(c => c.hex),
    logoBoundaries: {
      width: '34%',
      height: '50%',
      top: '22%',
      left: '35%',
    },
  },
  {
    id: 'cap',
    name: 'Retro Baseball Cap',
    category: 'Lifestyle',
    description: '6-panel structured cotton crown cap with dynamic colored visor brim.',
    defaultColor: '#1A365D',
    allowedColors: COLORS_PALETTE.map(c => c.hex),
    logoBoundaries: {
      width: '28%',
      height: '18%',
      top: '25%',
      left: '36%',
    },
  },
];
