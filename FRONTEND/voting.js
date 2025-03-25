// Dummy data for the parties, candidates, and logos with descriptions
const partyData = [
  { 
    name: "Party A", 
    logo: "logo2.png", 
    candidate: "Candidate A", 
    description: [
      "<img src='candidate1.jpg' alt='Candidate A' style='border-radius: 50%; width: 80px; height: 80px;'>",
      "<br> Age: 52<br> Education: PhD in Economics",
      "Previous Position: Senator (10 years)",
      "Key Strength: Economic Reforms & Job Creation",
      "Political Experience: 20+ years in public service"
    ]
  },
  { 
    name: "Party B", 
    logo: "logo2.png", 
    candidate: "Candidate B", 
    description: [
      "<img src='candidate1.jpg' alt='Candidate B' style='border-radius: 50%; width: 80px; height: 80px;'>",
      "<br> Age: 48<br> Education: Master's in Public Administration",
      "Previous Position: Governor",
      "Key Strength: Education & Healthcare Policies",
      "Political Experience: 15+ years in governance"
    ]
  },
  { 
    name: "Party C", 
    logo: "logo2.png", 
    candidate: "Candidate C", 
    description: [
      "<img src='candidate1.jpg' alt='Candidate C' style='border-radius: 50%; width: 80px; height: 80px;'>",
      "<br> Age: 60<br> Education: Military Academy Graduate",
      "Previous Position: National Security Advisor",
      "Key Strength: Defense & Cybersecurity",
      "Political Experience: 25+ years in military and politics"
    ]
  },
  { 
    name: "Party D", 
    logo: "logo2.png", 
    candidate: "Candidate D", 
    description: [
      "<img src='candidate1.jpg' alt='Candidate D' style='border-radius: 50%; width: 80px; height: 80px;'>",
      "<br> Age: 45<br> Education: PhD in Environmental Science",
      "Previous Position: Environmental Minister",
      "Key Strength: Climate Policies & Renewable Energy",
      "Political Experience: 12+ years in environmental policy-making"
    ]
  },
  { 
    name: "Party E", 
    logo: "logo2.png", 
    candidate: "Candidate E", 
    description: [
      "<img src='candidate1.jpg' alt='Candidate E' style='border-radius: 50%; width: 80px; height: 80px;'>",
      "<br>Age: 50<br>Education: Law Degree",
      "Previous Position: Social Rights Activist",
      "Key Strength: Labor Rights & Equal Opportunities",
      "Political Experience: 18+ years in social advocacy"
    ]
  },
  { 
    name: "Party F", 
    logo: "logo2.png", 
    candidate: "Candidate F", 
    description: [
      "<img src='candidate1.jpg' alt='Candidate F' style='border-radius: 50%; width: 80px; height: 80px;'>",
      "<br>Age: 55<br>Education: Master's in International Relations",
      "Previous Position: Minister of Foreign Affairs",
      "Key Strength: Trade & Global Partnerships",
      "Political Experience: 20+ years in diplomacy"
    ]
  },
  { 
    name: "Party G", 
    logo: "logo2.png", 
    candidate: "Candidate G", 
    description: [
      "<img src='candidate1.jpg' alt='Candidate G' style='border-radius: 50%; width: 80px; height: 80px;'>",
      "<br>Age: 47<br>Education: Urban Development Specialist",
      "Previous Position: Mayor",
      "Key Strength: Crime Prevention & Housing Policies",
      "Political Experience: 16+ years in urban governance"
    ]
  },
  { 
    name: "Party H", 
    logo: "logo2.png", 
    candidate: "Candidate H", 
    description: [
      "<img src='candidate1.jpg' alt='Candidate H' style='border-radius: 50%; width: 80px; height: 80px;'>",
      "<br>Age: 43<br>Education: Bachelor's in Computer Science",
      "Previous Position: Tech Innovator & Policy Advisor",
      "Key Strength: Digital Economy & Cybersecurity",
      "Political Experience: 10+ years in tech policymaking"
    ]
  },
  { 
    name: "Party I", 
    logo: "logo2.png", 
    candidate: "Candidate I", 
    description: [
      "<img src='candidate1.jpg' alt='Candidate I' style='border-radius: 50%; width: 80px; height: 80px;'>",
      "<br>Age: 58<br>Education: Juris Doctor (JD)",
      "Previous Position: Supreme Court Judge",
      "Key Strength: Legal Reforms & Judicial Efficiency",
      "Political Experience: 22+ years in the legal field"
    ]
  },
  { 
    name: "Party J", 
    logo: "logo2.png", 
    candidate: "Candidate J", 
    description: [
      "<img src='candidate1.jpg' alt='Candidate J' style='border-radius: 50%; width: 80px; height: 80px;'>",
      "<br>Age: 49<br>Education: MD in Public Health",
      "Previous Position: Health Policy Expert",
      "Key Strength: Healthcare & Medical Innovations",
      "Political Experience: 15+ years in public health reforms"
    ]
  }
];

// Function to populate the table dynamically
function populateTable() {
  const tableBody = document.getElementById("partyTable");

  // Tooltip container (Using CSS class instead of inline styles)
  let tooltip = document.createElement("div");
  tooltip.id = "tooltip";
  tooltip.classList.add("tooltip");
  document.body.appendChild(tooltip);

  // Loop through the party data and create rows
  partyData.forEach((party) => {
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
    logoImg.classList.add("party-logo");
    logoCell.appendChild(logoImg);
    row.appendChild(logoCell);

    // Candidate Name with hover effect
    const candidateCell = document.createElement("td");
    candidateCell.textContent = party.candidate;
    candidateCell.classList.add("candidate");
    
    // Tooltip event listener
    candidateCell.addEventListener("mouseenter", (event) => {
      tooltip.innerHTML = `<ul>${party.description.map(desc => `<li>${desc}</li>`).join('')}</ul>`;
      tooltip.classList.add("show");
      tooltip.style.left = `${event.pageX + 10}px`;
      tooltip.style.top = `${event.pageY + 10}px`;
    });

    candidateCell.addEventListener("mousemove", (event) => {
      tooltip.style.left = `${event.pageX + 10}px`;
      tooltip.style.top = `${event.pageY + 10}px`;
    });

    candidateCell.addEventListener("mouseleave", () => {
      tooltip.classList.remove("show");
    });

    row.appendChild(candidateCell);

    // Action (Vote Button)
    const actionCell = document.createElement("td");
    const voteButton = document.createElement("button");
    voteButton.textContent = "Vote";
    voteButton.classList.add("vote-button");
    
    // Vote button click event
    voteButton.addEventListener("click", () => showConfirmation(party.name, party.candidate));
    
    actionCell.appendChild(voteButton);
    row.appendChild(actionCell);
    
    tableBody.appendChild(row);
  });
}

// Function to show the custom confirmation message box
function showConfirmation(partyName, candidateName) {
  const modal = document.getElementById("confirmationModal");
  const confirmationMessage = document.getElementById("confirmationMessage");
  const confirmVoteButton = document.getElementById("confirmVoteButton");
  const cancelVoteButton = document.getElementById("cancelVoteButton");

  confirmationMessage.textContent = `Are you sure you want to vote for ${candidateName} from ${partyName}?`;
  modal.style.display = "block";

  confirmVoteButton.onclick = function() {
    castVote(partyName, candidateName);
    modal.style.display = "none";
  };

  cancelVoteButton.onclick = function() {
    modal.style.display = "none";
  };

  document.querySelector(".close").onclick = function() {
    modal.style.display = "none";
  };

  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
}

// Function to handle voting by redirecting to thankyou.html
function castVote(partyName, candidateName) {
  sessionStorage.setItem("votedParty", partyName);
  sessionStorage.setItem("votedCandidate", candidateName);
  window.location.href = "tq.html";
}

// Populate the table on page load
window.onload = populateTable;
