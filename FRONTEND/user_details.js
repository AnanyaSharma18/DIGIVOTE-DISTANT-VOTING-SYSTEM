// Fetch User Data and Populate Table
document.addEventListener("DOMContentLoaded", () => {
    const userTable = document.getElementById("userTable");
  
    // API Endpoint to Fetch User Data
    const apiEndpoint = "http://localhost:5002/api/users"; // Replace with your actual API endpoint
  
    // Fetch data from the server
    fetch(apiEndpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        populateTable(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        userTable.innerHTML = `<tr><td colspan="6">Failed to load data. Please try again later.</td></tr>`;
      });
  
    // Function to populate the table 
    
    function populateTable(response) {
      const users = response.data || [];
      if (!users.length) {
        userTable.innerHTML = `<tr><td colspan="6">No user data available</td></tr>`;
        return;
      }
      users.forEach((user) => {
        const row = document.createElement("tr");
    
        row.appendChild(createCell(user.email));
        row.appendChild(createCell(user.phoneNumber)); // Fixed the key
        row.appendChild(createCell(user.name));
        row.appendChild(createCell(user.dob));
        row.appendChild(createCell(user.state));
        row.appendChild(createCell(user.district));
    
        userTable.appendChild(row);
      });
    }
    
  
    // Helper function to create a table cell
    function createCell(data) {
      const cell = document.createElement("td");
      cell.textContent = data || "N/A"; // Display "N/A" if data is null or undefined
      return cell;
    }
  });
  