// Open Add Candidate Modal
document.getElementById('add-candidate-btn').addEventListener('click', function() {
    document.getElementById('add-candidate-modal').style.display = 'block';
});

// Close Add Candidate Modal
document.getElementById('close-modal').addEventListener('click', function() {
    document.getElementById('add-candidate-modal').style.display = 'none';
});

// Add Candidate Functionality
document.getElementById('candidate-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const party = document.getElementById('party').value.trim();
    
    if (name === "" || party === "") {
        alert("Please fill in all fields!");
        return;
    }

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
});

// Remove Candidate using Event Delegation
document.getElementById('candidate-list').addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-btn')) {
        e.target.closest('tr').remove();
    }
});
