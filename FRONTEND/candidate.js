// Handle Logout
document.getElementById('logout-btn').addEventListener('click', function() {
    alert('You have been logged out.');
    // Redirecting to login page
    window.location.href = 'login.html'; 
});

// Open Add Candidate Modal
document.getElementById('add-candidate-btn').addEventListener('click', function() {
    document.getElementById('add-candidate-modal').style.display = 'block';
});

// Close Add Candidate Modal
document.getElementById('close-modal').addEventListener('click', function() {
    document.getElementById('add-candidate-modal').style.display = 'none';
});

// Add Candidate Functionality (Example)
document.getElementById('candidate-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const party = document.getElementById('party').value;
    
    const candidateList = document.getElementById('candidate-list');
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <td>${name}</td>
        <td>${party}</td>
        <td><button class="remove-btn">Remove</button></td>
    `;
    
    candidateList.appendChild(row);
    
    // Clear the form inputs after adding
    document.getElementById('candidate-form').reset();
    
    // Close the modal
    document.getElementById('add-candidate-modal').style.display = 'none';
    
    // Add functionality to the remove button
    row.querySelector('.remove-btn').addEventListener('click', function() {
        row.remove();
    });
});
