import mysql from "mysql";
import mysqlConfigs from "../../config/mysql";
import models from "../migrations/createTables";
// import { userInfo } from 'os';

const dbConfig = mysqlConfigs["dev"];
const { usersCreateModel, postsCreateModel } = models;
const con = mysql.createConnection(dbConfig);

// const postsCreateModel = `
//   CREATE TABLE IF NOT EXISTS posts (
//     id INT NOT NULL,
//     firstName CHAR(25),
//     lastName CHAR(25),
//     username VARCHAR(50) NOT NULL,
//     email VARCHAR(75) NOT NULL
//   )
// `;
con.connect(() => {
  console.log("db connection is on");
  con.query(usersCreateModel);
  con.query(postsCreateModel);
  // con.query(postsCreateModel);
});

const queryPromise = (sqlString, values) =>
  new Promise((resolve, reject) => {
    con.query(sqlString, values, (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });

export default { con, queryPromise };
