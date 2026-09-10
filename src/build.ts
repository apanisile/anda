declare const require: (id: string) => any;
declare const __dirname: string;

const fs = require("fs");
const path = require("path");

import {
  renderCollectionPage,
  renderSetsPage,
  renderHomePage,
  renderProductPage
} from "./templates";
import { productHref, products } from "./site-data";

type OutputFile = {
  filename: string;
  content: string;
};

const rootDir = path.resolve(__dirname, "..");
const srcDir = path.join(rootDir, "src");
const buildDir = path.join(rootDir, "build");
const distDir = path.join(rootDir, "dist");

const pages: OutputFile[] = [
  { filename: "index.html", content: renderHomePage() },
  { filename: "collection.html", content: renderCollectionPage() },
  { filename: "sub-collection.html", content: renderSetsPage() },
  { filename: "product.html", content: renderProductPage(products[0], "product.html") },
  ...products.map((product) => ({ filename: productHref(product), content: renderProductPage(product) }))
];

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });

pages.forEach((page) => {
  fs.writeFileSync(path.join(distDir, page.filename), page.content, "utf8");
});

fs.copyFileSync(path.join(srcDir, "styles.css"), path.join(distDir, "styles.css"));
fs.copyFileSync(path.join(buildDir, "client.js"), path.join(distDir, "script.js"));
fs.copyFileSync(path.join(srcDir, "styles.css"), path.join(distDir, "styles-v2.css"));
fs.copyFileSync(path.join(buildDir, "client.js"), path.join(distDir, "script-v2.js"));
fs.copyFileSync(path.join(srcDir, "styles.css"), path.join(distDir, "styles-v3.css"));
fs.copyFileSync(path.join(buildDir, "client.js"), path.join(distDir, "script-v3.js"));
fs.copyFileSync(path.join(srcDir, "favicon.svg"), path.join(distDir, "favicon.svg"));
fs.copyFileSync(path.join(srcDir, "social-card.svg"), path.join(distDir, "social-card.svg"));
