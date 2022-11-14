import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import ReactTimeAgo from 'react-time-ago'
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button"



export default function Post({post, currentUser}) {
     const [like, setLike] = useState(post.likes.length)
     const [isLiked, setIsLiked] = useState(false)
     const [postUser, setPostUser] = useState({})
   
     useEffect(() => {
      setIsLiked(post.likes.includes(currentUser._id));
    }, [currentUser._id, post.likes]);
  
 
     useEffect(()=>{
         fetch(`http://localhost:3001/api/users?userId=${post.userId}`)
         .then((res) => res.json())
         .then((res) => setPostUser(res))
     }, [])
 
 
 const likeHandler = async (e) => {
    e.preventDefault()
    const newLike = {
      userId :currentUser._id,
    };
try{
    const res = await fetch(`http://localhost:3001/api/posts/${post._id}/like`, {
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
           <Card.Header>
                <Link to={`/profile/${postUser.username}`}>
             <div id="author" className="d-flex justify-content-between">
               <div id="profilepic" className="d-flex">
                 <img
                   src= {postUser.profilePicture || "https://placeimg.com/640/480/people"}
                   alt="PP"
                   className="rounded-circle me-md-2"
                   style={{ width: "38px", height: " 38px", objectFit: "cover" }}
                 />
               </div>
               <p className="text-muted fw-bold">{postUser.username}</p>
               <span class="text-muted fs-7"><ReactTimeAgo date={post.createdAt} locale="en-US"/></span>
             </div>
               </Link>
           </Card.Header>
           <Card.Body>
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
 
           <Card.Footer className="likes">
             <div className="d-flex">Liked By {like}</div>
             <Button type="submit" onClick={likeHandler}> Like </Button>
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
               <p className="text-muted fw-bold">Austin</p>
               <span class="text-muted fs-7">November 17, 2023</span>
             </div>
             <div>This is my comment</div>
             <div class="pb-2 mb-4 text-danger border-bottom border-dark"></div>
           </Card.Footer>
         </Card>
           <br/>
     
       </>
     </div>
   );
 }
 