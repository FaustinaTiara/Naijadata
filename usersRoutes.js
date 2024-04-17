const express = require('express');
const router = express.Router();
const {mid} = require('../middleware/midw')
const {verifyAuth} = require('../middleware/auth')
const {dashBoard,blog,settings,logout,support,login,details} = require('../controllers/users');
const { signup, verifyCode, processFaceImage } = require('../controllers/signup')


router.get('/dashBoard',dashBoard)
router.get('/blog',blog)
router.get('/support',support)
router.post('/signup',signup)
router.get('/settings',settings)
router.get('/login', mid,login)
router.post('/logout',logout)
router.get('/details',verifyAuth,details)

module.exports = router;