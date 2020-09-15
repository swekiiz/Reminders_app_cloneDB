const express = require("express");
var data = require("./datatest.json");
const { check, validationResult } = require("express-validator");

const port = 3456;
const app = express();
const bodyParser = require("body-parser");

const editData = (reqdata) => {
  // console.log(data);
  for (let i = 0; i < data.length; i++) {
    if (data[i]["id"] == reqdata["id"]) {
      data[i] = reqdata;
    }
    console.log(data[i]);
  }
  // console.log(data);
  console.log('suscess');
};

app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/webhook", (req, res) => {
  console.log("fetch data");
  res.send(data);
});

app.post("/editdb", [check("id").exists()], (req, res) => {
  // console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: "reject id not exist",
    });
  }
  editData(req.body);
  res.status(201).json(req.body);
  console.log("edit DB");
});

app.post("/post_test", (req, res) => {
  console.log(req.body);
  res.status(201).json(req.body);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

//console.log(JSON.stringify(data, undefined, 2));
