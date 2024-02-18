const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://paytmharsha:NPGfW3et499jiYpG@paytm.l63ykeb.mongodb.net/Users')

const UserSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    password: {
        type: String,
        lowercase: true,
        minLength: 6
    }
})

const User = mongoose.model("User", UserSchema)


module.exports = {
    User
}