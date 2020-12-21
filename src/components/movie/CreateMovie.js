import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import { useHistory } from "react-router-dom";

function CreateMovie(props) {
  const [loading, setLoading] = useState(false);
  const title = useFormInput('');
  const picture = useFormInput(null);
  const desc = useFormInput('');
  const duration = useFormInput('');
  const genre = useFormInput('');
  const time = useFormInput('');
  const [error, setError] = useState(null);
  const [active, setActive] = useState(false);
  const history = useHistory();
  const [file, setFile] = useState(null)

  const toggle = () => {
    setActive(!active);
  }

  const handleLogin = () => {
    const fd = new FormData();
    console.log(file);
    fd.append('picture', file, file.name);
    fd.append('title', title.value)
    fd.append('desc', desc.value)
    fd.append('duration', duration.value)
    fd.append('genre', genre.value)
    fd.append('time', time.value)
    console.log(fd);
    setError(null);
    setLoading(true);
    fetch('http://localhost:4000/movie', {method: 'POST', body: fd})
        .then(response => {
            setLoading(false);
            // toggle();
            alert('Congrats! Your have entered a new movie');
            // history.push('/login');
        }).catch(error => {
            setLoading(false);
            console.log('El error es', error.response.data);
            if (error.response.status === 401 || error.response.status === 400 || error.response.status === 500) setError(error.response.data);
            else setError("Something went wrong. Please try again later.");
        });
  }

  const fileSelectHandler = (event) => {
    const files = event.target.files[0];
    setFile(files);
    console.log(file);
  }

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <Form id="myForm">
            <Form.Row>
                <Form.Group className="col-6" {...title} controlId="formGridTitle">
                  <Form.Label>Title:</Form.Label>
                  <Form.Control type="text" placeholder="Enter title of movie" />
                </Form.Group>

                <Form.Group className="col-6" {...picture} controlId="formGridPicture">
                  <Form.Label>Picture:</Form.Label>
                  <Form.File label="Example file input" onChange={fileSelectHandler}/>
                </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group className="col-6" {...desc} controlId="formGridDesc">
                <Form.Label>Description:</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter description"></Form.Control>
              </Form.Group>
              <Form.Group className="col-6" {...duration} controlId="formGridDuration">
                <Form.Label>Duration:</Form.Label>
                <Form.Control type="time" min="2" placeholder="Enter duration"></Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group className="col-6" {...genre} controlId="formGridGenre">
                <Form.Label>Genre:</Form.Label>
                <Form.Control type="text" placeholder="Enter genre"></Form.Control>
              </Form.Group>
              <Form.Group className="col-6" {...time} controlId="formGridTime">
                <Form.Label>Time:</Form.Label>
                <Form.Control type="time" min="2" placeholder="Enter time"></Form.Control>
              </Form.Group>
            </Form.Row>
            <Button value={loading ? 'Loading...' : 'Create'} onClick={handleLogin} disabled={loading}>Create</Button>
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

export default CreateMovie;