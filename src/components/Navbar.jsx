import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import './Navbar.css'

function Navbar({ onSearch, selectedCity, onCityChange }) {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user))

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <img src="/piezalord-logo.png" alt="PiezaloRD" className="logo-img" />
          </Link>
          <button className="navbar-location" onClick={onCityChange}>
            📍 {selectedCity || 'Todas las ciudades'} ▾
          </button>
        </div>

        <div className="navbar-right">
          <Link to="/post" className="btn-post">+ Publicar</Link>
          {user
            ? <Link to="/profile" className="btn-login">Perfil</Link>
            : <Link to="/login" className="btn-login">Entrar</Link>
          }
        </div>
      </div>

      <div className="navbar-bottom">
        <input
          type="text"
          className="navbar-search-input"
          placeholder="Buscar piezas, marca, modelo..."
          onChange={e => onSearch && onSearch(e.target.value)}
        />
      </div>
    </nav>
  )
}

export default Navbar