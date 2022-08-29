import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div>DogLog</div>
      <button type="button" className="btn btn-primary" onClick={() => navigate('/signUp')}>Sign up</button>
      <button type="button" className="btn btn-primary" onClick={() => navigate('/signIn')}>Sign in</button>
    </nav>
  )
}

export default Header;