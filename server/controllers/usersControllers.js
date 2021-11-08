const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
const User = require("../../database/models/User");

const loginUser = async( req, res, next ) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({username});

    const rightPassword = await bcrypt.compare(password, user.password);
    
    if (rightPassword) {
      const token = jwt.sign(`{"username":"${user.username}"}`, process.env.JWT_SECRET);
      res.json({ token });
    } else {
      const error = new Error ("Wrong credetials");
      error.code = 401;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    error.message = "Authetification problem";
    next(error);
  }
}

module.exports = loginUser;