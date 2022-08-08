

export const Login = () => {
  const url = 'http://localhost:3001/auth/login'
  fetch(url, {
    method: 'POST'
  })

  return (
    <form>
      <div>
        <label htmlFor="username" >Username:</label>
        <input 
        type="text" 
        className="form-control" 
        id="username" 
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
      <button type="button" className="btn btn-primary">Submit</button>
    </form>
  )
}

