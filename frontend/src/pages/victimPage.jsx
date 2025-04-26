import React from "react";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";

export default function VictimPage() {
  const { user } = useContext(UserContext);
  const [shift, setShift] = useState(null);

  useEffect(() => {
    const getShifts = async () => {
      const userid = user?.id;
      try {
        const res = await axios.get(`http://localhost:8081/victim/${userid}`);
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
      <h1>Victim Page</h1>
      {user ? (
        <>
          <p>
            Welcome, {user.first_name} {user.last_name}!
          </p>
          <p>Your role is {user.role}.</p>
        </>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
}
