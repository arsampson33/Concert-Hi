
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import Post from "../components/Feed/posts"
import CreatePost from "../components/Feed/createPost"

export default function Concert({user}){
  const [concert, setConcert] = useState({})
  const [posts,setPosts] = useState([])
  const params = useParams()
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${params}&apikey=6ySHlQzwLMmMdG7Oxr53PU74DFG98d18`  

    useEffect(()=>{
        fetch(`http://localhost:3001/api/posts/concert/${params.concertId}/all`)
        .then((res) => res.json())
        .then((res) => setPosts(res))
    },[])
 
    useEffect(()=>{
        getConcert()
    },[])

    const getConcert = async (e) => {
    
        try {
          console.log(params)
          const res = await fetch(
            `https://app.ticketmaster.com/discovery/v2/events.json?id=${params.concertId}&apikey=6ySHlQzwLMmMdG7Oxr53PU74DFG98d18`
          );
       
          const data = await res.json();
       
          setConcert(data);
        } catch (error) {
          console.log(error);
        }
      };


    return(
        <div>
          <CreatePost user={user} />
            <h1>{concert._embedded?.events[0].name || null}</h1>
          { posts.slice(0).reverse().map((p) => (
            <Post key={p._id} post={p}/>
          ))} 
        </div>
    )
}