const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize app
const app = express();
const PORT = 5002;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://172.19.133.8:27017/Distant_Voting')
.then(() => {
    console.log('Connected to MongoDB!');
})
.catch((error) => {
    console.error('Connection failed:', error);
});

// API endpoint to handle signup data
app.post("/api/send-otp", async (req, res) => {
  const { email, phoneNumber, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await mongoose.connection.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists." });
    }

    // Insert new user into the 'users' collection
    await mongoose.connection.collection('users').insertOne({ email, phoneNumber, password });
    await mongoose.connection.collection('user_details').insertOne({  phoneNumber });
    await mongoose.connection.collection('user_address').insertOne({  phoneNumber });

    res.status(201).json({ success: true, message: "User registered successfully!" });
  } catch (error) {
    console.error("Error saving user data:", error);
    res.status(500).json({ success: false, message: "An error occurred. Please try again later." });
  }
});

// API endpoint to handle registration data
app.post("/save-details", async (req, res) => {
  const {
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
  } = req.body;

  try {
    // Get the database connection
    const db = mongoose.connection;

    // Access the required collections
    const userDetails = db.collection("user_details");
    const userAddress = db.collection("user_address");

    // Validate if the collections are accessible
    if (!userDetails || !userAddress) {
      throw new Error("Database collections are not accessible.");
    }

    // Check if the phoneNumber exists in the database for user_details
  const existingUser = await userDetails.findOne({ phoneNumber });

  if (!existingUser) {
    return res.status(400).json({
      success: false,
      message: "The entered phone number does not match any existing record in 'user_details'.",
    });
  }

  // Insert user details into the 'user_details' collection
  const userResult = await userDetails.insertOne({
    name,
    dob,
    gender,
    aadhaar,
    remoteEligibility,
    epic_num,
  });

  if (!userResult.acknowledged) {
    throw new Error("Failed to insert user details.");
  }

  // Check if the phoneNumber exists in the database for user_address
  const existingAddress = await userAddress.findOne({ phoneNumber });

  if (!existingAddress) {
    return res.status(400).json({
      success: false,
      message: "The entered phone number does not match any existing record in 'user_address'.",
    });
  }

  // Insert address details into the 'user_address' collection
  const addressResult = await userAddress.insertOne({
    state,
    phoneNumber,
    district,
    presentAddress,
    permanentAddress,
  });

  if (!addressResult.acknowledged) {
    throw new Error("Failed to insert address details.");
  }

    // Return success response
    res.status(201).json({ success: true, message: "Data saved successfully!" });
  } catch (error) {
    console.error("Error saving data:", error);

    // Return error response
    res.status(500).json({
      success: false,
      message: "An error occurred while saving data. Please try again later.",
    });
  }
});

// Endpoint to check login details
app.post("/api/login", async (req, res) => {
  const { admin_id, email, password } = req.body;

  try {
    // Access the Admin_details collection directly
    const admin = await mongoose.connection.collection("Admin_details").findOne({
      admin_id,
      email,
      password,
    });

    if (!admin) {
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }

    res.status(200).json({ success: true, message: "Login successful!" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "An error occurred. Please try again later." });
  }
});
 

// Start the server
app.listen(PORT, '172.19.133.8', () => {
  console.log(`Server is running on http://172.19.133.8:${PORT}`);
});