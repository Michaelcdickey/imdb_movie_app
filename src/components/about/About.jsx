import React from "react";

/**
 * Page that gives more detailed information on the app itself
 * Informs the user of planned/future updates
 */
function About() {
  return (
    <div className="about">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-10">
            <h1 className="font-weight-light">About</h1>
            <p>
              This is a coding sample which uses the IMDB API to retrieve movie information.
            </p>
            <p>
              When first loading into the Home page, the API is called to retrieve a list of the top 100 most popular movies.
            </p>
            <p>
              Navigating to the Random page (or clicking the button) calls the API to retrieve a randomly selected movie's poster.
              Which is in higher quality than the one retrieved by the 'most popular movie' API call. Clicking on the movie's title 
              opens a modal dialog with that movie's trailer.
            </p>
            <p>
              Planned features include: Displaying the top 100 movies in a table on the 'Popular Movies' page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;