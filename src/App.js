import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from "axios";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import Movies from './components/movie/Movies';
import CreateMovie from './components/movie/CreateMovie';
import Navbar from './Navbar';
import Modal from './Modal';
import { getUser } from './utils/Common'

class App extends React.Component {
  //const [active, setActive] = useState(false);
  constructor(props){
    super(props);

    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    const loggedInUser = getUser("user");
    axios.get('http://localhost:4000/movie')
    .then(response => {
      this.setState({ movies: response.data.movies })
    }).catch(error => {
      if (error.response.status === 401 || error.response.status === 400 || error.response.status === 500) alert('Error1');
      else alert('Error2');
  });
  };

  render() {
    const { movies } = this.state;

    return (
      <Router>
        <Navbar />
        <Route exact path="/" >
        <div className='container-fluid movie-app'>
          <div className='row justify-content-center'>
            <div className='col-10'>
              <div className="row">
                {movies.map(movie =>
                  <div className="card-view" key={movie.ident}>
                    <div className="card-header">
                    <img src={`data:image/png;base64,${movie.picture}`} width={200} />
                    </div>
                    <div className="card-body">
                      <h3>{movie.title}</h3>
                    </div>
                  </div>
                  )}
                </div>
            </div>
          </div>
        </div>
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup" component={Signup}>
          <Signup />
        </Route>
        <Route exact path="/movies">
          <Movies />
        </Route>
        <Route exact path="/create-movie">
          <CreateMovie />
        </Route>
      </Router>
    )
  }
}

export default App;
