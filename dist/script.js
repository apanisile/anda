"use strict";
const galleryMain = document.querySelector("[data-main-image]");
const thumbs = Array.from(document.querySelectorAll(".thumb"));
const menuToggle = document.querySelector(".menu-toggle");
const headerDrawer = document.querySelector(".header-drawer");
menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    headerDrawer?.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
});
headerDrawer?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        menuToggle?.setAttribute("aria-expanded", "false");
        headerDrawer.classList.remove("is-open");
        document.body.classList.remove("menu-open");
    });
});
document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || menuToggle?.getAttribute("aria-expanded") !== "true") {
        return;
    }
    menuToggle.setAttribute("aria-expanded", "false");
    headerDrawer?.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    menuToggle.focus();
});
if (galleryMain && thumbs.length > 0) {
    thumbs.forEach((thumb) => {
        thumb.addEventListener("click", () => {
            thumbs.forEach((item) => item.classList.remove("is-selected"));
            thumb.classList.add("is-selected");
            const swatch = thumb.dataset.swatch ?? "tone-clay";
            const label = thumb.dataset.label ?? "Look 01";
            galleryMain.className = `gallery-main ${swatch}`;
            galleryMain.innerHTML = `<span>${label}</span>`;
        });
    });
}
const products = [
    { name: "Venti Lounge Set", category: "Shirt and trousers", price: 240, href: "product.html" },
    { name: "Serein Short Set", category: "Shirt and shorts", price: 195, href: "product.html" },
    { name: "Noma Shirt", category: "Tops", price: 110, href: "collection.html" },
    { name: "Turi Trouser Set", category: "Shirt and trousers", price: 265, href: "product.html" },
    { name: "Kori Box Shirt", category: "Tops", price: 115, href: "collection.html" },
    { name: "Mira Lounge Set", category: "Lounge sets", price: 220, href: "product.html" }
];
const searchOverlay = document.querySelector("[data-search-overlay]");
const bagOverlay = document.querySelector("[data-bag-overlay]");
const searchInput = document.querySelector("[data-search-input]");
const searchResults = document.querySelector("[data-search-results]");
const bagItems = document.querySelector("[data-bag-items]");
const bagSummary = document.querySelector("[data-bag-summary]");
const bagSubtotal = document.querySelector("[data-bag-subtotal]");
const cartToast = document.querySelector("[data-cart-toast]");
const storageKey = "anda-cart";
function formatPrice(price) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
    }).format(price);
}
function readCart() {
    try {
        const savedCart = localStorage.getItem(storageKey);
        return savedCart ? JSON.parse(savedCart) : [];
    }
    catch {
        return [];
    }
}
let cart = readCart();
function saveCart() {
    try {
        localStorage.setItem(storageKey, JSON.stringify(cart));
    }
    catch {
        // Keep the cart usable for the current page if storage is unavailable.
    }
}
function updateBagCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll("[data-bag-count]").forEach((element) => {
        element.textContent = String(count);
    });
}
function renderBag() {
    if (!bagItems || !bagSummary || !bagSubtotal)
        return;
    if (cart.length === 0) {
        bagItems.innerHTML = `
      <div class="empty-bag">
        <p>Your bag is currently empty.</p>
        <a class="button secondary full" href="collection.html">Explore the collection</a>
      </div>
    `;
        bagSummary.hidden = true;
        updateBagCount();
        return;
    }
    bagItems.innerHTML = cart
        .map((item) => `
        <article class="bag-item">
          <div class="bag-item-image ${item.tone}" aria-hidden="true"></div>
          <div class="bag-item-copy">
            <strong>${item.name}</strong>
            <span>Size ${item.size} · Qty ${item.quantity}</span>
            <span>${formatPrice(item.price * item.quantity)}</span>
            <button type="button" data-remove-item="${item.id}">Remove</button>
          </div>
        </article>
      `)
        .join("");
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    bagSubtotal.textContent = formatPrice(subtotal);
    bagSummary.hidden = false;
    updateBagCount();
}
function closeOverlays() {
    if (searchOverlay)
        searchOverlay.hidden = true;
    if (bagOverlay)
        bagOverlay.hidden = true;
    document.body.classList.remove("overlay-open");
}
function openOverlay(overlay, focusTarget) {
    closeOverlays();
    if (!overlay)
        return;
    overlay.hidden = false;
    document.body.classList.add("overlay-open");
    window.requestAnimationFrame(() => focusTarget?.focus());
}
document.querySelectorAll("[data-open-search]").forEach((button) => {
    button.addEventListener("click", () => openOverlay(searchOverlay, searchInput));
});
document.querySelectorAll("[data-open-bag]").forEach((button) => {
    button.addEventListener("click", () => {
        renderBag();
        openOverlay(bagOverlay, bagOverlay?.querySelector(".close-button"));
    });
});
document.querySelectorAll("[data-close-overlay]").forEach((button) => {
    button.addEventListener("click", closeOverlays);
});
document.querySelectorAll(".size-chip").forEach((button) => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".size-chip").forEach((chip) => chip.classList.remove("is-selected"));
        button.classList.add("is-selected");
    });
});
document.querySelector("[data-add-to-bag]")?.addEventListener("click", (event) => {
    const button = event.currentTarget;
    const selectedSize = document.querySelector(".size-chip.is-selected")?.textContent?.trim() ?? "S";
    const name = button.dataset.productName ?? "Anda item";
    const price = Number(button.dataset.productPrice ?? 0);
    const tone = button.dataset.productTone ?? "tone-clay";
    const id = `${name}-${selectedSize}`.toLowerCase().replace(/\s+/g, "-");
    const existingItem = cart.find((item) => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    }
    else {
        cart.push({ id, name, price, size: selectedSize, tone, quantity: 1 });
    }
    saveCart();
    renderBag();
    if (cartToast) {
        cartToast.hidden = false;
        window.setTimeout(() => {
            cartToast.hidden = true;
        }, 2200);
    }
});
bagItems?.addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-remove-item]");
    if (!removeButton)
        return;
    cart = cart.filter((item) => item.id !== removeButton.dataset.removeItem);
    saveCart();
    renderBag();
});
searchInput?.addEventListener("input", () => {
    if (!searchResults)
        return;
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
        searchResults.innerHTML = '<p class="search-hint">Try “shirt”, “short set” or “lounge”.</p>';
        return;
    }
    const matches = products.filter((product) => `${product.name} ${product.category}`.toLowerCase().includes(query));
    searchResults.innerHTML = matches.length
        ? matches
            .map((product) => `
            <a class="search-result" href="${product.href}">
              <span><strong>${product.name}</strong><small>${product.category}</small></span>
              <span>${formatPrice(product.price)}</span>
            </a>
          `)
            .join("")
        : '<p class="search-hint">No pieces found. Try a different search.</p>';
});
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.body.classList.contains("overlay-open")) {
        closeOverlays();
    }
});
renderBag();
