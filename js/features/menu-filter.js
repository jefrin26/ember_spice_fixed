/**
 * Feature — Menu Filter
 * Location: js/features/menu-filter.js
 * Handles category filtering + live search for food cards.
 */

export function initMenuFilter() {
  const categoryButtons = document.querySelectorAll(".category");
  const foodCards = document.querySelectorAll(".food-card");
  const searchBox = document.getElementById("searchBox");

  if (!categoryButtons.length || !foodCards.length) {
    return;
  }

  // Support URL params for deep-linking: ?category=burger&search=cheese
  const params = new URLSearchParams(window.location.search);
  const initialCategory = params.get("category");
  const initialSearch = params.get("search");

  if (initialCategory) {
    categoryButtons.forEach(function (btn) {
      btn.classList.toggle("active", btn.dataset.category === initialCategory);
    });
    // fallback to All if none matched
    if (!document.querySelector(".category.active")) {
      const allBtn = document.querySelector('.category[data-category="all"]');
      if (allBtn) allBtn.classList.add("active");
    }
  }
  if (initialSearch && searchBox) {
    searchBox.value = initialSearch;
  }

  // Category switching
  categoryButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      categoryButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });

      button.classList.add("active");
      // Update URL without reload for shareability
      const url = new URL(window.location.href);
      const cat = button.dataset.category;
      if (cat === "all") url.searchParams.delete("category");
      else url.searchParams.set("category", cat);
      history.replaceState(null, "", url);
      filterFood();
    });
  });

  // Live search
  if (searchBox) {
    searchBox.addEventListener("input", function () {
      const url = new URL(window.location.href);
      if (searchBox.value.trim()) url.searchParams.set("search", searchBox.value.trim());
      else url.searchParams.delete("search");
      history.replaceState(null, "", url);
      filterFood();
    });
  }

  // Empty state element (create if missing)
  let emptyEl = document.getElementById("menuEmptyState");
  if (!emptyEl) {
    emptyEl = document.createElement("p");
    emptyEl.id = "menuEmptyState";
    emptyEl.style.cssText = "text-align:center;color:#aaa;margin:30px auto;display:none;grid-column:1/-1;";
    emptyEl.textContent = "No dishes match your search. Try another category or keyword.";
    const grid = document.getElementById("foodGrid");
    if (grid) grid.appendChild(emptyEl);
  }

  function filterFood() {
    const active = document.querySelector(".category.active");
    const selectedCategory = active ? active.dataset.category : "all";
    const searchText = searchBox ? searchBox.value.toLowerCase().trim() : "";

    let visible = 0;
    foodCards.forEach(function (card) {
      const cardCategory = card.dataset.category;
      const foodNameEl = card.querySelector("h3");
      const foodName = foodNameEl ? foodNameEl.textContent.toLowerCase() : "";

      const categoryMatch = selectedCategory === "all" || cardCategory === selectedCategory;
      const searchMatch = !searchText || foodName.includes(searchText);

      if (categoryMatch && searchMatch) {
        card.style.display = "block";
        visible += 1;
      } else {
        card.style.display = "none";
      }
    });

    if (emptyEl) emptyEl.style.display = visible === 0 ? "block" : "none";
  }

  // Initial filter
  filterFood();
}
