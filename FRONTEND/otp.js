// Get OTP input fields and submit button by ID
const otpInputs = document.querySelectorAll(".otp-input");
const submitOtpButton = document.getElementById("submitOtpButton");

// Error message element
const errorMessage = document.createElement("div");
errorMessage.style.color = "red";
errorMessage.style.marginTop = "10px";
document.querySelector("main").appendChild(errorMessage);

// Timer variables
let otpExpireTime = 5 * 60 * 1000; // OTP expiration time (5 minutes)
let otpStartTime = Date.now();
let timerInterval;

// Start OTP expiration timer
function startTimer() {
  timerInterval = setInterval(() => {
    const timeLeft = otpExpireTime - (Date.now() - otpStartTime);
    const timerDisplay = document.getElementById("timer");
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      if (timerDisplay) timerDisplay.textContent = "OTP has expired.";
      submitOtpButton.disabled = true; // Disable the submit button if OTP expired
    } else {
      const minutes = Math.floor(timeLeft / 60000);
      const seconds = Math.floor((timeLeft % 60000) / 1000);
      if (!timerDisplay) {
        const timerElement = document.createElement("div");
        timerElement.id = "timer";
        document.querySelector(".main-container").appendChild(timerElement);
      }
      document.getElementById("timer").textContent = `Time left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
  }, 1000);
}

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

// Simulate OTP validation (for demonstration purposes)
function validateOtp(otp) {
  // Replace with actual validation logic (API call to server)
  const validOtp = "123456";  // Example valid OTP for testing
  return otp === validOtp;
}

// Show error message for invalid OTP
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}

// Hide error message
function hideError() {
  errorMessage.style.display = "none";
}

// Submit OTP and validate
submitOtpButton.addEventListener("click", () => {
  // Combine all OTP inputs into one string
  const otp = Array.from(otpInputs).map((input) => input.value).join("");

  // Validate OTP length
  if (otp.length !== otpInputs.length) {
    showError("Please enter a complete OTP.");
    return;
  }

  // Simulate OTP validation
  if (validateOtp(otp)) {
    hideError();
    console.log("OTP entered:", otp);
    window.location.href = "tab1.html";  // Redirect on success
  } else {
    showError("Invalid OTP. Please try again.");
  }
});

// Prevent form submission on pressing Enter key
document.getElementById("otpForm").addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the form from submitting
});

// Start the OTP expiration timer
startTimer();
