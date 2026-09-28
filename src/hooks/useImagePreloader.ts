import { useEffect, useState } from "react";

/**
 * Critical images required for instant visual fidelity across the studio applet:
 * - Brand & identity logos
 * - Hero background banners
 * - Studio partner logos
 * - Key leadership executive portraits
 * - Core featured project typologies
 */
export const CRITICAL_IMAGES: string[] = [
  // Primary Studio Logos
  "/images/logo2.png",
  "/images/logo.jpg",

  // Main Hero Visuals
  "/images/hugo-sousa-BghGseQbAkA-unsplash.jpg",

  // Studio Partner Logos
  "/images/associates1.png",
  "/images/associates2.png",
  "/images/associates3.jfif",
  "/images/associates4.png",

  // Executive Portraits
  "/images/ceo.png",
  "/images/cmo.png",

  // Key Category & Highlight Typology Banners
  "/images/project1.jpeg",
  "/images/project2.jpeg",
  "/images/project3.jpg",
  "/images/project4.jpeg",
  "/images/project5.jpeg",
  "/images/project6.jpeg",
];

export interface PreloadState {
  isPreloaded: boolean;
  loadedCount: number;
  totalCount: number;
  progress: number;
}

/**
 * Preloads critical images (logos, hero banners, key typologies) into the browser cache
 * upon initial mount, enabling zero-latency section transitions.
 */
export function useImagePreloader(imageUrls: string[] = CRITICAL_IMAGES): PreloadState {
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isPreloaded, setIsPreloaded] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined" || !imageUrls || imageUrls.length === 0) {
      setIsPreloaded(true);
      return;
    }

    let isMounted = true;
    let completed = 0;
    const total = imageUrls.length;

    // Inject high-priority preload link tags for top critical banners
    const dynamicLinks: HTMLLinkElement[] = [];
    const highPriorityUrls = imageUrls.slice(0, 4);

    highPriorityUrls.forEach((url) => {
      try {
        const existing = document.querySelector(`link[rel="preload"][href="${url}"]`);
        if (!existing) {
          const link = document.createElement("link");
          link.rel = "preload";
          link.as = "image";
          link.href = url;
          link.setAttribute("fetchpriority", "high");
          document.head.appendChild(link);
          dynamicLinks.push(link);
        }
      } catch {
        // Fallback silently if DOM modification is restricted
      }
    });

    // Instantly warm up image cache and decode asynchronously
    imageUrls.forEach((url) => {
      const img = new Image();

      const handleDone = () => {
        if (!isMounted) return;
        completed += 1;
        setLoadedCount(completed);
        if (completed >= total) {
          setIsPreloaded(true);
        }
      };

      img.onload = handleDone;
      img.onerror = handleDone; // Always advance counter to prevent stall
      img.src = url;

      // Trigger GPU/memory bitmap decode if supported
      if (typeof img.decode === "function") {
        img.decode().catch(() => {
          // Ignore decode errors; image remains cached
        });
      }
    });

    return () => {
      isMounted = false;
      dynamicLinks.forEach((link) => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });
    };
  }, [imageUrls]);

  return {
    isPreloaded,
    loadedCount,
    totalCount: imageUrls.length,
    progress: imageUrls.length > 0 ? Math.round((loadedCount / imageUrls.length) * 100) : 100,
  };
}
