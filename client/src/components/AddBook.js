import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { getAuthorsQuery, addBookMutation } from "../queries/queries";

const AddBook = () => {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");
  const { data, loading } = useQuery(getAuthorsQuery);

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
          {loading ? (
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

export default AddBook;
