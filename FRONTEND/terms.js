document.addEventListener("DOMContentLoaded", function () {
    const confirmCheckbox = document.getElementById("confirmCheckbox");
    const proceedBtn = document.getElementById("proceedBtn");

    // Enable the button when checkbox is checked
    confirmCheckbox.addEventListener("change", function () {
        proceedBtn.disabled = !this.checked;
    });

    // Redirect to the voting page on button click
    proceedBtn.addEventListener("click", function () {
        if (confirmCheckbox.checked) {
            window.location.href = "login.html"; // Redirect to voting page
        } else {
            alert("Please agree to the terms before proceeding.");
        }
    });
});
