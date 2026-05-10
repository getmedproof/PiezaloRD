import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../supabase'
import './ListingDetail.css'

function ListingDetail() {
  const { id } = useParams()
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchListing()
  }, [id])

  async function fetchListing() {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('id', id)
      .single()

    if (!error) setListing(data)
    setLoading(false)
  }

  if (loading) return <div className="not-found">Cargando...</div>
  if (!listing) return <div className="not-found">Pieza no encontrada</div>

  const whatsappMessage = `Hola, vi tu anuncio en PiezaloRD sobre: ${listing.title}. ¿Está disponible?`
  const whatsappUrl = `https://wa.me/${listing.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <div className="detail-page">
      <div className="detail-container">
        <div className="detail-image">
          {listing.image_url
            ? <img src={listing.image_url} alt={listing.title} style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:'12px'}} />
            : '🔧'
          }
        </div>
        <div className="detail-info">
          <span className={`badge badge-${listing.condition?.toLowerCase()}`}>{listing.condition}</span>
          <h1 className="detail-title">{listing.title}</h1>
          <p className="detail-price">RD${Number(listing.price).toLocaleString()}</p>
          <p className="detail-location">📍 {listing.city}</p>
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