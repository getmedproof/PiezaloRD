import { Link } from 'react-router-dom'
import './Profile.css'

const MY_LISTINGS = [
  { id: 1, title: 'Alternador Toyota Corolla 2015–2019', price: 4500, condition: 'Usado', image: '🔧' },
  { id: 5, title: 'Radiador Toyota Hilux 2018', price: 9500, condition: 'Usado', image: '🔩' },
]

function Profile() {
  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">E</div>
        <div className="profile-info">
          <h1>Eddy</h1>
          <p>📍 Santo Domingo</p>
          <p>⭐ Vendedor verificado</p>
        </div>
      </div>

      <div className="profile-section">
        <div className="section-header">
          <h2>Mis anuncios</h2>
          <Link to="/post" className="btn-new">+ Nuevo</Link>
        </div>
        <div className="my-listings">
          {MY_LISTINGS.map(listing => (
            <Link to={`/listing/${listing.id}`} key={listing.id} className="my-listing-card">
              <div className="my-listing-image">{listing.image}</div>
              <div className="my-listing-info">
                <p className="my-listing-title">{listing.title}</p>
                <p className="my-listing-price">RD${listing.price.toLocaleString()}</p>
                <span className={`badge badge-${listing.condition.toLowerCase()}`}>{listing.condition}</span>
              </div>
              <div className="my-listing-actions">
                <button className="btn-edit">Editar</button>
                <button className="btn-sold">Vendido</button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile
