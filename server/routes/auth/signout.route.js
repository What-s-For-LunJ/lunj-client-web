const express = require("express");
const authMiddleware = require("../../middleware/auth.middleware");
const Blacklist = require("../../models/blacklist.model");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const token = req.header("Authorization").split(" ")[1];

  // Add the token to the blacklist
  const blacklistedToken = new Blacklist({ token });
  await blacklistedToken.save();

  res.status(200).send("Signed out successfully.");
});

module.exports = router;
