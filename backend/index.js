const express = require('express');

const cors = require("cors")

const mainRouter = require("./routes/index")

const app = express()

const PORT = 4000

app.use(cors())

app.use(express.json())

app.use("/api/v1", mainRouter)


console.log("hi")

app.listen(PORT, ()=>{
    console.log(`Your app is listening at ${PORT}`)
})


