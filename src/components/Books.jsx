/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */
 import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Books() {
    const [books, setBooks] = useState([]);
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

    return ( ///return the display and infomation needed for the page!
        <>
        <h2> List of all books </h2>
        <ul> 
            {books.map((book) => (///.map method is used to iterate through each book in the Api, 
            // key is used to drill down into the book titles via book.id, 
            // book.author/title for additional information and book.coverimage for book images!
                <li key={book.id}>
                    <Link to={`/books/${book.id}`}>{book.title}</Link> 
                    <p>Author: {book.author}</p>
                    <p>Descriptions:{book.description}</p>
                   <img src={book.coverimage} alt={book.title} style={{ width: '100px', height: '150px' }} />
              </li>
            ))}
        </ul>
        </>
    )
}
