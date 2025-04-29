const db = require("../db");

const victimQueries = {
  getProfile: (victim_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT *
         FROM VICTIM
         WHERE victim_id = ?`,
        [victim_id],
        (err, results) => {
          if (err) {
            console.error("Failed to load shifts:", err);
          reject(err);
          } else{
            resolve(results);
          }
        }
      );
    });
  },
  getShelterInfo: (victim_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT sh.shelter_id, sh.shelter_name, sh.addr_street, sh.addr_city, sh.addr_state, sh.phone FROM SHELTER sh
        WHERE sh.shelter_id = 
        (
            SELECT shelter_id FROM VICTIM vm
            WHERE vm.victim_id = ?
        )`,
        [victim_id],
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
  getServices: (victim_id) => {
    return new Promise((resolve,reject) => {
    db.query(
      'SELECT service_type FROM SERVICE',
      (err,results) => {
        if (err) {
          console.error("Failed to load service information:", err);
          reject(err);
        } else {
          resolve(results);
        }
      }

    );
    });
  },
  insertRequest: (victim_id, service_type, shelter_id) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO REQUESTS (victim_id, service_type, shelter_id)
                      VALUES (?, ?, ?)`;
      db.query(query, [victim_id, service_type, shelter_id], (err, result) => {
        if (err) {
          console.error("Failed to insert request:", err);
          reject(err);
        } else {
          resolve({ message: "Request submitted", result });
        }
      });
    });
  },
};

module.exports = victimQueries;