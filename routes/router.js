const express = require('express')

const userController = require("../controllers/userController")


const router = new express.Router()

// Register : http://localhost:3000/register
router.post('/register',userController.registerController)

// // Login : http://localhost:3000/login
router.post('/login',userController.loginController)

module.exports = router 