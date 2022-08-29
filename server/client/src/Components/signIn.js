import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
        console.log('sign in')

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