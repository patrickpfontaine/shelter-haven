const db = require("../db");

const victimQueries = {
  getProfile: (victimId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT *
         FROM VICTIM
         WHERE victim_id = ?`,
        [victimId],
        (err, results) => {
          if (err) {
            console.error("Failed to load shifts:", err);
          reject(err);
          } else{
            resolve(results[0]);
          }
        }
      );
    });
  }
};

module.exports = victimQueries;