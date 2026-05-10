import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'

function Navbar({ onSearch }) {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img src="/piezalord-logo.png" alt="PiezaloRD" className="logo-img" />
      </Link>
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Buscar piezas, marca, modelo..."
          onChange={e => onSearch && onSearch(e.target.value)}
        />
      </div>
      <div className="navbar-actions">
        <Link to="/post" className="btn-post">+ Publicar</Link>
        <Link to="/login" className="btn-login">Entrar</Link>
      </div>
    </nav>
  )
}

export default Navbar