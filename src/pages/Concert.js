
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
export default function Concert(){
    const [concert, setConcert] = useState({})
    const params = useParams()
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${params.id}&apikey=6ySHlQzwLMmMdG7Oxr53PU74DFG98d18`
 
    useEffect(()=>{
        getConcert()
    },[])

    const getConcert = async (e) => {
    
        try {
          const res = await fetch(
            `https://app.ticketmaster.com/discovery/v2/events.json?id=${params.id}&apikey=6ySHlQzwLMmMdG7Oxr53PU74DFG98d18`
          );
          console.log(res);
          const data = await res.json();
          console.log(data);
          setConcert(data);
        } catch (error) {
          console.log(error);
        }
      };


    return(
        <div>
            <h1>{concert._embedded.events[0].name}</h1>
        </div>
    )
}