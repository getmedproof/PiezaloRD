import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ListingDetail from './pages/ListingDetail'
import PostListing from './pages/PostListing'
import Login from './pages/Login'
import Profile from './pages/Profile'
import './App.css'

function App() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <Router>
      <div className="app">
        <Navbar onSearch={setSearchQuery} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery} />} />
            <Route path="/listing/:id" element={<ListingDetail />} />
            <Route path="/post" element={<PostListing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App