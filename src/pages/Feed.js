import { useState } from "react";
import { Link } from "react-router-dom";

export default function Feed() {
  const [concert, setConcert] = useState("");
  const [query, setQuery] = useState("");
  const apikey = "B0caVQ3KB1wgCAvh69HXgnAPB2BzoSqw";

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const getEvent = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${query}&apikey=6ySHlQzwLMmMdG7Oxr53PU74DFG98d18`
      );
      console.log(res);
      const data = await res.json();
      console.log(data);
      setConcert(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Feed</h1>
      <label>Search</label>
      <form onSubmit={getEvent}>
        <input type="text" name="query" value={query} onChange={handleChange} />
        <input type="submit" name="submit" />
      </form>
      <ul>
        {concert
          ? concert._embedded.events.map((concert) => {
              return (
                <li key={concert.id}>
                    <Link>
                  {concert.name}
                  &nbsp; | &nbsp;
                  {concert._embedded.venues[0].name}
                  &nbsp; | &nbsp;
                  {concert._embedded.venues[0].city.name},
                  {concert._embedded.venues[0].state.stateCode}
                  &nbsp; | &nbsp;
                  {concert.dates.start.localDate}
                    </Link>
                </li>
              );
            })
          : null}
      </ul>
      {/* <h1>{concert ? concert._embedded.events[5].name : null}</h1>
            <h1>{concert ? concert._embedded.events[5]._embedded.venues[0].name : null}</h1>
            <h1>{concert ? concert._embedded.events[5]._embedded.venues[0].city.name : null}, {concert ? concert._embedded.events[5]._embedded.venues[0].state.stateCode : null}</h1>
            <h1>{concert ? concert._embedded.events[5].dates.start.localDate : null}</h1> */}
    </div>
  );
}
