// const express = require('express');
// const router = express.Router();
const Admin = require('../model/dbPool');
const jwt = require('jsonwebtoken')

// Create Admin
const createAdmin = async (req, res) => {
  // Extract data from request body
  const { username, email, password } = req.body;

  try {
    // Create a new admin
    const newAdmin = await Admin.create({ username, email, password });

    // Admin successfully created
    res.status(201).json({ message: 'Admin created successfully', data: newAdmin });
  } catch (error) {
    console.error('Admin creation error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// To login as an admin
const adminlogin = async (req, res) => {
    try {
        // Extract email, password and pass from the request body
        const { email, password, securePass } = req.body;

        // Verify user credentials
        const user = await verifyUserCredentials(email, password, securePass);

        if (!user) {
            // If credentials are invalid, send an error response
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token with the user's data as the payload
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
            },
            secret,
            {
                expiresIn: '1h', // Token expiration time
            }
        );

        // Send a response back to the client with the token and user information
        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                email: user.email,
            },
        });
    } catch (error) {
        // Handle unexpected errors
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete Admin
const deleteAdmin = async (req, res) => {
  const adminId = req.params.id;

  try {
    // Delete the admin
    const deletedAdmin = await Admin.findByIdAndDelete(adminId);

    if (!deletedAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json({ message: 'Admin deleted successfully', data: deletedAdmin });
  } catch (error) {
    console.error('Admin deletion error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Admin Dashboard
const admindashboard = async (req, res) => {
  try {
    // Fetch admin dashboard data
    // Example: const dashboardData = await fetchAdminDashboardData();
    const dashboardData = { /* your dashboard data */ };

    res.status(200).json({ message: 'Admin dashboard data', data: dashboardData });
  } catch (error) {
    console.error('Admin dashboard data error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createAdmin,
  adminlogin,
  deleteAdmin,
  admindashboard
};
