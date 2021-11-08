const express = require('express');
const bcrypt = require("bcrypt");
const User = require('../../database/models/User');



const router = express.Router();

router.post('/', async (req,res) => {

  User.create({
    name:"Luis",
    username: "luis",
    password: await  bcrypt.hash("luisin", 10)
  });
  // res.json('a')
});

module.exports = router;
