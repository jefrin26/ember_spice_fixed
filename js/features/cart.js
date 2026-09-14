/**
 * Feature — Cart / Add to Order
 * Location: js/features/cart.js
 * Shows confirmation when a food card's "+" button is clicked.
 */

export function initCart() {
  const addButtons = document.querySelectorAll(".add-btn");

  if (!addButtons.length) {
    return;
  }

  addButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const foodCard = button.closest(".food-card");
      const foodName = foodCard.querySelector("h3").textContent;

      alert(foodName + " added to your order!");
    });
  });
}
