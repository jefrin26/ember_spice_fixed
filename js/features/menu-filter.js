/**
 * Feature — Menu Filter
 * Location: js/features/menu-filter.js
 * Handles category filtering + live search for food cards.
 */

export function initMenuFilter() {
  const categoryButtons = document.querySelectorAll(".category");
  const foodCards = document.querySelectorAll(".food-card");
  const searchBox = document.getElementById("searchBox");

  if (!categoryButtons.length || !foodCards.length || !searchBox) {
    return;
  }

  // Category switching
  categoryButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      categoryButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });

      button.classList.add("active");
      filterFood();
    });
  });

  // Live search
  searchBox.addEventListener("input", function () {
    filterFood();
  });

  function filterFood() {
    const selectedCategory = document.querySelector(".category.active").dataset.category;
    const searchText = searchBox.value.toLowerCase();

    foodCards.forEach(function (card) {
      const cardCategory = card.dataset.category;
      const foodName = card.querySelector("h3").textContent.toLowerCase();

      const categoryMatch = selectedCategory === "all" || cardCategory === selectedCategory;
      const searchMatch = foodName.includes(searchText);

      if (categoryMatch && searchMatch) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }
}
