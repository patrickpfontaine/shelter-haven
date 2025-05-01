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
        `SELECT sh.shelter_id, sh.shelter_name, sh.addr_street, sh.addr_city, sh.addr_state, sh.phone FROM SHELTER sh
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
  getRequests: (volunteer_id) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT r.service_type, r.victim_id, vm.victim_fname, vm.victim_lname, vm.room_num 
                      FROM VOLUNTEER vr 
                      JOIN REQUESTS r ON r.service_type = vr.service_type 
                      JOIN VICTIM vm ON vm.victim_id = r.victim_id 
                      WHERE vr.volunteer_id = ? AND r.shelter_id = vr.shelter_id`;
      db.query(query, [volunteer_id], (err, results) => {
        if (err) {
          console.error("Failed to load requests:", err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  completeRequest: (service_type, shelter_id, victim_id) => {
    return new Promise((resolve, reject) => {
      // Step 1: Reduce resources
      const updateQuery = `
        UPDATE RESOURCES r
        JOIN REQUIRES rq ON r.resource_id = rq.resource_id
        SET r.resource_quantity = r.resource_quantity - rq.quantity
        WHERE rq.service_type = ? AND r.shelter_id = ?;
      `;

      db.query(updateQuery, [service_type, shelter_id], (err) => {
        if (err) {
          console.error("Error updating resources:", err);
          return reject(err);
        }

        // Step 2: Delete the request
        const deleteQuery = `
          DELETE FROM REQUESTS
          WHERE service_type = ? AND shelter_id = ? AND victim_id = ?;
        `;
        console.log("Attempting to delete request:", service_type, shelter_id, victim_id);
        db.query(deleteQuery, [service_type, shelter_id, victim_id], (err) => {
          if (err) {
            console.error("Error deleting request:", err);
            return reject(err);
          }

          resolve({ message: "Request completed and resources updated." });
        });
      });
    });
  },
  
};

module.exports = volunteerQueries;
