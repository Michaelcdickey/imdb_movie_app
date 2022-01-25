import React, { useState } from "react";
import axios from 'axios';
import notFound from './not_found.png';
import { useLocation } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

function Random() {

// State variables
const [movie, setMovie] = useState({});
const [movies] = useState(useLocation().state.movies);
const [poster, setPoster] = useState("");
const [isLoading, setLoading] = useState(false);
const [apiKey] = useState(useLocation().state.apiKey);

  // Gets a random movie from the prop list and sets the states
  function getRandomMovie() {
    setLoading(true);

    // Randomly select a movie
    let randomMovie = movies.at(Math.floor(Math.random() * movies.length - 1))
    setMovie(randomMovie);

    // Call the imdb poster API using the movie's id
    axios.get('https://imdb-api.com/en/API/Posters/' + apiKey + '/' + randomMovie.id)
    .then(response => {
      // If the API Key fails mid use or the movie lacks a poster, set the image to not found
      if (response.data.posters[0] === undefined) {
        setPoster(notFound);
      } else {
        // Otherwise set it as normal
        setPoster(response.data.posters[0].link);
      }
      setLoading(false);
    })
    .catch(error => {
      console.error('There was an error retrieving the movie poster', error);
    });
  }

  // Call on load to get a random movie
  if (Object.keys(movie).length === 0) {
    getRandomMovie();
  }

  return (
    <div className="random">
      <div className="container" style={{paddingBottom: "50px"}}>
        <div className="row align-items-center my-2">
          <div className="col-lg-7">
            {
              isLoading ? <div>Loading...</div>
              :
                <img
                    className="img-fluid rounded mb-4 mb-lg-0"
                    src={poster}
                    alt=""
                />
            }
          </div>
          <div className="col-lg-5">
            <h1 className="font-weight-light">{movie.title}</h1>
            <p>
                Year Released: {movie.year}
            </p>
            <p>
                <Button variant="outline-dark" disabled={isLoading} onClick={getRandomMovie}>
                    New Random Movie
                </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Random;