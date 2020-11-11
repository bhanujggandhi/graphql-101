import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// Components
import AddBook from "./components/AddBook";
import BookList from "./components/BookList";

// Apollo Client Setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div id='main'>
        <h1>Reading List</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
};

export default App;
