const db = require("../db");

const volunteerQueries = {
  shifts: (volunteer_id) => {
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
};

module.exports = volunteerQueries;
