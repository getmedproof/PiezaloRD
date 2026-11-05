import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import './Admin.css'

// Who can see the panel. The database enforces the same list.
const ADMIN_EMAILS = ['castrocdl.realty@gmail.com', 'cbnoneinfo@gmail.com']

function Admin() {
  const [user, setUser] = useState(null)
  const [checking, setChecking] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

  const isAdmin = !!user && ADMIN_EMAILS.includes((user.email || '').toLowerCase())

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setChecking(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (isAdmin) fetchPending()
  }, [isAdmin])

  async function handleLogin() {
    setError('')
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })
    if (error) setError('Correo o contraseña incorrectos')
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    setListings([])
  }

  async function fetchPending() {
    setLoading(true)
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false })
    if (!error) setListings(data)
    setLoading(false)
  }

  async function setStatus(id, status) {
    const { data, error } = await supabase
      .from('listings')
      .update({ status })
      .eq('id', id)
      .select()
    if (error || !data || data.length === 0) {
      alert('No se pudo actualizar el listado.')
      return
    }
    setListings(prev => prev.filter(l => l.id !== id))
  }

  if (checking) {
    return <div className="admin"><p className="admin-loading">Cargando...</p></div>
  }

  if (!user) {
    return (
      <div className="admin-login">
        <h1 className="admin-title">Panel de Moderación</h1>
        <div className="admin-login-box">
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="admin-password-input"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            className="admin-password-input"
          />
          {error && <p className="admin-error">{error}</p>}
          <button className="btn-approve" onClick={handleLogin}>Entrar</button>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="admin-login">
        <h1 className="admin-title">Panel de Moderación</h1>
        <p className="admin-error">Esta cuenta no tiene acceso de administrador.</p>
        <button className="btn-reject" onClick={handleLogout}>Cerrar sesión</button>
      </div>
    )
  }

  return (
    <div className="admin">
      <h1 className="admin-title">Panel de Moderación</h1>
      <button className="btn-reject" onClick={handleLogout}>Cerrar sesión</button>
      {loading ? (
        <p className="admin-loading">Cargando...</p>
      ) : listings.length === 0 ? (
        <p className="admin-empty">✅ No hay listados pendientes.</p>
      ) : (
        <div className="admin-list">
          {listings.map(listing => (
            <div className="admin-card" key={listing.id}>
              <div className="admin-card-image">
                {listing.image_url
                  ? <img src={listing.image_url} alt={listing.title} />
                  : <span>🔧</span>}
              </div>
              <div className="admin-card-info">
                <h2>{listing.title}</h2>
                <p>{listing.description}</p>
                <p><strong>Precio:</strong> RD${Number(listing.price).toLocaleString()}</p>
                <p><strong>Categoría:</strong> {listing.category}</p>
                <p><strong>Ciudad:</strong> {listing.city}</p>
                <p><strong>Condición:</strong> {listing.condition}</p>
                <p><strong>WhatsApp:</strong> {listing.whatsapp}</p>
              </div>
              <div className="admin-card-actions">
                <button className="btn-approve" onClick={() => setStatus(listing.id, 'approved')}>✅ Aprobar</button>
                <button className="btn-reject" onClick={() => setStatus(listing.id, 'rejected')}>❌ Rechazar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Admin
