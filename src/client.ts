type GalleryButton = HTMLButtonElement & {
  dataset: DOMStringMap & {
    swatch?: string;
    label?: string;
  };
};

const galleryMain = document.querySelector<HTMLElement>("[data-main-image]");
const thumbs = Array.from(document.querySelectorAll<HTMLButtonElement>(".thumb")) as GalleryButton[];
const menuToggle = document.querySelector<HTMLButtonElement>(".menu-toggle");
const headerDrawer = document.querySelector<HTMLElement>(".header-drawer");

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
