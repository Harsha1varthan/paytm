
const {JWT_SECRET} = require("./config")




const jwt = require("jsonwebtoken")

function authMiddleware(req, res, next){
    console.log("boom")
    const authheaders = req.headers['authorization']

     if (!authheaders || !authheaders.startsWith('Bearer ')) {
        return res.status(403).json({});
    } 

    if(authheaders){
         const token = authheaders.split(' ')[1]; 


        try{
            
            const decoded = jwt.verify(token, JWT_SECRET)
            
            req.userId = decoded.userId
            next()
        }
        catch(err){
            res.status(403).json({
                msg: "token error"
            })
        }
    }
}

module.exports = {
    authMiddleware
}