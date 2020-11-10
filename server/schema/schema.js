const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

// Dummy data
var books = [
  { name: "Book1", genre: "Fantasy", id: "1", authorId: "1" },
  { name: "Book2", genre: "Fantasy", id: "2", authorId: "2" },
  { name: "Book3", genre: "Sci-fi", id: "3", authorId: "3" },
  { name: "Book4", genre: "Sci-di", id: "4", authorId: "4" },
  { name: "Book5", genre: "Sci-di", id: "5", authorId: "2" },
  { name: "Book6", genre: "Sci-di", id: "6", authorId: "3" },
  { name: "Book7", genre: "Sci-di", id: "7", authorId: "3" },
];

var authors = [
  { name: "Robin Sharma", age: 44, id: "1" },
  { name: "Shiv Khera", age: 59, id: "2" },
  { name: "Robert Kayasaki", age: 39, id: "3" },
  { name: "Bhanuj Gandhi", age: 22, id: "4" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, agrs) {
        return _.filter(books, { authorId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parents, args) {
        // code to get data from DB / other source
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parents, args) {
        // code to get data from DB / other source
        return _.find(authors, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
