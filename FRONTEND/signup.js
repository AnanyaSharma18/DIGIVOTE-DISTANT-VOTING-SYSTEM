    // Selecting necessary DOM elements
    const captchaTextBox = document.querySelector(".captch_box input");
    const refreshButton = document.querySelector(".refresh_button");
    const captchaInputBox = document.querySelector(".captch_input input");
    const message = document.querySelector(".message");
    const submitButton = document.querySelector(".button");
    const sendOtpButton = document.getElementById("sendOtpButton");
    
    // Variable to store generated captcha
    let captchaText = null;
    
    // Function to generate captcha
    const generateCaptcha = () => {
    const randomString = Math.random().toString(36).substring(2, 7);
    const randomStringArray = randomString.split("");
    const changeString = randomStringArray.map((char) => 
      Math.random() > 0.5 ? char.toUpperCase() : char
    );
    captchaText = changeString.join(" ");
    captchaTextBox.value = captchaText;
    console.log(captchaText); // Optional: For debugging purposes
    };
    
    // Refresh button click handler
    const refreshBtnClick = () => {
    generateCaptcha();
    captchaInputBox.value = "";
    captchaKeyUpValidate();
    };
    
    // Validate captcha input on keyup
    const captchaKeyUpValidate = () => {
    // Toggle submit button disable class based on captcha input field
    submitButton.classList.toggle("disabled", !captchaInputBox.value);
    
    if (!captchaInputBox.value) message.classList.remove("active");
    };
    
    // Validate captcha and send form data
    const sendOtpHandler = async () => {
    // Remove spaces from captchaText
    const formattedCaptchaText = captchaText.replace(/\s/g, "");
    
    // Validate the captcha
    if (captchaInputBox.value === formattedCaptchaText) {
      message.classList.add("active");
      message.innerText = "Entered captcha is correct";
      message.style.color = "#826afb";
    
      // Fetch form data
      const email = document.getElementById("email").value;
      const phoneNumber = document.getElementById("mobile").value;
      const password = document.getElementById("password").value;
    
      // Check if all fields are filled
      if (!email || !phoneNumber || !password) {
        alert("Please fill in all the required fields!");
        return;
      }
    
      // Send data to the backend
      try {
        const response = await fetch("http://localhost:5002/api/send-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, phoneNumber, password }),
        });
    
        const data = await response.json();
        if (response.ok) {
          alert(data.message);
          // Redirect to the OTP page
          window.open("otp.html", "_self");
        } else {
          alert(data.message || "Failed to send OTP. Please try again.");
        }
      } catch (error) {
        console.error("Error sending data to backend:", error);
        alert("An error occurred. Please try again later.");
      }
    } else {
      message.classList.add("active");
      message.innerText = "Entered captcha is not correct";
      message.style.color = "#FF2525";
    }
    };
    
    // Add event listeners
    refreshButton.addEventListener("click", refreshBtnClick);
    captchaInputBox.addEventListener("keyup", captchaKeyUpValidate);
    sendOtpButton.addEventListener("click", sendOtpHandler);
    
    // Generate a captcha when the page loads
    generateCaptcha();
    