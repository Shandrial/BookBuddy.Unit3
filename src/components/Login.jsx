
/* TODO - add your code to create a functional React component that renders a login form */
import { useState } from "react";

export default function Login({token, setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      if (!email || !password) {
        setError("Both fields are required");
        return;
      }
      const response = await fetch(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );
      const result = await response.json();
      if (result.token) {
        setToken(result.token);
        setEmail("");
        setPassword("");
        console.log("User Token: ", result.token);
      } else {
        setError(result.message || "Login Failed");
      }
    } catch (error) {
      console.log(error);
      setError("Login failed");
    }
  };

  return (
  <>
    {token ? (
      <h3 className="welcome_back">Welcome back!</h3>
    ) : (
      <>
        <h3>Please Login</h3>
        <form className="login_container" onSubmit={handleSubmit}>
          <h4>Email</h4>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <h4>Password</h4>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <br />
          <button className="button" type="submit">Login</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </>
    )}
  </>
)}
