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
                console.log(data);
                setBook(data);
            } catch(error){
                console.log(error);
            } 
        }
        fetchSingleBook()

    },[])
console.log(book);
   return (
    <>
       { book && (<div>
           
            <h2>{book.title}</h2>
            <img src={book.coverimage} alt={book.title} style={{width: "auto", height: "400px"}} />
            <li>
                <ul>
                    {book.author}
                    {book.description}
                </ul>
            </li>
            <p>Available: {book.available ? "yes" : "no"}</p>
        </div>)}
    </>
)
}
