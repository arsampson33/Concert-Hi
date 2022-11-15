// import Card from "react-bootstrap/Card";
// import { useState, useEffect, useRef } from "react";
// import Post from "./posts";
// import Container from "react-bootstrap/Container";
// import Tab from "react-bootstrap/Tab";
// import Tabs from "react-bootstrap/Tabs";
// import Form from "react-bootstrap/Form";

// export default function Feed({ user, setUser }) {
//     const [posts,setPosts] = useState([])
//     const [concertFeed, setConcertFeed] = useState([])
//     const body = useRef();
//     const params = useParams()
//     const [topic, setTopic] = useState('')

//     useEffect(()=>{
//         fetch(`http://localhost:3001/api/posts/timeline/${user._id}`)
//         .then((res) => res.json())
//         .then((res) => setPosts(res))
//     },[])

//     useEffect(()=>{
//         fetch(`http://localhost:3001/api/posts/concert/following/${user._id}/all`)
//         .then((res) => res.json())
//         .then((res) => setConcertFeed(res))
//     },[])

//     useEffect(()=>{
//       setTopic(topics[randomTopic])
//     },[])
    
//     const topics = [
//       'What concerts do you have planned?',
//       'What was the best concert you ever been too?',
//       "You're in charge of Cochella, who are your three headliners?",
//       'Which is better? General Admission or Concert Seating? ',
//       'Dream festival line up (dead or alive)',
//       'What was the last concert you attended?',
//       'Why do you love concerts?',
//       'Looking for or selling any tickets?',
//     ]
//    const randomTopic = Math.floor(Math.random() * topics.length)
   
//     const submitHandler = async (e) => {
//           e.preventDefault()
//       const newPost = {
//         userId: user._id,
//         body: body.current.value,
//         concertId: params.concertId
//       };
     
//       try{
//           const res = await fetch("http://localhost:3001/api/posts/", {
//               method: "POST",
//               headers: { 'Content-Type': 'application/json' },
//               body: JSON.stringify(newPost)})
//               console.log(res)
//       }catch(error){
//           console.log(error)
       
//       }
      
//       }
//   return (
//     <div>
//     <div id="background">
//       <h1 className="display-6">Hi, {user.username}! Let's talk concerts!</h1>
//       <Card style={{backgroundColor:"#dadffb", width: "50rem" }}>
//         <Card.Body>
//           <Form onSubmit={submitHandler}>
//             <Form.Group
//               className="mb-3"
//               controlId="exampleForm.ControlTextarea1"
//             >
//               <Form.Label>Whats on your mind or you can just answer one of the prompts!</Form.Label>
//               <Form.Control
//                 type="text"
//                 ref={body}
//                 as="textarea"
//                 rows={3}
//                 placeholder={topic}
//               />
//             </Form.Group>
//           <Button type="submit"  variant="primary">
//             Share!
//           </Button>{" "}
//           </Form>
//         </Card.Body>
//       </Card>
//       </div>

//       <br/>
    
//      <div id="background">
//       <h1 className="display-6">Hi, {user.username}! Let's talk concerts!</h1>
//       <Container id='idk' className="d-flex justify-content-center">
//       {<CreatePost user={user}/>}
//       </Container>
//       <br/>
//       <Tabs
//         defaultActiveKey="posts"
//         id="uncontrolled-tab-example"
//         className=" tab mb-3"
//         fill
//       >
//         <Tab eventKey="posts" title="Posts">
//           <h1 className=" my-4 display-6">Posts</h1>
//           <Container className="d-flex flex-column align-items-center">
//             {posts
//               // .slice(0)
//               // .reverse()
//               .map((p) => (
//                 <Post key={p._id} post={p} currentUser={user} />
//               ))}
//           </Container>
//         </Tab>
//         <Tab eventKey="upcoming" title="Concerts You Follow">
//         <h1 className=" my-4 display-6">Posts</h1>
//           <Container className="d-flex flex-column align-items-center">
//             {concertFeed
//               .slice(0)
//               .reverse()
//               .map((p) => (
//                 <Post key={p._id} post={p} currentUser={user} />
//               ))}
//           </Container>
//         </Tab>
//       </Tabs>
//     </div>
//     </div>
//   );
// }
