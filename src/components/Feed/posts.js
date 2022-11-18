import Card from "react-bootstrap/Card";
import { useState, useEffect, useRef } from "react";
import ReactTimeAgo from 'react-time-ago'
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"



export default function Post({post, currentUser}) {
     const [like, setLike] = useState(post.likes.length)
     const [isLiked, setIsLiked] = useState(false)
     const [postUser, setPostUser] = useState({})
     const [concert, setConcert] = useState({})
     const body = useRef();

   
     useEffect(() => {
      setIsLiked(post.likes.includes(currentUser._id));
    }, [currentUser._id, post.likes]);
  
    useEffect(()=>{
      getConcert()
  },[])
 
     useEffect(()=>{
         fetch(`api/users?userId=${post.userId}`)
         .then((res) => res.json())
         .then((res) => setPostUser(res))
     }, [])
 
     const submitHandler = async (e) => {
      e.preventDefault()
  const comment = {
   commentId: currentUser._id,
   commentBody: body.current.value,
  };
 
  try{
      const res = await fetch(`api/posts/${post._id}/comment`, {
          method: "PUT",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(comment)})
          console.log(res)
  }catch(error){
      console.log(error)
   
  }

  }
   

     const getConcert = async (e) => {
    
      try {
        const res = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events.json?id=${post.concertId}&apikey=6ySHlQzwLMmMdG7Oxr53PU74DFG98d18`
        );
       const data = await res.json();
     
        setConcert(data);
      } catch (error) {
        console.log(error);
      }
    };

 const likeHandler = async (e) => {
    e.preventDefault()
    const newLike = {
      userId :currentUser._id,
    };
try{
    const res = await fetch(`api/posts/${post._id}/like`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLike)})
        console.log(res)
}catch(error){
    console.log(error)
}
setLike(isLiked ? like - 1 : like + 1);
setIsLiked(!isLiked);
}
 
   return (
     <div>
       <>
         <Card style={{ width: "40rem" }}>
           <Card.Header style={{backgroundColor:"#dadffb"}}>
             <div id="author" className="d-flex justify-content-between">
                <Link to={`/profile/${postUser.username}`}>
               <div id="profilepic" className="d-flex">
                 <img
                   src= {postUser.profilePicture || "https://placeimg.com/640/480/people"}
                   alt="PP"
                   className="rounded-circle me-md-2"
                   style={{ width: "38px", height: " 38px", objectFit: "cover" }}
                   />
               <p className="text-muted fw-bold">{postUser.username}</p>
               </div>
                   </Link>
               <Link to={`/concert/${post.concertId}`}>
               <p className="text-muted fw-bold">{post.concertId ? concert._embedded?.events[0].name : null }</p>
                 </Link>
               <span class="text-muted fs-7"><ReactTimeAgo date={post.createdAt} locale="en-US"/></span>
             </div>
           </Card.Header>
           <Card.Body >
             <div>
               <p>
               {post?.body}
               </p>
               {/* <img
                 src={post.img}
                 alt="post"
                 class="img-fluid "
               /> */}
             </div>
           </Card.Body>
 
           <Card.Footer style={{backgroundColor:"#dadffb"}} className="likes">
             <div className="d-flex">Liked By {like}</div>
             <Form onSubmit={submitHandler} >
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                type="text"
                ref={body}
                as="textarea"
                rows={3}
                // placeholder={topic}
              />
            </Form.Group>
          <Button type="submit"  variant="primary">
            Comment
          </Button>{" "}
          </Form>
           {isLiked == false ? <Button className='d-flex'type="submit" onClick={likeHandler}> Like </Button> : <Button className='d-flex'type="submit" onClick={likeHandler}> Unlike </Button>}
           
           </Card.Footer>

           <Card.Footer className="accordion">
             <div id="author" className="d-flex justify-content-between">
               <div id="profilepic" className="d-flex">
                 <img
                   src="https://placeimg.com/640/480/animals"
                   alt="PP"
                   className="rounded-circle me-md-2"
                   style={{ width: "38px", height: " 38px", objectFit: "cover" }}
                 />
               </div>
               <p className="text-muted fw-bold">Cool Commenter</p>
               <span class="text-muted fs-7">xx/xx/xx</span>
             </div>
             <div>Comments coming soon!</div>
             <div class="pb-2 mb-4 text-danger border-bottom border-dark"></div>
           </Card.Footer>
         </Card>
           <br/>
     
       </>
     </div>
   );
 }
 