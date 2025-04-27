import React from "react";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import "./volunteerPage.css";

export default function VolunteerPage() {
  const { user } = useContext(UserContext);
  const [shift, setShift] = useState(null);
  const [shelter, setShelter] = useState(null);

  useEffect(() => {
    const getVolunteerInfo = async () => {
      const userid = user?.id;
      try {
        const res = await axios.get(
          `http://localhost:8081/volunteer/${userid}`
        );
        setShift(res.data.shift);
        setShelter(res.data.shelter);
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
    </div>
  );
}
