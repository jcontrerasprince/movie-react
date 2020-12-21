import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { setUserSession } from '../../utils/Common';
import { useHistory } from "react-router-dom";

import "./style.css";

function Login(props) {
  const [loading, setLoading] = useState(false);
  const NID = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleLogin = () => {
    setError(null);
    setLoading(true);
    if (NID.value.length > 0 && password.value.length > 0) {
      axios.post('http://localhost:4000/login', { NID: NID.value, password: password.value })
        .then(response => {
          setLoading(false);
          setUserSession(response.data.token, response.data.user);
          history.push('/');
        }).catch(error => {
          console.log(error.response.data.err.message);
          setLoading(false);
          if (error.response.status === 401 || error.response.status === 400 || error.response.status === 500) setError(error.response.data.err.message);
          else setError("Something went wrong. Please try again later.");
      });
    } else {
      setLoading(false);
      setError("NID or password cannot be empty.");
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-lg-4 ">
        <Form>
          <Form.Group>
            <Form.Label>NID:</Form.Label>
            <Form.Control type="number" {...NID} placeholder="Enter NID" />
            <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" {...password} placeholder="Password" />
          </Form.Group>
          <Button value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading}>Login</Button>
          <Form.Text>{error && <><small style={{ color: 'red' }}>{error}</small><br /></>}</Form.Text>
        </Form>
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

export default Login;