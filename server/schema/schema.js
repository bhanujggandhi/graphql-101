const graphql = require("graphql");
const _ = require("lodash");

// Models
const Book = require("../models/Book");
const Author = require("../models/Author");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // return _.find(authors, { id: parent.authorId });
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
        // return _.filter(books, { authorId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    books: {
      type: new GraphQLList(BookType),
      resolve() {
        // return books;
      },
    },
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parents, args) {
        // code to get data from DB / other source
        // return _.find(books, { id: args.id });
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve() {
        // return authors;
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parents, args) {
        // code to get data from DB / other source
        // return _.find(authors, { id: args.id });
      },
    },
  }),
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID },
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          author: args.authorId,
        });
        return book.save();
      },
    },
  }),
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
