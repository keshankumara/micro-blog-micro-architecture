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
      api.delete(`/posts/${postIdToDelete}`).then(() => {
        setPosts(prevPosts => prevPosts.filter(post => post.id !== postIdToDelete));
        setPostIdToDelete(null);
      }).catch(err => {
        console.error("Error deleting post:", err);
        setPostIdToDelete(null);
      });
    }
  }, [postIdToDelete]);

  const handleSaveEdit = () => {
    api.put(`/posts/${postIdToEdit}`, { title: editTitle, content: editContent }).then(() => {
      setPosts(prevPosts => prevPosts.map(post => post.id === postIdToEdit ? { ...post, title: editTitle, content: editContent } : post));
      setPostIdToEdit(null);
    }).catch(err => {
      console.error("Error editing post:", err);
      setPostIdToEdit(null);
    });
  };

  return (
    <div>
      <h2>Posts</h2>

      {posts.map(post => (
        <div 
          key={post.id} 
          style={{ padding: 10, border: "1px solid #ddd", marginBottom: 10 }}
        >
          {postIdToEdit === post.id ? (
            <div>
              <input type="text" placeholder="Title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
              <textarea placeholder="Content" value={editContent} onChange={(e) => setEditContent(e.target.value)}></textarea>
              <button onClick={handleSaveEdit}>Save</button>
              <button onClick={() => setPostIdToEdit(null)}>Cancel</button>
            </div>
          ) : (
            <>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <button onClick={() => setPostIdToDelete(post.id)}>Delete</button>
              <button onClick={() => { setPostIdToEdit(post.id); setEditTitle(post.title); setEditContent(post.content); }}>Edit</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
