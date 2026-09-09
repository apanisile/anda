export type NavLink = {
  label: string;
  href: string;
  active?: boolean;
};

export type ProductCard = {
  href: string;
  tone: string;
  name: string;
  meta: string;
  price: string;
  tall?: boolean;
};

export const homeNav: NavLink[] = [
  { label: "Shop All", href: "collection.html" },
  { label: "Sets", href: "sub-collection.html" },
  { label: "Featured Product", href: "product.html" },
  { label: "World of Anda", href: "#journal" }
];

export const collectionNav: NavLink[] = [
  { label: "Shop All", href: "collection.html", active: true },
  { label: "Sets", href: "sub-collection.html" },
  { label: "Featured Product", href: "product.html" }
];

export const setsNav: NavLink[] = [
  { label: "The collection", href: "collection.html" },
  { label: "Sets", href: "sub-collection.html", active: true },
  { label: "Featured Product", href: "product.html" }
];

export const productNav: NavLink[] = [
  { label: "Home", href: "index.html" },
  { label: "Shop All", href: "collection.html" },
  { label: "Sets", href: "sub-collection.html" }
];

export const homeRail: ProductCard[] = [
  { href: "product.html", tone: "tone-clay", name: "Venti Lounge Set", meta: "Textured cotton", price: "$240" },
  { href: "sub-collection.html", tone: "tone-oasis", name: "Serein Short Set", meta: "Relaxed two-piece", price: "$195" },
  { href: "collection.html", tone: "tone-sage", name: "Noma Shirt", meta: "Soft linen blend", price: "$110" },
  { href: "collection.html", tone: "tone-night", name: "Turi Trouser Set", meta: "Fluid tailoring", price: "$265" }
];

export const collectionProducts: ProductCard[] = [
  { href: "product.html", tone: "tone-oasis", name: "Serein Short Set", meta: "Shirt and shorts", price: "$195" },
  { href: "product.html", tone: "tone-clay", name: "Venti Lounge Set", meta: "Shirt and trousers", price: "$240" },
  { href: "product.html", tone: "tone-night", name: "Kori Box Shirt", meta: "Washed cotton", price: "$115" },
  { href: "product.html", tone: "tone-sage", name: "Ayo Trouser Set", meta: "Relaxed tailoring", price: "$255" },
  { href: "product.html", tone: "tone-rose", name: "Tani Camp Shirt", meta: "Silk-touch twill", price: "$125" },
  { href: "product.html", tone: "tone-shell", name: "Mira Lounge Set", meta: "Cotton voile", price: "$220" },
  { href: "product.html", tone: "tone-gold", name: "Noor Short Set", meta: "Textured linen", price: "$205" },
  { href: "product.html", tone: "tone-ink", name: "Rani Relaxed Shirt", meta: "Fluid jersey", price: "$105" }
];

export const setsProducts: ProductCard[] = [
  { href: "product.html", tone: "tone-clay", name: "Venti Lounge Set", meta: "Shirt and trousers", price: "$240", tall: true },
  { href: "product.html", tone: "tone-gold", name: "Noor Short Set", meta: "Shirt and shorts", price: "$205", tall: true },
  { href: "product.html", tone: "tone-rose", name: "Nuri Lounge Set", meta: "Relaxed two-piece", price: "$230", tall: true },
  { href: "product.html", tone: "tone-shell", name: "Tala Trouser Set", meta: "Soft linen blend", price: "$250", tall: true },
  { href: "product.html", tone: "tone-ink", name: "Ari Short Set", meta: "Fluid twill", price: "$215", tall: true },
  { href: "product.html", tone: "tone-sage", name: "Ife Lounge Set", meta: "Textured cotton", price: "$225", tall: true }
];
