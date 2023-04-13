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

    console.log(req.body)
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

    
    // return the user that has logged in
    res.status(200).json(user);
  } else {
    return res.status(400).send("Invalid Credentials");
  }
});

const invalidateTokens = []

console.log(invalidateTokens)

router.get("/profile", auth, async (req, res) => {
  const token = req.headers['x-access-token'];

  if (invalidateTokens.includes(token)) {
    return res.status(400).send("Cookie is invalidated")
  } else {
    const user = await Users.findOne({ where: ({ email: req.user.email }) });
    res.status(200).json(user);
  }

  
});



// Define route to handle logout
router.post("/logout", auth, (req, res) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send('Invalid token');
  }
  try {
    if(!invalidateTokens.includes(token)) {
      // Invalidate JWT token by setting expiration to a past date
      invalidateTokens.push(token)
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      const expirationDate = new Date(0);
      const invalidatedToken = jwt.sign({}, process.env.TOKEN_KEY, {
        expiresIn: expirationDate.getTime(),
      });
      // Clear token from client-side by setting response header to an empty string
      res.set('x-access-token', invalidatedToken);
      return res.status(200).send("Cookie has been removed")
    } else {
      return res.status(400).send("Cookie is invalidated")
    }


  } catch (err) {
    console.log(err)
  }
});


// // Middlewares
// var csrfProtect = csrf({ cookie: true })


// router.get('/form', csrfProtect, function (req, res) {
//   // Generate a tocken and send it to the view
//   res.render('send', { csrfToken: req.csrfToken() })
// })

// router.post('/posts/create', csrfProtect, function (req, res) {
//   res.send('data is being processed')
// })



module.exports = router 