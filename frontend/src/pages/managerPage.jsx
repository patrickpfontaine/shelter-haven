import React from "react";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import "./managerPage.css";

export default function ManagerPage() {
  const { user } = useContext(UserContext);
  const [shift, setShift] = useState(null);
  const [shelter, setShelter] = useState(null);
  const [skills, setSkills] = useState(null);
  const [resources, setResources] = useState(null);
  const [volunteers, setVolunteers] = useState([]);
  const [victims, setVictims] = useState([]);
  const [allRequests, setallRequests] = useState([]);

  useEffect(() => {
    const getManagerInfo = async () => {
      const userid = user?.id;
      try {
        const res = await axios.get(`http://localhost:8081/manager/${userid}`);
        setShift(res.data.shift);
        setShelter(res.data.shelter);
        setSkills(res.data.skills);
        setResources(res.data.resources);
        setVolunteers(res.data.volunteerList);
        setVictims(res.data.victimList);
        setallRequests(res.data.allRequests);
      } catch (err) {
        console.error(err);
      }
    };
    getManagerInfo();
  }, [user]);

  console.log("vic type:", allRequests);

  const handleComplete = async (request) => {
    try {
      console.log("ServiceType", request.service_type);
      // console.log("shelterID",shelter.shelter_id)
      // console.log("victimID",request.victim_id)
      const res = await axios.post("http://localhost:8081/request/complete", {
        service_type: request.service_type,
        shelter_id: shelter.shelter_id,
        victim_id: request.victim_id,
      });
      console.log("Request completed:", res.data);
      // delete the request
    } catch (err) {
      console.error("Error completing request:", err);
    }
  };

  return (
    <div className="volunteer-page">
      <div className="top-bar">
        <div className="shelter-info">
          {shelter ? (
            <>
              <div style={{ textAlign: "center" }}>
                <h3>{shelter.shelter_name}</h3>
              </div>
              <div style={{ textAlign: "center" }}>
                <p>
                  {shelter.addr_street}, {shelter.addr_city},{" "}
                  {shelter.addr_state}
                </p>
              </div>
              <div style={{ textAlign: "center" }}>
                <p>{`(${shelter.phone.slice(0, 3)}) ${shelter.phone.slice(
                  3,
                  6
                )}-${shelter.phone.slice(6)}`}</p>
              </div>
            </>
          ) : (
            <p>Shelter info...</p>
          )}
        </div>
        <div className="welcome">
          {user ? (
            <>
              <h1 className="welcome">
                Welcome, {user.first_name} {user.last_name}!
              </h1>
            </>
          ) : (
            <p>Loading user info...</p>
          )}
        </div>
      </div>

      <hr />

      <div className="skills">
        <span className="skills-label" style={{ marginRight: 5 }}>
          Skills:
        </span>
        {skills && skills.length > 0 ? (
          <div className="skill-list">
            {skills.map((s, index) => (
              <span className="skill" key={index}>
                {s.skill},
              </span>
            ))}
          </div>
        ) : (
          <span>No skills found.</span>
        )}
      </div>
      <div className="body">
        <div className="row-one">
          <div className="shift-info">
            <div style={{ background: "lightgray" }}>
              <h3>Your Shifts</h3>
            </div>
            {shift && shift.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {shift.map((s, index) => (
                    <tr key={index}>
                      <td>{s.shift_day}</td>
                      <td>
                        {s.shift_start_time.slice(0, 5)} -{" "}
                        {s.shift_end_time.slice(0, 5)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No shifts found.</p>
            )}
          </div>
          <div className="volunteer-list full-row">
            <div style={{ background: "lightgray" }}>
              <h3>Shift Schedule</h3>
            </div>
            {volunteers.length > 0 ? (
              volunteers.map((v, index) => (
                <div key={index} className="volunteer-section">
                  <h4>
                    {v.first_name} {v.last_name}
                  </h4>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Day</th>
                        <th>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {v.shifts.map((s, i) => (
                        <tr key={i}>
                          <td>{s.day}</td>
                          <td>
                            {s.start.slice(0, 5)} - {s.end.slice(0, 5)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))
            ) : (
              <p>No volunteer shifts found.</p>
            )}
          </div>
        </div>
        <div className="request-section">
          <div style={{ background: "lightgray" }}>
            <h3 style={{ marginTop: 0, textAlign: "center" }}>
              Service Requests
            </h3>
          </div>
          {allRequests && allRequests.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Name</th>
                  <th>Room #</th>
                </tr>
              </thead>
              <tbody>
                {allRequests.map((r, index) => (
                  <tr key={index}>
                    <td>{r.service_type}</td>
                    <td>
                      {r.victim_fname} {r.victim_lname}
                    </td>
                    <td>{r.room_num}</td>
                    <td>
                      <button onClick={() => handleComplete(r)}>
                        Complete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No requests found.</p>
          )}
        </div>
        <div className="last-column">
          <div className="resource-info">
            <div style={{ background: "lightgray" }}>
              <h3>Resources</h3>
            </div>
            {resources && resources.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Resource</th>
                    <th>Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {resources.map((r, index) => (
                    <tr key={index}>
                      <td>{r.resource_name}</td>
                      <td>{r.resource_quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No resources found.</p>
            )}
          </div>

          <div className="victim-list">
            <div style={{ background: "lightgray" }}>
              <h3>Registered Victims</h3>
            </div>
            {victims.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Room #</th>
                  </tr>
                </thead>
                <tbody>
                  {victims.map((v, index) => (
                    <tr key={index}>
                      <td>
                        {v.victim_fname} {v.victim_lname}
                      </td>
                      <td>{v.room_num}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No victims found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
