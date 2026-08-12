/**
 * Single source of truth for site-wide identity (domain, name, description).
 * Everything that needs the domain — metadata, canonical URLs, RSS/sitemap
 * later, README — should import from here instead of hardcoding a string.
 */
export const siteConfig = {
  name: "Wale Timothy",
  domain: "waletimothy.com",
  url: "https://waletimothy.com",
  description:
    "The personal desktop of Wale Timothy — life, projects, and writing.",
  author: "Wale Timothy",
} as const;
