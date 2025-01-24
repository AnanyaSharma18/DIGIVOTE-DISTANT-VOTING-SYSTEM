

function my_fun() {
    const admin_formData = {
        admin_id:document.getElementById('admin-id').value,
        email: document.getElementById('admin_email').value,
        password: document.getElementById('admin_password').value,
    };

    fetch("http://localhost:5002/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(admin_formData),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert(data.message);
                // Redirect to dashboard
                window.location.href = "admin-dashboard.html";
            } else {
                alert(data.message);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        });
}
    
