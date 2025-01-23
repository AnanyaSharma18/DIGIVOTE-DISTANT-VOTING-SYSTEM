 // JavaScript for form handling
 document.getElementById('userLoginForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent form submission reload

    // Get input values
    const emailOrMobile = document.getElementById('emailOrMobile').value;
    const password = document.getElementById('password').value;
    const epicNumber = document.getElementById('epicNumber').value;

    // Validate inputs
    if (!emailOrMobile || !password || !epicNumber) {
        alert('Please fill out all fields.');
        return;
    }

    // Validate email/phone number format (simple regex example)
    const emailOrMobileRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailOrMobileRegex.test(emailOrMobile) && !/^\d{10}$/.test(emailOrMobile)) {
        alert('Please enter a valid email or phone number.');
        return;
    }

    // Validate EPIC number format (example)
    const epicNumberRegex = /^[A-Za-z0-9]{10}$/; // Assuming EPIC is alphanumeric with 10 characters
    if (!epicNumberRegex.test(epicNumber)) {
        alert('Please enter a valid EPIC number.');
        return;
    }

    // Prepare data to send to the backend
    // const userData = { emailOrMobile, password, epicNumber };

    // try {
    //     const response = await fetch('http://localhost:5002/api/login', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(userData),
    //     });

    //     // Handle the response
    //     const result = await response.json();
    //     if (result.success) {
    //         alert('Login successful');
    //         // Redirect or handle success logic here
    //     } else {
    //         alert('Invalid login credentials. Please try again.');
    //     }
    // } catch (error) {
    //     console.error('Error logging in:', error);
    //     alert('An error occurred. Please try again later.');
    // }
    const url = "iris.html";
            window.open(url);
});