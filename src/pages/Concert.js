import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import Post from "../components/Feed/posts"
import CreatePost from "../components/Feed/createPost"
import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/Container";

export default function Concert({user}){
  const [concert, setConcert] = useState({})
  const [posts,setPosts] = useState([])
  const params = useParams()
  const [activeUser, setActiveUser] = useState(user)
  const [following, setFollowing] = useState(false)
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${params}&apikey=6ySHlQzwLMmMdG7Oxr53PU74DFG98d18`  

    useEffect(()=>{
        fetch(`http://localhost:3001/api/posts/concert/${params.concertId}/all`)
        .then((res) => res.json())
        .then((res) => setPosts(res))
    },[])
 
    useEffect(()=>{
        getConcert()
    },[])


    const clickHandle = async (e) => {
      e.preventDefault();
      console.log('hello')
      const newFollow = {
        userId: activeUser._id,
      };
      
        try {
          const res = await fetch(
            `http://localhost:3001/api/users/concert/${params.concertId}/follow`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newFollow),
            }
          );
          activeUser.concertFollowing.push(params)
          console.log(res);
        } catch (error) {
          console.log(error);
        }
      
    }



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
              <Card className="bg-dark text-white">
      <Card.Img src={concert._embedded?.events[0].images[6].url || null} alt="Card image" className="img-fluid" style={{height:"30rem"}}/>
      <Card.ImgOverlay>
        <Card.Title className='display-2'>  {concert._embedded?.events[0].name || null} </Card.Title>
        <Card.Subtitle className='display-5'> 
        {concert._embedded?.events[0].dates.start.localDate} <br/>
        {concert._embedded?.events[0]._embedded.venues[0].name} 
        </Card.Subtitle>
        <Card.Subtitle className='display-6'>
        {concert._embedded?.events[0]._embedded?.venues[0].city.name},
          {concert._embedded?.events[0]._embedded?.venues[0].state?.stateCode || concert._embedded?.events[0]._embedded?.venues[0].country?.countryCode}
        </Card.Subtitle>
        <Button onClick={clickHandle} variant="outline-primary">Follow</Button>{' '}
      </Card.ImgOverlay>
    </Card>
        <br/>
    <Container className="d-flex justify-content-center">
      {<CreatePost user={user}/>}
      <br></br>
      </Container>
      <Container className="d-flex flex-column align-items-center justify-content-center">

      {posts.slice(0).reverse().map((p) => (
          <Post key={p._id} post={p} currentUser={user}/>
          
          ))}
          </Container>
        </div>
    )
}