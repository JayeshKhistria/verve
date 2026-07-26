document.addEventListener("DOMContentLoaded", () => {
  const config = window.SITE_CONFIG || {};
  const company = config.company || {};
  const contact = config.contact || {};
  const labels = config.labels || {};

  const setText = (selector, value) => {
    if (!value) return;
    document.querySelectorAll(selector).forEach(element => {
      element.textContent = value;
    });
  };

  setText("[data-company-name]", company.name);
  setText("[data-company-short-name]", company.shortName);
  setText("[data-company-tagline]", company.tagline);
  setText("[data-company-description]", company.description);
  setText("[data-phone-display]", contact.phoneDisplay);
  setText("[data-email]", contact.email);
  setText("[data-address]", contact.address);
  setText("[data-business-hours]", contact.businessHours);
  setText("[data-saturday-hours]", contact.saturdayHours);
  setText("[data-quote-label]", labels.quoteButton);
  setText("[data-request-quote-label]", labels.requestQuoteButton);
  setText("[data-copyright-suffix]", labels.copyrightSuffix);
  setText("[data-privacy-label]", labels.privacyText);
  setText("[data-terms-label]", labels.termsText);

  document.querySelectorAll("[data-phone-link]").forEach(link => {
    if (contact.phoneLink) link.href = `tel:${contact.phoneLink}`;
  });
  document.querySelectorAll("[data-email-link]").forEach(link => {
    if (contact.email) link.href = `mailto:${contact.email}`;
  });

  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const backToTop = document.querySelector(".back-to-top");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      document.body.classList.toggle("menu-open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        document.body.classList.remove("menu-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPage && !link.classList.contains("btn")) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  document.querySelectorAll("[data-current-year]").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const symbol = button.querySelector("span");
      const isOpen = item.classList.toggle("open");
      symbol.textContent = isOpen ? "−" : "+";
    });
  });

  const counters = document.querySelectorAll("[data-count]");
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count);
      const duration = 1200;
      const startTime = performance.now();
      function update(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        el.textContent = Math.floor(progress * target);
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(counter => counterObserver.observe(counter));

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) backToTop?.classList.add("visible");
    else backToTop?.classList.remove("visible");
  });
  backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
});
