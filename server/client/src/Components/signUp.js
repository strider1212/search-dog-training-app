import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { submitHandler } from '../utils/submitHandler';
import { formPopulater } from '../utils/formPopulater';


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
        {headers: {Authorization: localStorage.getItem('token')}})
        .then(() => {
          navigate('/')
        })
        .catch(error => {
          if(error.response.status === 400) {
            alert('This username already exists. Try another one.')
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
      <form>
        
        {formPopulater('username','Username', 'text', 'Username', setFormValue, formValues, 'username', formErrors, 'username')}

        {formPopulater('password','Password', 'password', 'Password', setFormValue, formValues, 'password', formErrors, 'password')}

        {formPopulater('first-name','First Name', 'text', 'First Name', setFormValue, formValues, 'firstName', formErrors, 'firstName')}

        {formPopulater('last-name','Last Name', 'text', 'Last Name', setFormValue, formValues, 'lastName', formErrors, 'lastName')}

        {formPopulater('email','Email', 'email', 'Email', setFormValue, formValues, 'email', formErrors, 'email')}

        {formPopulater('tel','Phone Number', 'tel', 'Phone Number', setFormValue, formValues, 'tel', formErrors, 'tel')}

        <p style={blackText}>(User will add k9s after sign up.)</p>

        <button type='button' className='btn btn-primary' onClick={() => submitHandler(setFormErrors, formValues, initialStateArray, setIsSubmitted)}>Submit</button>

        <button type='button' className='btn btn-secondary' onClick={() => navigate('/')}>Cancel</button>

      </form>
      </div>
  )
}

export default SignUp;