import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries";

const BookList = ({ data }) => {
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
