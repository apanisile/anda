type CartItem = { id: string; name: string; price: number; size: string; color: string; tone: string; quantity: number };
type SearchProduct = { name: string; category: string; price: number; href: string };

const $ = <T extends Element>(selector: string): T | null => document.querySelector<T>(selector);
const $$ = <T extends Element>(selector: string): T[] => Array.from(document.querySelectorAll<T>(selector));
const formatPrice = (price: number): string => new Intl.NumberFormat("en-US", {
  style: "currency", currency: "USD", maximumFractionDigits: 0
}).format(price);

const menuToggle = $<HTMLButtonElement>(".menu-toggle");
const headerDrawer = $<HTMLElement>(".header-drawer");
menuToggle?.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(open));
  headerDrawer?.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
});
headerDrawer?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  menuToggle?.setAttribute("aria-expanded", "false");
  headerDrawer.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}));

const galleryMain = $<HTMLElement>("[data-main-image]");
const thumbs = $$<HTMLButtonElement>(".thumb");
thumbs.forEach((thumb) => thumb.addEventListener("click", () => {
  thumbs.forEach((item) => item.classList.remove("is-selected"));
  thumb.classList.add("is-selected");
  if (galleryMain) {
    galleryMain.className = `gallery-main ${thumb.dataset.swatch ?? "tone-clay"}`;
    galleryMain.innerHTML = `<span>${thumb.dataset.label ?? "Anda"}</span>`;
  }
}));

const searchOverlay = $<HTMLElement>("[data-search-overlay]");
const bagOverlay = $<HTMLElement>("[data-bag-overlay]");
const sizeOverlay = $<HTMLElement>("[data-size-overlay]");
const searchInput = $<HTMLInputElement>("[data-search-input]");
const searchResults = $<HTMLElement>("[data-search-results]");
let activeOverlay: HTMLElement | null = null;
let previouslyFocused: HTMLElement | null = null;

function closeOverlays(): void {
  [searchOverlay, bagOverlay, sizeOverlay].forEach((overlay) => { if (overlay) overlay.hidden = true; });
  document.body.classList.remove("overlay-open");
  activeOverlay = null;
  previouslyFocused?.focus();
  previouslyFocused = null;
}

function openOverlay(overlay: HTMLElement | null, focusTarget?: HTMLElement | null): void {
  if (!overlay) return;
  [searchOverlay, bagOverlay, sizeOverlay].forEach((item) => { if (item) item.hidden = true; });
  previouslyFocused = document.activeElement as HTMLElement;
  overlay.hidden = false;
  activeOverlay = overlay;
  document.body.classList.add("overlay-open");
  requestAnimationFrame(() => (focusTarget ?? overlay.querySelector<HTMLElement>("button, input, a"))?.focus());
}

$$<HTMLButtonElement>("[data-open-search]").forEach((button) =>
  button.addEventListener("click", () => openOverlay(searchOverlay, searchInput)));
$$<HTMLButtonElement>("[data-open-bag]").forEach((button) =>
  button.addEventListener("click", () => { renderBag(); openOverlay(bagOverlay); }));
$$<HTMLButtonElement>("[data-open-size-guide]").forEach((button) =>
  button.addEventListener("click", () => openOverlay(sizeOverlay)));
$$<HTMLButtonElement>("[data-close-overlay]").forEach((button) => button.addEventListener("click", closeOverlays));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (activeOverlay) closeOverlays();
    else if (menuToggle?.getAttribute("aria-expanded") === "true") {
      menuToggle.setAttribute("aria-expanded", "false");
      headerDrawer?.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      menuToggle.focus();
    }
  }
  if (event.key !== "Tab" || !activeOverlay) return;
  const focusable = $$<HTMLElement>("button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex='-1'])")
    .filter((item) => activeOverlay?.contains(item) && item.offsetParent !== null);
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});

const searchDataNode = $<HTMLScriptElement>("#product-search-data");
let searchProducts: SearchProduct[] = [];
try { searchProducts = JSON.parse(searchDataNode?.textContent ?? "[]") as SearchProduct[]; } catch { searchProducts = []; }
searchInput?.addEventListener("input", () => {
  if (!searchResults) return;
  const query = searchInput.value.trim().toLowerCase();
  if (!query) { searchResults.innerHTML = '<p class="search-hint">Try “shirt”, “short set” or “lounge”.</p>'; return; }
  const matches = searchProducts.filter((product) => `${product.name} ${product.category}`.toLowerCase().includes(query));
  searchResults.innerHTML = matches.length ? matches.map((product) => `
    <a class="search-result" href="${product.href}"><span><strong>${product.name}</strong><small>${product.category}</small></span>
    <span>${formatPrice(product.price)}</span></a>`).join("")
    : '<p class="search-hint">No pieces found. Try a different search.</p>';
});

const storageKey = "anda-cart";
let cart: CartItem[] = [];
try { cart = JSON.parse(localStorage.getItem(storageKey) ?? "[]") as CartItem[]; } catch { cart = []; }
const saveCart = (): void => {
  try { localStorage.setItem(storageKey, JSON.stringify(cart)); } catch { /* Cart remains usable this session. */ }
};
const bagItems = $<HTMLElement>("[data-bag-items]");
const bagSummary = $<HTMLElement>("[data-bag-summary]");

function renderBag(): void {
  $$<HTMLElement>("[data-bag-count]").forEach((node) =>
    node.textContent = String(cart.reduce((total, item) => total + item.quantity, 0)));
  if (!bagItems || !bagSummary) return;
  if (!cart.length) {
    bagItems.innerHTML = '<div class="empty-bag"><p>Your bag is currently empty.</p><a class="button secondary full" href="collection.html">Explore the collection</a></div>';
    bagSummary.hidden = true;
    return;
  }
  bagItems.innerHTML = cart.map((item) => `<article class="bag-item">
    <div class="bag-item-image ${item.tone}" aria-hidden="true"></div><div class="bag-item-copy"><strong>${item.name}</strong>
    <span>${item.color} · Size ${item.size}</span><span>${formatPrice(item.price * item.quantity)}</span>
    <div class="bag-item-actions"><div class="bag-quantity"><button data-cart-decrease="${item.id}" aria-label="Decrease quantity">−</button><span>${item.quantity}</span><button data-cart-increase="${item.id}" aria-label="Increase quantity">+</button></div>
    <button type="button" data-remove-item="${item.id}">Remove</button></div></div></article>`).join("");
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const remaining = Math.max(0, 250 - subtotal);
  const subtotalNode = $<HTMLElement>("[data-bag-subtotal]");
  const message = $<HTMLElement>("[data-shipping-message]");
  const value = $<HTMLElement>("[data-shipping-value]");
  const progress = $<HTMLElement>("[data-shipping-progress]");
  if (subtotalNode) subtotalNode.textContent = formatPrice(subtotal);
  if (message) message.textContent = remaining ? "Add more for complimentary shipping" : "Complimentary shipping unlocked";
  if (value) value.textContent = remaining ? formatPrice(remaining) : "Ready";
  if (progress) progress.style.width = `${Math.min(100, subtotal / 2.5)}%`;
  bagSummary.hidden = false;
}

bagItems?.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  const remove = target.closest<HTMLButtonElement>("[data-remove-item]");
  const increase = target.closest<HTMLButtonElement>("[data-cart-increase]");
  const decrease = target.closest<HTMLButtonElement>("[data-cart-decrease]");
  if (remove) cart = cart.filter((item) => item.id !== remove.dataset.removeItem);
  if (increase) cart.find((item) => item.id === increase.dataset.cartIncrease)!.quantity += 1;
  if (decrease) {
    const item = cart.find((entry) => entry.id === decrease.dataset.cartDecrease);
    if (item && --item.quantity < 1) cart = cart.filter((entry) => entry.id !== item.id);
  }
  if (remove || increase || decrease) { saveCart(); renderBag(); }
});

const addButton = $<HTMLButtonElement>("[data-add-to-bag]");
const quantityNode = $<HTMLElement>("[data-quantity]");
let productQuantity = 1;
function setProductQuantity(value: number): void {
  productQuantity = Math.max(1, Math.min(10, value));
  if (quantityNode) quantityNode.textContent = String(productQuantity);
}
$<HTMLButtonElement>("[data-quantity-minus]")?.addEventListener("click", () => setProductQuantity(productQuantity - 1));
$<HTMLButtonElement>("[data-quantity-plus]")?.addEventListener("click", () => setProductQuantity(productQuantity + 1));

$$<HTMLButtonElement>(".size-chip").forEach((button) => button.addEventListener("click", () => {
  if (button.disabled) return;
  $$(".size-chip").forEach((chip) => chip.classList.remove("is-selected"));
  button.classList.add("is-selected");
  const stock = Number(button.dataset.stock ?? 0);
  const stockMessage = $<HTMLElement>("[data-stock-message]");
  if (stockMessage) stockMessage.textContent = stock <= 3 ? `Only ${stock} left in ${button.textContent?.trim()}` : "In stock and ready to ship";
}));

$$<HTMLButtonElement>(".color-chip").forEach((button) => button.addEventListener("click", () => {
  $$(".color-chip").forEach((chip) => chip.classList.remove("is-selected"));
  button.classList.add("is-selected");
  const name = button.dataset.colorName ?? "";
  const tone = button.dataset.colorTone ?? "tone-clay";
  const label = $<HTMLElement>("[data-color-name]");
  if (label) label.textContent = name;
  if (addButton) { addButton.dataset.productColor = name; addButton.dataset.productTone = tone; }
  if (galleryMain) { galleryMain.className = `gallery-main ${tone}`; galleryMain.innerHTML = `<span>${name}</span>`; }
}));

addButton?.addEventListener("click", () => {
  const size = $<HTMLElement>(".size-chip.is-selected")?.textContent?.trim() ?? "S";
  const name = addButton.dataset.productName ?? "Anda item";
  const color = addButton.dataset.productColor ?? "";
  const slug = addButton.dataset.productSlug ?? name;
  const id = `${slug}-${color}-${size}`.toLowerCase().replace(/\s+/g, "-");
  const existing = cart.find((item) => item.id === id);
  if (existing) existing.quantity += productQuantity;
  else cart.push({ id, name, color, size, quantity: productQuantity,
    price: Number(addButton.dataset.productPrice ?? 0), tone: addButton.dataset.productTone ?? "tone-clay" });
  saveCart(); renderBag(); setProductQuantity(1);
  const toast = $<HTMLElement>("[data-cart-toast]");
  if (toast) { toast.hidden = false; window.setTimeout(() => { toast.hidden = true; }, 2200); }
});

const productGrid = $<HTMLElement>("[data-product-grid]");
const productCards = $$<HTMLElement>("[data-product-card]");
const checkedCategories = (): string[] => $$<HTMLInputElement>("[data-filter-category]:checked").map((input) => input.value);
function applyFilters(): void {
  const categories = checkedCategories();
  let visible = 0;
  productCards.forEach((card) => {
    const show = !categories.length || categories.includes(card.dataset.category ?? "");
    card.hidden = !show;
    if (show) visible++;
  });
  const count = $<HTMLElement>("[data-filter-count]");
  const resultCount = $<HTMLElement>("[data-results-count]");
  const empty = $<HTMLElement>("[data-empty-results]");
  if (count) count.textContent = String(categories.length);
  if (resultCount) resultCount.textContent = String(visible);
  if (empty) empty.hidden = visible !== 0;
  $$<HTMLButtonElement>("[data-category-filter]").forEach((button) =>
    button.classList.toggle("active-link", categories.length === 1 ? button.dataset.categoryFilter === categories[0] : !categories.length && button.dataset.categoryFilter === "all"));
}
$$<HTMLInputElement>("[data-filter-category]").forEach((input) => input.addEventListener("change", applyFilters));
$$<HTMLButtonElement>("[data-category-filter]").forEach((button) => button.addEventListener("click", () => {
  const category = button.dataset.categoryFilter ?? "all";
  $$<HTMLInputElement>("[data-filter-category]").forEach((input) => { input.checked = category !== "all" && input.value === category; });
  applyFilters();
}));
$<HTMLButtonElement>("[data-clear-filters]")?.addEventListener("click", () => {
  $$<HTMLInputElement>("[data-filter-category]").forEach((input) => { input.checked = false; }); applyFilters();
});
$<HTMLButtonElement>("[data-toggle-filters]")?.addEventListener("click", (event) => {
  const button = event.currentTarget as HTMLButtonElement;
  const panel = $<HTMLElement>("[data-filter-panel]");
  if (!panel) return;
  panel.hidden = !panel.hidden;
  button.setAttribute("aria-expanded", String(!panel.hidden));
});
$$<HTMLButtonElement>("[data-sort]").forEach((button) => button.addEventListener("click", () => {
  if (!productGrid) return;
  $$("[data-sort]").forEach((item) => item.classList.remove("is-active"));
  button.classList.add("is-active");
  const mode = button.dataset.sort;
  const sorted = [...productCards].sort((a, b) => {
    if (mode === "price-asc") return Number(a.dataset.price) - Number(b.dataset.price);
    if (mode === "price-desc") return Number(b.dataset.price) - Number(a.dataset.price);
    return Number(b.dataset.release) - Number(a.dataset.release);
  });
  sorted.forEach((card) => productGrid.append(card));
}));

renderBag();
requestAnimationFrame(() => document.body.classList.add("is-ready"));
