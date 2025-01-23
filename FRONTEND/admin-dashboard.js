// Function to navigate to respective sections
function navigate(section) {
    alert(`Navigating to ${section}...`);
    // Add your navigation logic here (e.g., window.location.href)
  }
  // Function to navigate to a specific page
  function navigateTo(page) {
    window.location.href = page; // Redirects to the specified page
  }
  function navigateTo(url) {
    const buttonId = event.target.id; // Get the unique ID of the clicked button
    console.log(`Button ID: ${buttonId}`); // Log the button ID for debugging
    console.log(`Navigating to: ${url}`); // Log the target URL
  
    // Example of sending data to the backend using fetch
    const actionData = {
      buttonId: buttonId, // Unique button ID
      url: url, // URL being navigated to
    };
  
    // Uncomment the below block to send the data to your backend API
    // fetch('/api/log-action', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(actionData),
    // }).then(response => {
    //   if (response.ok) {
    //     console.log('Action logged successfully!');
    //   } else {
    //     console.error('Failed to log action:', response.statusText);
    //   }
    // }).catch(error => {
    //   console.error('Error logging action:', error);
    // });
  
    // Navigate to the specified URL
    window.location.href = url;
  }
  