const express = require("express");
const cors = require("cors");
const loginQueries = require("./api/loginpage");
const volunteerQueries = require("./api/volunteer");
const victimQueries = require("./api/victim");
const app = express();
app.use(express.json());
app.use(cors());

/*-----------------------------------------------------
                      LOGIN POST
  ----------------------------------------------------*/
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and password are required.");
    }
    const results = await loginQueries.signin(email, password);
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

/*-----------------------------------------------------
                    VOLUNTEER PAGE
  ----------------------------------------------------*/
app.get("/volunteer/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const shifts = await volunteerQueries.getShifts(id);
    const shelter = await volunteerQueries.getShelterInfo(id);
    res.status(200).json({
      shift: shifts,
      shelter: shelter[0],
    });
  } catch (err) {
    console.error("Error getting shifts:", err);
    res.status(500).json({ error: err.message });
  }
});

/*-----------------------------------------------------
                    VICTIM PAGE
  ----------------------------------------------------*/
app.get("/victim/:id", async (req, res) => {
  try {
    const victimId = req.params.id;
    const profile = await victimQueries.getProfile(victimId);
    if (!profile) {
      return res.status(404).json({ message: "Victim not found" });
    }
    res.json(profile);
  } catch (err) {
    console.error("Victim route error:", err);
    res.status(500).json({ error: err.message });
  }
});

/*-----------------------------------------------------
                  LISTENING ON PORT 8081
  ----------------------------------------------------*/
app.listen(8081, () => {
  console.log("listening");
});
