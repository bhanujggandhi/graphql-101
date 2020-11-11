import { useState } from "react";
import { graphql } from "react-apollo";
import { getAuthorsQuery } from "../queries/queries";

const AddBook = ({ data }) => {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  console.log(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formValues = {
      name,
      genre,
      authorId,
    };
    console.log(formValues);
    setName("");
    setGenre("");
  };

  return (
    <form id='add-book' onSubmit={handleSubmit}>
      <div className='field'>
        <label>Book Name: </label>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='field'>
        <label>Genre: </label>
        <input
          type='text'
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>
      <div className='field'>
        <label>Author: </label>
        <select onChange={(e) => setAuthorId(e.target.value)}>
          <option value=''>Select Author</option>
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
