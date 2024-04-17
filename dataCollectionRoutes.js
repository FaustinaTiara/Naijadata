const express = require('express');
const router = express.Router();
const data = require('../controllers/data');

// Define routes for data collection
router.post('/submitData', data.submitData);
router.get('/getData', data.getData);
router.put('/updateData/:id', data.updateData);
router.delete('/deleteData/:id', data.deleteData);

module.exports = router;
