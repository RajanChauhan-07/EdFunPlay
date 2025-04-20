document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".login-form");
  const captchaCodeSpan = document.getElementById("captcha-code");
  const captchaInput = document.getElementById("captcha-input");
  const refreshCaptchaBtn = document.getElementById("refresh-captcha");

  // Generate a random CAPTCHA code
  function generateCaptcha() {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let code = "";
      for (let i = 0; i < 6; i++) {
          code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return code;
  }

  // Display the CAPTCHA code
  function setCaptcha() {
      captchaCodeSpan.textContent = generateCaptcha();
  }

  // Refresh the CAPTCHA when the button is clicked
  refreshCaptchaBtn.addEventListener("click", (e) => {
      e.preventDefault();
      setCaptcha();
  });

  // Initial captcha set
  setCaptcha();

  // Handle login form submission
  loginForm.addEventListener("submit", (event) => {
      event.preventDefault();

      // Check if CAPTCHA is correct (case-insensitive)
      if (captchaInput.value.trim().toLowerCase() !== captchaCodeSpan.textContent.toLowerCase()) {
          alert("CAPTCHA is incorrect. Please try again.");
          // Reset captcha input
          captchaInput.value = "";
          // Generate a new code
          setCaptcha();
          return;
      }

      // If CAPTCHA is correct, proceed with login logic
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Basic validation
      if (email.trim() === "" || password.trim() === "") {
          alert("Please fill out all fields.");
          return;
      }

      // Example: Show success message (fixed template literal)
      alert(`Welcome back, ${email}! (CAPTCHA verified)`);
      // Here you can add actual login logic, e.g. sending data to server
      
      // Optional: Reset the form after successful submission
      loginForm.reset();
      setCaptcha();
  });
});