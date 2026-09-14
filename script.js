/**
 * DEPRECATED — Ember & Spice Legacy Script
 * Location: script.js (root)
 *
 * This file is kept only for backward compatibility.
 * All logic has been split into ES modules:
 *
 *   js/main.js                    → entry point (imports all)
 *   js/features/menu-filter.js    → category + search filtering
 *   js/features/cart.js           → add-to-order
 *   js/features/offer.js          → claim offer
 *   js/features/contact-form.js   → contact form handling
 *
 * Please use <script type="module" src="js/main.js"></script> instead.
 *
 * For legacy pages still loading script.js, we dynamically forward to the
 * modular entry point.
 */

console.warn(
  "[Ember & Spice] script.js is deprecated. Use js/main.js as ES module."
);

// Forward to modular entry if this file is loaded as classic script
import("./js/main.js").catch(function (err) {
  console.error("Failed to load modular scripts:", err);
});
