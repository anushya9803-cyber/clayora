export interface ClayoraProduct {
  id: string;
  name: string;
  subtitle: string;
  category: 'All' | 'Hand-Thrown Vases' | 'Tableware' | 'Planters & Pots' | 'Home Objects';
  price: number;
  priceFormatted: string;
  image: string;
  clayType: string;
  dimensions: string;
  firingTechnique: string;
  batchInfo: string;
  inStock: boolean;
  stockCount: number;
  description: string;
  makerNotes: string;
}

export const CLAYORA_PRODUCTS: ClayoraProduct[] = [
  {
    id: 'clayora-1',
    name: 'Elysian Fluted Terracotta Vase',
    subtitle: 'Wheel-thrown red earthenware with hand-carved ribs',
    category: 'Hand-Thrown Vases',
    price: 88,
    priceFormatted: '$88.00',
    image: '/src/assets/images/clay_vase_terracotta_1793121121448.jpg',
    clayType: 'Wild Devon terracotta clay, grog-reinforced',
    dimensions: 'H 26cm × Ø 18cm · 1.4kg',
    firingTechnique: 'Wood-fired bisque (1080°C), glazed interior',
    batchInfo: 'Batch 18 · Small Run of 25',
    inStock: true,
    stockCount: 6,
    description: 'Turned on the kick wheel in our sunny courtyard workshop. Each piece has subtle finger marks celebrating the human touch. The raw exterior is hand-sanded with river pebbles for a velvety tactile texture, while the interior is sealed with a non-toxic clear glaze to safely hold water and fresh botanicals.',
    makerNotes: 'Thrown by Sarah in Devon using local unrefined red clay with small mineral freckles that naturally surface during firing.'
  },
  {
    id: 'clayora-2',
    name: 'Stoneware Dining Plate & Tasting Bowl',
    subtitle: 'Organic tableware with iron-flecked oatmeal glaze',
    category: 'Tableware',
    price: 115,
    priceFormatted: '$115.00',
    image: '/src/assets/images/stoneware_tableware_set_1793121122509.jpg',
    clayType: 'High-fire buff stoneware with natural iron sediment',
    dimensions: 'Plate Ø 27cm, Bowl Ø 18cm × H 6cm',
    firingTechnique: 'Reduction firing at 1240°C in gas kiln',
    batchInfo: 'Batch 09 · Limited Edition',
    inStock: true,
    stockCount: 8,
    description: 'Designed for daily dining rituals. The soft oatmeal mineral glaze pools into gentle toasted brown rims where the exposed raw stoneware meets the flame. Microwave, oven, and dishwasher safe, crafted to develop a subtle patina with years of love.',
    makerNotes: 'Glazed with wood ash and feldspar minerals sourced from Dartmoor. Every bowl rim retains a slight wobble that distinguishes true handcraft.'
  },
  {
    id: 'clayora-3',
    name: 'Crater Grog Sculptural Planter',
    subtitle: 'Hand-pinched planter with raw organic folds',
    category: 'Planters & Pots',
    price: 94,
    priceFormatted: '$94.00',
    image: '/src/assets/images/sculptural_planter_pot_1793121122056.jpg',
    clayType: 'Coarse grogged volcanic clay blend',
    dimensions: 'H 20cm × W 22cm · Drainage hole included',
    firingTechnique: 'Oxidation firing (1180°C) with natural smoke patina',
    batchInfo: 'Series 04 · One-of-a-Kind Form',
    inStock: true,
    stockCount: 4,
    description: 'A sculptural dwelling for trailing succulents or ferns. The exterior is formed using an intuitive pinch-and-coil method, resulting in undulating textured rims reminiscent of weathered canyon walls. Porous clay walls allow plant root aeration.',
    makerNotes: 'Coarse grog is intentionally left unburnished to create a raw, stone-like texture that develops moss and earthy character outdoors.'
  },
  {
    id: 'clayora-4',
    name: 'Monolith Carbon Incense & Key Tray',
    subtitle: 'Dark manganese stoneware with chamfered geometry',
    category: 'Home Objects',
    price: 46,
    priceFormatted: '$46.00',
    image: '/src/assets/images/product_showcase_device_1793120249873.jpg',
    clayType: 'Manganese-stained black stoneware',
    dimensions: 'L 24cm × W 9cm × H 3.5cm',
    firingTechnique: 'Pit-reduction firing with cedar shavings',
    batchInfo: 'Batch 12 · Studio Staple',
    inStock: true,
    stockCount: 11,
    description: 'Slab-built with weighted proportions to ground your entryway or bedside. Features a dedicated brass inset pin to safely hold incense sticks, while providing room for heirloom jewelry, fountain pens, or everyday keys.',
    makerNotes: 'The smoky matte surface is hand-waxed with organic beeswax to resist finger oils while preserving the deep charcoal undertone.'
  },
  {
    id: 'clayora-5',
    name: 'Sediment Ceramic Pour-Over Dripper',
    subtitle: 'Slow-coffee dripper with hand-carved interior spirals',
    category: 'Tableware',
    price: 68,
    priceFormatted: '$68.00',
    image: '/src/assets/images/clay_vase_terracotta_1793121121448.jpg',
    clayType: 'Fine white earthenware & river sand',
    dimensions: 'H 11cm × Ø 12cm · Standard V60 filter fit',
    firingTechnique: 'Electric kiln (1150°C), non-toxic food-grade clear glaze',
    batchInfo: 'Batch 14 · Kitchen Ritual',
    inStock: true,
    stockCount: 7,
    description: 'Precision-thrown to maintain water thermal equilibrium during manual coffee brewing. The hand-carved spiral flutes channel uniform water flow for maximum coffee clarity.',
    makerNotes: 'Features an ergonomic hollow clay thumb-rest that never overheats.'
  },
  {
    id: 'clayora-6',
    name: 'Solstice Pedestal Offering Bowl',
    subtitle: 'Footed centerpiece bowl with calico glaze pool',
    category: 'Hand-Thrown Vases',
    price: 120,
    priceFormatted: '$120.00',
    image: '/src/assets/images/stoneware_tableware_set_1793121122509.jpg',
    clayType: 'Terracotta & ball clay blend',
    dimensions: 'Ø 31cm × H 14cm · 2.1kg',
    firingTechnique: 'Single-fire wood kiln with salt glaze vapor',
    batchInfo: 'Batch 05 · Architectural Scale',
    inStock: true,
    stockCount: 3,
    description: 'An commanding centerpiece designed for fresh seasonal fruits or decorative dried botanicals. Broad sloping walls lift on a grounded flared foot, catching light across delicate surface crazing.',
    makerNotes: 'Wood-fired over 36 hours where airborne embers naturally painted organic golden halo markings across the rim.'
  }
];

export interface CartItem {
  product: ClayoraProduct;
  quantity: number;
}
