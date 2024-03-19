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
        return res.status(200).json({
            msg: "found successfully",
            balance: account.balance
        })
    }

    res.status(403).json({
        msg: "request forbidden",
    })
})

router.post("/transfer", authMiddleware, async(req, res)=>{
    console.log("sibi")
    const session = await mongoose.startSession();
    session.startTransaction();
    const { amount, to } = req.body;
    const account = await Account.findOne({ user: req.userId }).session(session);
    console.log(req.userId)
    console.log(amount)
    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }
    const toAccount = await Account.findOne({ userName: to }).session(session);
    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }
    await Account.updateOne({ user: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userName: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();

    res.status(200).json({
        message: "Transfer successfull"
    });
})





module.exports = router
