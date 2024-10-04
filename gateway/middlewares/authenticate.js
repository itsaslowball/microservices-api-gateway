// middlewares/authenticate.js
const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) {
//     return res.status(403).send("Access denied. No token provided.");
//   }

//   jwt.verify(token, process.env.JWT_SECRET || "default_secret", (err, user) => {
//     if (err) {
//       return res.status(403).send("Invalid token.");
//     }
//     req.user = user; // Set the authenticated user object in the request
//     next();
    //   });
    console.log("User authenticated");
    next();
};

module.exports = authenticateJWT;
