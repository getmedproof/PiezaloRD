import { useState } from 'react'
import './Login.css'

function Login() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(isSignUp ? 'Cuenta creada!' : 'Bienvenido!')
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">Piezalo<span>RD</span></div>
        <h2>{isSignUp ? 'Crear cuenta' : 'Iniciar sesión'}</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {isSignUp && (
            <input type="text" placeholder="Tu nombre o negocio" required />
          )}
          <button type="submit" className="btn-submit">
            {isSignUp ? 'Crear cuenta' : 'Entrar'}
          </button>
        </form>
        <p className="login-switch">
          {isSignUp ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
          <button onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Inicia sesión' : 'Regístrate'}
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login