import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import Post from "./posts";
import CreatePost from "./createPost";

export default function Feed({ user, setUser }) {
    const [posts,setPosts] = useState([])

    useEffect(()=>{
        fetch(`http://localhost:3001/api/posts/timeline/${user._id}`)
        .then((res) => res.json())
        .then((res) => setPosts(res))
    },[])

  return (
    <div>
      <h1>Feed</h1>
      {<CreatePost user={user}/>}
      {posts.slice(0).reverse().map((p) => (
          <Post key={p._id} post={p} currentUser={user}/>
          
          ))}
    </div>
  );
}
