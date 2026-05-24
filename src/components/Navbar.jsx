import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar({ onSearch, selectedCity, onCityChange }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <img src="/piezalord-logo.png" alt="PiezaloRD" className="logo-img" />
        </Link>
        <button className="navbar-location" onClick={onCityChange}>
          📍 {selectedCity || 'Todas las ciudades'} ▾
        </button>
      </div>
      <div className="navbar-center">
        <input
          type="text"
          className="navbar-search-input"
          placeholder="Buscar piezas, marca, modelo..."
          onChange={e => onSearch && onSearch(e.target.value)}
        />
      </div>
      <div className="navbar-right">
        <Link to="/post" className="btn-post">+ Publicar</Link>
        <Link to="/login" className="btn-login">Entrar</Link>
      </div>
    </nav>
  )
}

export default Navbar