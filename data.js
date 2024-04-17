const express = require('express');
const router = express.Router();
const DataForm = require('../model/dbPool');

// Function to submit data
const submitData = async (req, res) => {
  // Extract data from request body
  const { formData } = req.body;

  try {
    // Create a new data form entry
    const newDataForm = await DataForm.create({ formData });

    // Data form successfully created
    res.status(201).json({ message: 'Data form submitted successfully', data: newDataForm });
  } catch (error) {
    console.error('Data form submission error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to get all data
const getData = async (req, res) => {
  try {
    // Retrieve all data forms
    const allDataForms = await DataForm.find();

    // Data forms successfully retrieved
    res.status(200).json({ data: allDataForms });
  } catch (error) {
    console.error('Error retrieving data forms:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to update data
const updateData = async (req, res) => {
  const { id } = req.params;
  const { formData } = req.body;

  try {
    // Update the data form entry
    const updatedDataForm = await DataForm.findByIdAndUpdate(id, { formData }, { new: true });

    // Data form successfully updated
    res.status(200).json({ message: 'Data form updated successfully', data: updatedDataForm });
  } catch (error) {
    console.error('Error updating data form:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to delete data
const deleteData = async (req, res) => {
  const { id } = req.params;

  try {
    // Delete the data form entry
    await DataForm.findByIdAndDelete(id);

    // Data form successfully deleted
    res.status(200).json({ message: 'Data form deleted successfully' });
  } catch (error) {
    console.error('Error deleting data form:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Exporting functions
module.exports = {
  submitData,
  getData,
  updateData,
  deleteData
};
