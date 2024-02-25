const express = require('express')

const mongoose = require('mongoose')

const {transfer} = require("../validate")

const {authMiddleware} = require("../middleware")

const {User, Account} = require("../db")

const router = express.Router()

router.get("/balance", authMiddleware , async(req, res)=>{
    const userId = req.userId

    const account = await Account.findOne({
        user: userId
    })

    if(userId){
        console.log(account.balance)
        res.status(200).json({
            msg: "found successfully",
            balance: account.balance
        })
    }

    res.status(403).json({
        msg: "request forbidden",
    })
})

router.put("/transfer", authMiddleware, async(req, res)=>{
   const session = await mongoose.startSession();

   session.startTransaction()

   const body = req.body

   const {success} = transfer.safeParse(body)

   if(!success){
    return res.status(404).json({
        msg: "Invalid inputs"
    })
   }

   const {amount, to} = body

   const fromUser = await Account.findOne({
        user: req.userId
   }).session(session)

   const frombalance = fromUser.balance

   if(amount > frombalance){
    await session.abortTransaction()
        return res.status(400).json({
            msg: "Insufficient balance"
        })
   }

   const toAccount = await Account.findOne({
        userName: to
   }).session(session)

   if(!toAccount){
    await session.abortTransaction()
    return res.status(400).json({
        msg: "Incorrect Account"
    })
   }

   await Account.updateOne(
    {
        user: req.userId
   },
   {
        $inc:{
            balance: -amount
        }
   }

   ).session(session)
   await Account.updateOne(
    {
        userName: to
   },
   {
        $inc:{
            balance: amount
        }
   }

   ).session(session)

   await session.commitTransaction()

   return res.status(200).json({
     msg: "Transactions were done successfully"
   })


})





module.exports = router
