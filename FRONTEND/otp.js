// Get OTP input fields and submit button by ID
const otpInputs = document.querySelectorAll(".otp-input");
const submitOtpButton = document.getElementById("submitOtpButton");

// Automatically move to the next input
otpInputs.forEach((input, index) => {
  input.addEventListener("input", (e) => {
    const value = e.target.value;

    // Allow only digits
    if (!/^\d$/.test(value)) {
      e.target.value = ""; // Clear invalid input
      return;
    }

    // Focus on the next input if a digit is entered
    if (value && index < otpInputs.length - 1) {
      otpInputs[index + 1].focus();
    }

    // Enable submit button if all fields are filled
    checkOtpComplete();
  });

  // Backspace behavior to move to the previous input
  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpInputs[index - 1].focus();
    }
  });
});

// Check if all OTP inputs are filled
function checkOtpComplete() {
  const isComplete = Array.from(otpInputs).every((input) => input.value.trim() !== "");
  submitOtpButton.disabled = !isComplete;
}

// Redirect to the next page on submit
submitOtpButton.addEventListener("click", () => {
  // Combine all OTP inputs into one string
  const otp = Array.from(otpInputs).map((input) => input.value).join("");
  console.log("OTP entered:", otp);

  // Redirect to the next page (e.g., tab.html)
  window.location.href = "tab1.html";
});
