import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [usename, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const postHandler = () => {
    console.log('Pokemon')
    return 'Pokemon'
  }
  
  return (
    <body>
      <h2>Sign Up</h2>
      <form>
        <label htmlFor='username'>Username:</label>
        <input type='text' className="form-control" id='username' placeholder="username" onInput={(e) => setUsername(e.target.value)}/>
        <label htmlFor='password'>Username:</label>
        <input type='password' className="form-control" id='password' placeholder="password" onInput={(e) => setPassword(e.target.value)}/>

        <button type='button' className='btn btn-primary' onClick={() => postHandler()}>Submit</button>
        <button type='button' className='btn btn-secondary' onClick={() => navigate('/')}>Cancel</button>
      </form>
    </body>
  )
}

export default SignUp;