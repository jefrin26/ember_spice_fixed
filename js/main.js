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

async function initApp() {
  // 1. Load HTML components into the shell
  await loadComponents();

  // 2. Initialize feature logic (requires DOM from components)
  initMenuFilter();
  initCart();
  initOffer();
  initContactForm();
}

// Start when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
