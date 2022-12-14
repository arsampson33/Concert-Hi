import { useState } from "react";
import { Link } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';

export default function FindConcert() {
  const [concert, setConcert] = useState("");
  const [query, setQuery] = useState("");


  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const getEvent = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${query}&apikey=6ySHlQzwLMmMdG7Oxr53PU74DFG98d18`
      );
      // console.log(res);
      const data = await res.json();
      // console.log(data);
      setConcert(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container fluid id="background">
   
      <h1>Find Concerts</h1>
      <label>Search</label>
      <form  id="background" onSubmit={getEvent}>
        <input type="text" name="query" value={query} onChange={handleChange} />
        <input type="submit" name="submit" />
      </form>
      <ListGroup id="background" variant="flush">
        {concert
          ? concert._embedded.events.map((concert) => {
              return (
                <ListGroup.Item id="background" action variant="light" key={concert.id}>
                    <Link to={`/concert/${concert.id}`}>
                  {concert.name}
                  &nbsp; | &nbsp;
                  {concert._embedded.venues[0].name}
                  &nbsp; | &nbsp;
                  {concert._embedded.venues[0].city.name},
                  {concert._embedded.venues[0].state?.stateCode || concert._embedded.venues[0].country?.countryCode}
                  &nbsp; | &nbsp;
                  {concert.dates.start.localDate}
                    </Link>
                </ListGroup.Item>
              );
            })
          : null}
      </ListGroup>

   
    </Container>
  );
}
