import React from "react";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";

export default function VictimPage() {
  const { user } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const [shelter, setShelter] = useState(null);
  const [services, setServices] = useState(null);
  const [selectedService, setSelectedService] = useState("");


  useEffect(() => {
    const getVictimInfo = async () => {
      const userid = user?.id;
      console.log("frotnend: user",user);
      try {
        const res = await axios.get(`http://localhost:8081/victim/${userid}`);
        console.log("VICTIM PAYLOAD:", res.data);
        setProfile(res.data.profile)
        setShelter(res.data.shelter);
        setServices(res.data.services);
        
      } catch (err) {
        console.error(err);
        console.log("error");
      }
    };
    getVictimInfo();
  }, [user]);

  const handleRequestSubmit = async () => {
    console.log("Selected Service:", selectedService);
    console.log("User ID:", user?.id);
    console.log("Shelter ID:", shelter?.shelter_id);
    if (!selectedService || !user?.id || !shelter?.shelter_id) {
      alert("Missing information to submit request.");
      return;
    }
  
    try {
      const res = await axios.post("http://localhost:8081/request", {
        victim_id: user.id,
        service_type: selectedService,
        shelter_id: shelter.shelter_id,
      });
      alert("Request submitted successfully!");
      console.log("Request response:", res.data);
    } catch (err) {
      console.error("Error submitting request:", err);
      alert("Failed to submit request.");
    }
  };
  

  return (
    <div className="victim-page">
       <div className="welcome">       
        <h1>Victim Page</h1>
        {user ? (
          <>
            <p>Welcome, {user.first_name} {user.last_name}!</p>
            <p>Your role is {user.role}.</p>
        </>
        ) : (
        <p>Loading user info...</p>
      )}
      </div>

      <div classname ="profile-info">
      {profile ? (
        <>
          <p>You have been assigned room #{profile.room_num}.</p>
        </>
      ) : (
        <p>Loading user info...</p>
      )}
      </div>

      <div className = "service-info">
      { services && services?.length > 0 ? (
        <div className="service-list">
          <h3>Need something? Request a service.</h3>
          <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
            <option value="" disabled>Select a service</option>
            {services.map((svc,) => (
              <option key={svc.id}>{svc.service_type}</option>
            ))}
          </select>
        </div>
      ) : (
        <p>Loading services…</p>
      ) }
      <button onClick={handleRequestSubmit} disabled={!selectedService}>Request Service</button>
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
    
  );
}
