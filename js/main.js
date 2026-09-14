/**
 * Ember & Spice — Entry Point
 * Location: js/main.js
 * Loads HTML components first, then initializes feature modules.
 */

import { loadComponents } from "./utils/component-loader.js";
import { initMenuFilter } from "./features/menu-filter.js";
import { initCart } from "./features/cart.js";
import { initOffer } from "./features/offer.js";
import { initContactForm } from "./features/contact-form.js";
import { initDynamicIsland } from "./features/dynamic-island.js";

async function initApp() {
  // 1. Load HTML components into the shell (if page uses placeholders)
  await loadComponents();

  // 2. Initialize feature logic — safe to call on any page (each checks DOM)
  initMenuFilter();
  initCart();
  initOffer();
  initContactForm();
  initDynamicIsland();
}

// Start when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
