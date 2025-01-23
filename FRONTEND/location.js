// // Select Elements
const verifyBtn = document.getElementById('verifyBtn');
const locationOutput = document.getElementById('location-output');
const addressSpan = document.querySelector('#address span');
const statusSpan = document.querySelector('#status span');

// Access the Next button
const Next = document.getElementById('Next');

// Event Listener for Verify Button
verifyBtn.addEventListener('click', () => {
  locationOutput.classList.remove('hidden');
  statusSpan.textContent = 'Retrieving...';

  // Check if Geolocation is Supported
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Display latitude and longitude
        addressSpan.textContent = `Latitude: ${latitude.toFixed(6)}, Longitude: ${longitude.toFixed(6)}`;
        statusSpan.textContent = 'Location Retrieved Successfully!';
      },
      (error) => {
        statusSpan.textContent = `Error: ${error.message}`;
      }
    );
  } else {
    statusSpan.textContent = 'Geolocation is not supported by your browser.';
  }
});

// Redirect to the location page
Next.addEventListener('click', () => {
  window.location.href = "voting.html"; // Replace with the actual location page URL
});
