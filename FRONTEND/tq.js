// Dummy data for the parties, candidates, and logos
const partyData = [
    { name: "Party A", logo: "https://via.placeholder.com/50", candidate: "Candidate A" },
    { name: "Party B", logo: "https://via.placeholder.com/50", candidate: "Candidate B" },
    { name: "Party C", logo: "https://via.placeholder.com/50", candidate: "Candidate C" },
    { name: "Party D", logo: "https://via.placeholder.com/50", candidate: "Candidate D" },
    { name: "Party E", logo: "https://via.placeholder.com/50", candidate: "Candidate E" },
    { name: "Party F", logo: "https://via.placeholder.com/50", candidate: "Candidate F" },
    { name: "Party G", logo: "https://via.placeholder.com/50", candidate: "Candidate G" },
    { name: "Party H", logo: "https://via.placeholder.com/50", candidate: "Candidate H" },
    { name: "Party I", logo: "https://via.placeholder.com/50", candidate: "Candidate I" },
    { name: "Party J", logo: "https://via.placeholder.com/50", candidate: "Candidate J" }
  ];
  
  // Function to populate the table dynamically
  function populateTable() {
    const tableBody = document.getElementById("partyTable");
  
    // Loop through the party data and create rows
    partyData.forEach((party, index) => {
      const row = document.createElement("tr");
  
      // Party Name
      const partyCell = document.createElement("td");
      partyCell.textContent = party.name;
      row.appendChild(partyCell);
  
      // Party Logo
      const logoCell = document.createElement("td");
      const logoImg = document.createElement("img");
      logoImg.src = party.logo;
      logoImg.alt = `${party.name} Logo`;
      logoImg.style.width = "50px";
      logoImg.style.height = "50px";
      logoCell.appendChild(logoImg);
      row.appendChild(logoCell);
  
      // Candidate Name
      const candidateCell = document.createElement("td");
      candidateCell.textContent = party.candidate;
      row.appendChild(candidateCell);
  
      // Action (Vote Button)
      const actionCell = document.createElement("td");
      const voteButton = document.createElement("button");
      voteButton.textContent = "Vote";
      voteButton.id = `voteButton${index}`; // Assign a unique ID to each button
      voteButton.classList.add("vote-button");
      voteButton.addEventListener("click", () => castVote(party.name, party.candidate));
      actionCell.appendChild(voteButton);
      row.appendChild(actionCell);
  
      // Append the row to the table body
      tableBody.appendChild(row);
    });
  }
  
  // Function to handle voting by redirecting to thankyou.html
  function castVote(partyName, candidateName) {
    // Store party and candidate information in localStorage or sessionStorage (optional)
    sessionStorage.setItem("votedParty", partyName);
    sessionStorage.setItem("votedCandidate", candidateName);
    
    // Redirect to the thank-you page after voting
    window.location.href = "tq.html";
  }
  
  // Populate the table on page load
  window.onload = populateTable;
  