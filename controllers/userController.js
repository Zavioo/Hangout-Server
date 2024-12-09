const users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// registers
exports.registerController = async (req, res) => {
    console.log(req.body);
    const { username, name, email, password } = req.body
    console.log(username, name, email, password);
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(406).json("You are already registered!!!")
        } else {
            const hashPassword = await bcrypt.hash(password, 10)
            const newUser = new users({
                username, name, email, password: hashPassword
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (error) {
        console.log(error);
    }
}

//login

exports.loginController = async (req, res) => {
    console.log("Inside login Controller");
    const { email, password } = req.body

    try {
        existingUser = await users.findOne({ email })
        if (existingUser) {
            const token = jwt.sign({ userId: existingUser.username }, process.env.JWTPASSWORD)
            // console.log(token);
            const isMatch = await bcrypt.compareSync(password, existingUser.password)
            if (isMatch) {
                res.status(200).json({
                    user: existingUser, token
                })
            } else {
                res.status(404).json("Incorrect Password")
            }
        } else {
            res.status(404).json("Incorrect Email or Password!!!")
        }
    } catch (error) {
        console.log(error);
    }
}

