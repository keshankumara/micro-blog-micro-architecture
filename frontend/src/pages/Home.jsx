import { useState } from "react";
import PostList from "../components/PostList";
import CreatePost from "../components/CreatePost";

export default function Home() {
  const [reload, setReload] = useState(false);

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h1>Microblog</h1>

      <CreatePost onCreated={() => setReload(!reload)} />

      <PostList key={reload} />
    </div>
  );
}
