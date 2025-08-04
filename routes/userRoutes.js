const express = require('express');
const { currentUser, loginUser, SignupUser } = require('../controllers/userController');
const { validateHeaderName } = require('http');
const validateToken = require('../middleware/validateTokenHandelr');
const errorHandler = require('../middleware/errorHandler');

const router = express.Router();


router.post("/signup" , SignupUser)

router.post("/login" ,loginUser)

router.get("/current" ,validateToken, currentUser)

module.exports = router;