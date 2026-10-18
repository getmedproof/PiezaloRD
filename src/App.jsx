import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ListingDetail from './pages/ListingDetail'
import PostListing from './pages/PostListing'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Admin from './pages/Admin'
import PrivacyPolicy from './pages/PrivacyPolicy'
import InstallPrompt from './components/InstallPrompt'
import './App.css'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState('Todas las ciudades')
  const [showCityPicker, setShowCityPicker] = useState(false)

  return (
    <Router>
      <div className="app">
        <Navbar
          onSearch={setSearchQuery}
          selectedCity={selectedCity}
          onCityChange={() => setShowCityPicker(true)}
        />

        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  searchQuery={searchQuery}
                  selectedCity={selectedCity}
                  setSelectedCity={setSelectedCity}
                  showCityPicker={showCityPicker}
                  setShowCityPicker={setShowCityPicker}
                />
              }
            />

            <Route path="/listing/:id" element={<ListingDetail />} />
            <Route path="/post" element={<PostListing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </main>

        <footer
          style={{
            padding: '24px',
            textAlign: 'center',
            fontSize: '14px',
            borderTop: '1px solid #e5e5e5',
            marginTop: '40px'
          }}
        >
          <a
            href="/privacy-policy"
            style={{
              color: '#555',
              textDecoration: 'none'
            }}
          >
            Política de Privacidad
          </a>
        </footer>

        <InstallPrompt />
      </div>
    </Router>
  )
}

export default App
