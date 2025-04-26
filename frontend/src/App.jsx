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

import ManagerPage from "./pages/managerPage.jsx";
import VictimPage from "./pages/victimPage.jsx";
import VolunteerPage from "./pages/volunteerPage.jsx";


function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8081/login", {email, password,});
      const user = res.data.user;
      setMessage(res.data?.message || "Login successful");
      console.log("User Info:", res.data.user); // for testing
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
      <h2>Volunteer Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label>Password:</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br />
        <button type="submit">Log In</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
