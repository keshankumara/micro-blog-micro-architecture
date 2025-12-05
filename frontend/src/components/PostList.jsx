import { useEffect, useState } from "react";
import api from "../api/apiClient";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [postIdToDelete, setPostIdToDelete] = useState(null);

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


  return (
    <div>
      <h2>Posts</h2>

      {posts.map(post => (
        <div 
          key={post.id} 
          style={{ padding: 10, border: "1px solid #ddd", marginBottom: 10 }}
        >
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <button onClick={() => setPostIdToDelete(post.id)}>Delete</button>
         
        </div>
      ))}
    </div>
  );
}
