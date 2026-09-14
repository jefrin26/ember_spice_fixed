/**
 * Feature — Offers
 * Location: js/features/offer.js
 * Handles the "CLAIM OFFER" action (previously inline onclick).
 */

export function initOffer() {
  const offerButton = document.querySelector(".offer-btn");

  if (!offerButton) {
    return;
  }

  offerButton.addEventListener("click", function () {
    showOffer();
  });
}

export function showOffer() {
  alert("Congratulations!\n\n" + "Your 20% OFF offer is ready!");
}

// Expose globally for any legacy inline handlers (optional)
window.showOffer = showOffer;
