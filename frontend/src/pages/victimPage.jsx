import React from "react";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";

export default function VictimPage() {
  const { user } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const [shelter, setShelter] = useState(null);

  useEffect(() => {
    const getVictimInfo = async () => {
      const userid = user?.id;
      console.log("frotnend: user",user);
      try {
        const res = await axios.get(`http://localhost:8081/victim/${userid}`);
        console.log("VICTIM PAYLOAD:", res.data);
        setProfile(res.data.profile)
        setShelter(res.data.shelter);
      } catch (err) {
        console.error(err);
        console.log("error");
      }
    };
    getVictimInfo();
  }, [user]);
  return (
    <div className="victim-page">
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
      {profile ? (
        <>
          <p>Your room # is {profile.room_num}.</p>
        </>
      ) : (
        <p>Loading user info...</p>
      )}
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
    
  );
}
