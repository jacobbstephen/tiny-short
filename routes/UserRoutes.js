const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const userModel = require("../models/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post('/signup', async (req, res) => {
  try {
    
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        message: "INVALID DATA",
      });
    }

    const existingUser = await userModel.findOne({
      username,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Username  already exists, Please Choose another one",
      });
    }  
    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.create({
      username,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User registered Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        message: "INVALID DATA",
      });
    }

    const user = await userModel.findOne({
      username,
    });

    if (!user) {
      return res.status(404).json({
        message: "Invalid Credentials, Please try again",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Username or password is incorrect",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      token: token,
      message: "User Logged In  Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
