const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

// Configure Express
const app = express();

// DB connection
mongoose.connect(
  "mongodb+srv://bhanujggandhi:bhanujggandhi@cluster0.hbut7.mongodb.net/graphql-101?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.connection.once("open", () => {
  console.log("Connected to Database");
});

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, () => {
  console.log("GraphQL server is running on Port 4000!");
});
