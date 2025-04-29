const db = require("../db");

const volunteerQueries = {
  getShifts: (volunteer_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM SHIFT sh WHERE sh.volunteer_id = 
        (
            SELECT volunteer_id FROM VOLUNTEER vr 
            WHERE vr.volunteer_id = ?
        )`,
        [volunteer_id],
        (err, results) => {
          if (err) {
            console.error("Failed to load shifts:", err);
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  },
  getShelterInfo: (volunteer_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT sh.shelter_name, sh.addr_street, sh.addr_city, sh.addr_state, sh.phone FROM SHELTER sh
        WHERE sh.shelter_id = 
        (
            SELECT shelter_id FROM VOLUNTEER vr
            WHERE vr.volunteer_id = ?
        )`,
        [volunteer_id],
        (err, results) => {
          if (err) {
            console.error("Failed to load shelter information:", err);
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  },
  getSkills: (volunteer_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT skill FROM SKILLS 
        WHERE volunteer_id = ?`,
        [volunteer_id],
        (err, results) => {
          if (err) {
            console.error("Failed to load skills:", err);
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  },
  getReqResources: (volunteer_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT r.resource_name, r.resource_quantity, rq.quantity FROM RESOURCES r
        JOIN REQUIRES rq ON r.resource_id = rq.resource_id
        JOIN SERVICE s ON s.service_type = rq.service_type
        AND s.service_type =
        (
            SELECT service_type FROM VOLUNTEER vr
            WHERE vr.volunteer_id = ?
        ) 
        JOIN SHELTER sh ON sh.shelter_id = r.shelter_id
        AND sh.shelter_id =
        (
            SELECT shelter_id FROM VOLUNTEER vr
            WHERE vr.volunteer_id = ?
        )`,
        [volunteer_id, volunteer_id],
        (err, results) => {
          if (err) {
            console.error("Failed to load resources:", err);
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  },
  getService: (volunteer_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT service_type FROM VOLUNTEER
        WHERE volunteer_id = ?`,
        [volunteer_id],
        (err, results) => {
          if (err) {
            console.error("Failed to load skills:", err);
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  },
};

module.exports = volunteerQueries;
