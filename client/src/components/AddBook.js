import { graphql } from "react-apollo";
import { getAuthorsQuery } from "../queries/queries";

const AddBook = ({ data }) => {
  console.log(data);
  return (
    <form id='add-book'>
      <div className='field'>
        <label>Book Name: </label>
        <input type='text' />
      </div>
      <div className='field'>
        <label>Genre: </label>
        <input type='text' />
      </div>
      <div className='field'>
        <label>Author: </label>
        <select>
          <option>Select Author</option>
          {data.loading ? (
            <option disabled>Loading Authors...</option>
          ) : (
            data.authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))
          )}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default graphql(getAuthorsQuery)(AddBook);
