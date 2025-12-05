import { useEffect, useState } from "react";
import api from "../api/apiClient";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const [postIdToEdit, setPostIdToEdit] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    api.get("/posts").then(res => setPosts(res.data));
  }, []);

  useEffect(() => {
    if (postIdToDelete) {
      api.delete(`/posts/${postIdToDelete}`)
        .then(() => {
          setPosts(prev => prev.filter(p => p.id !== postIdToDelete));
          setPostIdToDelete(null);
        })
        .catch(err => {
          console.error("Error deleting:", err);
          setPostIdToDelete(null);
        });
    }
  }, [postIdToDelete]);

  const handleSaveEdit = () => {
    api.put(`/posts/${postIdToEdit}`, {
      title: editTitle,
      content: editContent
    })
    .then(() => {
      setPosts(prev => prev.map(p =>
        p.id === postIdToEdit
          ? { ...p, title: editTitle, content: editContent }
          : p
      ));
      setPostIdToEdit(null);
    })
    .catch(err => {
      console.error("Error editing:", err);
      setPostIdToEdit(null);
    });
  };

  return (
    <div className="w-full flex flex-col items-center mt-12">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">📚 Posts</h2>

      <div className="w-full max-w-2xl flex flex-col gap-6">
        {posts.map(post => (
          <div
            key={post.id}
            className="bg-white shadow-lg rounded-xl p-6 border border-gray-100"
          >
            {/* EDIT MODE */}
            {postIdToEdit === post.id ? (
              <div className="flex flex-col gap-4">
                <input
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none"
                  type="text"
                  placeholder="Title"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />

                <textarea
                  className="border border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none resize-none"
                  rows={4}
                  placeholder="Content"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />

                <div className="flex gap-3">
                  <button
                    onClick={handleSaveEdit}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setPostIdToEdit(null)}
                    className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // VIEW MODE
              <>
                <h3 className="text-xl font-semibold text-gray-800">
                  {post.title}
                </h3>
                <p className="text-gray-600 mt-2 mb-4 whitespace-pre-wrap">
                  {post.content}
                </p>

                <div className="flex gap-4">
                  <button
                    onClick={() => setPostIdToDelete(post.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => {
                      setPostIdToEdit(post.id);
                      setEditTitle(post.title);
                      setEditContent(post.content);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
                  >
                    Edit
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
