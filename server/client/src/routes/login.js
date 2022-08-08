export const Login = () => {
  return (
    <form>
      <div>
        <label for="username">Username:</label>
        <input type="text" className="form-control" id="username" />
      </div>
      <button type="button" className="btn btn-primary">Submit</button>
    </form>
  )
}

