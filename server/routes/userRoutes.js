const express = require('express');
const bcrypt = require("bcrypt");
const User = require('../../database/models/User');
const loginUser = require("../controllers/usersControllers")



const router = express.Router();

router.post('/', async (req,res) => {

  User.create({
    name:"Luis",
    username: "luis",
    password: await  bcrypt.hash("luisin", 10)
  });
});


router.post("/login", loginUser);
module.exports = router;
