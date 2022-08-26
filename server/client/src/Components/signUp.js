const SignUp = () => {
  return (
    <body>
      <h2>Sign Up</h2>
      <form>
        <label htmlFor='username'>Username:</label>
        <input type='text' className="form-control" id='username' placeholder="username" />
        <label htmlFor='password'>Username:</label>
        <input type='password' className="form-control" id='password' placeholder="password" />
      </form>
    </body>
  )
}

export default SignUp;