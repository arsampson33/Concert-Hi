import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Post from "../components/Feed/posts";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Profile({ user }) {
  const params = useParams();
  const [profile, setProfile] = useState([]);
  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState(false)



  const clickHandle = async (e) => {
    e.preventDefault();
    const newFollow = {
      userId: user._id,
    };
    if (!profile.followers.includes(user._id)) {
      // setFollowing(true)
      try {
        const res = await fetch(
          `http://localhost:3001/api/users/${profile._id}/follow`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newFollow),
          }
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        // setFollowing(false)
        const res = await fetch(
          `http://localhost:3001/api/users/${profile._id}/unfollow`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newFollow),
          }
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
    setFollowing(following ? profile.followers.length + 1 : profile.followers.length - 1)
  };

  useEffect(() => {
    fetch(`http://localhost:3001/api/users/?username=${params.username}`)
      .then((res) => res.json())
      .then((res) => setProfile(res));
  }, [following]);
  useEffect(() => {
    fetch(`http://localhost:3001/api/posts/user/${profile._id}/all`)
      .then((res) => res.json())
      .then((res) => setPosts(res));
  }, [profile]);
  useEffect(()=>{
    profile.followers?.includes(user._id) ?  setFollowing(true)
    : setFollowing(false)}, [profile.followers])
  return (
    <div>
      <br/>
      <Container className="d-flex justify-content-center">
        <Card
          id="profile"
          className="d-flex justify-content-center"
          style={{ width: "40rem" }}
        >
          <Row>
            <Col>
              <Card.Img
                className="rounded-circle fluid my-1 mx-3 me-md-2"
                variant="top"
                src="https://placeimg.com/640/480/people"
                style={{ objectFit: "cover" }}
              />
            </Col>
            <Col>
              <Card.Body>
                <Card.Title>{profile.username}</Card.Title>
                <Card.Subtitle>
                  {profile.city}, {profile.stateCode}
                </Card.Subtitle>
                <Card.Subtitle className="mt-1 mb-1">
                  Following: {profile.following?.length} &nbsp; Followers:{" "}
                  {profile.followers?.length}
                </Card.Subtitle>
                <Card.Text>{profile.bio}</Card.Text>
                {following == false ? <Button onClick={clickHandle} variant="outline-primary">
                  Follow
                </Button> :
                <Button onClick={clickHandle} variant="outline-primary">
                  Unfollow
                </Button>}
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Container>
<br/>
      <Tabs
        defaultActiveKey="posts"
        id="tabuncontrolled-tab-example"
        className="tab mb-3"
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
        <Tab eventKey="upcoming" title="My Music"></Tab>
      </Tabs>
    </div>
  );
}
