import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
export default function SingleBook() {
const { bookId } = useParams();
const [book, setBook] = useState(null);
const [error, setError] = useState("");
const token = localStorage.getItem("token")

    useEffect (()=>{
        
        const fetchSingleBook = async () => {
            try {
                const res = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId}`);
                const data = await res.json();
                setBook(data);
            } catch(error){
                console.log(error);
            } 
        }
        fetchSingleBook()

    },[])

   return (
    <>
       { book && (<div id='single_book_container'>
           
            <h2>{book.title}</h2>
            <img className='single_book_cover' src={book.coverimage} alt={book.title} style={{width: "auto", height: "400px"}} />
            <li>
                <ul>
                    {book.author}
                    <br></br>
                    <br></br>
                    {book.description}
                </ul>
            </li>
            <p className="availability">Available: {book.available ? "Yes" : "No"}</p>
        </div>)}
    </>
)
}
