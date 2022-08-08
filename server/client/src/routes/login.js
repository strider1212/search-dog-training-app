export const Login = () => {
  return (
    <form>
      <div>
        <label for="username">Username:</label>
        <input type="text" className="form-control" id="username" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" className="form-control" id="password" />
      </div>
      <button type="button" className="btn btn-primary">Submit</button>
    </form>
  )
}

