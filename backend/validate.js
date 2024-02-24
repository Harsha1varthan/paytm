const zod = require("zod")

const signUp = zod.object({
    userName: zod.string().email().min(3).max(30).trim(),
    firstName: zod.string().max(50).trim(),
    lastName: zod.string().max(50).trim(),
    password: zod.string().min(6)
})

const signIn = zod.object({
    userName: zod.string().email(),
    password: zod.string().min(6)
})

const updateInfo = zod.object({
    password: zod.string().min(),
    firstName: zod.string().max(50).trim(),
    lastName: zod.string().max(50).trim()
})

module.exports = {
    signUp, signIn,
    updateInfo
}