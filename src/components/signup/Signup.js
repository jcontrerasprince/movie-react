import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { useHistory } from "react-router-dom";

import "./style.css";
import Modal from '../../Modal';

function Signup(props) {
  const [loading, setLoading] = useState(false);
  const NID = useFormInput('');
  const phoneNumber = useFormInput('');
  const email = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const [active, setActive] = useState(false);
  const history = useHistory();

  const toggle = () => {
    setActive(!active);
  }

  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post('http://localhost:4000/signup', { NID: NID.value, phoneNumber: phoneNumber.value, email: email.value, password: password.value })
      .then(response => {
        setLoading(false);
        // toggle();
        alert('Congrats! Your have registered successfully');
        history.push('/login');
      }).catch(error => {
        setLoading(false);
        if (error.response.status === 401 || error.response.status === 400 || error.response.status === 500) setError(error.response.data.err.message);
        else setError("Something went wrong. Please try again later.");
      });
  }

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <Form>
            <Form.Row>
                <Form.Group className="col-6" {...NID} controlId="formGridNID">
                  <Form.Label>NID:</Form.Label>
                  <Form.Control type="number" placeholder="Enter NID number" />
                </Form.Group>

                <Form.Group className="col-6" {...phoneNumber} controlId="formGridPhoneNumber">
                  <Form.Label>Phone Number:</Form.Label>
                  <Form.Control type="number" placeholder="Enter phone number" />
                </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group className="col-6" {...email} controlId="formGrinEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" placeholder="Enter email"></Form.Control>
              </Form.Group>
              <Form.Group className="col-6" {...password} controlId="formGrinPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" placeholder="Enter password"></Form.Control>
              </Form.Group>
            </Form.Row>
            <Button value={loading ? 'Loading...' : 'Sign Up'} onClick={handleLogin} disabled={loading}>Sign Up</Button>
            <Form.Text>{error && <><small style={{ color: 'red' }}>{error}</small><br /></>}</Form.Text>
          </Form>
        </div>
      </div>
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
 
  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Signup;