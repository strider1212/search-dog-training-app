import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item"><div>DogLog</div></li>
        <li className="nav-item"><button type="button" className="btn btn-primary" onClick={() => navigate('/signUp')}>Sign up</button></li>
        <li className="nav-item"><button type="button" className="btn btn-primary" onClick={() => navigate('/signIn')}>Sign in</button></li>
      </ul>
    </nav>
  )
}

export default Header;