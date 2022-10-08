const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DB,
  multipleStatements: true,
});

db.connect(function (err) {
  if (err) {
    console.log(err);
  } else console.log("Database Connected");
});

// console.log(db.query());

module.exports = { db };
