document.addEventListener("DOMContentLoaded", function() {
    let categoryDropdown = document.getElementById("category");
    let proceedButton = document.getElementById("proceed");

    if (categoryDropdown) {
        categoryDropdown.addEventListener("change", handleCategoryChange);
    }

    if (proceedButton) {
        proceedButton.addEventListener("click", function() {
            if (!this.disabled) {
                window.location.href = "tab1.html";
            }
        });
    }
});

function handleCategoryChange() {
    let category = document.getElementById("category").value;
    let verificationDiv = document.getElementById("verification");
    let disabledVerificationDiv = document.getElementById("disabled-verification");
    let seniorVerificationDiv = document.getElementById("senior-verification");
    let messageDiv = document.getElementById("message");
    let proceedButton = document.getElementById("proceed");

    if (category === "senior") {
        verificationDiv.style.display = "none";
        disabledVerificationDiv.style.display = "none";
        seniorVerificationDiv.style.display = "block";
        messageDiv.innerHTML = "";
        proceedButton.disabled = true;
    } else if (category === "disabled") {
        verificationDiv.style.display = "none";
        seniorVerificationDiv.style.display = "none";
        disabledVerificationDiv.style.display = "block";
        messageDiv.innerHTML = "";
        proceedButton.disabled = true;
    } else {
        verificationDiv.style.display = category === "disabled" ? "none" : "block";
        seniorVerificationDiv.style.display = "none";
        disabledVerificationDiv.style.display = "none";
        messageDiv.innerHTML = "";
        proceedButton.disabled = category !== "disabled";
    }
}

function validateUser() {
    let voterAddress = document.getElementById("voter_address").value.trim();
    let currentAddress = document.getElementById("current_address").value.trim();
    let messageDiv = document.getElementById("message");
    let proceedButton = document.getElementById("proceed");

    if (!messageDiv || !proceedButton) return;

    if (!voterAddress || !currentAddress) {
        messageDiv.innerHTML = "<span class='failure'>❌ Both addresses are required.</span>";
        proceedButton.disabled = true;
        return;
    }

    if (voterAddress === currentAddress) {
        messageDiv.innerHTML = "<span class='failure'>❌ Current address and Voter ID address should not be the same.</span>";
        proceedButton.disabled = true;
        return;
    }

    let flightEligible = checkFlightDistance(voterAddress, currentAddress);
    if (flightEligible) {
        messageDiv.innerHTML = "<span class='failure'>❌ You are not eligible as the distance can be covered within a day by flight.</span>";
        proceedButton.disabled = true;
    } else {
        messageDiv.innerHTML = "<span class='success'>✔ Verification successful. You can proceed.</span>";
        proceedButton.disabled = false;
    }
}

function checkFlightDistance(voterAddress, currentAddress) {
    console.log("Checking flight distance between:", voterAddress, "and", currentAddress);
    return false;
}

function validateDisability() {
    let disabilityCertificate = document.getElementById("disability_certificate");

    let messageDiv = document.getElementById("message");
    let proceedButton = document.getElementById("proceed");

    if (!disabilityCertificate.files.length) {
        messageDiv.innerHTML = "<span class='failure'>❌ Disability Certificate is required.</span>";
        proceedButton.disabled = true;
        return;
    }

    messageDiv.innerHTML = "<span class='success'>✔ Disability verification successful. You can proceed.</span>";
    proceedButton.disabled = false;
}

function validateSeniorCitizen() {
    let birthCertificate = document.getElementById("birth_certificate");
    let medicalReport = document.getElementById("medical_certificate");
    let seniorMessageDiv = document.getElementById("message"); // For messages
    let proceedButton = document.getElementById("proceed");

    console.log("Checking files:", birthCertificate.files.length, medicalReport.files.length); // Log the file counts

    if (!birthCertificate.files.length || !medicalReport.files.length) {
        seniorMessageDiv.innerHTML = "<span class='failure'>❌ Birth Certificate and Medical Report are required.</span>";
        proceedButton.disabled = true;
        return;
    }
    let birthYear = extractBirthYear(birthCertificate.files[0].name);
    let currentYear = new Date().getFullYear();
    let age = currentYear - birthYear;

    if (age < 60) {
        seniorMessageDiv.innerHTML = "<span class='failure'>❌ Age must be 60 or above for verification.</span>";
        proceedButton.disabled = true;
    } else {
        seniorMessageDiv.innerHTML = "<span class='success'>✔ Verification successful. You can proceed.</span>";
        proceedButton.disabled = false;
    }
}

function extractBirthYear(fileName) {
    let match = fileName.match(/\d{4}/);
    return match ? parseInt(match[0]) : 0;
}
