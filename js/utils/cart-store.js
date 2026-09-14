/**
 * Utility — Cart Store (localStorage)
 * Location: js/utils/cart-store.js
 * Persists cart count across pages for island badge & header.
 */

const KEY = "es_cart_v1";

export function getCart() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { count: 0, items: [] };
    const parsed = JSON.parse(raw);
    if (typeof parsed.count !== "number") parsed.count = 0;
    if (!Array.isArray(parsed.items)) parsed.items = [];
    return parsed;
  } catch {
    return { count: 0, items: [] };
  }
}

export function saveCart(cart) {
  localStorage.setItem(KEY, JSON.stringify(cart));
  // Notify listeners in same tab
  window.dispatchEvent(new CustomEvent("es:cart:update", { detail: cart }));
}

export function addToCart(itemName, price) {
  const cart = getCart();
  cart.count += 1;
  cart.items.push({ name: itemName, price: price || "", at: Date.now() });
  // cap items to last 50
  if (cart.items.length > 50) cart.items = cart.items.slice(-50);
  saveCart(cart);
  return cart;
}

export function clearCart() {
  const cart = { count: 0, items: [] };
  saveCart(cart);
  return cart;
}

export function getCartCount() {
  return getCart().count;
}
