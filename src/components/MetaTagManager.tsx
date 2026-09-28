import { useEffect } from "react";
import * as metaManagerModule from "../utils/metaManager";
import type { ActiveMetaContext } from "../utils/metaManager";
import { ProjectItem } from "../data/projectsData";
import { LeadershipProfile } from "../data/siteData";

export const PRIMARY_CANONICAL_DOMAIN =
  (metaManagerModule as any).PRIMARY_CANONICAL_DOMAIN ||
  "https://mohalkar-architects-planners-a25s.vercel.app";

const applyMetaTags =
  (metaManagerModule as any).applyMetaTags ||
  ((ctx: any) => ({ ...ctx, canonicalUrl: "" }));

/**
 * Resolves the master authoritative domain for canonical tags.
 * Ensures preview/sandbox/localhost hostnames map to the verified production domain
 * so Google only indexes the official live master version.
 */
export function getAuthoritativeBaseDomain(): string {
  if (typeof (metaManagerModule as any).getAuthoritativeBaseDomain === "function") {
    return (metaManagerModule as any).getAuthoritativeBaseDomain();
  }
  if (typeof window === "undefined") {
    return PRIMARY_CANONICAL_DOMAIN;
  }
  const host = window.location.hostname;
  // If running on local development or Cloud sandbox, fallback to primary live domain
  if (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host.includes("run.app") ||
    host.includes("webcontainer") ||
    host.includes("csb.app") ||
    host.includes("stackblitz")
  ) {
    return PRIMARY_CANONICAL_DOMAIN;
  }
  // Otherwise, use current origin (e.g. vercel.app or custom production domain)
  return window.location.origin || PRIMARY_CANONICAL_DOMAIN;
}

/**
 * Computes a pure, authoritative canonical URL that strictly strips
 * any fragment identifiers (#) or hash-based routing artifacts.
 * Google Search Console explicitly rejects URLs containing fragments.
 */
export function computeCanonicalMasterUrl(
  activeTab: string,
  selectedProject?: ProjectItem | null,
  selectedLeader?: LeadershipProfile | null,
  adminSubTab?: string
): string {
  const baseDomain = getAuthoritativeBaseDomain();

  // 1. If a specific project modal is open, output clean canonical URL with query param
  if (selectedProject?.id) {
    return `${baseDomain}/projects?id=${encodeURIComponent(selectedProject.id)}`;
  }

  // 2. If a specific leader modal is open, output clean canonical URL with query param
  if (selectedLeader?.id) {
    return `${baseDomain}/about?leader=${encodeURIComponent(selectedLeader.id)}`;
  }

  // 3. Normalize tab names to standard, clean pathnames (strictly WITHOUT '#')
  const normalizedTab = (activeTab || "home")
    .toLowerCase()
    .replace(/^([#/]+)|([#/]+)$/g, "")
    .split("#")[0]
    .split("?")[0]
    .trim();

  switch (normalizedTab) {
    case "about":
      return `${baseDomain}/about`;
    case "expertise":
      return `${baseDomain}/expertise`;
    case "services":
      return `${baseDomain}/services`;
    case "projects":
      return `${baseDomain}/projects`;
    case "enquiry":
    case "contact":
      return `${baseDomain}/enquiry`;
    case "admin":
      return adminSubTab
        ? `${baseDomain}/admin?tab=${encodeURIComponent(adminSubTab)}`
        : `${baseDomain}/admin`;
    case "home":
    case "":
    default:
      return `${baseDomain}/`;
  }
}

/**
 * Injects or updates the canonical <link rel="canonical"> tag and matching
 * og:url / twitter:url / hreflang meta tags directly in <head>, ensuring Googlebot
 * and search engines recognize the single master version without hash fragments.
 */
export function enforceCanonicalLink(canonicalUrl: string, activeTab?: string): void {
  if (typeof document === "undefined") return;

  // 1. Sanitize canonical URL to guarantee no '#' hash ever reaches the canonical tag
  const sanitizedUrl = canonicalUrl.split("#")[0].trim();

  // 2. Find or create <link rel="canonical">
  let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement("link");
    canonicalLink.setAttribute("rel", "canonical");
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute("href", sanitizedUrl);

  // 3. Keep og:url in sync with the canonical master URL
  let ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
  if (!ogUrl) {
    ogUrl = document.createElement("meta");
    ogUrl.setAttribute("property", "og:url");
    document.head.appendChild(ogUrl);
  }
  ogUrl.setAttribute("content", sanitizedUrl);

  // 4. Keep twitter:url in sync
  let twitterUrl = document.querySelector<HTMLMetaElement>('meta[name="twitter:url"]');
  if (!twitterUrl) {
    twitterUrl = document.createElement("meta");
    twitterUrl.setAttribute("name", "twitter:url");
    document.head.appendChild(twitterUrl);
  }
  twitterUrl.setAttribute("content", sanitizedUrl);

  // 5. Keep alternate language canonical link tags in sync
  let hreflangEn = document.querySelector<HTMLLinkElement>('link[rel="alternate"][hreflang="en"]');
  if (!hreflangEn) {
    hreflangEn = document.createElement("link");
    hreflangEn.setAttribute("rel", "alternate");
    hreflangEn.setAttribute("hreflang", "en");
    document.head.appendChild(hreflangEn);
  }
  hreflangEn.setAttribute("href", sanitizedUrl);

  let hreflangDefault = document.querySelector<HTMLLinkElement>(
    'link[rel="alternate"][hreflang="x-default"]'
  );
  if (!hreflangDefault) {
    hreflangDefault = document.createElement("link");
    hreflangDefault.setAttribute("rel", "alternate");
    hreflangDefault.setAttribute("hreflang", "x-default");
    document.head.appendChild(hreflangDefault);
  }
  hreflangDefault.setAttribute("href", sanitizedUrl);

  // 6. Enforce robots directives (block admin from Google, index public pages)
  const isPrivate = (activeTab || "").toLowerCase().includes("admin");
  const robotsDirective = isPrivate
    ? "noindex, nofollow"
    : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";

  let robotsTag = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
  if (!robotsTag) {
    robotsTag = document.createElement("meta");
    robotsTag.setAttribute("name", "robots");
    document.head.appendChild(robotsTag);
  }
  robotsTag.setAttribute("content", robotsDirective);

  let googlebotTag = document.querySelector<HTMLMetaElement>('meta[name="googlebot"]');
  if (!googlebotTag) {
    googlebotTag = document.createElement("meta");
    googlebotTag.setAttribute("name", "googlebot");
    document.head.appendChild(googlebotTag);
  }
  googlebotTag.setAttribute("content", robotsDirective);

  // 7. Clean up any rogue or duplicated canonical link tags that may contain '#' or preview domains
  const allCanonicalLinks = document.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]');
  if (allCanonicalLinks.length > 1) {
    for (let i = 1; i < allCanonicalLinks.length; i++) {
      allCanonicalLinks[i].remove();
    }
  }
}

export interface MetaTagManagerProps {
  activeTab: string;
  selectedProject?: ProjectItem | null;
  selectedLeader?: LeadershipProfile | null;
  adminSubTab?: string;
}

/**
 * MetaTagManager Component
 * 
 * Tells Google and search engine crawlers exactly which URL is the master version,
 * completely eliminating indexing issues and duplicate content warnings associated
 * with client-side hash fragments (such as /#home, /#about, /#projects, /#services).
 */
export function MetaTagManager({
  activeTab,
  selectedProject,
  selectedLeader,
  adminSubTab,
}: MetaTagManagerProps) {
  useEffect(() => {
    const updateCanonicalAndMeta = () => {
      // 1. Compute master canonical URL stripped of any hash or client anchor fragments
      const masterCanonicalUrl = computeCanonicalMasterUrl(
        activeTab,
        selectedProject,
        selectedLeader,
        adminSubTab
      );

      // 2. Explicitly enforce the canonical <link> and og:url in document.head
      enforceCanonicalLink(masterCanonicalUrl, activeTab);

      // 3. Apply full SEO meta tags and Schema.org structured data
      applyMetaTags({
        activeTab,
        selectedProject,
        selectedLeader,
        adminSubTab,
      });
    };

    updateCanonicalAndMeta();

    // Re-verify on hashchange/popstate in case of external hash-based anchor navigation
    const handleNavigationEvent = () => {
      updateCanonicalAndMeta();
    };

    window.addEventListener("hashchange", handleNavigationEvent);
    window.addEventListener("popstate", handleNavigationEvent);

    return () => {
      window.removeEventListener("hashchange", handleNavigationEvent);
      window.removeEventListener("popstate", handleNavigationEvent);
    };
  }, [activeTab, selectedProject, selectedLeader, adminSubTab]);

  return null;
}

/**
 * Custom React hook for dynamic meta & canonical management
 */
export function useMetaManager(context: ActiveMetaContext) {
  useEffect(() => {
    const masterCanonicalUrl = computeCanonicalMasterUrl(
      context.activeTab,
      context.selectedProject,
      context.selectedLeader,
      context.adminSubTab
    );
    enforceCanonicalLink(masterCanonicalUrl, context.activeTab);
    applyMetaTags(context);

    const handleNavigationEvent = () => {
      const refreshedCanonical = computeCanonicalMasterUrl(
        context.activeTab,
        context.selectedProject,
        context.selectedLeader,
        context.adminSubTab
      );
      enforceCanonicalLink(refreshedCanonical, context.activeTab);
    };

    window.addEventListener("hashchange", handleNavigationEvent);
    window.addEventListener("popstate", handleNavigationEvent);

    return () => {
      window.removeEventListener("hashchange", handleNavigationEvent);
      window.removeEventListener("popstate", handleNavigationEvent);
    };
  }, [context.activeTab, context.selectedProject, context.selectedLeader, context.adminSubTab]);
}

export default MetaTagManager;
