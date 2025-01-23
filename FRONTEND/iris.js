// Access elements
const camera = document.getElementById('camera');
const statusText = document.getElementById('status');
const locationBtn = document.getElementById('locationBtn');

// Access the user's camera
async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    camera.srcObject = stream;

    statusText.innerText = 'Status: Camera started. Align your face with the circle.';

    // Simulate face alignment and analysis
    setTimeout(() => {
      detectFaceAndAnalyze();
    }, 3000); // Wait 3 seconds for face alignment
  } catch (error) {
    statusText.innerText = 'Status: Unable to access the camera. Please check your permissions.';
  }
}

// Simulate face detection and iris analysis
function detectFaceAndAnalyze() {
  statusText.innerText = 'Status: Face detected. Analyzing iris data...';

  // Simulate analysis
  setTimeout(() => {
    statusText.innerText = 'Status: Verification successful! Iris recognized.';
    locationBtn.disabled = false; // Enable the location button after verification
  }, 3000); // Simulate analysis time
}

// Redirect to the location page
locationBtn.addEventListener('click', () => {
  window.location.href = "location.html"; // Replace with the actual location page URL
});

// Start the camera when the page loads
window.addEventListener('load', startCamera);
