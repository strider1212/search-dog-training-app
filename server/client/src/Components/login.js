

export const Login = () => {
  const url = 'http://localhost:3000/auth/login'
  const postLogin = async () => {
    await fetch(url, {
    method: 'POST'
    })
    .then(res => console.log(res))
  }
   

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
      <button type="button" className="btn btn-primary" onClick={postLogin}>Submit</button>
    </form>
  )
}

