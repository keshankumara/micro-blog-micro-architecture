const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const DB = "./users.json";

function load() {
  return JSON.parse(fs.readFileSync(DB));
}
function save(data) {
  fs.writeFileSync(DB, JSON.stringify(data, null, 2));
}

app.get("/users", (req, res) => {
  res.json(load());
});

app.post("/users/register", (req, res) => {
  const users = load();
  const newUser = { id: Date.now(), ...req.body };
  users.push(newUser);
  save(users);
  res.json(newUser);
});

app.listen(4002, () => console.log("Users service running on 4002"));
