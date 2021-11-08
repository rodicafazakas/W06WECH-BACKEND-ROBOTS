const jwt=require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.header("Authorization"); 
  console.log(`Auth header${ authHeader}`);
  if (!authHeader) {
    const error = new Error("Missing token");
    error.code=401;
    next(error);
  } else {
    const token = authHeader.split(" ")[1]; 
    if (!token) {
      const error = new Error("Missing token");
      error.code=401;
      next(error);
    } else {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.username = user.username;
        next();
      } catch {
        const error = new Error("Invalid token");
        error.code = 401;
        next(error);
      }
    }
  }
};

module.exports = auth;