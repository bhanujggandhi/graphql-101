import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";

const BookList = () => {
  const { data, loading, error } = useQuery(getBooksQuery);
  if (loading) return <p>Loading....</p>;
  if (error) return <div>{error}</div>;
  return (
    <div>
      <ul id='book-list'>
        {data.books.map((book) => (
          <li key={book.id}>{book.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
