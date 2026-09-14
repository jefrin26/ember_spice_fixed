/**
 * Feature — Contact Form
 * Location: js/features/contact-form.js
 * Validates and handles submission with a thank-you message.
 */

export function initContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (!contactForm) {
    return;
  }

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;

    alert("Thank you, " + name + "! Your message has been received.");

    contactForm.reset();
  });
}
