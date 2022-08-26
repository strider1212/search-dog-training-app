import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const initialState = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    tel: ''
  }

  const [formValues, setFormValue] = useState(initialState);

  const navigate = useNavigate();

  const postHandler = async () => {
    console.log('POST /users')
    await axios.post('http://localhost:3000/users', {
      username: 'testing 1, 2, 3...',
      password: 'secret',
      firstName: 'this',
      lastName: 'guy',
      email: 'asdf',
      phoneNumber: '111'
    })
    .then(res => console.log('check compass too!', res))
    .catch(error => {
      if (error.response) {
        console.log('error.response.data', error.response.data);
        console.log('error.response.status', error.response.status);
        console.log('error.response.headers', error.response.headers);
      } else if (error.request) {
        console.log('error.request', error.request);
      } else {
        console.log('error.message', error.message);
      }
      console.log('error.config', error.config);
    })
  }

  const blackText = {
    color: 'black'
  }
  
  return (
    <div>
      <h2>Sign Up</h2>
      <form>
        <label htmlFor='username'>Username:</label>
        <input type='text' className="form-control" id='username' placeholder="Username" onInput={(e) => setFormValue({
          ...formValues,
          username: e.target.value
        })}/>

        <label htmlFor='password'>Username:</label>
        <input type='password' className="form-control" id='password' placeholder="Password" onInput={(e) => setFormValue({
          ...formValues,
          password: e.target.value
        })}/>

        <label htmlFor='first-name'>First Name:</label>
        <input type='text' className="form-control" id='first-name' placeholder="First Name" onInput={(e) => setFormValue({
          ...formValues,
          firstName: e.target.value
        })}/>

        <label htmlFor='last-name'>Last Name:</label>
        <input type='text' className="form-control" id='last-name' placeholder="Last Name" onInput={(e) => setFormValue({
          ...formValues,
          lastName: e.target.value
        })}/>

        <label htmlFor='email'>Email:</label>
        <input type='email' className="form-control" id='email' placeholder="Email" onInput={(e) => setFormValue({
          ...formValues,
          email: e.target.value
        })}/>

        <label htmlFor='tel'>Phone Number:</label>
        <input type='tel' className="form-control" id='tel' placeholder="Phone Number" onInput={(e) => setFormValue({
          ...formValues,
          tel: e.target.value
        })}/>

        <p style={blackText}>(User will add k9s after sign up.)</p>

        <button type='button' className='btn btn-primary' onClick={() => postHandler()}>Submit</button>
        <button type='button' className='btn btn-secondary' onClick={() => navigate('/')}>Cancel</button>
      </form>
      </div>
  )
}

export default SignUp;