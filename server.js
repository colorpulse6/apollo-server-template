const express = require("express");
const cors = require("cors");

const { ApolloServer } = require("apollo-server-express");

const schema = require("./data/schema");
// create our express app
const app = express();

const corsOptions = {
  origin: "http://localhost:8080",
  credentials: true,
};

app.use(cors(corsOptions));
const jwt = require("express-jwt");
require("dotenv").config();

// auth middleware
const auth = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["sha1", "RS256", "HS256"],
  credentialsRequired: false,
});

app.use(auth);

// graphql endpoint
const server = new ApolloServer({
  schema,
  context: ({ req, res }) => ({
    user: req.user,
  }),
  playground: true,
});
server.applyMiddleware({ app });

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}/graphql`);
});
