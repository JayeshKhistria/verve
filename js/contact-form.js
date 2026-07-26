document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const messageBox = document.getElementById("form-message");

  if (!form || !messageBox) return;

  form.addEventListener("submit", event => {
    event.preventDefault();
    messageBox.className = "form-message";
    messageBox.textContent = "";

    if (!form.checkValidity()) {
      messageBox.classList.add("error");
      messageBox.textContent = "Please complete all required fields correctly.";
      form.reportValidity();
      return;
    }

    // This is a front-end demo. Replace this block with your form service request.
    messageBox.classList.add("success");
    messageBox.textContent = "Thank you. Your form passed validation. Connect a form service before publishing to send submissions.";
    form.reset();
  });
});
