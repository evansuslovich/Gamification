const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const auth = require("../../server/middleware/auth")

var csrf = require('csurf');
const cookieParser = require('cookie-parser'); // CSRF Cookie parsing
const bodyParser = require('body-parser'); // CSRF Body parsing

const { Users } = require("../models")

router.post("/register",  async (req, res) => {

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
        { email: email }, { username: username  }
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
      password: encryptedUserPassword,
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

    console.log("user created")

    // return new user
    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
})

router.post("/login", async (req, res) => {

  // Get user input
  const { email, password } = req.body;

  // Validate user input
  if (!(email && password)) {
    return res.status(400).send("All input is required");
  }

  // Validate if user exist in our database
  const user = await Users.findOne({ where: ({ email: email }) });

  
  if (user && (await bcrypt.compare(password, user.password))) {
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

    console.log(token)
    
    
    // return the user that has logged in
    res.status(200).json(user);
  } else {
    return res.status(400).send("Invalid Credentials");
  }
});


router.post("/welcome", auth, async (req, res) => {
  const user = await Users.findOne({ where: ({ email: req.user.email }) });
  res.status(200).json(user);
});

router.post('/profile', async function (req, res) {
  console.log(req)
  res.status(200).json("user");
});

router.get('/logout', function (req, res, next) {
  res.clearCookie() 
  return res.redirect("/")
});


// Middlewares
var csrfProtect = csrf({ cookie: true })


router.get('/form', csrfProtect, function (req, res) {
  // Generate a tocken and send it to the view
  res.render('send', { csrfToken: req.csrfToken() })
})

router.post('/posts/create', csrfProtect, function (req, res) {
  res.send('data is being processed')
})



router.delete('/', async (req, res) => {

  await Users.destroy({ where: {} })

  listOfUsers = Users.findAll()
  res.json(listOfUsers)
});



module.exports = router 