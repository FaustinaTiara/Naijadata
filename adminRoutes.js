const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin');

// Define routes for admin functionalities
router.get('/admindashboard', admin.admindashboard);
router.post('/createAdmin', admin.createAdmin);
router.get('/adminlogin', admin.adminlogin);
router.delete('/deleteAdmin/:id', admin.deleteAdmin);

module.exports = router;
