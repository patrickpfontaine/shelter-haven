const db = require("../db");

const loginQueries = {
  signin: (email, password) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT vr.volunteer_id as id, vr.first_name, vr.last_name,
            CASE 
                WHEN sh.manager_id IS NOT NULL 
                THEN 'manager' ELSE 'volunteer' 
            END AS role FROM VOLUNTEER vr 
            LEFT JOIN SHELTER sh ON sh.manager_id = vr.volunteer_id
            WHERE email = ? AND pass = ? 
            UNION 
            SELECT vm.victim_id as id, vm.victim_fname as first_name, vm.victim_lname as last_name,
            'victim' AS role FROM VICTIM vm 
            WHERE victim_email = ? AND victim_password = ?;`,
        [email, password, email, password],
        (err, results) => {
          if (err) {
            console.error("Login query error:", err);
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  },
};

module.exports = loginQueries;
