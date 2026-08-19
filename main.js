(function () {
  "use strict";

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var navToggle = document.getElementById("navToggle");
  var navMobile = document.getElementById("navMobile");

  if (navToggle && navMobile) {
    navToggle.addEventListener("click", function () {
      var isOpen = navMobile.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close mobile menu when a link is tapped
    navMobile.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navMobile.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Recovery request form -> opens the user's email app with details pre-filled.
  // This is a static site with no backend, so mailto: is the reliable free option.
  // (If email hosting is added later, this can be swapped for a form service like
  // Formspree or a Cloudflare Pages Function without changing the page markup.)
  var form = document.getElementById("requestForm");
  var status = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = form.name.value.trim();
      var phone = form.phone.value.trim();
      var email = form.email.value.trim();
      var vehicle = form.vehicle.value.trim();
      var location = form.location.value.trim();
      var description = form.description.value.trim();

      if (!name || !phone || !location || !description) {
        status.textContent = "Please fill in name, phone, location, and a description before sending.";
        return;
      }

      var subject = "Recovery Request from " + name;
      var bodyLines = [
        "Name: " + name,
        "Phone: " + phone,
        "Email: " + (email || "-"),
        "Vehicle: " + (vehicle || "-"),
        "Location: " + location,
        "",
        "Description of the situation:",
        description
      ];

      var mailto =
        "mailto:4Loffroadrecovery@gmail.com" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(bodyLines.join("\n"));

      window.location.href = mailto;
      status.textContent = "Opening your email app with these details filled in — hit send there to reach us.";
    });
  }
})();
