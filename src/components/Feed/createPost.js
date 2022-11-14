import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useRef } from "react";
import { useParams } from "react-router-dom";

export default function CreatePost({ user }) {
  const body = useRef();
  const params = useParams()

  const submitHandler = async (e) => {
        e.preventDefault()
    const newPost = {
      userId: user._id,
      body: body.current.value,
      concertId: params.concertId
    };
   
    try{
        const res = await fetch("http://localhost:3001/api/posts/", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPost)})
            console.log(res)
    }catch(error){
        console.log(error)
     
    }

    }
  return (
    <div>
      <h1>Hello</h1>
      <Card style={{backgroundColor:"#dadffb", width: "50rem" }}>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Create A Post</Form.Label>
              <Form.Control
                type="text"
                ref={body}
                as="textarea"
                rows={3}
                placeholder="What's on your mind?"
              />
            </Form.Group>
          <Button type="submit"  variant="primary">
            Share!
          </Button>{" "}
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
