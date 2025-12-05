const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const DB = "./comments.json";

function load() {
  return JSON.parse(fs.readFileSync(DB));
}
function save(data) {
  fs.writeFileSync(DB, JSON.stringify(data, null, 2));
}

app.get("/comments", (req, res) => {
  const comments = load();
  const { postId } = req.query;

  if (postId) {
    return res.json(comments.filter(c => c.postId == postId));
  }

  res.json(comments);
});

app.post("/comments", (req, res) => {
  const comments = load();
  const newComment = { id: Date.now(), ...req.body };
  comments.push(newComment);
  save(comments);
  res.json(newComment);
});

app.listen(4003, () => console.log("Comments service running on 4003"));
