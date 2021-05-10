const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "grocerybud",
});

app.post("/create", (req, res)=>{
  const name = req.body.name;
  const id = req.body.id;

  db.query('INSERT INTO Grocery (name) VALUES (?)',
  [name],
  (err, result) =>{
    if(err){
      console.log(err)
    } else {
      res.send('value inserted')
    }
  });
});

app.get("/grocery", (req, res)=>{
  db.query('SELECT * FROM Grocery', (err, result) =>{
    if(err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;

  db.query('UPDATE Grocery SET name = ? WHERE id = ?', [name, id],
    (err, result) => {
      if(err){
        console.log(err);
      } else {
        res.send(result);
      }
    })
})

app.delete("/delete", (req, res) =>{

  db.query('TRUNCATE TABLE Grocery', (err, result)=>{
    if(err){
      console.log(err);
    } else {
      res.send(result);
    }
  })
})

app.delete("/delete/:id", (req, res) =>{
  const id= req.params.id;

  db.query('DELETE FROM Grocery WHERE id= ?', id, (err, result)=>{
    if(err){
      console.log(err);
    } else {
      res.send(result);
    }
  })
})

app.listen(3001, ()=>{
  console.log("Yes! Your server is running on port 3001")
});
