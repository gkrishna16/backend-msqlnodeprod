const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DATABASE_PASSWORD,
  database: "blog",
  multipleStatements: true,
});

db.connect(function (err) {
  if (err) {
    console.log(err);
  } else console.log("Database Connected");
});

// console.log(db.query());

module.exports = { db };
