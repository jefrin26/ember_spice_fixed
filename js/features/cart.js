/**
 * Feature — Cart / Add to Order
 * Location: js/features/cart.js
 * Persists across pages via localStorage + shows friendly toast.
 */

import { addToCart } from "../utils/cart-store.js";
import { showToast } from "../utils/toast.js";

export function initCart() {
  const addButtons = document.querySelectorAll(".add-btn");

  if (!addButtons.length) {
    return;
  }

  addButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const foodCard = button.closest(".food-card");
      if (!foodCard) return;
      const foodNameEl = foodCard.querySelector("h3");
      const priceEl = foodCard.querySelector(".food-bottom strong");
      const foodName = foodNameEl ? foodNameEl.textContent.trim() : "Item";
      const price = priceEl ? priceEl.textContent.trim() : "";

      addToCart(foodName, price);

      // Button micro-feedback
      const prev = button.textContent;
      button.textContent = "✓";
      button.style.background = "#22c55e";
      button.style.transform = "scale(1.15) rotate(0deg)";
      setTimeout(function () {
        button.textContent = prev;
        button.style.background = "";
        button.style.transform = "";
      }, 900);

      showToast(foodName + " added to cart" + (price ? " • " + price : ""), {
        actionLabel: "View menu",
        onAction: function () {
          if (!window.location.pathname.includes("menu")) {
            window.location.href = "menu.html";
          }
        },
      });
    });
  });
}
