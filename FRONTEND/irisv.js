// Get elements
const video = document.getElementById("cameraFeed");
const statusMessage = document.getElementById("statusMessage");
const verifiedButton = document.getElementById("verifiedButton");

// Simulate iris recognition success after 5 seconds
let recognitionTimeout;

// Start the camera feed
function startCamera() {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;
    })
    .catch((err) => {
      console.error("Error accessing camera: ", err);
      statusMessage.textContent = "Camera access denied or unavailable.";
    });
}

// Simulate the iris recognition process
function startIrisRecognition() {
  statusMessage.textContent = "Scanning your iris...";

  recognitionTimeout = setTimeout(() => {
    statusMessage.textContent = "Iris recognized successfully!";
    activateVerifiedButton();
  }, 3000); // Simulates recognition taking 3 seconds
}

// Activate the "Verified" button
function activateVerifiedButton() {
  verifiedButton.classList.remove("disabled");
  verifiedButton.removeAttribute("disabled");
  verifiedButton.addEventListener("click", () => {
    window.location.href = "congratulations.html"; // Redirect to the location page
  });
}

// Start the process when the page loads
window.onload = () => {
  startCamera();
  startIrisRecognition();
};
