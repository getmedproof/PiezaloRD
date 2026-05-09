import { useParams } from 'react-router-dom'
import './ListingDetail.css'

const SAMPLE_LISTINGS = [
  { id: 1, title: 'Alternador Toyota Corolla 2015–2019', price: 4500, condition: 'Usado', category: 'Eléctrico', location: 'Los Mina, SD', image: '🔧', whatsapp: '18091234567', description: 'Alternador en buen estado, desmontado de vehículo con 80,000 km. Funciona perfectamente, se puede probar antes de comprar.' },
  { id: 2, title: 'Pastillas de freno Honda Civic 2016–2021', price: 1800, condition: 'Nuevo', category: 'Frenos', location: 'Naco, SD', image: '🛞', whatsapp: '18097654321', description: 'Pastillas de freno nuevas en caja, marca TRW. Compatible con Honda Civic 2016 al 2021.' },
  { id: 3, title: 'Amortiguador delantero Hyundai Tucson', price: 6200, condition: 'OEM', category: 'Suspensión', location: 'Santiago', image: '⚙️', whatsapp: '18091112222', description: 'Amortiguador delantero original Hyundai, lado derecho. Desmontado de vehículo 2020.' },
  { id: 4, title: 'Puerta trasera izquierda Nissan Sentra', price: 8000, condition: 'Usado', category: 'Carrocería', location: 'Villa Mella, SD', image: '🚗', whatsapp: '18093334444', description: 'Puerta trasera izquierda para Nissan Sentra 2017-2021. Color blanco, sin golpes mayores.' },
  { id: 5, title: 'Radiador Toyota Hilux 2018', price: 9500, condition: 'Usado', category: 'Motor', location: 'San Pedro', image: '🔩', whatsapp: '18095556666', description: 'Radiador original Toyota Hilux 2018, en perfectas condiciones, sin fugas.' },
  { id: 6, title: 'Batería 12V nueva en caja', price: 3200, condition: 'Nuevo', category: 'Eléctrico', location: 'Bella Vista, SD', image: '🔋', whatsapp: '18097778888', description: 'Batería 12V 60Ah nueva en caja, marca Bosch. Garantía de 1 año.' },
]

function ListingDetail() {
  const { id } = useParams()
  const listing = SAMPLE_LISTINGS.find(l => l.id === parseInt(id))

  if (!listing) return <div className="not-found">Pieza no encontrada</div>

  const whatsappMessage = `Hola, vi tu anuncio en PiezaloRD sobre: ${listing.title}. ¿Está disponible?`
  const whatsappUrl = `https://wa.me/${listing.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <div className="detail-page">
      <div className="detail-container">
        <div className="detail-image">{listing.image}</div>
        <div className="detail-info">
          <span className={`badge badge-${listing.condition.toLowerCase()}`}>{listing.condition}</span>
          <h1 className="detail-title">{listing.title}</h1>
          <p className="detail-price">RD${listing.price.toLocaleString()}</p>
          <p className="detail-location">📍 {listing.location}</p>
          <p className="detail-category">🔧 {listing.category}</p>
          <div className="detail-description">
            <h3>Descripción</h3>
            <p>{listing.description}</p>
          </div>
          <div className="detail-actions">
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-whatsapp">
              💬 Contactar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListingDetail