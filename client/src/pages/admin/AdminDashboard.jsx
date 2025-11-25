import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../utils/api'

function AdminDashboard() {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  useEffect(() => {
    if (localStorage.getItem('adminAuth') !== 'true') {
      navigate('/admin/login')
      return
    }
    fetchBookings()
  }, [selectedDate, navigate])

  const fetchBookings = async () => {
    try {
      const response = await api.get('/api/bookings')
      const todayBookings = response.data.filter(booking => booking.date === selectedDate)
      setBookings(todayBookings)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching bookings:', error)
      setLoading(false)
    }
  }

  const handleAssignGroomer = async (bookingId, groomerId) => {
    try {
      await api.post(`/api/bookings/${bookingId}/assign-groomer`, { groomerId })
      alert('Groomer assigned successfully! Notifications sent.')
      fetchBookings()
    } catch (error) {
      console.error('Error assigning groomer:', error)
      alert('Failed to assign groomer')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    navigate('/admin/login')
  }

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/admin/groomers')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Manage Groomers
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-4 sm:px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-xl font-semibold">Bookings for {new Date(selectedDate).toLocaleDateString()}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booking ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pet</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Groomer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-4 py-8 text-center text-gray-500">No bookings for this date</td>
                  </tr>
                ) : (
                  bookings.map(booking => (
                    <tr key={booking.id}>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">#{booking.id}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">{booking.customerName}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">{booking.petName}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">{booking.serviceName}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">{booking.time}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        {booking.groomerName || 'Not Assigned'}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        {!booking.groomerId && (
                          <button
                            onClick={() => navigate(`/admin/assign-groomer/${booking.id}`)}
                            className="bg-brand-gold hover:bg-brand-gold/90 text-white px-3 py-1 rounded"
                          >
                            Assign
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

