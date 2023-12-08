const express = require("express");
const cors = require("cors");
const bp = require("body-parser");

const app = express();

const registerRoute = require("./routes/auth/register.route");
const loginRoute = require("./routes/auth/login.route");

// Configure CORS options
const corsOptions = {
  origin: ["http://localhost:3000"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const dbConnect = require("./startup/dbConnect");

dbConnect();

// Apply middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(bp.urlencoded({ extended: true }));

// Use the routes
app.use("/api/register", registerRoute);
app.use("/api/login", loginRoute);

app.listen(8080, () => {
  console.log("App is running on port 8080");
});
