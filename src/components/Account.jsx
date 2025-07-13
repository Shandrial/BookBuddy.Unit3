/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */


import { useEffect, useState } from "react";

const Account = ({token}) => {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const res = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to load account data");

        const data = await res.json();
        setUser(data);
        setBooks(data.checkedOutBooks || []);
      } catch (err) {
        setError(err.message);
      }
    };

    if(token){fetchAccountData();}
  }, [token]);

  const handleReturn = async (bookId) => {
    try {
      const res = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/return/${bookId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to return book");

      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    } catch (err) {
      setError(err.message);
    }
  };
  if (!token) return <p>Please Log In</p>
  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading account...</p>;

  return (
    <div>
      <h2>Welcome, {user.firstname} {user.lastname}</h2>
      <p>Email: {user.email}</p>

      <h3>Checked Out Books</h3>
      {books.length === 0 ? (
        <p>You currently have no books checked out.</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <strong>{book.title}</strong> by {book.author}
              <br />
              <button onClick={() => handleReturn(book.id)}>Return</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Account;
