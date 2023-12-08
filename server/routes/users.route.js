const express = require("express");
const { User } = require("../models/user.model");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// TODO: Get the profile of the currently logged-in user
// router.get("/me", authMiddleware, async (req, res) => {
//   try {
//     // The user is already attached to the request by the middleware
//     const user = req.user;

//     res.send({
//       _id: user._id,
//       username: user.username,
//       email: user.email,
//       role: user.role,
//       // Include other relevant fields based on user role
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Internal Server Error");
//   }
// });

// Get the profile of a specific user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).send("User not found");

    res.send({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      // Include other relevant fields based on user role
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

// TODO: Update user profile

// Delete user profile
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).send("User not found");

    res.send({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
