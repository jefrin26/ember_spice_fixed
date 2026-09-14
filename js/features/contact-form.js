/**
 * Feature — Contact Form
 * Location: js/features/contact-form.js
 * Validates and handles submission with friendly toast.
 */

import { showToast } from "../utils/toast.js";

export function initContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (!contactForm) {
    return;
  }

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameEl = document.getElementById("name");
    const name = nameEl ? nameEl.value.trim() : "there";
    if (!name) {
      showToast("Please enter your name.");
      return;
    }

    showToast("Thank you, " + name + "! Your message has been received. ✨");
    contactForm.reset();

    // Optional: subtle success state
    const btn = contactForm.querySelector('button[type="submit"]');
    if (btn) {
      const prev = btn.textContent;
      btn.textContent = "Sent ✓";
      btn.disabled = true;
      setTimeout(function () {
        btn.textContent = prev;
        btn.disabled = false;
      }, 1800);
    }
  });
}
