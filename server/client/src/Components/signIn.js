import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitHandler } from '../utils/submitHandler';
import { useDispatch } from 'react-redux';

const SignIn = () => {
  const initialState = {
    username: '',
    password: ''
  }
  const initialStateArray = ['username', 'password'];
  const [formValues, setFormValue] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  let initialRender = useRef(true);

  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    if(initialRender.current) {
      initialRender.current = false;
    } else if (Object.keys(formErrors).length > 0) {
      alert('One or more of the request categories was not filled in. Please fill in any missing categories.')
    } else {
      const postForm = async () => {
        await axios.post('http://localhost:3000/users/signIn', {
          username: formValues.username,
          password: formValues.password
        })
        .then((res) => {
          localStorage.setItem('token', res.data.token)
          navigate('/');
        })
        .catch(error => {
          if(error.response.status === 401) {
            alert('Invalid username or password')
          }

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

        console.log('signIn submitted')
      }
      postForm()

       
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formErrors, isSubmitted])
  
  return (
    <div>
      <h2>Sign In</h2>
      <form>
        <p>{formErrors.username}</p>
        <label htmlFor='username'>Username:</label>
        <input type='text' className="form-control" id='username' placeholder="Username" onInput={(e) => setFormValue({
          ...formValues,
          username: e.target.value
        })}/>

        <p>{formErrors.password}</p>
        <label htmlFor='password'>Username:</label>
        <input type='password' className="form-control" id='password' placeholder="Password" onInput={(e) => setFormValue({
          ...formValues,
          password: e.target.value
        })}/>

        <button type='button' className='btn btn-primary' onClick={() => submitHandler(setFormErrors, formValues, initialStateArray, setIsSubmitted)}>Submit</button>
        <button type='button' className='btn btn-secondary' onClick={() => navigate('/')}>Cancel</button>

      </form>
    </div>
  )
}

export default SignIn;