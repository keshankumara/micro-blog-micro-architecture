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
    <div className="w-full flex justify-center items-center mt-10">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-xl p-6 flex flex-col gap-5">

        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
          ✏️ Create a New Post
        </h2>

        {/* Title Input */}
        <input
          className="border border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition"
          placeholder="Enter a title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Content Input */}
        <textarea
          className="border border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition resize-none"
          placeholder="Write your content..."
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* Submit Button */}
        <button
          onClick={submit}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Create Post
        </button>

      </div>
    </div>
  );
}
