import React, { useState } from 'react';

export const Login = () => {
  const [username, setUsername] = useState('');

  return (
    <form>
      <div>
        <label htmlFor="username" >Username:</label>
        <input 
        type="text" 
        className="form-control" 
        id="username" 
        onInput={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" className="form-control" id="password" />
      </div>
      <button type="button" className="btn btn-primary">Submit</button>
    </form>
  )
}

