import {
  collectionNav, collectionProducts, homeNav, homeRail, productHref, productNav,
  products, setsNav, setsProducts, type NavLink, type Product
} from "./site-data";

const siteUrl = "https://apanisile.github.io/anda/";
const fonts = `
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@500;600;700&family=Figtree:wght@400;500;600;700;800&display=swap" rel="stylesheet" />`;

const commerceActions = `
  <label class="market-selector"><span class="sr-only">Shopping location</span>
    <select data-market-select aria-label="Shopping location">
      <option value="NG">Nigeria (₦)</option><option value="US">United States ($)</option><option value="GB">United Kingdom (£)</option>
    </select></label>
  <button class="header-action" type="button" data-open-search>Search</button>
  <button class="header-action" type="button" data-open-bag>Bag (<span data-bag-count>0</span>)</button>`;

const searchData = JSON.stringify(products.map((product) => ({
  name: product.name, category: product.categoryLabel, price: product.price, href: productHref(product)
}))).replace(/</g, "\\u003c");

const commerceOverlays = `
  <div class="site-overlay search-overlay" data-search-overlay hidden>
    <button class="overlay-backdrop" type="button" data-close-overlay aria-label="Close search"></button>
    <section class="search-panel" role="dialog" aria-modal="true" aria-labelledby="search-title">
      <div class="overlay-heading"><div><p class="eyebrow">Find your piece</p><h2 id="search-title">Search Anda</h2></div>
        <button class="close-button" type="button" data-close-overlay>Close</button></div>
      <label class="search-field"><span class="sr-only">Search products</span>
        <input type="search" placeholder="Search tops, lounge sets..." autocomplete="off" data-search-input /></label>
      <div class="search-results" data-search-results><p class="search-hint">Try “shirt”, “short set” or “lounge”.</p></div>
    </section>
  </div>
  <div class="site-overlay bag-overlay" data-bag-overlay hidden>
    <button class="overlay-backdrop" type="button" data-close-overlay aria-label="Close bag"></button>
    <aside class="bag-panel" role="dialog" aria-modal="true" aria-labelledby="bag-title">
      <div class="overlay-heading"><div><p class="eyebrow">Your selection</p><h2 id="bag-title">Shopping bag</h2></div>
        <button class="close-button" type="button" data-close-overlay>Close</button></div>
      <div class="bag-items" data-bag-items></div>
      <div class="bag-summary" data-bag-summary hidden>
        <div class="shipping-copy"><span data-shipping-message></span><strong data-shipping-value></strong></div>
        <div class="shipping-track"><span data-shipping-progress></span></div>
        <div><span>Subtotal</span><strong data-bag-subtotal>₦0</strong></div>
        <p>Shipping and taxes are calculated at checkout.</p>
        <button class="button primary full" type="button" disabled>Checkout coming soon</button>
      </div>
    </aside>
  </div>
  <div class="site-overlay size-overlay" data-size-overlay hidden>
    <button class="overlay-backdrop" type="button" data-close-overlay aria-label="Close size guide"></button>
    <section class="size-guide-panel" role="dialog" aria-modal="true" aria-labelledby="size-guide-title">
      <div class="overlay-heading"><div><p class="eyebrow">Find your fit</p><h2 id="size-guide-title">Size guide</h2></div>
        <button class="close-button" type="button" data-close-overlay>Close</button></div>
      <div class="size-table" role="table" aria-label="Anda size guide">
        <div role="row"><strong>Size</strong><strong>Bust</strong><strong>Waist</strong><strong>Hip</strong></div>
        <div role="row"><span>XS</span><span>82cm</span><span>64cm</span><span>90cm</span></div>
        <div role="row"><span>S</span><span>86cm</span><span>68cm</span><span>94cm</span></div>
        <div role="row"><span>M</span><span>92cm</span><span>74cm</span><span>100cm</span></div>
        <div role="row"><span>L</span><span>98cm</span><span>80cm</span><span>106cm</span></div>
        <div role="row"><span>XL</span><span>104cm</span><span>86cm</span><span>112cm</span></div>
      </div><p class="size-guide-note">Between sizes? Choose the larger size for Anda’s intended relaxed fit.</p>
    </section>
  </div>
  <div class="cart-toast" role="status" aria-live="polite" data-cart-toast hidden>Added to your bag</div>
  <script id="product-search-data" type="application/json">${searchData}</script>`;

const renderNav = (links: NavLink[]): string => links.map((link) =>
  `<a href="${link.href}"${link.active ? ' class="active"' : ""}>${link.label}</a>`).join("");

function renderProductCards(cards: Product[], cardClass: "product-tile" | "catalog-card", tall = false): string {
  return cards.map((product, index) => {
    const imageClass = cardClass === "catalog-card" ? `catalog-image ${product.tone}${tall ? " tall" : ""}` : `tile-image ${product.tone}`;
    const prefix = cardClass === "catalog-card" ? "catalog" : "tile";
    return `<a class="${cardClass} reveal-card" style="--card-index:${index}" href="${productHref(product)}"
      data-product-card data-category="${product.category}" data-price="${product.price}" data-release="${product.releaseOrder}">
      <div class="${imageClass}"><span class="image-loading-label">Anda</span></div>
      <p class="${prefix}-name">${product.name}</p><p class="${prefix}-meta">${product.meta}</p>
      <p class="${prefix}-price" data-display-price data-price="${product.price}">₦${product.price.toLocaleString("en-NG")}</p></a>`;
  }).join("");
}

function pageShell(options: {
  title: string; bodyClass: string; announcement: string; nav: NavLink[]; main: string;
  description: string; pathname: string; structuredData?: object;
}): string {
  const canonical = `${siteUrl}${options.pathname}`;
  const jsonLd = options.structuredData
    ? `<script type="application/ld+json">${JSON.stringify(options.structuredData).replace(/</g, "\\u003c")}</script>` : "";
  return `<!DOCTYPE html><html lang="en"><head>
    <meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${options.title}</title><meta name="description" content="${options.description}" />
    <link rel="canonical" href="${canonical}" /><link rel="icon" href="favicon.svg" type="image/svg+xml" />
    <meta property="og:title" content="${options.title}" /><meta property="og:description" content="${options.description}" />
    <meta property="og:type" content="website" /><meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${siteUrl}social-card.svg" /><meta name="twitter:card" content="summary_large_image" />
    ${fonts}<link rel="stylesheet" href="styles-v3.css" /><script defer src="script-v3.js"></script>${jsonLd}
  </head><body class="${options.bodyClass} page-enter">
    <div class="announcement-bar">${options.announcement}</div>
    <header class="site-header${options.bodyClass === "theme-sand" ? "" : " compact"}">
      <a class="brand" href="index.html" aria-label="Anda home">Anda</a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-navigation"><span>Menu</span><span class="menu-icon" aria-hidden="true"></span></button>
      <div class="header-drawer" id="site-navigation"><nav class="main-nav">${renderNav(options.nav)}</nav><div class="header-actions">${commerceActions}</div></div>
    </header>${options.main}${commerceOverlays}</body></html>`;
}

export function renderHomePage(): string {
  const featured = productHref(products[0]);
  const main = `<main>
    <section class="hero-grid"><div class="hero-copy"><p class="eyebrow">Spring Summer 26</p><h1>Ease, cut with intention.</h1>
      <p class="lede">Anda makes relaxed shirts, tops and coordinated sets for slow mornings, warm afternoons and everything that follows.</p>
      <div class="cta-row"><a class="button primary" href="collection.html">Shop New Arrivals</a><a class="button secondary" href="#story">Discover Anda</a></div>
    </div><div class="hero-visual"><div class="hero-card hero-card-tall"><span class="card-label">The Venti Set</span></div>
      <div class="hero-card hero-card-wide"><span class="card-label">Soft structure, easy rhythm</span></div></div></section>
    <section class="story-ribbon" id="story"><p>Made for the rhythm of life in warm places. Relaxed silhouettes, breathable fabrics and considered details make every piece easy to wear and easy to return to.</p></section>
    <section class="editorial-grid"><article class="editorial-panel panel-gold"><p class="eyebrow">The Most Loved</p><h2>Coordinated comfort, finished with intention.</h2><a class="text-link" href="${featured}">View the Venti Set</a></article>
      <article class="editorial-panel panel-cream"><p class="eyebrow">Sets</p><h2>Shirts paired with shorts or fluid trousers.</h2><a class="text-link" href="sub-collection.html">Shop sets</a></article>
      <article class="editorial-panel panel-ink"><p class="eyebrow">World of Anda</p><h2>Journal stories, gatherings and destination edits.</h2><a class="text-link light" href="#journal">Enter the journal</a></article></section>
    <section class="section-heading"><div><p class="eyebrow">Shop The Edit</p><h2>New season, filtered through category.</h2></div><a class="text-link" href="collection.html">View all</a></section>
    <section class="product-rail">${renderProductCards(homeRail, "product-tile")}</section>
    <section class="journal-section" id="journal"><div class="journal-copy"><p class="eyebrow">Treasure Journal</p><h2>Campaign energy, translated into an owned world.</h2>
      <p>Explore styling notes, studio stories and the craft behind an easy Anda wardrobe.</p></div>
      <div class="journal-stack"><div class="journal-card"><span>Desert Morning</span><strong>Styling Notes</strong></div><div class="journal-card alt"><span>Studio Dispatch</span><strong>Craft + construction</strong></div></div></section>
    </main><footer class="site-footer"><div><p class="brand footer-brand">Anda</p><p>Considered clothing for unhurried days and warm places.</p></div>
      <div class="footer-links"><a href="collection.html">Shop all</a><a href="sub-collection.html">Sets</a><a href="${featured}">Venti set</a></div></footer>`;
  return pageShell({ title: "Anda | Considered clothing", bodyClass: "theme-sand",
    announcement: "Complimentary express shipping on orders over ₦250,000", nav: homeNav, main,
    description: "Relaxed shirts, tops and coordinated sets designed for warm places.", pathname: "index.html" });
}

function listingControls(active: string): string {
  const categories = [["all", "View all"], ["tops", "Tops"], ["lounge", "Lounge sets"], ["shorts", "Shirt & shorts"], ["trousers", "Shirt & trousers"]];
  return `<section class="category-strip" aria-label="Product categories">${categories.map(([value, label]) =>
    `<button type="button" data-category-filter="${value}" class="${value === active ? "active-link" : ""}">${label}</button>`).join("")}</section>
    <section class="filter-bar"><button class="control-pill" type="button" data-toggle-filters aria-expanded="false">Filter (<span data-filter-count>0</span>)</button>
      <div class="sort-group"><span>Sort by</span><button class="control-pill is-active" data-sort="featured">Featured</button>
      <button class="control-pill" data-sort="newest">Newest</button><button class="control-pill" data-sort="price-asc">Lowest price</button>
      <button class="control-pill" data-sort="price-desc">Highest price</button></div></section>
    <section class="filter-panel" data-filter-panel hidden><strong>Category</strong>
      ${categories.slice(1).map(([value, label]) => `<label><input type="checkbox" value="${value}" data-filter-category /> ${label}</label>`).join("")}
      <button class="text-link" type="button" data-clear-filters>Clear filters</button></section>`;
}

function renderListingPage(isSets: boolean): string {
  const cards = isSets ? setsProducts : collectionProducts;
  const title = isSets ? "Sets" : "Shop all clothing";
  const copy = isSets ? "Coordinated shirts with relaxed shorts or trousers, designed to work together and live easily as separates."
    : "Easy tops and coordinated sets made from breathable fabrics, thoughtful cuts and colors designed to live well together.";
  const main = `<main class="listing-page"><section class="listing-hero${isSets ? " subcategory-hero" : ""}"><p class="eyebrow">The Collection</p>
    <h1>${title}</h1><p class="listing-copy">${copy}</p></section>${listingControls(isSets ? "lounge" : "all")}
    <p class="results-count"><span data-results-count>${cards.length}</span> pieces</p>
    <section class="product-grid${isSets ? " three-up" : ""}" data-product-grid>${renderProductCards(cards, "catalog-card", isSets)}</section>
    <p class="empty-results" data-empty-results hidden>No pieces match those filters.</p></main>`;
  return pageShell({ title: `Anda | ${title}`, bodyClass: "theme-shell",
    announcement: isSets ? "Coordinated sets for home, weekends and everywhere in between" : "New season arrivals now live",
    nav: isSets ? setsNav : collectionNav, main, description: copy,
    pathname: isSets ? "sub-collection.html" : "collection.html" });
}

export const renderCollectionPage = (): string => renderListingPage(false);
export const renderSetsPage = (): string => renderListingPage(true);

export function renderProductPage(product: Product = products[0], pathname = productHref(product)): string {
  const related = products.filter((item) => item.slug !== product.slug && item.category === product.category).slice(0, 3);
  const firstSize = product.sizes.find((size) => size.stock > 0);
  const main = `<main class="product-page" data-product-page>
    <section class="product-layout"><div class="product-gallery"><div class="gallery-main ${product.colors[0].tone}" data-main-image><span>${product.colors[0].name}</span></div>
      <div class="gallery-thumbs">${product.colors.map((color, index) => `<button class="thumb ${color.tone}${index === 0 ? " is-selected" : ""}" data-swatch="${color.tone}" data-label="${color.name}">${String(index + 1).padStart(2, "0")}</button>`).join("")}</div></div>
    <aside class="product-panel"><p class="eyebrow">${product.categoryLabel}</p><h1>${product.name}</h1>
      <p class="product-subtitle">${product.meta}</p><p class="product-price" data-display-price data-price="${product.price}">₦${product.price.toLocaleString("en-NG")}</p><p class="product-description">${product.description}</p>
      <div class="color-block"><div class="size-header"><span>Color: <strong data-color-name>${product.colors[0].name}</strong></span></div>
        <div class="color-grid">${product.colors.map((color, index) => `<button class="color-chip${index === 0 ? " is-selected" : ""}" type="button" style="--swatch:${color.hex}" data-color-name="${color.name}" data-color-tone="${color.tone}" aria-label="${color.name}"></button>`).join("")}</div></div>
      <div class="size-block"><div class="size-header"><span>Size</span><button class="text-link" type="button" data-open-size-guide>Size guide</button></div>
        <div class="size-grid">${product.sizes.map((size) => `<button class="size-chip${size.label === firstSize?.label ? " is-selected" : ""}" data-stock="${size.stock}" ${size.stock === 0 ? "disabled" : ""}>${size.label}</button>`).join("")}</div>
        <p class="stock-message" data-stock-message>${firstSize && firstSize.stock <= 3 ? `Only ${firstSize.stock} left in ${firstSize.label}` : "In stock and ready to ship"}</p></div>
      <div class="quantity-row"><span>Quantity</span><div class="quantity-control"><button type="button" data-quantity-minus aria-label="Decrease quantity">−</button><span data-quantity>1</span><button type="button" data-quantity-plus aria-label="Increase quantity">+</button></div></div>
      <div class="cta-stack"><button class="button primary full" type="button" data-add-to-bag data-product-slug="${product.slug}" data-product-name="${product.name}" data-product-price="${product.price}" data-product-tone="${product.colors[0].tone}" data-product-color="${product.colors[0].name}">Add to bag</button>
        <button class="button secondary full" type="button">Add to wishlist</button></div>
      <dl class="detail-list"><div><dt>Composition</dt><dd>${product.composition}</dd></div><div><dt>Fit</dt><dd>${product.fit}</dd></div>
        <div><dt>Delivery</dt><dd>Complimentary express shipping on orders over ₦250,000.</dd></div></dl></aside></section>
    <section class="product-notes"><article><p class="eyebrow">Editorial Note</p><h2>Easy pieces, considered together.</h2><p>${product.description}</p></article>
      <article class="product-complement"><p class="eyebrow">You may also like</p><div class="related-products">${renderProductCards(related, "product-tile")}</div></article></section></main>`;
  const structuredData = { "@context": "https://schema.org", "@type": "Product", name: product.name,
    description: product.description, brand: { "@type": "Brand", name: "Anda" }, category: product.categoryLabel,
    offers: { "@type": "Offer", priceCurrency: "NGN", price: product.price, availability: "https://schema.org/InStock", url: `${siteUrl}${pathname}` } };
  return pageShell({ title: `Anda | ${product.name}`, bodyClass: "theme-product",
    announcement: `${product.name} is available in limited quantities`, nav: productNav, main,
    description: `${product.name}. ${product.description}`, pathname, structuredData });
}
