const express = require("express");
const cors = require("cors");
const loginQueries = require("./api/loginpage");
const managerQueries = require("./api/manager");
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
                    MANAGER PAGE
  ----------------------------------------------------*/
  app.get("/manager/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const shifts = await volunteerQueries.getShifts(id);
      const shelter = await volunteerQueries.getShelterInfo(id);
      const skills = await volunteerQueries.getSkills(id);
      const volunteerList = await managerQueries.getVolunteerList(id);
      res.status(200).json({
        shift: shifts,
        shelter: shelter[0],
        skills: skills,
        volunteerList: volunteerList,
      });
    } catch (err) {
      console.error("Error getting shifts:", err);
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
    const skills = await volunteerQueries.getSkills(id);
    const resources = await volunteerQueries.getReqResources(id);
    const service = await volunteerQueries.getService(id);
    res.status(200).json({
      shift: shifts,
      shelter: shelter[0],
      skills: skills,
      resources: resources,
      service: service[0],
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
    const { id } = req.params;
    const profile = await victimQueries.getProfile(id);
    const shelter = await victimQueries.getShelterInfo(id);
    const services = await victimQueries.getServices(id);
    res.status(200).json({
      profile: profile[0],
      shelter: shelter[0],
      services: services,
    });
  } catch (err) {
    console.error("Victim route error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/request", async (req, res) => {
  try {
    const { victim_id, service_type, shelter_id } = req.body;
    if (!victim_id || !service_type || !shelter_id) {
      return res.status(400).json({ message: "Missing request fields" });
    }

    const result = await victimQueries.insertRequest(
      victim_id,
      service_type,
      shelter_id
    );
    res.status(201).json(result);
  } catch (err) {
    console.error("Error submitting request:", err);
    res.status(500).json({ error: err.message });
  }
});

/*-----------------------------------------------------
                  LISTENING ON PORT 8081
  ----------------------------------------------------*/
app.listen(8081, () => {
  console.log("listening");
});
