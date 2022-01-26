import React, { useState } from "react";
import axios from 'axios';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button'
import notFound from './not_found.png';

/**
 * The modal which the trailer is displayed on when a movie's title is clicked
 * @param {*} props Information important to the running of the modal
 */
function TrailerModal(props) {

    // State variables
    const [trailer, setTrailer] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [apiKey] = useState(props.apiKey);
    const [movie, setMovie] = useState({});

    // Either loads the trailer display or the Not Found image
    function loadDisplay() {
        if (!trailer.includes("not_found")) {
            return <iframe
                    width="750"
                    height="380"
                    src={`https://www.youtube.com/embed/${trailer}`}
                    frameBorder="0"
                    allowFullScreen
                    title="Embedded youtube"/>;
        } else {
            return <img
                    className="img-fluid rounded mb-4 mb-lg-0"
                    src={trailer}
                    alt=""
                    style={{height: "600px", width: "400px"}}/>;
        }
    }

    // Gets a movie trailer from the API and sets the states
    function getMovieTrailer() {
        setMovie(props.movie);
        setTrailer("Loading...");
        setLoading(true);

        // Call the imdb trailer API using the movie's id
        axios.get('https://imdb-api.com/en/API/YouTubeTrailer/' + apiKey + '/' + props.movie.id)
        .then(response => {
            // If the API Key fails mid use or the movie lacks a trailer, set Trailer to not found
            if (response.data.videoUrl === undefined) {
                setTrailer(notFound);
            } else {
                // Otherwise set it as normal
                setTrailer(response.data.videoId);
            }
            setLoading(false);
        })
        .catch(error => {
            console.error('There was an error retrieving the movie poster', error);
        });
    }

    // Call on load or when new movie is selected to get the trailer
    if ((trailer == null && props.show) || (props.movie.id !== movie.id && props.show)) {
        getMovieTrailer();
    }
    
    return (
        <Modal 
        show={props.show} 
        onHide={props.handleClose} 
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
            <Modal.Header>
                <Modal.Title>{movie.title} Trailer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                { 
                    isLoading ? <div>Loading...</div> : loadDisplay()
                    
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={props.handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default TrailerModal;