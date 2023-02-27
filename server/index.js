const express = require('express')
const app = express()
const cors = require("cors")
require("dotenv").config();


// parse incoming requests with JSON payloads
app.use(express.json())
app.use(cors())

const db = require("./models")

// Routers 
const userRouter = require('./routes/Users');
app.use("/users", userRouter)


db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server Running on port 3001")
  });
});