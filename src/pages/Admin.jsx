import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import './Admin.css'

const ADMIN_PASSWORD = 'Junior2018!'

function Admin() {
  const [auth, setAuth] = useState(false)
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

  function handleLogin() {
    if (input === ADMIN_PASSWORD) {
      setAuth(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  useEffect(() => {
    if (auth) fetchPending()
  }, [auth])

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

  async function approve(id) {
    await supabase.from('listings').update({ status: 'approved' }).eq('id', id)
    setListings(listings.filter(l => l.id !== id))
  }

  async function reject(id) {
    await supabase.from('listings').update({ status: 'rejected' }).eq('id', id)
    setListings(listings.filter(l => l.id !== id))
  }

  if (!auth) {
    return (
      <div className="admin-login">
        <h1 className="admin-title">Panel de Moderación</h1>
        <div className="admin-login-box">
          <input
            type="password"
            placeholder="Contraseña"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            className="admin-password-input"
          />
          {error && <p className="admin-error">Contraseña incorrecta</p>}
          <button className="btn-approve" onClick={handleLogin}>Entrar</button>
        </div>
      </div>
    )
  }

  return (
    <div className="admin">
      <h1 className="admin-title">Panel de Moderación</h1>
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
                <button className="btn-approve" onClick={() => approve(listing.id)}>✅ Aprobar</button>
                <button className="btn-reject" onClick={() => reject(listing.id)}>❌ Rechazar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Admin