import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

function requireFile(path, message = `${path} is missing`) {
  if (!existsSync(join(root, path))) {
    failures.push(message);
  }
}

function requireFileUnder(path, maxBytes, message) {
  const absolutePath = join(root, path);
  if (!existsSync(absolutePath)) {
    failures.push(`${path} is missing`);
    return;
  }

  const size = statSync(absolutePath).size;
  if (size > maxBytes) {
    failures.push(message || `${path} is too large: ${size} bytes`);
  }
}

function requireNoPattern(path, pattern, message) {
  const source = readFileSync(join(root, path), "utf8");
  if (pattern.test(source)) {
    failures.push(message);
  }
}

function requirePattern(path, pattern, message) {
  const source = readFileSync(join(root, path), "utf8");
  if (!pattern.test(source)) {
    failures.push(message);
  }
}

requireFile("app/robots.ts");
requireFile("app/sitemap.ts");
requireFile("public/favicon.ico");
requireFile("public/images/placeholder.png");
requireFile("public/images/video-placeholder.jpg");
requireFile("public/images/placeholder_cert.png");
requireFile("public/images/team/mahesh-mahajan.jpg");
requireFile("public/images/team/gaurav-mahajan.jpg");

requireFileUnder("app/icon.png", 80 * 1024, "app/icon.png should stay below 80 KB");
requireFileUnder(
  "public/images/farmerlift_icon_transparent.png",
  80 * 1024,
  "public/images/farmerlift_icon_transparent.png should stay below 80 KB",
);

requireNoPattern(
  "next.config.ts",
  /unoptimized:\s*true/,
  "Next image optimization must not be globally disabled",
);
requireNoPattern(
  "components/ui/ProductImage.tsx",
  /unoptimized=\{/,
  "ProductImage must not disable optimization for local images",
);
requireNoPattern(
  "app/page.tsx",
  /dynamic\s*=\s*['"]force-dynamic['"]/,
  "Homepage must not force no-store dynamic rendering",
);
requireNoPattern(
  "components/global/navbar/Navbar.tsx",
  /href=["']\/help["']/,
  "Navbar must not link to missing /help",
);
requireNoPattern(
  "components/global/footer/Footer.tsx",
  /href=["']\/careers["']|href=["']\/sitemap["']/,
  "Footer must not link to missing /careers or /sitemap pages",
);
const googleTranslateSource = readFileSync(join(root, "components/global/GoogleTranslate.tsx"), "utf8");
const appendIndex = googleTranslateSource.indexOf("appendChild(script)");
const loaderIndex = googleTranslateSource.indexOf("const loadTranslate");
if (appendIndex === -1 || loaderIndex === -1 || appendIndex < loaderIndex) {
  failures.push("Google Translate script must not load on initial mount");
}
requirePattern(
  "app/layout.tsx",
  /metadataBase:[\s\S]*openGraph:[\s\S]*twitter:/,
  "Root metadata should include metadataBase, Open Graph, and Twitter metadata",
);

if (failures.length > 0) {
  console.error("SEO smoke audit failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("SEO smoke audit passed.");
