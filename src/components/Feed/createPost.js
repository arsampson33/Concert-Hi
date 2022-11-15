import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CreatePost({ user }) {
  const body = useRef();
  const params = useParams()
  const [topic, setTopic] = useState('')
  
  useEffect(()=>{
    setTopic(topics[randomTopic])
  },[])
  
  const topics = [
    'What concerts do you have planned?',
    'What was the best concert you ever been too?',
    "You're in charge of Cochella, who are your three headliners?",
    'Which is better? General Admission or Concert Seating? ',
    'Dream festival line up (dead or alive)',
    'What was the last concert you attended?',
    'Why do you love concerts?',
    'Looking for or selling any tickets?',
  ]
 const randomTopic = Math.floor(Math.random() * topics.length)
 
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
      <Card style={{backgroundColor:"#dadffb", width: "50rem" }}>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Whats on your mind or you can just answer one of the prompts!</Form.Label>
              <Form.Control
                type="text"
                ref={body}
                as="textarea"
                rows={3}
                placeholder={topic}
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
