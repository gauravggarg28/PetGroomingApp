import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Services from './pages/Services'
import Booking from './pages/Booking'
import Confirmation from './pages/Confirmation'
import Register from './pages/Register'
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={<Services />} />
          <Route path="/booking/:serviceId" element={<Booking />} />
          <Route path="/confirmation/:bookingId" element={<Confirmation />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

