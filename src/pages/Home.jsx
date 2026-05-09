import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const SAMPLE_LISTINGS = [
  { id: 1, title: 'Alternador Toyota Corolla 2015–2019', price: 4500, condition: 'Usado', category: 'Eléctrico', location: 'Los Mina, SD', image: '🔧', whatsapp: '18091234567' },
  { id: 2, title: 'Pastillas de freno Honda Civic 2016–2021', price: 1800, condition: 'Nuevo', category: 'Frenos', location: 'Naco, SD', image: '🛞', whatsapp: '18097654321' },
  { id: 3, title: 'Amortiguador delantero Hyundai Tucson', price: 6200, condition: 'OEM', category: 'Suspensión', location: 'Santiago', image: '⚙️', whatsapp: '18091112222' },
  { id: 4, title: 'Puerta trasera izquierda Nissan Sentra', price: 8000, condition: 'Usado', category: 'Carrocería', location: 'Villa Mella, SD', image: '🚗', whatsapp: '18093334444' },
  { id: 5, title: 'Radiador Toyota Hilux 2018', price: 9500, condition: 'Usado', category: 'Motor', location: 'San Pedro', image: '🔩', whatsapp: '18095556666' },
  { id: 6, title: 'Batería 12V nueva en caja', price: 3200, condition: 'Nuevo', category: 'Eléctrico', location: 'Bella Vista, SD', image: '🔋', whatsapp: '18097778888' },
]

const CATEGORIES = ['Todo', 'Motor', 'Suspensión', 'Frenos', 'Eléctrico', 'Carrocería', 'Transmisión']

function Home() {
  const [activeCategory, setActiveCategory] = useState('Todo')

  const filtered = activeCategory === 'Todo'
    ? SAMPLE_LISTINGS
    : SAMPLE_LISTINGS.filter(l => l.category === activeCategory)

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

      <div className="listings-grid">
        {filtered.map(listing => (
          <Link to={`/listing/${listing.id}`} key={listing.id} className="listing-card">
            <div className="card-image">{listing.image}</div>
            <div className="card-body">
              <span className={`badge badge-${listing.condition.toLowerCase()}`}>{listing.condition}</span>
              <h3 className="card-title">{listing.title}</h3>
              <p className="card-category">{listing.category}</p>
              <p className="card-price">RD${listing.price.toLocaleString()}</p>
              <p className="card-location">📍 {listing.location}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home
