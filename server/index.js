const express = require("express");
const cors = require("cors");
const bp = require("body-parser");

const app = express();

const auth = require("./routes/auth.routes");

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

app.use("/api/auth", auth);

app.listen(8080, () => {
  console.log("App is running on port 8080");
});