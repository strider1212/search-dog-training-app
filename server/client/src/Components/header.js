import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-sm">
      <ul className="navbar-nav ml-auto">
        <li className="navbar-brand"><div>DogLog</div></li>
        <li className="nav-item"><button type="button" className="btn btn-primary nav-link" onClick={() => navigate('/signUp')}>Sign up</button></li>
        <li className="nav-item"><button type="button" className="btn btn-primary nav-link" onClick={() => navigate('/signIn')}>Sign in</button></li>
      </ul>
    </nav>
  )
}

export default Header;