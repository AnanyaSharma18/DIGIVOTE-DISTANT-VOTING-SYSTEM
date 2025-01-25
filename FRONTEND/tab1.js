

// Smooth Scroll for Sidebar Navigation
document.querySelectorAll('.tabs a').forEach(tab => {
  tab.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default anchor behavior
    const targetSection = document.querySelector(this.getAttribute('href'));
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Next Button Logic
document.querySelectorAll('.next-btn').forEach(button => {
  button.addEventListener('click', function () {
    const nextSectionId = this.getAttribute('data-next');
    const nextSection = document.getElementById(nextSectionId);
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


  //dropdown for state and district
  const statesAndDistricts = {
  "Andhra Pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"],
  "Arunachal Pradesh": ["Anjaw", "Changlang", "East Kameng", "East Siang", "Itanagar Capital Complex", "Kamle", "Kra Daadi", "Kurung Kumey", "Lepa Rada", "Lohit", "Longding", "Lower Dibang Valley", "Lower Siang", "Lower Subansiri", "Namsai", "Pakke Kessang", "Papum Pare", "Shi-Yomi", "Siang", "Tawang", "Tirap", "Upper Dibang Valley", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"],
  "Assam": ["Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"],
  "Bihar": ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"],
  "Chhattisgarh": ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Gaurela-Pendra-Marwahi", "Janjgir-Champa", "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba", "Korea", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja"],
  "Goa": ["North Goa", "South Goa"],
  "Gujarat": ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"],
  "Haryana": ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"],
  "Himachal Pradesh": ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul and Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"],
  "Jharkhand": ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahebganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"],
  "Karnataka": ["Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar", "Chamarajanagar", "Chikballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"],
  "Kerala": ["Alappuzha","Ernakulam","Idukki","Kannur","Kasaragod","Kollam","Kottayam","Kozhikode","Malappuram","Palakkad","Pathanamthitta","Thiruvananthapuram","Thrissur","Wayanad"],
  "Madhya Pradesh": ["Alirajpur","Anuppur","Ashoknagar","Balaghat","Barwani","Betul","Bhind","Bhopal","Burhanpur","Chhatarpur","Chhindwara","Damoh","Datia","Dewas","Dhar","Dindori","Guna","Gwalior","Harda","Hoshangabad","Indore","Jabalpur","Jhabua","Katni","Khandwa","Khargone","Mandla","Mandsaur","Morena","Narsinghpur","Neemuch","Panna","Raisen","Rajgarh","Ratlam","Rewa","Sagar","Satna","Sehore","Seoni","Shahdol","Shajapur","Sheopur","Shivpuri","Sidhi","Singrauli","Tikamgarh","Ujjain","Umaria","Vidisha"],
  "Maharashtra": ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune","Raigad","Ratnagiri","Sangli","Satara","Sindhudurg","Solapur","Thane","Wardha","Washim","Yavatmal"],
  "Manipur": ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"],
  "Meghalaya": ["East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "North Garo Hills", "Ri Bhoi", "South Garo Hills", "South West Garo Hills", "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"],
  "Mizoram": ["Aizawl","Champhai","Kolasib","Lawngtlai","Lunglei","Mamit","Saiha", "Serchhip"],
  "Nagaland": ["Dimapur", "Kiphire", "Kohima","Longleng", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang","Wokha","Zunheboto"],
  "Odisha": ["Angul","Balangir","Balasore","Bargarh","Bhadrak","Boudh","Cuttack","Deogarh","Dhenkanal","Gajapati","Ganjam","Jagatsinghpur","Jajpur","Jharsuguda","Kalahandi","Kandhamal","Kendrapara","Kendujhar","Khordha","Koraput","Malkangiri","Mayurbhanj","Nabarangpur","Nayagarh","Nuapada","Puri","Rayagada","Sambalpur","Sonepur","Sundargarh"],
  "Punjab": ["Amritsar","Barnala","Bathinda","Faridkot","Fatehgarh Sahib","Fazilka","Ferozepur","Gurdaspur","Hoshiarpur","Jalandhar","Kapurthala","Ludhiana","Mansa","Moga","Muktsar","Pathankot","Patiala","Rupnagar","Sangrur","Shaheed Bhagat Singh Nagar","Tarn Taran"],
  "West Bengal": ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"],
  "Rajasthan": ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur",  "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"],
  "Sikkim": ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
  "Tamil Nadu": ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kancheepuram", "Karur", "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"],
  "Telangana": ["Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Komaram Bheem", "Mahabubabad", "Mahabubnagar", "Mancherial", "Medak", "Medchal–Malkajgiri", "Mulugu", "Nagarkurnool", "Nalgonda", "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Ranga Reddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Warangal Rural", "Warangal Urban", "Yadadri Bhuvanagiri"],
  "Uttar Pradesh": ["Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Ayodhya", "Azamgarh", "Badaun", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki","Bareilly", "Basti", "Bijnor", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kushinagar", "Lakhimpur Kheri", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Prayagraj", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Sant Ravidas Nagar", "Shahjahanpur", "Shamli", "Shrawasti", "Siddharthnagar",  "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"],"Uttarakhand": ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"],
  "Uttarakhand": ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"],
  "Tripura": ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"]
  };

  // Populate States in Dropdown
const stateSelect = document.getElementById('stateDropdown');
const districtSelect = document.getElementById('districtDropdown');

// Populate states
function populateStates() {
  for (const state in statesAndDistricts) {
    const option = document.createElement("option");
    option.value = state;
    option.textContent = state;
    stateDropdown.appendChild(option);
  }
}

// Populate districts based on selected state
function populateDistricts() {
  const selectedState = stateDropdown.value;
  districtDropdown.innerHTML = '<option value="">--Select District--</option>'; // Reset districts

  if (selectedState && statesAndDistricts[selectedState]) {
    const districts = statesAndDistricts[selectedState];
    districts.forEach(district => {
      const option = document.createElement("option");
      option.value = district;
      option.textContent = district;
      districtDropdown.appendChild(option);
    });
  }
}

  // Initialize dropdowns
  populateStates();
  //dropdown for dob
  document.addEventListener("DOMContentLoaded", () => {
    const dobInput = document.getElementById("dob");
  
    // Optional: Add event listener for input changes
    dobInput.addEventListener("change", () => {
      const selectedDate = dobInput.value;
      console.log(`Selected DOB: ${selectedDate}`);
      // You can add additional validation logic here
    });
  });
  
// SAVE BUTTON LOGIC
// document.querySelectorAll('.save-btn').forEach((button) => {
//   button.addEventListener('click', async (event) => {
//     event.preventDefault();

//     const section = event.target.getAttribute('data-section');
//     let formData = {};

//     switch (section) {
//       case 'state_district':
//         formData = {
//         state: document.getElementById('stateDropdown').value,
//         district: document.getElementById('districtDropdown').value,
//        };
//        break;


//       case 'prsnl_info':
//         formData = {
//           name: document.getElementById('name').value,
//           // photo: document.getElementById('photo').files[0], // File upload
//         };
//         break;
//       case 'ph_no':
//         formData = { phoneNumber: document.getElementById('phonenumber').value,}  
//       case 'dob':
//         formData = { dob: document.getElementById('dob').value };
//         break;

//       case 'Aadhaar':
//         formData = { aadhaar: document.getElementById('aadhaar').value };
//         break;

//       case 'gender':
//         const selectedGender = document.querySelector('input[name="radio-group"]:checked');
//         formData = {
//           gender: selectedGender ? selectedGender.value : null,
//         };
//         break;

//       case 'perm_add':
//         formData = {
//           permanentAddress: document.querySelector('.input7 .input').value,
//         };
//         break;

//       case 'curr_Add':
//         formData = {
//           currentAddress: document.querySelector('.input8 .input').value,
//         };
//         break;

//       case 'rem_el':
//         const selectedEligibility = document.querySelector('input[name="radio-group"]:checked');
//         formData = {
//           remoteEligibility: selectedEligibility ? true : false,
//         };
//         //console.log(formData.isSelected); // Output: true or false
//         break;

//       case 'epic_num':
//         const epicInput = document.querySelector('input[name="input"]');
//         if (!epicInput.value.trim()) {
//           alert('This field should be filled!');
//           return; // Exit the function to avoid further execution
//         }
//         formData = { epicNumber: epicInput.value };
//         break;

//       default:
//         console.error('Unknown section:', section);
//         return; // Exit the function for unknown sections
//     }
        
//   });
// });

// Send data to the backend
// try {
//   console.log('Sending data:', formData);  // Log the data being sent

//   const response = await fetch('http://localhost:5002/save-details', {  // Update the URL if necessary
//     method: 'POST',
//     body: JSON.stringify(formData),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   if (response.ok) {
//     alert('Details saved successfully!');
//   } else {
//     const errorData = await response.json();
//     alert(`Failed to save details: ${errorData.message}`);
//   }
// } catch (error) {
//   console.error('Error:', error);
//   alert('An error occurred while saving details.');
// }
// 
async function my_fun() {
  const state = document.getElementById('stateDropdown').value;
  const district = document.getElementById('districtDropdown').value;
  const name = document.getElementById('name')?.value || null;
  const dob = document.getElementById('dob')?.value || null;
  const phoneNumber = document.getElementById('phonenumber')?.value || null;
  const aadhaar = document.getElementById('aadhaar')?.value || null;
  const gender = document.querySelector('input[name="radio-group"]:checked')?.value || null;;
  const permanentAddress = document.querySelector('.input7 .input')?.value || null;
  const presentAddress = document.querySelector('.input8 .input')?.value || null;
  const remoteEligibility = document.querySelector('input[name="radio-group"]:checked') ? true : false;
  const epic_num = document.querySelector('input[name="input"]')?.value || null;

  console.log({
    state,
    district,
    name,
    dob,
    phoneNumber,
    aadhaar,
    gender,
    permanentAddress,
    presentAddress,
    remoteEligibility,
    epic_num,
  });

  const formData = {
    state,
    district,
    name,
    dob,
    phoneNumber,
    aadhaar,
    gender,
    permanentAddress,
    presentAddress,
    remoteEligibility,
    epic_num,
  };

  try {
    console.log('Sending data:', formData); // Log the data being sent

    const response = await fetch('http://localhost:5002/save-details', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      alert('Details saved successfully!');
    } else {
      const errorData = await response.json();
      alert(`Failed to save details: ${errorData.message}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while saving details.');
  }
  const url="irisv.html";
    window.open(url);
}
