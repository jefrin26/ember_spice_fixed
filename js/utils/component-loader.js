/**
 * Utility — Component Loader
 * Location: js/utils/component-loader.js
 *
 * Fetches HTML partials from components/*.html and injects them
 * into placeholders marked with [data-component].
 *
 * Usage in index.html:
 *   <div data-component="navbar" data-src="components/navbar.html"></div>
 *
 * All placeholders are replaced via outerHTML to preserve the
 * original component's root tag (e.g., <header>, <section>).
 */

export async function loadComponents() {
  const placeholders = document.querySelectorAll("[data-component]");

  if (placeholders.length === 0) {
    return;
  }

  const loadTasks = Array.from(placeholders).map(async function (placeholder) {
    const src = placeholder.dataset.src;
    const name = placeholder.dataset.component;

    if (!src) {
      console.warn("[Loader] Missing data-src for component:", name);
      return;
    }

    try {
      const response = await fetch(src);

      if (!response.ok) {
        throw new Error("HTTP " + response.status);
      }

      const html = await response.text();

      // Replace placeholder with actual component markup
      placeholder.outerHTML = html.trim();
    } catch (error) {
      console.error("[Loader] Failed to load component:", name, "from", src, error);
      placeholder.innerHTML =
        '<p style="color:#ff7438;text-align:center;padding:20px;">' +
        "Failed to load " + name + " component." +
        "</p>";
    }
  });

  await Promise.all(loadTasks);
}
