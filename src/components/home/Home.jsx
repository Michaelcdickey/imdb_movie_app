import React, { useState } from "react";
import logo from './appLogo.png';
import { Link } from "react-router-dom";
import axios from 'axios';

function Home() {

  // State variables
  const [isLoading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [apiKey] = useState("k_ll9q08sj")

  // Displays loading text while loading and if movies aren't found displays a not found notice
  function loadDisplay() {
    if (isLoading) {
      return <div>Loading...</div>;
    } else if (movies.length === 0) {
      return <div>No movies found. Try another API Key...</div>;
    }
  }

  // Display loading screen while movies are retrieved
  if (isLoading && movies.length === 0) {
    // Get the popular movies
    axios.get('https://imdb-api.com/en/API/MostPopularMovies/' + apiKey)
    .then(response => {
      setMovies(response.data.items);
      setLoading(false);
    })
    .catch(error => {
      console.error('There was an error retrieving the list of popular movies', error);
    });
  }

  return (
    <div className="home">
      <div className="container">
        <div className="row align-items-center my-5" style={{paddingTop: "50px"}}>
          <div className="col-lg-7">
            <img
              className="img-fluid rounded mb-4 mb-lg-0"
              src={logo}
              alt=""
            />
          </div>
          <div className="col-lg-5">
            <h1 className="font-weight-light">Welcome</h1>
            {
              isLoading || movies.length === 0 ? loadDisplay()
              :
              <div>
                <p>
                  Select <Link to={'/random'} state={{movies: movies, apiKey: apiKey}}><strong>Random </strong></Link>
                  to display a movie at random from IMDB's list of most popular movies.
                </p>
                <p>
                  Select <Link to="/popular-movies"><strong>Popular Movies </strong></Link> 
                  to view the list of IMDB's most popular movies.
                </p>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;