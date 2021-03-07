const { gql, makeExecutableSchema } = require("apollo-server-express");

const resolvers = require("./resolvers");

// Define our schema using the GraphQL schema language
const typeDefs = gql`
  type User {
    id: Int!
    username: String!
    email: String!
  }

  type Query {
    me: User
  }

  type Token {
    token: String!
    user: User!
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): Token
    login(email: String!, password: String!): String
  }
`;
module.exports = makeExecutableSchema({ typeDefs, resolvers });
