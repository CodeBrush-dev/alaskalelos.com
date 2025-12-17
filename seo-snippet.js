// Single-file SEO snippet (CONFIG + META_DATA + LD_DATA + runtime)

(function () {
  "use strict";


  const CONFIG = {
    baseUrlFallback: "https://www.alaskalelos.com",
    googleSiteVerification: ""
  };

  // === DATA (from your previous meta-tags.js) ===
  const META_DATA = {"meta_tags_list":[{"page_url":"https://www.alaskalelos.com/","title_tag":"Alaska ornaments | AlaskaLelo's","meta_description":"Handmade Alaska clay Christmas ornaments by AlaskaLelo's — unique Alaska gifts, Iditarod themed ornaments and art from Alaska. Shop handcrafted ornaments Anchorage online."},{"page_url":"https://www.alaskalelos.com/shop","title_tag":"Alaskan clay ornaments | AlaskaLelo's","meta_description":"Shop handcrafted Alaskan clay ornaments—moose, bear, Iditarod and more. AlaskaLelo's ornaments make unique Alaska gifts. Buy ornaments Anchorage or order online."},{"page_url":"https://www.alaskalelos.com/where-to-buy","title_tag":"Buy ornaments Anchorage | AlaskaLelo's","meta_description":"Find AlaskaLelo's at Anchorage Market & Dimond Center weekends. Can't make it? Buy ornaments Anchorage online. Handcrafted Alaskan clay ornaments and Iditarod themed ornaments."},{"page_url":"https://www.alaskalelos.com/faq","title_tag":"Christmas ornaments Alaska FAQ | AlaskaLelo's","meta_description":"FAQ: ordering, payment, shipping and returns for AlaskaLelo's handcrafted ornaments. Learn about Alaskan clay, Iditarod themed ornaments and how to buy ornaments Anchorage."},{"page_url":"https://www.alaskalelos.com/contact","title_tag":"Alaskan artist gifts | AlaskaLelo's","meta_description":"Contact AlaskaLelo's in Anchorage to order handcrafted Alaskan clay ornaments and Iditarod themed ornaments. Call or email to buy ornaments Anchorage."}],"keywords":["alaska ornaments","christmas ornaments alaska","alaskan clay ornaments","handcrafted ornaments anchorage","unique alaska gifts","art from alaska","alaskalelos ornaments","alaskan artist gifts","iditarod themed ornaments","buy ornaments anchorage"]};

  // === DATA (from your previous LD.js) ===
  const LD_DATA = {
  "@context": "https://schema.org",
  "@type": "Store",
  "@id": "https://www.alaskalelos.com/",
  "url": "https://www.alaskalelos.com/",
  "name": "AlaskaLelo's Christmas Ornament Company",
  "alternateName": "AlaskaLelo's Ornament Company",
  "description": "AlaskaLelo's features ornaments with Alaskan themes created by artist, Leo Hads and other Alaskan artists. These themes range from nature scenes, to Christmas themes, to the Iditarod. All of our ornaments come in Alaska clay, a bi-color clay left by receding glaciers whose unique swirled pattern is revealed during firing.",
  "image": [
    "https://static.wixstatic.com/media/3546c6_ace99802f4ad41bcb381853a0021eb5f%7Emv2.jpg/v1/fill/w_192%2Ch_192%2Clg_1%2Cusm_0.66_1.00_0.01/3546c6_ace99802f4ad41bcb381853a0021eb5f%7Emv2.jpg",
    "https://www.alaskalelos.com/quality_auto/Eagle%20%26%20Mountain%20960px.jpg"
  ],
  "logo": "https://static.wixstatic.com/media/3546c6_ace99802f4ad41bcb381853a0021eb5f%7Emv2.jpg/v1/fill/w_180%2Ch_180%2Clg_1%2Cusm_0.66_1.00_0.01/3546c6_ace99802f4ad41bcb381853a0021eb5f%7Emv2.jpg",
  "telephone": "907-349-5169",
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "907-349-5169",
      "contactType": "customer service",
      "email": "alaskalelos@gmail.com"
    },
    {
      "@type": "ContactPoint",
      "telephone": "907-223-2001",
      "contactType": "customer service"
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Anchorage",
    "addressRegion": "AK",
    "addressCountry": "US"
  },
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "paymentAccepted": "PayPal, Credit Card",
  "priceRange": "$30-$40",
  "currenciesAccepted": "USD",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "description": "Anchorage Market and Festival (weekends only, mid May through mid September)",
      "validFrom": "P1Y",
      "dayOfWeek": [
        "Saturday",
        "Sunday"
      ],
      "opens": "10:00",
      "closes": "18:00"
    }
  ],
  "sameAs": [],
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.alaskalelos.com/"
  }
};

  /* ===== Helpers ===== */
  function clamp(str, max) {
    if (typeof str !== "string") str = String(str ?? "");
    return str.length <= max ? str : str.slice(0, Math.max(0, max - 1)) + "…";
  }

  function stripTrailingSlash(p) {
    if (!p) return "/";
    return p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
  }

  function normalizePathFromUrl(url) {
    try {
      const u = new URL(url);
      return stripTrailingSlash(u.pathname || "/");
    } catch {
      const m = String(url || "").match(/^https?:\/\/[^/]+(\/[^?#]*)?/i);
      return stripTrailingSlash((m && m[1]) || "/");
    }
  }

  function removeLangPrefix(pathname) {
    const m = String(pathname || "/").match(
      /^\/([a-z]{2}(?:-[A-Z]{2})?)(?=\/|$)(.*)$/
    );
    if (!m) return pathname || "/";
    const rest = stripTrailingSlash(m[2] || "/");
    return rest || "/";
  }

  function currentPagePath() {
    const path = window.location.pathname || "/";
    return stripTrailingSlash(path || "/");
  }

  function currentKeyCandidates() {
    const path = currentPagePath();
    const origin = (window.location.origin || "").replace(/\/$/, "");
    const full = origin + path;

    if (path === "/") {
      return [full, "/"];
    }

    const noLang = removeLangPrefix(path);
    return [full, path, stripTrailingSlash(path), noLang, stripTrailingSlash(noLang)];
  }

  function buildIndex(metaJson) {
    const list = (metaJson && metaJson.meta_tags_list) || [];
    const index = {};
    for (const item of list) {
      const path = normalizePathFromUrl(item.page_url);
      let origin = "";
      try {
        origin = new URL(item.page_url).origin;
      } catch {
        origin = "";
      }
      const full = origin ? origin.replace(/\/$/, "") + path : "";

      const entry = {
        title: item.title_tag || "",
        description: item.meta_description || "",
      };

      index[path] = entry;
      index[stripTrailingSlash(path)] = entry;
      if (full) index[full] = entry;
    }
    return index;
  }

  function _stripQuotes(s) {
    return String(s ?? "")
      .replace(/["'“”‘’„«»]/g, "")
      .replace(/\s+/g, " ")
      .replace(/^[\s\-–—·,;:]+|[\s\-–—·,;:]+$/g, "")
      .trim();
  }

  function normalizeKeywordsList(input, opts) {
    const { maxKeywords = 20 } = opts || {};
    if (input == null) return [];
    let items = Array.isArray(input)
      ? input.slice()
      : typeof input === "string"
      ? input.split(",")
      : [];
    const seen = new Set();
    return items
      .map(_stripQuotes)
      .filter((s) => s && s.length >= 2)
      .filter((s) => {
        const k = s.toLowerCase();
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      })
      .slice(0, maxKeywords);
  }

  function normalizeKeywords(input, opts) {
    const { maxKeywords = 20, maxLength = 280 } = opts || {};
    const list = normalizeKeywordsList(input, { maxKeywords });
    const content = list.join(", ");
    return content.length > maxLength ? content.slice(0, maxLength) : content;
  }

  function applyAltFallbacks(keywordsPool) {
    if (!Array.isArray(keywordsPool) || keywordsPool.length === 0) return;
    try {
      const images = Array.from(document.querySelectorAll("img"));
      let i = 0;
      images.forEach((img) => {
        const curAlt = (img.getAttribute("alt") || "").trim().toLowerCase();
        const shouldReplace =
          !curAlt ||
          curAlt.endsWith(".jpg") ||
          curAlt.endsWith(".png") ||
          curAlt === "image" ||
          curAlt === "img";
        if (shouldReplace) {
          img.setAttribute("alt", keywordsPool[i % keywordsPool.length]);
          i++;
        }
      });
    } catch {
      /* ignore */
    }
  }

  function optimizeImages() {
    try {
      const images = Array.from(document.querySelectorAll("img"));
      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              io.unobserve(img);
              // hook for tracking / lazy work if needed
            }
          });
        });
        images.forEach((img, index) => {
          if (index > 0) io.observe(img);
        });
      }
    } catch (err) {
      console.error("Image optimization error:", err);
    }
  }

  function upsertMeta(nameOrProperty, content, useProperty) {
    const selector = useProperty
      ? `meta[property="${nameOrProperty}"]`
      : `meta[name="${nameOrProperty}"]`;
    let el = document.head.querySelector(selector);
    if (!el) {
      el = document.createElement("meta");
      if (useProperty) el.setAttribute("property", nameOrProperty);
      else el.setAttribute("name", nameOrProperty);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  }

  function upsertLink(rel, href) {
    let link = document.head.querySelector(`link[rel="${rel}"]`);
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", rel);
      document.head.appendChild(link);
    }
    link.setAttribute("href", href);
  }

  function injectJsonLd(ldObject) {
    if (!ldObject) return;
    try {
      const existing = Array.from(
        document.head.querySelectorAll('script[type="application/ld+json"]')
      );
      existing.forEach((el) => {
        el.parentNode.removeChild(el);
      });

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(ldObject);
      document.head.appendChild(script);
    } catch (err) {
      console.error("Error injecting JSON-LD:", err);
    }
  }

  function applyJsonLd() {
    injectJsonLd(LD_DATA);
  }

  function applySeoFromJson() {
    try {
      const metaJson = META_DATA;
      const index = buildIndex(metaJson);

      const path = currentPagePath();
      const isHome = path === "/";

      const fallbackBase =
        (CONFIG && CONFIG.baseUrlFallback) ? CONFIG.baseUrlFallback : "";
      const baseUrl = (window.location.origin || fallbackBase).replace(/\/$/, "");
      const canonicalUrl = baseUrl + path;

      const keys = currentKeyCandidates();
      let entry = null;
      for (const k of keys) {
        if (index[k]) {
          entry = index[k];
          break;
        }
      }

      if (!entry) {
        return normalizeKeywordsList(metaJson.keywords, { maxKeywords: 25 });
      }

      const title = clamp(entry.title, 60);
      const desc = clamp(entry.description, 185);

      document.title = title;

      const metaList = [
        { type: "name", key: "description", content: desc },
        { type: "property", key: "og:url", content: canonicalUrl },
        { type: "name", key: "resource-hints", content: "preload" },
        { type: "name", key: "format-detection", content: "telephone=yes" },
        { type: "name", key: "mobile-web-app-capable", content: "yes" },
        { type: "name", key: "apple-mobile-web-app-capable", content: "yes" },
      ];

      // opcjonalnie dodaj google-site-verification, jeśli jest w CONFIG
      if (CONFIG && CONFIG.googleSiteVerification) {
        metaList.push({
          type: "name",
          key: "google-site-verification",
          content: CONFIG.googleSiteVerification
        });
      }

      if (isHome && metaJson && metaJson.keywords) {
        const kwContent = normalizeKeywords(metaJson.keywords, {
          maxKeywords: 25,
          maxLength: 512,
        });
        if (kwContent) {
          metaList.push({ type: "name", key: "keywords", content: kwContent });
        }
      }

      metaList.forEach((m) => {
        upsertMeta(m.key, m.content, m.type === "property");
      });

      upsertLink("canonical", canonicalUrl);

      return normalizeKeywordsList(metaJson.keywords, { maxKeywords: 25 });
    } catch (err) {
      console.error("Error meta settings:", err);
      return [];
    }
  }

  function initSnippetSEO() {
    const keywordsPool = applySeoFromJson();
    const path = currentPagePath();
    if (path === "/") {
      applyJsonLd();
    }
    optimizeImages();
    applyAltFallbacks(keywordsPool);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSnippetSEO);
  } else {
    initSnippetSEO();
  }
})();
