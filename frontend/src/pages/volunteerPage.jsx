import React from "react";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";

export default function VolunteerPage() {
  const { user } = useContext(UserContext);
  const [shift, setShift] = useState(null);

  useEffect(() => {
    const getShifts = async () => {
      const userid = user?.volunteer_id;
      try {
        const res = await axios.get(
          `http://localhost:8081/volunteer/shift/${userid}`
        );
        setShift(res.data.shift);
      } catch (err) {
        console.error(err);
        console.log("error");
      }
    };
    getShifts();
  }, [user]);

  return (
    <div className="page-container">
      <h1>Volunteer Page</h1>
      {user ? (
        <>
          <p>Welcome, {user.volunteer_id}!</p>
          <p>Your role is {user.role}.</p>
        </>
      ) : (
        <p>Loading user info...</p>
      )}
      {shift && shift.length > 0 ? (
        shift.map((s, index) => (
          <div key={index} style={{ marginBottom: "1rem" }}>
            <p>
              <strong>Day:</strong> {s.shift_day}
            </p>
            <p>
              <strong>Time:</strong> {s.shift_start_time}
            </p>
            <p>
              <strong>End:</strong> {s.shift_end_time}
            </p>
          </div>
        ))
      ) : (
        <p>No shifts found.</p>
      )}
    </div>
  );
}
