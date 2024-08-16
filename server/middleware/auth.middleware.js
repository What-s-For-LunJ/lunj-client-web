const jwt = require("jsonwebtoken");
const config = require("config");
const Blacklist = require("../models/blacklist.model");

async function authMiddleware(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader)
    return res.status(401).send("Access denied. No token provided.");

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).send("Access denied. No token provided.");

  // Check if the token is blacklisted
  const isBlacklisted = await Blacklist.findOne({ token });
  if (isBlacklisted)
    return res.status(401).send("Access denied. Token invalidated.");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
}

module.exports = authMiddleware;
