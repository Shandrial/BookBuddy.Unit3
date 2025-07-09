/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
export default function SingleBook() {
const { bookId } = useParams();
const [book, setBook] = useState(null);
const [error, setError] = useState("");
const [success, setSuccess] = useState("")
const token = localStorage.getItem("token")
    useEffect ( ()=>{
        const fetchSingleBook = async () => {
            try {
                const res = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/docs/#tag/Books/${bookId}');
                const data = await res.json;
                setBook(data);
                if(!res.ok ) throw new error ('failed to fetch book')
                } catch(err){
                    setError (err.message);}
            }
        fetchSingleBook()
        }, []
    );
   return (
        <div>
            <h2>{book.title}</h2>
            <img src={book.coverimage} alt={book.title} />
            <li>
                <ul>
                    {book.author}
                    {book.description}
                </ul>
            </li>
            <p>{book.available ? "yes" : "no"}</p>
        </div>
)
}
//You will have to comunicate with the api and DRILL -> via dot notation OR { somethin } depending on how we're passng props!
//What does that mean for you>>
//useNav could be useful here, let's google
//May need to create a route like in the app.jsxfile for the Single page view that ur making
//WHen ppl click on the book, it;ll create a new URL, and JUST the book they clicked
//AND it'll re-render the page
