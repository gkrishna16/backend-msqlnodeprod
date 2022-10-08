const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "cwe1u6tjijexv3r6.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "q93bj2qa1d5cv328",
  password: "knt1x0a35hff7w6k",
  database: "hgiku9ly4ct0g3ga",
  multipleStatements: true,
});

db.connect(function (err) {
  if (err) {
    console.log(err);
  } else console.log("Database Connected");
});

// console.log(db.query());

module.exports = { db };
