
const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'S@iis@goodboy'
const fetchuser = require('../middleware/fetchuser');


const { body, validationResult } = require('express-validator');
// the statement below is as per new documentation of express validator,only difference is "query" and "body" word
// const { query, validationResult} = require('express-validator');


// ROUTE 1: Create a user using POST "/api/auth/createuser". No login required
router.post('/createuser',
  [body('name', 'enter a valid name').isLength({ min: 2 }),
  body('email', 'enter a valid email').isEmail(),
  body('password', 'enter a valid password').isLength({ min: 5 }),
],
async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success,errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        // Duplicate key error
        return res.status(400).json({ success,error: 'Email already exists' });
      }
      const salt = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash( req.body.password,salt)
      user = await User.create({
        name: req.body.name,
        email:req.body.email ,
        password: securePassword 
      });
      const data = {
        user:{
          id:user.id
        }
      }
      const authtoken = jwt.sign(data,JWT_SECRET);
      success=true
  res.json({success,authtoken})
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error")
    }
    

  });

  // ROUTE 2:Authenticate a User using: POST "api/auth/login". No login required 
router.post('/login',
  [
  body('email', 'enter a valid email').isEmail(),
  body('password', 'password cannot be blank').exists(),

],
async (req, res) => {
  // If there are errors, return Bad requests and the errors
  let success = false
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });

    }
    const{email,password}=req.body;
    try {
      let user = await User.findOne({email});
      if(!user){
        success=false
        return res.status(400).json({success,error:"please login with correct credentials"})
      }
      const passwordCompare = await bcrypt.compare(password,user.password)
      if(!passwordCompare){
        success=false
        return res.status(400).json({success,error:"please login with correct credentials"})

      }
      const data = {
        user:{
          id:user.id
        }
      }
      const authtoken = jwt.sign(data,JWT_SECRET);
      success=true
      res.json({success,authtoken})
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error")
    }
})

  // ROUTE 3: Get loggedin User Details using: POST "api/auth/getuser". Login required 
router.post('/getuser', fetchuser,
async (req, res) => {
  try {
  userId = req.user.id;
  const user = await User.findById(userId).select("-password")
  res.send(user)
  
} catch (error) {
  console.error(error.message);
      res.status(500).send("Internal server error")
}
})
module.exports = router;
