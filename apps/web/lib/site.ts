// Canonical, absolute URL of the deployed site, including the GitHub Pages
// base path. Forks override it with NEXT_PUBLIC_SITE_URL (see README).
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://noothowl.github.io/CV-Portfolio"
).replace(/\/+$/, "");

export const SITE_NAME = "Martín Jesús Chipoco — Portfolio";
export const SITE_AUTHOR = "Martín Jesús Chipoco";
export const SITE_ROLE = "Unreal Engine & Software Developer | Computer Engineer";
export const SITE_DESCRIPTION = `${SITE_ROLE} — Site for Projects & CV`;

// Preview image used by link unfurlers (LinkedIn, Discord, WhatsApp, X).
export const SITE_IMAGE = { path: "/images/icon.png", width: 1024, height: 1024 };

export function absoluteUrl(p: string = "/") {
  return `${SITE_URL}${p.startsWith("/") ? p : `/${p}`}`;
}
