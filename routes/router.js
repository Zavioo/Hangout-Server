const express = require('express')

const userController = require("../controllers/userController")
const jwtMiddleware = require('../middlerwears/jwtMiddleware')
const multerMiddleware = require('../middlerwears/multerMiddleware')


const router = new express.Router()

// Register : http://localhost:3000/register
router.post('/register', userController.registerController)

// // Login : http://localhost:3000/login
router.post('/login', userController.loginController)

// profile updation : http://localhost:3000/edit-user
router.put('/edit-user', jwtMiddleware, multerMiddleware.single('profilePic'), userController.editUserController)

module.exports = router 