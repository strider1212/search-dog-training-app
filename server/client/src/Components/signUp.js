import { useState } from 'react';

const SignUp = () => {
  const [usename, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  return (
    <body>
      <h2>Sign Up</h2>
      <form>
        <label htmlFor='username'>Username:</label>
        <input type='text' className="form-control" id='username' placeholder="username" onInput={(e) => setUsername(e.target.value)}/>
        <label htmlFor='password'>Username:</label>
        <input type='password' className="form-control" id='password' placeholder="password" onInput={(e) => setPassword(e.target.value)}/>
      </form>
    </body>
  )
}

export default SignUp;