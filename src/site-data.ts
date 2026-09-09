export type NavLink = { label: string; href: string; active?: boolean };
export type ProductCategory = "tops" | "lounge" | "shorts" | "trousers";
export type ProductColor = { name: string; tone: string; hex: string };
export type ProductSize = { label: string; stock: number };
export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  meta: string;
  price: number;
  tone: string;
  colors: ProductColor[];
  sizes: ProductSize[];
  description: string;
  composition: string;
  fit: string;
  releaseOrder: number;
};

export const productHref = (product: Product): string => `product-${product.slug}.html`;

const sizes = (soldOut = ""): ProductSize[] =>
  ["XS", "S", "M", "L", "XL"].map((label, index) => ({
    label,
    stock: label === soldOut ? 0 : [3, 7, 6, 4, 2][index]
  }));

export const products: Product[] = [
  {
    slug: "venti-lounge-set", name: "Venti Lounge Set", category: "lounge",
    categoryLabel: "Lounge sets", meta: "Shirt and trousers", price: 240, tone: "tone-clay",
    colors: [
      { name: "Clay", tone: "tone-clay", hex: "#b66743" },
      { name: "Oasis", tone: "tone-oasis", hex: "#63786b" },
      { name: "Ink", tone: "tone-ink", hex: "#292b31" }
    ],
    sizes: sizes(),
    description: "An easy, textural pairing cut for slow mornings and considered evenings. Wear the pieces together or separately.",
    composition: "100% textured cotton. Unlined.",
    fit: "Relaxed fit. The shirt falls below the hip and the trouser sits at the natural waist.",
    releaseOrder: 10
  },
  {
    slug: "serein-short-set", name: "Serein Short Set", category: "shorts",
    categoryLabel: "Shirt and shorts", meta: "Relaxed two-piece", price: 195, tone: "tone-oasis",
    colors: [
      { name: "Oasis", tone: "tone-oasis", hex: "#63786b" },
      { name: "Shell", tone: "tone-shell", hex: "#d8c5ad" }
    ],
    sizes: sizes(),
    description: "A relaxed camp shirt and softly tailored short designed for warm days and effortless layering.",
    composition: "72% linen, 28% cotton.",
    fit: "Relaxed through the body with an elasticated short waistband.",
    releaseOrder: 9
  },
  {
    slug: "noma-shirt", name: "Noma Shirt", category: "tops",
    categoryLabel: "Tops", meta: "Soft linen blend", price: 110, tone: "tone-sage",
    colors: [
      { name: "Sage", tone: "tone-sage", hex: "#9fa58b" },
      { name: "Shell", tone: "tone-shell", hex: "#d8c5ad" }
    ],
    sizes: sizes(),
    description: "A softly structured everyday shirt with an open collar and a generous, easy line.",
    composition: "55% linen, 45% cotton.",
    fit: "Oversized fit. Take your usual size for the intended shape.",
    releaseOrder: 8
  },
  {
    slug: "turi-trouser-set", name: "Turi Trouser Set", category: "trousers",
    categoryLabel: "Shirt and trousers", meta: "Fluid tailoring", price: 265, tone: "tone-night",
    colors: [
      { name: "Night", tone: "tone-night", hex: "#29323d" },
      { name: "Rose", tone: "tone-rose", hex: "#b88276" }
    ],
    sizes: sizes(),
    description: "Fluid tailoring without the formality: a long-line shirt and wide trouser with an elegant drape.",
    composition: "88% viscose, 12% linen.",
    fit: "Long, relaxed shirt with a full-length wide-leg trouser.",
    releaseOrder: 7
  },
  {
    slug: "kori-box-shirt", name: "Kori Box Shirt", category: "tops",
    categoryLabel: "Tops", meta: "Washed cotton", price: 115, tone: "tone-night",
    colors: [
      { name: "Ink", tone: "tone-ink", hex: "#292b31" },
      { name: "Gold", tone: "tone-gold", hex: "#b7914e" }
    ],
    sizes: sizes("M"),
    description: "A crisp box-cut shirt softened by a garment wash and finished with a clean concealed placket.",
    composition: "100% washed cotton.",
    fit: "Cropped, boxy fit with dropped shoulders.",
    releaseOrder: 6
  },
  {
    slug: "ayo-trouser-set", name: "Ayo Trouser Set", category: "trousers",
    categoryLabel: "Shirt and trousers", meta: "Relaxed tailoring", price: 255, tone: "tone-sage",
    colors: [
      { name: "Sage", tone: "tone-sage", hex: "#9fa58b" },
      { name: "Clay", tone: "tone-clay", hex: "#b66743" }
    ],
    sizes: sizes(),
    description: "A polished two-piece that keeps the ease of loungewear through soft structure and a fluid silhouette.",
    composition: "64% Tencel, 36% linen.",
    fit: "Relaxed shirt and straight full-length trouser.",
    releaseOrder: 5
  },
  {
    slug: "tani-camp-shirt", name: "Tani Camp Shirt", category: "tops",
    categoryLabel: "Tops", meta: "Silk-touch twill", price: 125, tone: "tone-rose",
    colors: [
      { name: "Rose", tone: "tone-rose", hex: "#b88276" },
      { name: "Ink", tone: "tone-ink", hex: "#292b31" }
    ],
    sizes: sizes(),
    description: "A refined camp shirt with a fluid hand, neat collar and easy curved hem.",
    composition: "100% viscose twill.",
    fit: "Relaxed fit, designed to skim the body.",
    releaseOrder: 4
  },
  {
    slug: "mira-lounge-set", name: "Mira Lounge Set", category: "lounge",
    categoryLabel: "Lounge sets", meta: "Cotton voile", price: 220, tone: "tone-shell",
    colors: [
      { name: "Shell", tone: "tone-shell", hex: "#d8c5ad" },
      { name: "Oasis", tone: "tone-oasis", hex: "#63786b" }
    ],
    sizes: sizes(),
    description: "A light cotton voile set built for comfort, movement and understated warm-weather dressing.",
    composition: "100% cotton voile. Partially lined.",
    fit: "Airy relaxed fit with a softly gathered trouser waist.",
    releaseOrder: 3
  },
  {
    slug: "noor-short-set", name: "Noor Short Set", category: "shorts",
    categoryLabel: "Shirt and shorts", meta: "Textured linen", price: 205, tone: "tone-gold",
    colors: [
      { name: "Gold", tone: "tone-gold", hex: "#b7914e" },
      { name: "Shell", tone: "tone-shell", hex: "#d8c5ad" }
    ],
    sizes: sizes(),
    description: "Textured linen gives this relaxed shirt-and-short set a tactile finish and naturally elegant drape.",
    composition: "100% linen.",
    fit: "Relaxed shirt with a mid-rise tailored short.",
    releaseOrder: 2
  },
  {
    slug: "rani-relaxed-shirt", name: "Rani Relaxed Shirt", category: "tops",
    categoryLabel: "Tops", meta: "Fluid jersey", price: 105, tone: "tone-ink",
    colors: [
      { name: "Ink", tone: "tone-ink", hex: "#292b31" },
      { name: "Clay", tone: "tone-clay", hex: "#b66743" }
    ],
    sizes: sizes(),
    description: "A fluid jersey shirt with a clean neckline and the comfort of a favourite tee.",
    composition: "94% modal, 6% elastane.",
    fit: "Relaxed fit with a soft dropped shoulder.",
    releaseOrder: 1
  }
];

const featuredHref = productHref(products[0]);
export const homeNav: NavLink[] = [
  { label: "Shop All", href: "collection.html" },
  { label: "Sets", href: "sub-collection.html" },
  { label: "Featured Product", href: featuredHref },
  { label: "World of Anda", href: "index.html#journal" }
];
export const collectionNav: NavLink[] = [
  { label: "Shop All", href: "collection.html", active: true },
  { label: "Sets", href: "sub-collection.html" },
  { label: "Featured Product", href: featuredHref }
];
export const setsNav: NavLink[] = [
  { label: "The collection", href: "collection.html" },
  { label: "Sets", href: "sub-collection.html", active: true },
  { label: "Featured Product", href: featuredHref }
];
export const productNav: NavLink[] = [
  { label: "Home", href: "index.html" },
  { label: "Shop All", href: "collection.html" },
  { label: "Sets", href: "sub-collection.html" }
];
export const homeRail = products.slice(0, 4);
export const collectionProducts = products;
export const setsProducts = products.filter((product) => product.category !== "tops");
