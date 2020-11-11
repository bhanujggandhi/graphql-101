import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

const BookList = ({ data }) => {
  console.log(data);
  return (
    <div>
      <ul id='book-list'>
        {!data.loading ? (
          data.books.map((book) => <li key={book.id}>{book.name}</li>)
        ) : (
          <p>Loading....</p>
        )}
      </ul>
    </div>
  );
};

export default graphql(getBooksQuery)(BookList);
