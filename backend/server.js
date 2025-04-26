const express = require("express");
const cors = require("cors");
const loginQueries = require("./api/loginpage");
const app = express();
app.use(express.json());
app.use(cors());

//Login route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Email and password are required.");
    }
    const results = await loginQueries.signin(email, password); // returns the name of login
    if (results.length > 0) {
      res.status(200).json({
        messsage: "Login successful",
        user: results[0],
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message });
  }
});

//listen to port 8081
app.listen(8081, () => {
  console.log("listening");
});
