const express = require("express")

const {signIn} = require("../validate")

const {authMiddleware} = require("../middleware")

const {signUp, updateInfo} = require("../validate")

const jwt = require("jsonwebtoken")

const {JWT_SECRET} = require("../config")

const {User} = require("../db")



const router = express.Router()

router.post("/signup", async(req, res)=>{
    console.log("after 16")
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
            msg: "Your Name is Already taken",
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
        msg: "User successfully created",
        token: token
    })

})

router.get("/signin", async (req, res)=>{
    const body = req.body

    const parsedData = signIn.safeParse(body)

    if(!parsedData.success){
        return res.status(404).json({
            msg: "Incorrect Inputs"
        })
    }
    console.log(parsedData)
    const user = await User.findOne({
        userName: body.userName,
        password: body.password
    })

    if(user){

        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET)

        return res.status(200).json({
            msg: "Successfully Logged in",
            token: token
        })
    }
    else{
        return res.status(411).json({
            msg: "Incorrect password/userName"
        })
    }
   
})

router.put("/", authMiddleware, async (req, res)=>{
    console.log("sibi")
    const body = req.body

    const userId = req.userId

    const parsedData = updateInfo.safeParse(body)

    if(!parsedData.success){
        return res.status(411).json({
            msg: "incorrect Inputs"
        })
    }

    const user = await User.findOneAndUpdate(
        {
            _id : userId
        },
        {
            $set: {
                password: body.password,
                fistName: body.firstName,
                lastName: body.lastName
            }
        },
        {
            new: true
        }
    )

    res.status(200).json({
        msg: "Updated successfully",
        update: user
    })
})

router.get("/bulk", authMiddleware, async(req, res)=>{
    const name = req.query.filter || ""

    const users = await User.find({
        $or : [
        {
            firstName: {
                "$regex": name
            }
        },
        {
            lastName:  {
                "$regex": name
            }
        }
        ]
    })

    res.status(200).json({
        msg: "got successfully",
        user: users.map( user => ({
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
        }))
    })
})


module.exports = router