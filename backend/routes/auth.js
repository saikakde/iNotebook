
const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult} = require('express-validator');
// the statement below is as per new documentation of express validator,only difference is "query" and "body" word
// const { query, validationResult} = require('express-validator');

router.post('/createuser', 
[body('name','enter a valid name').isLength({ min: 2 }), 
body('email','enter a valid email').isEmail(), 
body('password','enter a valid password').isLength({ min: 5 }), 
],
async(req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors:errors.array() });
  }
  try{
  let user = await User.findOne({email:req.body.email});
  if (user) {
        // Duplicate key error
        return res.status(400).json({ error: 'Email already exists' });
      }
  user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
res.json(user)
  }catch(error){
    console.error(error.message);
    res.status(500).send("Some error pccured")
  }
  // try {
  //   const user = await User.create({
  //     name: req.body.name,
  //     email: req.body.email,
  //     password: req.body.password
  //   });
  //   res.json(user);
  // } catch (error) {
  //   if (error.code === 11000) {
  //     // Duplicate key error
  //     return res.status(400).json({ error: 'Email already exists' });
  //   }
  //   console.error(error);
  //   res.status(500).json({ error: 'Server error' });
  // }
  
  // res.json(user);

});

module.exports = router;
