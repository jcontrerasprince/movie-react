import React, { useState, useEffect  } from 'react';
import axios from "axios";
import { Col, Row, Container, Modal as ModalBootstrap, Button } from 'react-bootstrap';
import Modal from 'react-modal';
import { getUser, getUserId, getToken } from '../../utils/Common'
import { useHistory } from "react-router-dom";

Modal.setAppElement('#root');
const Movies = (props) => {

    const [movies, setMovies] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [ident, setIdent] = useState(null);
    const [user, setUser] = useState(getUser());
    const [userId, setUserId] = useState(getUserId());
    const history = useHistory();

    useEffect(() => {
        setUser(getUser());
        axios.get('http://localhost:4000/movie')
        .then(response => {
          setMovies(response.data.movies);
        }).catch(error => {
          if (error.response.status === 401 || error.response.status === 400 || error.response.status === 500) alert('Error1');
          else alert('Error2');
      });
    }, [])

    let body
    let buttons
    if (!user) {
        body = <p>You are not logged. Please log in and make the reservation</p>
        buttons = <div><Button onClick={() => setModalIsOpen(false)}>Close</Button></div>
    } else {
        body = <p>{user}, Are you sure you want to make a reservation for movie Id {ident}?</p>
        buttons = <div>
            <Button onClick={() => setModalIsOpen(false)}>Close</Button>
            <Button onClick={() => makeReservation(ident, userId)}>Confirm</Button>
        </div>
    }


    const makeReservation = (movieId, userId) => {
        var token = getToken();
        axios.post('http://localhost:4000/ticket', { 'movieId': movieId, 'userId': userId, 'time': '12:30' }, { headers: {'token': token } })
        .then(response => {
          alert('Ticket saved');
          history.push('/');
        }).catch(error => {
          if (error.response.status === 401 || error.response.status === 400 || error.response.status === 500) alert(error);
          else alert('Error2');
      });
    }

	return (
		<Container>
			{movies.map((movie, index) => (
                <Row style={{height: '200px'}} key={movie.ident}>
                    <Col lg="4">
                        <img src={`data:image/png;base64,${movie.picture}`} className="img-fluid" style={{height: 'auto'}} />
                    </Col>
                    <Col lg="8">
                        <Row>
                            <Col className="text-center">
                                <h1>{movie.title}</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-center">
                                <p>{movie.desc}</p>
                            </Col>
                        </Row>
                        <Row className="align-self-end">
                            <Col className="text-right align-self-end">
                                <p>Duration: {movie.duration}, Genre: {movie.genre} <Button onClick={() => {
                                    setModalIsOpen(true)
                                    setIdent(movie.ident)
                                }}>Reserve</Button></p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
			))}
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <h2>Confirmation Modal</h2>
                {body}
                <div>
                    {buttons}
                </div>
            </Modal>
		</Container>
	);
};

export default Movies;