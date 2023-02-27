const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


const { Users } = require("../models")

const config = process.env;


router.post("/register", async (req, res) => {

  // Our register logic starts here
  try {
    // Get user input
    const { firstName, lastName, email, username, password1, password2, reason } = req.body;

    // Validate user input
    if (!(firstName && lastName && email && username && password1 && password2 && reason)) {
      return res.status(400).send("Input Empty");
    }

    if (password1 != password2) {
      return res.status(400).send("Passwords do not match!")
    }

    // check if user already exist
    const oldUser = await Users.findOne({
      where: (
        {
          email: email
        }, 
        {
          username: username
        }
      )
    });

    if (oldUser) {
      return res.status(409).send("Username or email are already taken. Try logging in!");
    }

    //Encrypt user password
    encryptedUserPassword = await bcrypt.hash(password1, 10);


    // Create user in our database
    const user = await Users.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      password: password1,
      reason: reason,
    });

    // Create token

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "5h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
})

router.delete('/', async (req, res) => {

  await Users.destroy({ where: {} })

  listOfUsers = Users.findAll()
  res.json(listOfUsers)
});

module.exports = router 