import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
  } from "react-router-dom";
import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'
import { getUser, removeUserSession } from './utils/Common'
import { withRouter } from 'react-router-dom';


class BootstrapNavbar extends React.Component{

    constructor(props){
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {isLoggedIn: false};
    }

    handleLoginClick() {
        this.setState({isLoggedIn: true});
    }
    
    handleLogoutClick() {
        removeUserSession();
        this.setState({isLoggedIn: false});
    }

    componentDidMount() {
        const loggedInUser = getUser("user");
        if (!loggedInUser) {
            this.setState({isLoggedIn: false});
        } else {
            this.setState({isLoggedIn: true});
        }
    };

    render(){
        const isLoggedIn = this.state.isLoggedIn;
        let button;
        if (isLoggedIn) {
            button = <Nav.Link onClick={this.handleLogoutClick}>Close Session</Nav.Link>
        } else {
            button = <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signup">Sign Up</Nav.Link></>;
        }
        return(
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <Router>
                            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                                <Navbar.Brand href="/">Movie App</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="ml-auto">
                                        <Nav.Link href="/">Admin</Nav.Link>
                                        <Nav.Link href="/">Home</Nav.Link>
                                        <Nav.Link href="/movies">Movies</Nav.Link>
                                        <div/>{button}
                                    </Nav>
                                </Navbar.Collapse>
                            </Navbar>
                            <br />
                        </Router>
                    </div>
                </div>
            </div>
        )  
    }
}

export default BootstrapNavbar;
