import express from "express";
import cors from "cors";
import mysql from "mysql2";

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: 3306,
});

const app = express();
app.use(express.json());
app.use(cors());

const port = 3000;

app.get("/", (req, res) => {
  res.json({ result: "SUCCESS" });
});

app.get("/user", (req, res) => {
  db.query("select * from user", (err, rows) => {
    if (err) {
      console.error(err);
      return res.json({ result: "error" });
    }

    res.json(rows);
  });
});

app.get("/user/:id", (req, res) => {
  db.query("select * from user where id = ?", req.params.id, (err, rows) => {
    if (err) {
      console.error(err);
      return res.json({ result: "error" });
    }

    res.json(rows);
  });
});

app.post("/user", (req, res) => {
  db.query(
    "insert into user(name,password) value(?,?)",
    [req.body.name, req.body.password],
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.json({ result: "error" });
      }

      res.json(rows);
    }
  );
});

app.patch("/user/:id", (req, res) => {
  db.query(
    "update user set name = ?, password = ? where id = ?",
    [req.body.name, req.body.password, req.params.id],
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.json({ result: "error" });
      }

      res.json(rows);
    }
  );
});

app.delete("/user/:id", (req, res) => {
  db.query("delete from user where id = ?", req.params.id, (err, rows) => {
    if (err) {
      console.error(err);
      return res.json({ result: "error" });
    }

    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Listening On port ${port}`);
});
