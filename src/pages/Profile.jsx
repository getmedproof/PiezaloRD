import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import './Profile.css'

function Profile() {
  const [user, setUser] = useState(null)
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getUser()
  }, [])

  async function getUser() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      navigate('/login')
      return
    }
    setUser(user)
    fetchMyListings(user.id)
  }

  async function fetchMyListings(userId) {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (!error) setListings(data)
    setLoading(false)
  }

  async function deleteListing(id) {
    if (!confirm('¿Seguro que quieres eliminar este anuncio?')) return
    await supabase.from('listings').delete().eq('id', id)
    setListings(listings.filter(l => l.id !== id))
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/')
  }

  if (!user) return null

  const name = user.user_metadata?.full_name || user.email

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">
          {name.charAt(0).toUpperCase()}
        </div>
        <div className="profile-info">
          <h1>{name}</h1>
          <p>{user.email}</p>
        </div>
        <button className="btn-logout" onClick={handleLogout}>Cerrar sesión</button>
      </div>

      <div className="profile-section">
        <div className="section-header">
          <h2>Mis anuncios</h2>
          <Link to="/post" className="btn-new">+ Nuevo</Link>
        </div>

        {loading ? (
          <p className="profile-loading">Cargando...</p>
        ) : listings.length === 0 ? (
          <div className="profile-empty">
            <p>No tienes anuncios todavía.</p>
            <Link to="/post" className="btn-first">¡Publica tu primera pieza!</Link>
          </div>
        ) : (
          <div className="my-listings">
            {listings.map(listing => (
              <div key={listing.id} className="my-listing-card">
                <div className="my-listing-image">
                  {listing.image_url
                    ? <img src={listing.image_url} alt={listing.title} />
                    : '🔧'}
                </div>
                <div className="my-listing-info">
                  <p className="my-listing-title">{listing.title}</p>
                  <p className="my-listing-price">RD${Number(listing.price).toLocaleString()}</p>
                  <span className={`badge badge-${listing.condition?.toLowerCase()}`}>
                    {listing.condition}
                  </span>
                  <span className={`status-badge status-${listing.status}`}>
                    {listing.status === 'pending' ? '⏳ Pendiente' : listing.status === 'approved' ? '✅ Aprobado' : '❌ Rechazado'}
                  </span>
                </div>
                <div className="my-listing-actions">
                  <button className="btn-delete" onClick={() => deleteListing(listing.id)}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile