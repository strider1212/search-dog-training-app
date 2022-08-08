import { useState } from 'react';

export const Login = () => {
  const url = 'http://localhost:3000/auth/login'
  const postLogin = async (username, password) => {
    await fetch(url, {
    method: 'POST',
    body: {
      username: username,
      password: password
    }
    })
    .then(data => console.log(data))
  }

  const [username, setUsername] = useState('');
   

  return (
    <form>
      <div>
        <label htmlFor="username" >Username:</label>
        <input 
        type="text" 
        className="form-control" 
        id="username" 
        onInput={e => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input 
        type="password" 
        className="form-control" 
        id="password" 
        />
      </div>
      <button type="button" className="btn btn-primary" onClick={postLogin}>Submit</button>
    </form>
  )
}

