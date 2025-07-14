/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */


import { useEffect, useState } from "react";

const Account = ({token, checkedOutBooks, setCheckedOutBooks}) => {
  const [user, setUser] = useState(null);
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
        console.log("Account API response:", data); // <--- Add this
        setUser(data);
        setCheckedOutBooks(data.reservations || []);
      } catch (err) {
        setError(err.message);
      }
    };

    if(token){fetchAccountData();}
  }, [token, setCheckedOutBooks]);

  const handleReturn = async (reservationId) => {
    try {
      const res = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${reservationId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to return book");

      setCheckedOutBooks((prevBooks) => prevBooks.filter((book) => book.id !== reservationId));
    } catch (err) {
      setError(err.message);
    }
  };
  if (!token) return <p>Please Log In</p>
  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading account...</p>;

  return (
    <div className="account_container">
      <h2 >Welcome, {user.firstname} {user.lastname}</h2>
      <p>Email: {user.email}</p>

      <h3>Checked Out Books</h3>
      {checkedOutBooks.length === 0 ? (
        <p>You currently have no books checked out.</p>
      ) : (
        <ul>
          {checkedOutBooks.map((book) => (
            <li key={book.id}>
              <img 
              src={book.coverimage} 
              alt={book.title} 
              style={{ width: '100px', height: '150px' }} 
              />
              <strong>{book.title}</strong> by {book.author}
              <br />
              <button className="button" onClick={() => handleReturn(book.id)}>Return</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Account;
