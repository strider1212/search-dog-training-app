import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-sm">
      <div className="navbar-brand">DogLog</div>
      <ul className="navbar-nav">
        <li className="nav-item"><button type="button" className="btn btn-primary nav-link" onClick={() => navigate('/signUp')}>Sign up</button></li>
        <li className="nav-item"><button type="button" className="btn btn-primary nav-link" onClick={() => navigate('/signIn')}>Sign in</button></li>
        <li className="nav-item"><button type="button" className="btn btn-secondary nav-link" onClick={() => localStorage.clear()}>Sign out</button></li>
      </ul>
        {/* <form className="form-inline">
          <div className="row">
            <button type="button" className="btn btn-primary nav-link" onClick={() => navigate('/signUp')}>Sign up</button>
            <button type="button" className="btn btn-primary nav-link" onClick={() => navigate('/signIn')}>Sign in</button>
          </div>
        </form> */}
        
    </nav>
  )
}

export default Header;