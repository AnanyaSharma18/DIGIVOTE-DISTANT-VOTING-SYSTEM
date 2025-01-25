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
mongoose.connect('mongodb://127.0.0.1:27017/dis_vote_db')
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

    // Check if the phoneNumber exists in the 'user_details' collection
    const existingUser = await userDetails.findOne({ phoneNumber });

    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "The entered phone number does not match any existing record in 'user_details'.",
      });
    }

    // Update user details in the 'user_details' collection
    const userUpdateResult = await userDetails.updateOne(
      { phoneNumber }, // Find by phone number
      {
        $set: {
          name,
          dob,
          gender,
          aadhaar,
          remoteEligibility,
          epic_num,
        },
      }
    );

    if (!userUpdateResult.matchedCount) {
      throw new Error("Failed to update user details.");
    }

    // Check if the phoneNumber exists in the 'user_address' collection
    const existingAddress = await userAddress.findOne({ phoneNumber });

    if (!existingAddress) {
      return res.status(400).json({
        success: false,
        message: "The entered phone number does not match any existing record in 'user_address'.",
      });
    }

    // Update address details in the 'user_address' collection
    const addressUpdateResult = await userAddress.updateOne(
      { phoneNumber }, // Find by phone number
      {
        $set: {
          state,
          district,
          presentAddress,
          permanentAddress,
        },
      }
    );

    if (!addressUpdateResult.matchedCount) {
      throw new Error("Failed to update address details.");
    }

    // Return success response
    res.status(200).json({ success: true, message: "Data updated successfully!" });
  } catch (error) {
    console.error("Error updating data:", error);

    // Return error response
    res.status(500).json({
      success: false,
      message: "An error occurred while updating data. Please try again later.",
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
 
// Endpoint to fetch selected fields from all collections
app.get("/api/users", async (req, res) => {
  try {
    // Access the database collections
    const usersCollection = mongoose.connection.collection("users");
    const userDetailsCollection = mongoose.connection.collection("user_details");
    const userAddressCollection = mongoose.connection.collection("user_address");

    // Fetch all users from the `users` collection
    const users = await usersCollection.find({}, { projection: { email: 1, phoneNumber: 1, _id: 0 } }).toArray();

    // Fetch all details from the `user_details` collection
    const userDetails = await userDetailsCollection.find({}, { projection: { name: 1, dob: 1, phoneNumber: 1, _id: 0 } }).toArray();

    // Fetch all addresses from the `user_address` collection
    const userAddresses = await userAddressCollection.find({}, { projection: { state: 1, district: 1, phoneNumber: 1, _id: 0 } }).toArray();

    // Combine data from all collections based on phoneNumber
    const combinedData = users.map((user) => {
      const details = userDetails.find((detail) => detail.phoneNumber === user.phoneNumber);
      const address = userAddresses.find((addr) => addr.phoneNumber === user.phoneNumber);

      return {
        email: user.email,
        phoneNumber: user.phoneNumber,
        name: details?.name || null,
        dob: details?.dob || null,
        state: address?.state || null,
        district: address?.district || null,
      };
    });

    // Send the combined data to the frontend
    res.status(200).json({ success: true, data: combinedData });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ success: false, message: "An error occurred. Please try again later." });
  }
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});