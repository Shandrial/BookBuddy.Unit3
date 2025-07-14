/* TODO - add your code to create a functional React component that renders a registration form */

import { useState } from 'react'

export default function Register({setToken}) {
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    async function handleSubmit(event) {
        event.preventDefault()
        setError("")
        setSuccess("")
        try {
            if (!firstname || !lastname || !email || !password) {
                setError("All fields required")
                return
            }
            if (password.length < 8) {
                setError("Password Must Be At Least 8 characters long")
                return
            }
            const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register`,
            {
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    password: password
                })
            })

            const result = await response.json()
            console.log(result)
            if (result.token) {
                setToken(result.token)
                setSuccess("Registration Successful!")
                setFirstName("")
                setLastName("")
                setEmail("")
                setPassword("")
                console.log("User Token: ", result.token)
            } else {
                setError(result.message || "Registration Failed")
            }
        } catch(error) {
            console.log(error)
            setError("Registration failed")
        }
    }

    return(
        <>
            <h3 className='account_container'>Register Below:</h3>

            <form className='account_container' onSubmit={handleSubmit}>

                <label>
                    First Name: 
                    <input 
                        type="text" 
                        name="firstname"
                        value={firstname} 
                        onChange={(event) => setFirstName(event.target.value)}
                        required
                    />
                </label>
                
               <br />

               <label>
                    Last Name: 
                    <input 
                        type="text" 
                        name="lastname"
                        value={lastname} 
                        onChange={(event) => setLastName(event.target.value)}
                        required
                    />
                </label>

                <br />

               <label>
                    Email: 
                    <input 
                        type="email" 
                        name="email" 
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </label>

                <br />

                <label>
                    Password: 
                    <input 
                        type="password" 
                        name="password" 
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        minLength={8}
                        required
                    />
                </label>

                <br />

                <button className='button' type="submit">Register Now</button>

            </form>

            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
        </>
    )
}
