/**
 * Utility — Toast
 * Location: js/utils/toast.js
 * Friendly non-blocking feedback instead of alert()
 */

let stackEl = null;

function ensureStack() {
  if (stackEl && document.body.contains(stackEl)) return stackEl;
  stackEl = document.getElementById("toastStack");
  if (!stackEl) {
    stackEl = document.createElement("div");
    stackEl.id = "toastStack";
    stackEl.className = "toast-stack";
    stackEl.setAttribute("aria-live", "polite");
    stackEl.setAttribute("aria-atomic", "true");
    document.body.appendChild(stackEl);
  }
  return stackEl;
}

export function showToast(message, opts = {}) {
  const stack = ensureStack();
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.setAttribute("role", "status");

  const dot = document.createElement("span");
  dot.className = "toast-dot";
  dot.setAttribute("aria-hidden", "true");

  const text = document.createElement("span");
  text.textContent = message;

  toast.append(dot, text);

  // Optional action button?
  if (opts.actionLabel && opts.onAction) {
    const btn = document.createElement("button");
    btn.textContent = opts.actionLabel;
    btn.style.cssText =
      "margin-left:8px;padding:6px 12px;border-radius:999px;border:none;background:#ff7438;color:#fff;font-weight:700;font-size:12px;cursor:pointer;";
    btn.addEventListener("click", function () {
      opts.onAction();
      toast.remove();
    });
    toast.append(btn);
  }

  stack.appendChild(toast);

  // Auto remove after animation (3s)
  setTimeout(function () {
    if (toast.parentNode) toast.remove();
  }, 3200);
}
