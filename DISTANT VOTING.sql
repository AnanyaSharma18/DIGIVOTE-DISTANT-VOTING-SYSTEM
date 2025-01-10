CREATE TABLE Registration (
    registration_number SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(15) NOT NULL
);
CREATE TABLE Admin (
    admin_id  PRIMARY KEY, 
    email VARCHAR(255) NOT NULL UNIQUE, 
    password VARCHAR(255) NOT NULL     
);
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(15),
    aadhaar_number VARCHAR(12) UNIQUE,
    epic_number VARCHAR(20) UNIQUE,
    dob DATE,
    gender VARCHAR(10),
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_remote_eligible BOOLEAN DEFAULT FALSE
);
CREATE TABLE User_Address (
    address_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id) ON DELETE CASCADE,
	actual_address VARCHAR(50) NOT NULL, 
    remote_address VARCHAR(50) NOT NULL, 
    state VARCHAR(100),
    district VARCHAR(100),
    address TEXT
);
CREATE TABLE User_Verification (
    verification_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES Users(user_id) ON DELETE CASCADE,
    proof_document TEXT,
    verification_reason TEXT
);
CREATE TABLE Elections (
    election_id SERIAL PRIMARY KEY,
    election_name VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL 
);
CREATE TABLE Election_Regions (
    region_id SERIAL PRIMARY KEY,
    election_id INT REFERENCES Elections(election_id) ON DELETE CASCADE,
    region VARCHAR(255) NOT NULL 
);
CREATE TABLE Parties (
    party_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    symbol TEXT
);
CREATE TABLE Constituencies (
    constituency_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    state VARCHAR(100),
    district VARCHAR(100)
);
CREATE TABLE Candidates (
    candidate_id SERIAL PRIMARY KEY,
    election_id INT REFERENCES Elections(election_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    party_id INT REFERENCES Parties(party_id) ON DELETE CASCADE,
    constituency_id INT REFERENCES Constituencies(constituency_id) ON DELETE CASCADE,
    bio_photo TEXT
);
CREATE TABLE Votes (
    vote_id SERIAL PRIMARY KEY,
    election_id INT REFERENCES Elections(election_id) ON DELETE CASCADE,
    candidate_id INT REFERENCES Candidates(candidate_id) ON DELETE CASCADE,
    cast_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
select * from Registration;
select * from Admin;
select * from Users;
select * from User_Address;
select * from User_Verification;
select * from Elections;
select * from Election_Regions;
select * from Parties;
select * from Constituencies;
select * from Candidates;
select * from Votes;
INSERT INTO Admin (email, password) VALUES
('khushi@example.com', 'khushi@51'),
('ananya@example.com', 'ananya@11'),
('khushig@example.com', 'khushi@50'),
('akshita@example.com', 'akshita@08');
INSERT INTO Constituencies (name, state, district)
VALUES
---for Uttar Pradesh
('Lucknow', 'Uttar Pradesh', 'Lucknow'),
('Varanasi', 'Uttar Pradesh', 'Varanasi'),
('Kanpur', 'Uttar Pradesh', 'Kanpur Nagar'),
('Allahabad', 'Uttar Pradesh', 'Prayagraj'),
('Ghaziabad', 'Uttar Pradesh', 'Ghaziabad'),
('Agra', 'Uttar Pradesh', 'Agra'),
('Bareilly', 'Uttar Pradesh', 'Bareilly'),
('Gorakhpur', 'Uttar Pradesh', 'Gorakhpur'),
('Meerut', 'Uttar Pradesh', 'Meerut'),
('Noida (Gautam Buddha Nagar)', 'Uttar Pradesh', 'Gautam Buddha Nagar'),

---for Madhya Pradesh
('Bhopal', 'Madhya Pradesh', 'Bhopal'),
('Indore', 'Madhya Pradesh', 'Indore'),
('Gwalior', 'Madhya Pradesh', 'Gwalior'),
('Jabalpur', 'Madhya Pradesh', 'Jabalpur'),
('Ujjain', 'Madhya Pradesh', 'Ujjain'),
('Rewa', 'Madhya Pradesh', 'Rewa'),
('Satna', 'Madhya Pradesh', 'Satna'),
('Chhindwara', 'Madhya Pradesh', 'Chhindwara'),
('Vidisha', 'Madhya Pradesh', 'Vidisha'),
('Dewas', 'Madhya Pradesh', 'Dewas'),


---for Delhi

('Chandni Chowk', 'Delhi', 'Central Delhi'),
('East Delhi', 'Delhi', 'East Delhi'),
('New Delhi', 'Delhi', 'New Delhi'),
('North East Delhi', 'Delhi', 'North East Delhi'),
('North West Delhi', 'Delhi', 'North West Delhi'),
('South Delhi', 'Delhi', 'South Delhi'),
('West Delhi', 'Delhi', 'West Delhi'),

---for Rajasthan

('Jaipur', 'Rajasthan', 'Jaipur'),
('Jodhpur', 'Rajasthan', 'Jodhpur'),
('Udaipur', 'Rajasthan', 'Udaipur'),
('Ajmer', 'Rajasthan', 'Ajmer'),
('Alwar', 'Rajasthan', 'Alwar'),
('Bharatpur', 'Rajasthan', 'Bharatpur'),
('Bikaner', 'Rajasthan', 'Bikaner'),
('Chittorgarh', 'Rajasthan', 'Chittorgarh'),
('Kota', 'Rajasthan', 'Kota'),
('Barmer', 'Rajasthan', 'Barmer');
ALTER TABLE Elections
ADD COLUMN state VARCHAR(255);
INSERT INTO Elections (election_id, election_name, state, start_date, end_date, status)
VALUES
---for Uttar Pradesh
(1, 'Lok Sabha Election - Lucknow', 'Uttar Pradesh', '2025-04-01', '2025-04-05', 'Scheduled'),
(2, 'Lok Sabha Election - Varanasi', 'Uttar Pradesh', '2025-04-01', '2025-04-05', 'Scheduled'),
(3, 'Lok Sabha Election - Kanpur', 'Uttar Pradesh', '2025-04-01', '2025-04-05', 'Scheduled'),
---for Madhya Pradesh
(4, 'Lok Sabha Election - Bhopal', 'Madhya Pradesh', '2025-04-06', '2025-04-10', 'Scheduled'),
(5, 'Lok Sabha Election - Indore', 'Madhya Pradesh', '2025-04-06', '2025-04-10', 'Scheduled'),
(6, 'Lok Sabha Election - Gwalior', 'Madhya Pradesh', '2025-04-06', '2025-04-10', 'Scheduled'),
---for Delhi
(7, 'Lok Sabha Election - Chandni Chowk', 'Delhi', '2025-04-15', '2025-04-20', 'Scheduled'),
(8, 'Lok Sabha Election - New Delhi', 'Delhi', '2025-04-15', '2025-04-20', 'Scheduled'),
(9, 'Lok Sabha Election - South Delhi', 'Delhi', '2025-04-15', '2025-04-20', 'Scheduled'),
---for Rajasthan
(10, 'Lok Sabha Election - Jaipur', 'Rajasthan', '2025-04-25', '2025-04-30', 'Scheduled'),
(11, 'Lok Sabha Election - Udaipur', 'Rajasthan', '2025-04-25', '2025-04-30', 'Scheduled'),
(12, 'Lok Sabha Election - Jodhpur', 'Rajasthan', '2025-04-25', '2025-04-30', 'Scheduled');
ALTER TABLE Parties
ADD COLUMN Leader VARCHAR(255);
INSERT INTO Parties (party_id, name, leader, symbol)
VALUES
-- National Parties
(1, 'Indian National Congress', 'Mallikarjun Kharge', 'Hand'),
(2, 'Bharatiya Janata Party', 'JP Nadda', 'Lotus'),
(3, 'Aam Aadmi Party', 'Arvind Kejriwal', 'Broom'),
(4, 'Communist Party of India', 'D. Raja', 'Ears of Corn and Sickle'),
(5, 'Bahujan Samaj Party', 'Mayawati', 'Elephant'),

-- Regional Parties
(6, 'Samajwadi Party', 'Akhilesh Yadav', 'Bicycle'),
(7, 'Rashtriya Janata Dal', 'Lalu Prasad Yadav', 'Hurricane Lamp'),
(8, 'Shiv Sena (Shinde faction)', 'Eknath Shinde', 'Bow and Arrow'),
(9, 'Trinamool Congress', 'Mamata Banerjee', 'Flowers and Grass'),
(10, 'Nationalist Congress Party', 'Sharad Pawar', 'Clock'),

-- Other Major Regional Parties
(11, 'Telangana Rashtra Samithi', 'K. Chandrashekar Rao', 'Car'),
(12, 'Dravida Munnetra Kazhagam', 'M.K. Stalin', 'Rising Sun'),
(13, 'All India Anna Dravida Munnetra Kazhagam', 'Edappadi K. Palaniswami', 'Two Leaves'),
(14, 'Janata Dal (United)', 'Nitish Kumar', 'Arrow'),
(15, 'Biju Janata Dal', 'Naveen Patnaik', 'Conch');
INSERT INTO Election_Regions (election_id, region)
VALUES
-- Uttar Pradesh (Election ID: 1-3 based on the Elections table)
(1, 'Lucknow'),
(2, 'Varanasi'),
(3, 'Kanpur'),

-- Madhya Pradesh (Election ID: 4-6 based on the Elections table)
(4, 'Bhopal'),
(5, 'Indore'),
(6, 'Gwalior'),

-- Delhi (Election ID: 7-9 based on the Elections table)
(7, 'Chandni Chowk'),
(8, 'New Delhi'),
(9, 'South Delhi'),

-- Rajasthan (Election ID: 10-12 based on the Elections table)
(10, 'Jaipur'),
(11, 'Udaipur'),
(12, 'Jodhpur');
INSERT INTO Candidates (election_id, name, party_id, constituency_id, bio_photo)
VALUES
---Candidates of Uttar Pradesh
(1, 'Rajesh Sharma', 2, 1, 'https://example.com/photos/rajesh_sharma.jpg'), -- BJP - Lucknow
(1, 'Anil Verma', 1, 1, 'https://example.com/photos/anil_verma.jpg'),      -- INC - Lucknow
(1, 'Sunita Yadav', 3, 1, 'https://example.com/photos/sunita_yadav.jpg'),  -- AAP - Lucknow

(2, 'Piyush Tripathi', 2, 2, 'https://example.com/photos/piyush_tripathi.jpg'), -- BJP - Varanasi
(2, 'Kamal Pandey', 1, 2, 'https://example.com/photos/kamal_pandey.jpg'),       -- INC - Varanasi
(2, 'Meena Shukla', 6, 2, 'https://example.com/photos/meena_shukla.jpg'),       -- SP - Varanasi

---Candidates of Madhya Pradesh
(4, 'Nitin Joshi', 2, 4, 'https://example.com/photos/nitin_joshi.jpg'),   -- BJP - Bhopal
(4, 'Prakash Dixit', 1, 4, 'https://example.com/photos/prakash_dixit.jpg'), -- INC - Bhopal
(4, 'Suman Tiwari', 4, 4, 'https://example.com/photos/suman_tiwari.jpg'), -- CPI - Bhopal

(5, 'Ravi Patel', 2, 5, 'https://example.com/photos/ravi_patel.jpg'),     -- BJP - Indore
(5, 'Vinod Sharma', 1, 5, 'https://example.com/photos/vinod_sharma.jpg'), -- INC - Indore
(5, 'Shivani Desai', 4, 5, 'https://example.com/photos/shivani_desai.jpg'), -- CPI - Indore

---Candidates of Delhi
(7, 'Ajay Gupta', 2, 7, 'https://example.com/photos/ajay_gupta.jpg'),        -- BJP - Chandni Chowk
(7, 'Sandeep Arora', 1, 7, 'https://example.com/photos/sandeep_arora.jpg'), -- INC - Chandni Chowk
(7, 'Priya Sharma', 3, 7, 'https://example.com/photos/priya_sharma.jpg'),   -- AAP - Chandni Chowk

(8, 'Manoj Jain', 2, 8, 'https://example.com/photos/manoj_jain.jpg'),       -- BJP - New Delhi
(8, 'Neha Agarwal', 1, 8, 'https://example.com/photos/neha_agarwal.jpg'),  -- INC - New Delhi
(8, 'Ashok Dubey', 3, 8, 'https://example.com/photos/ashok_dubey.jpg'),   -- AAP - New Delhi

---Candidates of Rajasthan
(10, 'Karan Sharma', 2, 10, 'https://example.com/photos/karan_sharma.jpg'),    -- BJP - Jaipur
(10, 'Ankit Singh', 1, 10, 'https://example.com/photos/ankit_singh.jpg'),     -- INC - Jaipur
(10, 'Pooja Jain', 5, 10, 'https://example.com/photos/pooja_jain.jpg'),       -- BSP - Jaipur

(11, 'Vivek Meena', 2, 11, 'https://example.com/photos/vivek_meena.jpg'),     -- BJP - Udaipur
(11, 'Ramesh Joshi', 1, 11, 'https://example.com/photos/ramesh_joshi.jpg'),   -- INC - Udaipur
(11, 'Swati Patel', 5, 11, 'https://example.com/photos/swati_patel.jpg')   -- BSP - Udaipur
;

---IN ORDER TO CREATE A FAKE GOVERNMENT DATABASE TO CROSS CHECK THE REGISTERED USER

CREATE TABLE Government_data (
    user_id SERIAL PRIMARY KEY,        -- Unique ID for each user
    full_name VARCHAR(255) NOT NULL,  -- Full name of the citizen
    dob DATE NOT NULL,                -- Date of birth
    gender VARCHAR(10) NOT NULL,      -- Gender
    aadhaar_number BIGINT UNIQUE,     -- Aadhaar number (unique identifier in India)
    voter_id VARCHAR(20) UNIQUE,      -- Voter ID (unique voting identifier)
    state VARCHAR(255) NOT NULL,      -- State of residence
    constituency_id INT REFERENCES Constituencies(constituency_id) -- Constituency
);
INSERT INTO Government_data (full_name, dob, gender, aadhaar_number, voter_id, state, constituency_id)
VALUES
-- Uttar Pradesh
('Rajesh Kumar', '1985-04-12', 'Male', 123456789012, 'UP12345678', 'Uttar Pradesh', 1), -- Lucknow
('Anjali Singh', '1992-08-25', 'Female', 234567890123, 'UP23456789', 'Uttar Pradesh', 2), -- Varanasi
('Amit Verma', '1990-01-15', 'Male', 345678901234, 'UP34567890', 'Uttar Pradesh', 3), -- Kanpur

-- Madhya Pradesh
('Nitin Joshi', '1988-11-05', 'Male', 456789012345, 'MP12345678', 'Madhya Pradesh', 4), -- Bhopal
('Sunita Sharma', '1995-03-18', 'Female', 567890123456, 'MP23456789', 'Madhya Pradesh', 5), -- Indore
('Ravi Mehta', '1982-07-30', 'Male', 678901234567, 'MP34567890', 'Madhya Pradesh', 6), -- Gwalior

-- Delhi
('Priya Kapoor', '1994-06-20', 'Female', 789012345678, 'DL12345678', 'Delhi', 7), -- Chandni Chowk
('Sandeep Arora', '1987-02-10', 'Male', 890123456789, 'DL23456789', 'Delhi', 8), -- New Delhi
('Sneha Verma', '1991-09-12', 'Female', 901234567890, 'DL34567890', 'Delhi', 9), -- South Delhi

-- Rajasthan
('Manoj Singh', '1984-05-15', 'Male', 112345678901, 'RJ12345678', 'Rajasthan', 10), -- Jaipur
('Neha Jain', '1993-12-05', 'Female', 223456789012, 'RJ23456789', 'Rajasthan', 11), -- Udaipur
('Yash Gupta', '1997-08-23', 'Male', 334567890123, 'RJ34567890', 'Rajasthan', 12) -- Jodhpur
;
select * from Government_data;
