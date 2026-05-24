import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabase'
import './Home.css'

const CATEGORIES = ['Todo', 'Motor', 'Suspensión', 'Frenos', 'Eléctrico', 'Carrocería', 'Transmisión']

const CITIES = [
  'Todas las ciudades',
  'Santo Domingo',
  'Santiago',
  'San Pedro de Macorís',
  'La Romana',
  'Puerto Plata',
  'San Francisco de Macorís',
  'La Vega',
  'Higüey',
  'Barahona',
  'Mao',
  'Bonao',
  'Cotuí',
  'Azua',
  'San Cristóbal',
  'Moca',
]

function Home({ searchQuery = '', selectedCity, setSelectedCity, showCityPicker, setShowCityPicker }) {
  const [activeCategory, setActiveCategory] = useState('Todo')
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchListings()
  }, [activeCategory, searchQuery, selectedCity])

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
      query = query.ilike('title', '%' + searchQuery + '%')
    }

    if (selectedCity !== 'Todas las ciudades') {
      query = query.eq('city', selectedCity)
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
            className={'chip' + (activeCategory === cat ? ' active' : '')}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {showCityPicker && (
        <div className="city-overlay" onClick={() => setShowCityPicker(false)}>
          <div className="city-picker" onClick={e => e.stopPropagation()}>
            <div className="city-picker-header">
              <h3>Selecciona tu ciudad</h3>
              <button onClick={() => setShowCityPicker(false)}>X</button>
            </div>
            <div className="city-list">
              {CITIES.map(city => (
                <button
                  key={city}
                  className={'city-option' + (selectedCity === city ? ' selected' : '')}
                  onClick={() => {
                    setSelectedCity(city)
                    setShowCityPicker(false)
                  }}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="loading">Cargando piezas...</div>
      ) : listings.length === 0 ? (
        <div className="empty">
          <p>No hay piezas en {selectedCity}.</p>
          <Link to="/post" className="btn-first">Se el primero en publicar!</Link>
        </div>
      ) : (
        <div className="listings-grid">
          {listings.map(listing => (
            <Link to={'/listing/' + listing.id} key={listing.id} className="listing-card">
              <div className="card-image">
                {listing.image_url
                  ? <img src={listing.image_url} alt={listing.title} />
                  : '🔧'}
              </div>
              <div className="card-body">
                <span className={'badge badge-' + (listing.condition ? listing.condition.toLowerCase() : '')}>{listing.condition}</span>
                <h3 className="card-title">{listing.title}</h3>
                <p className="card-category">{listing.category}</p>
                <p className="card-price">RD${Number(listing.price).toLocaleString()}</p>
                <p className="card-location">{listing.city}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
