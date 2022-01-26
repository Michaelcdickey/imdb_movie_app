import React from "react";

/**
 * Displays a warning that the app is not related to IMDB
 */
function Footer() {
  return (
    <div className="footer">
      <footer className="py-2 bg-dark fixed-bottom">
        <div className="container">
          <p className="m-0 text-center text-white">
            This app uses the IMDB API but is otherwise not owned by or affiliated with IMDB
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
