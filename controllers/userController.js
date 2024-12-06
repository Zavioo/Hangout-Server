const users = require('../models/userModel')
const bcrypt = require('bcrypt')

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

// 
