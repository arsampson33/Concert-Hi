import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import Post from "./posts";
import CreatePost from "./createPost";
import Container from "react-bootstrap/Container";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

export default function Feed({ user, setUser }) {
    const [posts,setPosts] = useState([])
    const [concertFeed, setConcertFeed] = useState([])
    const [postCheck, setPostCheck] = useState(false)
      if(posts.length++){
        console.log('Yay new ppsot')
      }
    useEffect(()=>{
        fetch(`http://localhost:3001/api/posts/timeline/${user._id}`)
        .then((res) => res.json())
        .then((res) => setPosts(res))
    },[])

    useEffect(()=>{
        fetch(`http://localhost:3001/api/posts/concert/following/${user._id}/all`)
        .then((res) => res.json())
        .then((res) => setConcertFeed(res))
    },[])

  return (
    <div id="background">
      <h1 className="display-6">Feed</h1>
      <Container id='idk' className="d-flex justify-content-center">
      {<CreatePost user={user}/>}
      </Container>
      <br/>
      <Tabs
        defaultActiveKey="posts"
        id="uncontrolled-tab-example"
        className=" tab mb-3"
        fill
      >
        <Tab eventKey="posts" title="Posts">
          <h1 className=" my-4 display-6">Posts</h1>
          <Container className="d-flex flex-column align-items-center">
            {posts
              .slice(0)
              .reverse()
              .map((p) => (
                <Post key={p._id} post={p} currentUser={user} />
              ))}
          </Container>
        </Tab>
        <Tab eventKey="upcoming" title="Concerts You Follow">
        <h1 className=" my-4 display-6">Posts</h1>
          <Container className="d-flex flex-column align-items-center">
            {concertFeed
              .slice(0)
              .reverse()
              .map((p) => (
                <Post key={p._id} post={p} currentUser={user} />
              ))}
          </Container>
        </Tab>

      </Tabs>
    </div>
  );
}
