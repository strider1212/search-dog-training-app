import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { formPopulater } from '../utils/formPopulater';
import { submitHandler } from '../utils/submitHandler';

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

  useEffect(() => {
    if(initialRender.current) {
      initialRender.current = false;
    } else if (Object.keys(formErrors).length > 0) {
      alert('One or more of the request categories was not filled in. Please fill in any missing categories.')
    } else {
      const postForm = async () => {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/users/signIn`, {
          username: formValues.username,
          password: formValues.password
        },
        {headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }})
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
      <form>

        {formPopulater('username', 'Username', 'text', 'Username', setFormValue, formValues, 'username', formErrors, 'username')}

        {formPopulater('password', 'Password', 'password', 'Password', setFormValue, formValues, 'password', formErrors, 'password')}

        <br></br>

        <button type='button' className='btn btn-primary' onClick={() => submitHandler(setFormErrors, formValues, initialStateArray, setIsSubmitted)}>Submit</button>

        <button type='button' className='btn btn-secondary' onClick={() => navigate('/')}>Cancel</button>

      </form>
    </div>
  )
}

export default SignIn;

//TEST PASSWORD
//billtheman
//test password