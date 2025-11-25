import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Services from './pages/Services'
import Booking from './pages/Booking'
import Confirmation from './pages/Confirmation'
import Register from './pages/Register'
import Layout from './components/Layout'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import GroomerManagement from './pages/admin/GroomerManagement'
import AssignGroomer from './pages/admin/AssignGroomer'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={<Services />} />
          <Route path="/booking/:serviceId" element={<Booking />} />
          <Route path="/confirmation/:bookingId" element={<Confirmation />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/groomers" element={<GroomerManagement />} />
          <Route path="/admin/assign-groomer/:bookingId" element={<AssignGroomer />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

