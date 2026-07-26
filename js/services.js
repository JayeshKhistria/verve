document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".service-card");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      buttons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.filter;
      cards.forEach(card => {
        const categories = card.dataset.category.split(" ");
        const matches = filter === "all" || categories.includes(filter);
        card.classList.toggle("hidden", !matches);
      });
    });
  });
});