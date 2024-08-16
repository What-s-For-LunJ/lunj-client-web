const express = require("express");
const cors = require("cors");
const bp = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const { schema, root } = require("./graphql/schema");
const authMiddleware = require("./middleware/auth.middleware");

const app = express();

// Auth
const registerRoute = require("./routes/auth/register.route");
const loginRoute = require("./routes/auth/login.route");
const signoutRoute = require("./routes/auth/signout.route");

const addressRoute = require("./routes/user/address.route");
const preferenceRoute = require("./routes/user/preference.route");

// CORS options
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
app.use("/api/signout", signoutRoute);
app.use("/api/user/addresses", addressRoute);
app.use("/api/user/preferences", preferenceRoute);

// GraphQL endpoint
app.use(
  "/graphql",
  authMiddleware,
  graphqlHTTP((req) => ({
    schema,
    rootValue: root,
    graphiql: true,
    context: { user: req.user },
  }))
);

app.listen(8080, () => {
  console.log("App is running on port 8080");
});
