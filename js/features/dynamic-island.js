/**
 * Feature — Dynamic Island Navbar
 * Location: js/features/dynamic-island.js
 * Highlights active page, syncs cart badge, hides on scroll
 * via transform, handles island morph interactions.
 */

import { getCart } from "../utils/cart-store.js";

function getCurrentPage() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  // normalize
  if (path === "" || path === "index.html") return "home";
  if (path.startsWith("menu")) return "menu";
  if (path.startsWith("about")) return "about";
  if (path.startsWith("offers")) return "offers";
  if (path.startsWith("contact")) return "contact";
  return "home";
}

function syncCartBadges() {
  const cart = getCart();
  const count = cart.count || 0;

  const islandBadge = document.getElementById("islandCartBadge");
  const navBadge = document.getElementById("navCartBadge");

  [islandBadge, navBadge].forEach(function (el) {
    if (!el) return;
    if (count > 0) {
      el.textContent = count > 99 ? "99+" : String(count);
      el.classList.add("is-visible");
      el.removeAttribute("hidden");
      el.setAttribute("aria-label", count + " items in cart");
    } else {
      el.classList.remove("is-visible");
      el.setAttribute("hidden", "");
    }
  });
}

export function initDynamicIsland() {
  const island = document.getElementById("dynamicIsland");
  if (!island) return;

  const page = getCurrentPage();

  // 1. Mark active link (island + top nav)
  const islandLinks = island.querySelectorAll(".island-link[data-page]");
  islandLinks.forEach(function (link) {
    const isActive = link.dataset.page === page;
    link.classList.toggle("is-active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  // Top nav removed — active state handled only for island

  // Add class to body for bottom padding
  document.body.classList.add("has-dynamic-island");

  // 2. Cart badge sync
  syncCartBadges();
  window.addEventListener("es:cart:update", syncCartBadges);
  window.addEventListener("storage", function (e) {
    if (e.key && e.key.includes("es_cart")) syncCartBadges();
  });

  // 3. Hide on scroll down, show on scroll up (subtle)
  let lastY = window.scrollY;
  let ticking = false;
  let hidden = false;

  function onScroll() {
    const y = window.scrollY;
    const delta = y - lastY;

    // Only hide after scrolled past 120px and scrolling down
    if (y > 140 && delta > 6 && !hidden) {
      island.classList.add("is-hidden");
      hidden = true;
    } else if ((delta < -8 || y <= 140) && hidden) {
      island.classList.remove("is-hidden");
      hidden = false;
    }
    lastY = y;
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    },
    { passive: true }
  );

  // 4. Morph micro-interaction on click (spring scale)
  islandLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      // Brief scale feedback
      link.style.transform = "scale(0.96)";
      setTimeout(function () {
        link.style.transform = "";
      }, 140);
    });
  });

  // 5. Keyboard shortcut: press 1-5 to navigate (user friendly)
  document.addEventListener("keydown", function (e) {
    if (e.target.matches("input, textarea, select")) return;
    const map = { "1": "home", "2": "menu", "3": "offers", "4": "about", "5": "contact" };
    const targetPage = map[e.key];
    if (!targetPage) return;
    const targetLink = island.querySelector('.island-link[data-page="' + targetPage + '"]');
    if (targetLink) {
      e.preventDefault();
      targetLink.click();
    }
  });
}
