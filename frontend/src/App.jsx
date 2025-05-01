import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import "./App.css";
import { useContext } from "react";
import { UserContext } from "./UserContext";

function App() {
  const { setUser } = useContext(UserContext); // <-- grab setUser

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      //const res = await axios.post("http://localhost:8081/login"
      const res = await axios.post("https://shelter-haven.onrender.com/login", {
        email,
        password,
      });
      const user = res.data.user;
      setMessage(res.data?.message || "Login successful");
      setUser(user); // <-- save the user globally!
      //onLogin(user);

      switch (user.role) {
        case "manager":
          navigate("/manager");
          break;
        case "volunteer":
          navigate("/volunteer");
          break;
        case "victim":
          navigate("/victim");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      console.error(err);
      setMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <div className="title">
        <h>Shelter Haven</h>
      </div>
      <img src="/shelter_haven_logo.png" alt="logo"></img>
      <h2 style={{ margin: 0 }}>Sign In</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginTop: 10 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br />
        <button type="submit">Sign In</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
