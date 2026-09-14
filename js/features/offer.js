/**
 * Feature — Offers
 * Location: js/features/offer.js
 * Handles the "CLAIM OFFER" action with friendly toast.
 */

import { showToast } from "../utils/toast.js";

export function initOffer() {
  const offerButtons = document.querySelectorAll(".offer-btn");

  if (!offerButtons.length) {
    return;
  }

  offerButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      showOffer();
    });
  });
}

export function showOffer() {
  // Store claimed state
  try {
    localStorage.setItem("es_offer_claimed", String(Date.now()));
  } catch {}
  showToast("🎉 20% OFF applied — add 2 mains to cart & save!", {
    actionLabel: "Order now",
    onAction: function () {
      window.location.href = "menu.html";
    },
  });
}

// Expose globally for any legacy inline handlers (optional)
window.showOffer = showOffer;
