import React from "react";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import "./volunteerPage.css";

export default function VolunteerPage() {
  const { user } = useContext(UserContext);
  const [shift, setShift] = useState(null);
  const [shelter, setShelter] = useState(null);
  const [skills, setSkills] = useState(null);
  const [resources, setResources] = useState(null);
  const [service, setService] = useState(null);
  useEffect(() => {
    const getVolunteerInfo = async () => {
      const userid = user?.id;
      try {
        const res = await axios.get(
          `http://localhost:8081/volunteer/${userid}`
        );
        setShift(res.data.shift);
        setShelter(res.data.shelter);
        setSkills(res.data.skills);
        setResources(res.data.resources);
        setService(res.data.service);
      } catch (err) {
        console.error(err);
      }
    };
    getVolunteerInfo();
  }, [user]);

  return (
    <div className="volunteer-page">
      <div className="top-bar">
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
        <div className="shelter-info">
          {shelter ? (
            <>
              <h3>{shelter.shelter_name}</h3>
              <p>
                {shelter.addr_street}, {shelter.addr_city}, {shelter.addr_state}
              </p>
              <p>{`(${shelter.phone.slice(0, 3)}) ${shelter.phone.slice(
                3,
                6
              )}-${shelter.phone.slice(6)}`}</p>
            </>
          ) : (
            <p>Shelter info...</p>
          )}
        </div>
      </div>
      <hr />
      <div className="body">
        <div className="skill-service">
          <div>
            <h3>Skills:</h3>
            {skills && skills.length > 0 ? (
              <p>
                {skills.map((s, index) => (
                  <tr key={index}>
                    <td>{s.skill},</td>
                  </tr>
                ))}
              </p>
            ) : (
              <p>No skills found.</p>
            )}
          </div>
          <div>
            <h3>Assigned service:</h3>
            {service ? <p>{service.service_type}</p> : <p>No service found.</p>}
          </div>
        </div>
        <div className="shift-info">
          <h3>Shifts</h3>
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
        <div className="resource-info">
          <h3>Resources</h3>
          {resources && resources.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Resource</th>
                  <th>Quantity in Stock</th>
                  <th>Required Quantity</th>
                </tr>
              </thead>
              <tbody>
                {resources.map((r, index) => (
                  <tr key={index}>
                    <td>{r.resource_name}</td>
                    <td>{r.resource_quantity}</td>
                    <td>{r.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No resources found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
