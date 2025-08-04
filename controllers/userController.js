const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const User = require( "../models/userModel");
const jwt = require("jsonwebtoken");

const SignupUser = asyncHandler(async (req, res) => {
    const {username , email , password } = req.body;
    if (!username || !email || !password ) {
        res.status(400);
        throw new Error("All Fields are mandatory")
    }
    const usernameAvailable = await User.findOne({username});
    if(usernameAvailable) {
        res.status(400);
        throw new Error("account with this username already exists")
    }

    const emailExists = await User.findOne({email})
    if(emailExists){
        res.status(400);
        throw new Error("account with this email already exists ")
    }

    const hashedPassword = await bcrypt.hash(password , 10);

    const user  = await User.create({
        username,
        email,
        password: hashedPassword
    });
    console.log("user created", user);
    if(user) {
        res.status(201).json({_id: user.id, email: user.email})
    } else {
        res.status(400);
        throw new Error("User data is not valid")
    }

    res.json({message : " signup user"})
})

const loginUser = asyncHandler (async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!")
    }

    const user = await User.findOne({email})
    
    if(user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user : {
                username : user.username,
                email : user.email,
                id: user.id
            }, 
        }, process.env.JWT_SECRET , {expiresIn :  "1h"})
        res.status(200).json({accessToken})
    }else {
        res.status(401)
        throw new Error("email or password is not valid")
    }
    res.status(200).json({message: "Login successful"});
})
const currentUser = asyncHandler ( async (req, res) => {
    
    res.json(req.user)
})

module.exports = {SignupUser , loginUser , currentUser}