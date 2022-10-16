//intializeDBAndServer

let express = require("express");
let app = express();

let path = require("path");
let sqlite3 = require("sqlite3");
let dbpath = path.join(__dirname, "goodreads.db");
let db = null;

const intializeDBAndServer = async ()=>{
    db = await open({
        filename: dbpath;
        driver: sqlite3.Database;
    });
    app.listen(3000,()=>{
        console.log("Server Running at http://localhost:3000/");
    });
}

// API-call  (getmethod)
app.get("/books/",  async (request, response)=>{
    let getBooksQuery = `SELECT * FROM book ORDER BY book_id;`;
    let booksArray = await db.all(getBooksQuery)
    response.send(booksArray);
});



