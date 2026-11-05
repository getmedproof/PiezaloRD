import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import './PostListing.css'

const CATEGORIES = ['Motor', 'Suspensión', 'Frenos', 'Eléctrico', 'Carrocería', 'Transmisión']
const CONDITIONS = ['Nuevo', 'Usado', 'OEM']
const CITIES = ['Santo Domingo', 'Santiago', 'San Pedro de Macorís', 'La Romana', 'Puerto Plata', 'San Francisco de Macorís']

function PostListing() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [checking, setChecking] = useState(true)
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [form, setForm] = useState({
    title: '', price: '', condition: '', category: '', city: '', whatsapp: '', description: ''
  })

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

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleImage = e => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      navigate('/login')
      return
    }
    setLoading(true)

    let image_url = null

    if (image) {
      const fileName = `${Date.now()}-${image.name}`
      const { error: uploadError } = await supabase.storage
        .from('listing-images')
        .upload(fileName, image)

      if (!uploadError) {
        const { data } = supabase.storage
          .from('listing-images')
          .getPublicUrl(fileName)
        image_url = data.publicUrl
      }
    }

    const { error } = await supabase
      .from('listings')
      .insert([{
        title: form.title,
        description: form.description,
        price: parseFloat(form.price),
        condition: form.condition,
        category: form.category,
        city: form.city,
        whatsapp: form.whatsapp,
        image_url,
        user_id: user.id,
        status: 'pending',
      }])

    setLoading(false)

    if (error) {
      alert('No se pudo publicar. Intenta de nuevo o inicia sesión otra vez.')
    } else {
      alert('¡Listo! Tu pieza fue enviada y aparecerá cuando sea aprobada.')
      navigate('/')
    }
  }

  if (checking) {
    return (
      <div className="post-page">
        <div className="post-card"><p className="post-subtitle">Cargando...</p></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="post-page">
        <div className="post-card">
          <h1>Publicar pieza</h1>
          <p className="post-subtitle">Debes iniciar sesión para publicar una pieza.</p>
          <button className="btn-publish" onClick={() => navigate('/login')}>
            Iniciar sesión
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="post-page">
      <div className="post-card">
        <h1>Publicar pieza</h1>
        <p className="post-subtitle">Llena los detalles de tu pieza para que compradores te encuentren</p>
        <form onSubmit={handleSubmit} className="post-form">
          <div className="form-group">
            <label>Foto de la pieza</label>
            <div className="image-upload" onClick={() => document.getElementById('img-input').click()}>
              {preview
                ? <img src={preview} alt="preview" className="image-preview" />
                : <div className="image-placeholder">📷 Toca para añadir foto</div>
              }
            </div>
            <input id="img-input" type="file" accept="image/*" onChange={handleImage} style={{display:'none'}} />
          </div>
          <div className="form-group">
            <label>Título del anuncio</label>
            <input
              name="title"
              placeholder="Ej: Alternador Toyota Corolla 2018"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Precio (RD$)</label>
              <input
                name="price"
                type="number"
                placeholder="Ej: 4500"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Condición</label>
              <select name="condition" value={form.condition} onChange={handleChange} required>
                <option value="">Seleccionar</option>
                {CONDITIONS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Categoría</label>
              <select name="category" value={form.category} onChange={handleChange} required>
                <option value="">Seleccionar</option>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Ciudad</label>
              <select name="city" value={form.city} onChange={handleChange} required>
                <option value="">Seleccionar</option>
                {CITIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>WhatsApp</label>
            <input
              name="whatsapp"
              placeholder="Ej: 8091234567"
              value={form.whatsapp}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Descripción</label>
            <textarea
              name="description"
              placeholder="Describe la pieza, compatibilidad, estado, etc."
              value={form.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>
          <button type="submit" className="btn-publish" disabled={loading}>
            {loading ? 'Publicando...' : 'Publicar pieza'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PostListing
