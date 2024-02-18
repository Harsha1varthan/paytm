const zod = require("zod")

const signUp = zod.object({
    userName: zod.string().min(3).max(30).trim(),
    firstName: zod.string().max(50).trim(),
    lastName: zod.string().max(50).trim(),
    password: zod.string().min(6)
})


module.exports = {
    signUp
}