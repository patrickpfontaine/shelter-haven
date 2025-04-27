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
};

module.exports = volunteerQueries;
