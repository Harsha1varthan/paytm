const express = require("express")

const {signUp} = require("../validate")

const jwt = require("jsonwebtoken")

const {JWT_SECRET} = require("../config")

const {User} = require("../db")


const userRouter = express.Router()

userRouter.post("/signup", async (req, res)=>{
     const body = req.body
    const parsedData = signUp.safeParse(body)

    if(!parsedData.success){
        res.status(404).json({
            msg: "Incorrect Inputs"
        })
    }

    const user = await User.findOne({
        userName: body.userName
    })

    if(user){
        return res.status(404).json({
            msg: "Your Name is Already taken"
        })
    }

    const dbUser = await User.create({
        userName: body.userName,
        firstName: body.firstName,
        lastName: body.lastName,
        password: body.password
    })

    const token = jwt.sign({
        userId: dbUser._id
    }, JWT_SECRET)
 
    res.json({
        msg: "User successfully created"
    })

})

userRouter.get("/signin", (req, res)=>{
    res.send("Your ")
})

module.exports = userRouter