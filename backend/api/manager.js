const db = require("../db");

const managerQueries = {
  getVolunteerList: (manager_id) => {
    return new Promise((resolve, reject) => {
      const query = `
            SELECT 
              v.volunteer_id,
              v.first_name,
              v.last_name,
              s.shift_day,
              s.shift_start_time,
              s.shift_end_time
            FROM VOLUNTEER v
            JOIN SHIFT s ON v.volunteer_id = s.volunteer_id
            WHERE v.shelter_id = (
              SELECT shelter_id FROM SHELTER WHERE manager_id = ?
            )
            ORDER BY v.last_name, s.shift_day;
          `;

      db.query(query, [manager_id], (err, results) => {
        if (err) {
          console.error("Failed to load volunteer shifts:", err);
          reject(err);
        } else {
          // Grouping logic
          const grouped = {};
          results.forEach((row) => {
            const id = row.volunteer_id;
            if (!grouped[id]) {
              grouped[id] = {
                volunteer_id: id,
                first_name: row.first_name,
                last_name: row.last_name,
                shifts: [],
              };
            }
            grouped[id].shifts.push({
              day: row.shift_day,
              start: row.shift_start_time,
              end: row.shift_end_time,
            });
          });

          // Convert grouped object to array
          const finalResult = Object.values(grouped);
          resolve(finalResult);
        }
      });
    });
  },

  getVictimList: (manager_id) => {
    return new Promise((resolve, reject) => {
      const query = `
            SELECT v.victim_id, v.victim_fname, v.victim_lname, v.room_num
            FROM VICTIM v
            JOIN SHELTER s ON v.shelter_id = s.shelter_id
            WHERE s.manager_id = ?
          `;
      db.query(query, [manager_id], (err, results) => {
        if (err) {
          console.error("Error fetching victims for manager:", err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  getAllRequests: (manager_id) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT r.service_type, r.victim_id, vm.victim_fname, vm.victim_lname, vm.room_num 
                        FROM REQUESTS r 
                        JOIN VICTIM vm ON vm.victim_id = r.victim_id 
                        JOIN SHELTER s ON s.shelter_id = r.shelter_id 
                        WHERE s.manager_id = ?;
                      `;
      db.query(query, [manager_id], (err, results) => {
        if (err) {
          console.error("Error fetching requests for manager:", err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  getAllResources: (manager_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT r.resource_name, r.resource_quantity 
      FROM RESOURCES r
      JOIN SHELTER sh ON sh.shelter_id = r.shelter_id
      WHERE sh.manager_id = ?;`,
        [manager_id],
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
};

module.exports = managerQueries;
