const jwt = require("jsonwebtoken");
const config = require("config");

function authMiddleware(req, res, next) {
  // Get the token from the request header
  const token = req.header("x-auth-token");

  // Check if the token is present
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    // Verify the token
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));

    // Attach the user object to the request
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
}

module.exports = authMiddleware;
