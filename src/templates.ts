import {
  collectionNav,
  collectionProducts,
  setsNav,
  setsProducts,
  homeNav,
  homeRail,
  productNav,
  type NavLink,
  type ProductCard
} from "./site-data";

const fonts = `
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
`;

function renderNav(links: NavLink[]): string {
  return links
    .map((link) => `<a href="${link.href}"${link.active ? ' class="active"' : ""}>${link.label}</a>`)
    .join("");
}

function renderProductCards(cards: ProductCard[], cardClass: "product-tile" | "catalog-card"): string {
  return cards
    .map((card) => {
      const imageClass =
        cardClass === "catalog-card"
          ? `catalog-image ${card.tone}${card.tall ? " tall" : ""}`
          : `tile-image ${card.tone}`;

      const nameClass = cardClass === "catalog-card" ? "catalog-name" : "tile-name";
      const metaClass = cardClass === "catalog-card" ? "catalog-meta" : "tile-meta";
      const priceClass = cardClass === "catalog-card" ? "catalog-price" : "tile-price";

      return `
        <a class="${cardClass}" href="${card.href}">
          <div class="${imageClass}"></div>
          <p class="${nameClass}">${card.name}</p>
          <p class="${metaClass}">${card.meta}</p>
          <p class="${priceClass}">${card.price}</p>
        </a>
      `;
    })
    .join("");
}

function pageShell(title: string, bodyClass: string, announcement: string, nav: NavLink[], actions: string, main: string): string {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    ${fonts}
    <link rel="stylesheet" href="styles.css" />
    <script defer src="script.js"></script>
  </head>
  <body class="${bodyClass}">
    <div class="announcement-bar">${announcement}</div>
    <header class="site-header${bodyClass === "theme-sand" ? "" : " compact"}">
      <a class="brand" href="index.html" aria-label="Anda home">ANDA</a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-navigation">
        <span>Menu</span>
        <span class="menu-icon" aria-hidden="true"></span>
      </button>
      <div class="header-drawer" id="site-navigation">
        <nav class="main-nav">${renderNav(nav)}</nav>
        <div class="header-actions">${actions}</div>
      </div>
    </header>
    ${main}
  </body>
</html>`;
}

export function renderHomePage(): string {
  const main = `
    <main>
      <section class="hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">Spring Summer 26</p>
          <h1>Ease, cut with intention.</h1>
          <p class="lede">
            Anda makes relaxed shirts, tops and coordinated sets for slow mornings,
            warm afternoons and everything that follows.
          </p>
          <div class="cta-row">
            <a class="button primary" href="collection.html">Shop New Arrivals</a>
            <a class="button secondary" href="#story">Discover Anda</a>
          </div>
        </div>
        <div class="hero-visual">
          <div class="hero-card hero-card-tall">
            <span class="card-label">The Venti Set</span>
          </div>
          <div class="hero-card hero-card-wide">
            <span class="card-label">Soft structure, easy rhythm</span>
          </div>
        </div>
      </section>

      <section class="story-ribbon" id="story">
        <p>
          Made for the rhythm of life in warm places. Relaxed silhouettes, breathable
          fabrics and considered details make every piece easy to wear and easy to return to.
        </p>
      </section>

      <section class="editorial-grid">
        <article class="editorial-panel panel-gold">
          <p class="eyebrow">The Most Loved</p>
          <h2>Coordinated comfort, finished with intention.</h2>
          <a class="text-link" href="product.html">View the Venti Set</a>
        </article>
        <article class="editorial-panel panel-cream">
          <p class="eyebrow">Sets</p>
          <h2>Shirts paired with shorts or fluid trousers.</h2>
          <a class="text-link" href="sub-collection.html">Shop sets</a>
        </article>
        <article class="editorial-panel panel-ink">
          <p class="eyebrow">World of Anda</p>
          <h2>Journal stories, gatherings and destination edits.</h2>
          <a class="text-link light" href="#journal">Enter the journal</a>
        </article>
      </section>

      <section class="section-heading">
        <div>
          <p class="eyebrow">Shop The Edit</p>
          <h2>New season, filtered through category.</h2>
        </div>
        <a class="text-link" href="collection.html">View all</a>
      </section>

      <section class="product-rail">
        ${renderProductCards(homeRail, "product-tile")}
      </section>

      <section class="journal-section" id="journal">
        <div class="journal-copy">
          <p class="eyebrow">Treasure Journal</p>
          <h2>Campaign energy, translated into an owned world.</h2>
          <p>
            The home page leans into magazine pacing: a statement hero, narrative blocks,
            then commerce modules that feel curated rather than purely transactional.
          </p>
        </div>
        <div class="journal-stack">
          <div class="journal-card">
            <span>Desert Morning</span>
            <strong>Styling Notes</strong>
          </div>
          <div class="journal-card alt">
            <span>Studio Dispatch</span>
            <strong>Craft + construction</strong>
          </div>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div>
        <p class="brand footer-brand">ANDA</p>
        <p>Considered clothing for unhurried days and warm places.</p>
      </div>
      <div class="footer-links">
        <a href="collection.html">Shop all</a>
        <a href="sub-collection.html">Sets</a>
        <a href="product.html">Venti set</a>
      </div>
    </footer>
  `;

  return pageShell(
    "Anda | Home",
    "theme-sand",
    "Complimentary express shipping on orders over $250",
    homeNav,
    "<span>Search</span><span>Bag (2)</span>",
    main
  );
}

export function renderCollectionPage(): string {
  const main = `
    <main class="listing-page">
      <section class="listing-hero">
        <p class="eyebrow">The Collection</p>
        <h1>Shop all clothing</h1>
        <p class="listing-copy">
          Easy tops and coordinated sets made from breathable fabrics, thoughtful cuts and
          colors designed to live well together.
        </p>
      </section>

      <section class="category-strip">
        <a href="collection.html">New arrivals</a>
        <a href="collection.html">Tops</a>
        <a href="sub-collection.html">Lounge sets</a>
        <a href="sub-collection.html">Shirt &amp; shorts</a>
        <a href="sub-collection.html">Shirt &amp; trousers</a>
      </section>

      <section class="filter-bar">
        <button class="control-pill">Filter (0)</button>
        <div class="sort-group">
          <span>Sort by</span>
          <button class="control-pill is-active">Featured</button>
          <button class="control-pill">Newest</button>
          <button class="control-pill">Lowest price</button>
          <button class="control-pill">Highest price</button>
        </div>
      </section>

      <section class="product-grid">
        ${renderProductCards(collectionProducts, "catalog-card")}
      </section>
    </main>
  `;

  return pageShell(
    "Anda | Collection",
    "theme-shell",
    "New season arrivals now live",
    collectionNav,
    "<span>Account</span><span>Bag (2)</span>",
    main
  );
}

export function renderSetsPage(): string {
  const main = `
    <main class="listing-page">
      <section class="listing-hero subcategory-hero">
        <p class="eyebrow">The Collection</p>
        <h1>Sets</h1>
        <p class="listing-copy">
          Coordinated shirts with relaxed shorts or trousers, designed to work together and
          live easily as separates.
        </p>
      </section>

      <section class="category-strip">
        <a href="collection.html">View all</a>
        <a href="collection.html">Tops</a>
        <a href="sub-collection.html" class="active-link">All sets</a>
        <a href="sub-collection.html">Shirt &amp; shorts</a>
        <a href="sub-collection.html">Shirt &amp; trousers</a>
      </section>

      <section class="filter-bar">
        <button class="control-pill">Filter (0)</button>
        <div class="sort-group">
          <span>Sort by</span>
          <button class="control-pill is-active">Featured</button>
          <button class="control-pill">Best selling</button>
          <button class="control-pill">Newest</button>
        </div>
      </section>

      <section class="product-grid three-up">
        ${renderProductCards(setsProducts, "catalog-card")}
      </section>
    </main>
  `;

  return pageShell(
    "Anda | Sets",
    "theme-shell",
    "Coordinated sets for home, weekends and everywhere in between",
    setsNav,
    "<span>Search</span><span>Bag (2)</span>",
    main
  );
}

export function renderProductPage(): string {
  const main = `
    <main class="product-page">
      <section class="product-layout">
        <div class="product-gallery">
          <div class="gallery-main tone-clay" data-main-image>
            <span>Look 01</span>
          </div>
          <div class="gallery-thumbs">
            <button class="thumb tone-clay is-selected" data-swatch="tone-clay" data-label="Look 01">01</button>
            <button class="thumb tone-gold" data-swatch="tone-gold" data-label="Detail">02</button>
            <button class="thumb tone-rose" data-swatch="tone-rose" data-label="Movement">03</button>
            <button class="thumb tone-night" data-swatch="tone-night" data-label="Back View">04</button>
          </div>
        </div>

        <aside class="product-panel">
          <p class="eyebrow">Anda Essentials</p>
          <h1>Venti Lounge Set</h1>
          <p class="product-subtitle">Clay textured cotton</p>
          <p class="product-price">$240</p>
          <p class="product-description">
            A relaxed short-sleeve shirt and fluid drawstring trouser set. Cut with room to
            move and finished in breathable textured cotton for all-day comfort.
          </p>

          <div class="size-block">
            <div class="size-header">
              <span>Size</span>
              <a href="#">Size guide</a>
            </div>
            <div class="size-grid">
              <button class="size-chip">XS</button>
              <button class="size-chip is-selected">S</button>
              <button class="size-chip">M</button>
              <button class="size-chip">L</button>
            </div>
          </div>

          <div class="cta-stack">
            <button class="button primary full">Add to bag</button>
            <button class="button secondary full">Add to wishlist</button>
          </div>

          <dl class="detail-list">
            <div>
              <dt>Composition</dt>
              <dd>100% breathable textured cotton</dd>
            </div>
            <div>
              <dt>Craft</dt>
              <dd>Made in small production runs with reinforced seams and tonal buttons.</dd>
            </div>
            <div>
              <dt>Fit</dt>
              <dd>Relaxed shirt with an easy straight-leg trouser and adjustable waist.</dd>
            </div>
          </dl>
        </aside>
      </section>

      <section class="product-notes">
        <article>
          <p class="eyebrow">Editorial Note</p>
          <h2>Two pieces, one easy uniform.</h2>
          <p>
            Wear the full set for an effortless head-to-toe look, or separate the shirt and
            trousers to build a quieter everyday rotation.
          </p>
        </article>
        <article class="product-complement">
          <p class="eyebrow">Wear it with</p>
          <a class="mini-product" href="sub-collection.html">
            <div class="mini-image tone-oasis"></div>
            <div>
              <strong>Serein Short Set</strong>
              <span>$195</span>
            </div>
          </a>
        </article>
      </section>
    </main>
  `;

  return pageShell(
    "Anda | Venti Lounge Set",
    "theme-product",
    "The Venti Lounge Set is available in limited quantities",
    productNav,
    "<span>Wishlist</span><span>Bag (2)</span>",
    main
  );
}
