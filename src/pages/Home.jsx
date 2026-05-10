import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabase'
import './Home.css'

const CATEGORIES = ['Todo', 'Motor', 'Suspensión', 'Frenos', 'Eléctrico', 'Carrocería', 'Transmisión']

function Home({ searchQuery = '' }) {
  const [activeCategory, setActiveCategory] = useState('Todo')
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

useEffect(() => {
  fetchListings()
}, [activeCategory, searchQuery])

  async function fetchListings() {
    setLoading(true)
    let query = supabase
  .from('listings')
  .select('*')
  .order('created_at', { ascending: false })

if (activeCategory !== 'Todo') {
  query = query.eq('category', activeCategory)
}

if (searchQuery) {
  query = query.ilike('title', `%${searchQuery}%`)
}

    const { data, error } = await query
    if (!error) setListings(data)
    setLoading(false)
  }

  return (
    <div className="home">
      <div className="filters">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`chip ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="section-label">📍 Cerca de ti · Santo Domingo</div>

      {loading ? (
        <div className="loading">Cargando piezas...</div>
      ) : listings.length === 0 ? (
        <div className="empty">
          <p>No hay piezas todavía.</p>
          <Link to="/post" className="btn-first">¡Sé el primero en publicar!</Link>
        </div>
      ) : (
        <div className="listings-grid">
          {listings.map(listing => (
            <Link to={`/listing/${listing.id}`} key={listing.id} className="listing-card">
              <div className="card-image">
                {listing.image_url
                  ? <img src={listing.image_url} alt={listing.title} />
                  : '🔧'}
              </div>
              <div className="card-body">
                <span className={`badge badge-${listing.condition?.toLowerCase()}`}>{listing.condition}</span>
                <h3 className="card-title">{listing.title}</h3>
                <p className="card-category">{listing.category}</p>
                <p className="card-price">RD${Number(listing.price).toLocaleString()}</p>
                <p className="card-location">📍 {listing.city}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
