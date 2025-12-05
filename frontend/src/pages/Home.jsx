import { useState } from "react";
import PostList from "../components/PostList";
import CreatePost from "../components/CreatePost";

export default function Home() {
  const [reload, setReload] = useState(false);

  return (
    <div>
      <CreatePost onCreated={() => setReload(!reload)} />
      <PostList key={reload} />
    </div>
  );
}
