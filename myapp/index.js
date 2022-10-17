const express = require("express");
const app = express();

//intializeDBAndServer & getting connection object

let path = require("path");
let db = null; //database connection object
let dbpath = path.join(__dirname, "goodreads.db");
let sqlite3 = require("sqlite3");

let intializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    });

    app.listen(3000, () => {
      console.log("Server starting on https://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
intializeDBAndServer();

//API-call for getting resource

app.get("/books/", async (request, response) => {
  let getbooksQuery = `
    SELECT
    *
    FROM 
    books
    ORDER BY 
    books_id;
    `;

  let booksArray = await db.all(getbooksQuery);
  response.send(booksArray);
});



