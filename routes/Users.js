const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const express = require("express");
const crypto = require("crypto");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
let User = require("../models/Users");
const router = express.Router();


//@register user    --POST api


router.post("/registerUser", async (req,res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
  res.status(500).send('Internal Server Error')

  }
});



//@login api       --POST api

router.post("/login", async (req, res) => {
  try {
    // console.log(req.body);

    const { email, password } = req.body;

    if (!email || !password)
      return res.status(401).send({ errors: "invalid credentials" });

    const user = await User.findOne({ email }).lean();

    if (!user) {
      res.status(401).send("invalid credentials");
    }
    const token = jwt.sign(
      { email: user.email, _id: user._id },
      "jwtPrivateKey"
    );

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).send("invalid credentials");
    } else {
      // console.log(http200);
      delete user.password;

      res
        // .header("x-access-token", token)
        .status(200)
        .send({ data: user, token: token });
    }
  } catch (e) {
    console.log(e);

    res.status(500).send({
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
