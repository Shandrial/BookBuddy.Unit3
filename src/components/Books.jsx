/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


export default function Books({ token, checkedOutBooks, setCheckedOutBooks }) {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [errorBookId, setErrorBookId] = useState("")
    const navigate = useNavigate();
///useEffect is used to pull books from API using Fetch method!
    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books');//API URL
            const data = await response.json();///Parses the data received into Json!
            //SetBooks is used to render data from json!
            setBooks(data);
        };
        fetchBooks();//fetches the infomation from json to be rendered!
    }, []);

    async function handleCheckOut(bookId) {
        setError("")
        setSuccess("")
        setErrorBookId(null)

        if (!token) {
            setError("Please Log In to Check Out a Book")
            setErrorBookId(bookId)
            return
        }

        try {
            const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ bookId }), 
        });

        if (!response.ok) {
            const result = await response.json()
            setError(result.message || "Failed to Check Out Book")
            setErrorBookId(bookId)
            return;
        }
        setSuccess("Book Checked Out Successfully")
        setBooks(books => books.map(book => book.id === bookId ? { ...book, available: false} : book))
        // Redirect to account page so Account fetches fresh data
        navigate("/account");
        } catch (err) {
            setError("Failed to check out book.")
            setErrorBookId(bookId)
        }
    }
   
    return ( ///return the display and infomation needed for the page!
        <>
        
      <h2> List of all books </h2>

        
      <ul> 
        
           <div className = "book_list_container">
            <input type = "text" placeholder="Search for a book" 
            onChange={(e) => {
                const searchTerm = e.target.value.toLowerCase();
                const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchTerm));
                setBooks(filteredBooks);
            }} />
           </div>
            {books.map((book) => (///.map method is used to iterate through each book in the Api, 
            // key is used to drill down into the book titles via book.id, 
            // book.author/title for additional information and book.coverimage for book images!
                <li key={book.id}>
                    <Link to={`/books/${book.id}`}>{book.title}</Link> 
                    <p>Author: {book.author}</p>
                    <img src={book.coverimage} alt={book.title} style={{ width: '100px', height: '150px' }} />
                    {book.available ? (
                        <>
                            <button onClick={() => handleCheckOut(book.id)}>Check Out</button>
                            {errorBookId === book.id && error && (<span>{error}</span>)}
                        </>
                        ) : (
                        <button disabled>Not Available</button>)
                    }
              </li>
            ))}
        </ul>
        </>
    )

}

