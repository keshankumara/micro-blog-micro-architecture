import { useState } from "react";
import api from "../api/apiClient";

export default function CreatePost({ onCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function submit() {
    await api.post("/posts", { title, content });
    setTitle("");
    setContent("");
    onCreated();
  }

  return (
    <div>
      <h2>Create Post</h2>

      <input 
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <textarea
        placeholder="Content"
        rows={4}
        value={content}
        onChange={e => setContent(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <button onClick={submit}>Create</button>
    </div>
  );
}
