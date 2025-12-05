const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const DB = "./posts.json";

function load() {
  return JSON.parse(fs.readFileSync(DB));
}
function save(data) {
  fs.writeFileSync(DB, JSON.stringify(data, null, 2));
}

app.get("/posts", (req, res) => {
  res.json(load().reverse());
});

app.post("/posts", (req, res) => {
  const posts = load();
  const newPost = { id: Date.now(), ...req.body };
  posts.push(newPost);
  save(posts);
  res.json(newPost);
});

app.delete("/posts/:id", (req, res) => {
  let posts = load();
  posts = posts.filter(post => post.id !== Number(req.params.id));
  save(posts);
  res.json({ message: "Post deleted" });
});

app.put("/posts/:id", (req, res) => {
  let posts = load();
  posts = posts.map(post => {
    if (post.id === Number(req.params.id)) {
      return { ...post, ...req.body };
    }
    return post;
  });
  save(posts);
  res.json({ message: "Post updated" });
});

app.listen(4001, () => console.log("Posts service running on 4001"));
