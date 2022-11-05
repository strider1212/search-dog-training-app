import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { submitHandler } from '../utils/submitHandler';

const SignUp = () => {
  const initialState = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    tel: ''
  }
  const initialStateArray = ['username', 'password', 'firstName', 'lastName', 'email', 'tel'];
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
      // localStorage.getItem('token')
      const postForm = async () => {
        console.log('POST /users')
        await axios.post('http://localhost:3000/users', {
          username: formValues.username,
          password: formValues.password,
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          email: formValues.email,
          phoneNumber: formValues.tel
        },
        {headers: {'test': 'testing header'}})
        .then(res => {
          navigate('/')
        })
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

        console.log('signUp submitted')
      }
      postForm()

       
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formErrors, isSubmitted])

  const blackText = {
    color: 'black'
  }
  
  return (
    <div>
      <h2>Sign Up</h2>
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

        <p>{formErrors.firstName}</p>  
        <label htmlFor='first-name'>First Name:</label>
        <input type='text' className="form-control" id='first-name' placeholder="First Name" onInput={(e) => setFormValue({
          ...formValues,
          firstName: e.target.value
        })}/>

        <p>{formErrors.lastName}</p>
        <label htmlFor='last-name'>Last Name:</label>
        <input type='text' className="form-control" id='last-name' placeholder="Last Name" onInput={(e) => setFormValue({
          ...formValues,
          lastName: e.target.value
        })}/>

        <p>{formErrors.email}</p>
        <label htmlFor='email'>Email:</label>
        <input type='email' className="form-control" id='email' placeholder="Email" onInput={(e) => setFormValue({
          ...formValues,
          email: e.target.value
        })}/>

        <p>{formErrors.tel}</p>
        <label htmlFor='tel'>Phone Number:</label>
        <input type='tel' className="form-control" id='tel' placeholder="Phone Number" onInput={(e) => setFormValue({
          ...formValues,
          tel: e.target.value
        })}/>

        <p style={blackText}>(User will add k9s after sign up.)</p>

        <button type='button' className='btn btn-primary' onClick={() => submitHandler(setFormErrors, formValues, initialStateArray, setIsSubmitted)}>Submit</button>
        <button type='button' className='btn btn-secondary' onClick={() => navigate('/')}>Cancel</button>
      </form>
      </div>
  )
}

export default SignUp;