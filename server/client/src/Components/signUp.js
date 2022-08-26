import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');

  const navigate = useNavigate();

  const postHandler = () => {
    console.log('Pokemon')
    // await axios.post('/users')
  }
  
  return (
    <body>
      <h2>Sign Up</h2>
      <form>
        <label htmlFor='username'>Username:</label>
        <input type='text' className="form-control" id='username' placeholder="Username" onInput={(e) => setUsername(e.target.value)}/>

        <label htmlFor='password'>Username:</label>
        <input type='password' className="form-control" id='password' placeholder="Password" onInput={(e) => setPassword(e.target.value)}/>

        <label htmlFor='first-name'>First Name:</label>
        <input type='text' className="form-control" id='first-name' placeholder="First Name" onInput={(e) => setFirstName(e.target.value)}/>

        <label htmlFor='last-name'>Last Name:</label>
        <input type='text' className="form-control" id='last-name' placeholder="Last Name" onInput={(e) => setLastName(e.target.value)}/>

        <label htmlFor='email'>Email:</label>
        <input type='email' className="form-control" id='email' placeholder="Email" onInput={(e) => setEmail(e.target.value)}/>

        <label htmlFor='tel'>Phone Number:</label>
        <input type='tel' className="form-control" id='tel' placeholder="Phone Number" onInput={(e) => setTel(e.target.value)}/>

        <button type='button' className='btn btn-primary' onClick={() => postHandler()}>Submit</button>
        <button type='button' className='btn btn-secondary' onClick={() => navigate('/')}>Cancel</button>
      </form>
    </body>
  )
}

export default SignUp;