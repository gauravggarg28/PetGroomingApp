import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../utils/api'

function AssignGroomer() {
  const navigate = useNavigate()
  const { bookingId } = useParams()
  const [booking, setBooking] = useState(null)
  const [groomers, setGroomers] = useState([])
  const [selectedGroomer, setSelectedGroomer] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (localStorage.getItem('adminAuth') !== 'true') {
      navigate('/admin/login')
      return
    }
    fetchData()
  }, [bookingId, navigate])

  const fetchData = async () => {
    try {
      const [bookingRes, groomersRes] = await Promise.all([
        api.get(`/api/bookings/${bookingId}`),
        api.get('/api/groomers')
      ])
      setBooking(bookingRes.data)
      
      // Filter groomers available for this booking's time slot
      const availableGroomers = groomersRes.data.filter(groomer => {
        const bookingDate = new Date(bookingRes.data.date)
        const dayOfWeek = bookingDate.toLocaleDateString('en-US', { weekday: 'long' })
        return groomer.workingDays.includes(dayOfWeek) && 
               groomer.timeSlots.includes(bookingRes.data.timeSlot)
      })
      setGroomers(availableGroomers)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoading(false)
    }
  }

  const handleAssign = async () => {
    if (!selectedGroomer) {
      alert('Please select a groomer')
      return
    }

    try {
      await api.post(`/api/bookings/${bookingId}/assign-groomer`, { groomerId: selectedGroomer })
      alert('Groomer assigned successfully! Notifications sent to groomer and customer.')
      navigate('/admin/dashboard')
    } catch (error) {
      console.error('Error assigning groomer:', error)
      alert('Failed to assign groomer')
    }
  }

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>
  }

  if (!booking) {
    return <div className="p-8 text-center">Booking not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="text-blue-600 hover:text-blue-800 mb-4"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Assign Groomer</h1>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Booking ID</p>
              <p className="font-semibold">#{booking.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Customer</p>
              <p className="font-semibold">{booking.customerName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Pet</p>
              <p className="font-semibold">{booking.petName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Service</p>
              <p className="font-semibold">{booking.serviceName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Date</p>
              <p className="font-semibold">{booking.date}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Time Slot</p>
              <p className="font-semibold">{booking.timeSlot || booking.time}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Address</p>
              <p className="font-semibold">{booking.address}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Select Groomer</h2>
          {groomers.length === 0 ? (
            <p className="text-gray-500">No groomers available for this time slot</p>
          ) : (
            <div className="space-y-3">
              {groomers.map(groomer => (
                <label
                  key={groomer.id}
                  className={`block p-4 border-2 rounded-lg cursor-pointer ${
                    selectedGroomer === groomer.id.toString()
                      ? 'border-brand-gold bg-brand-gold/10'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="groomer"
                    value={groomer.id}
                    checked={selectedGroomer === groomer.id.toString()}
                    onChange={(e) => setSelectedGroomer(e.target.value)}
                    className="mr-3"
                  />
                  <div className="inline-block">
                    <p className="font-semibold">{groomer.name}</p>
                    <p className="text-sm text-gray-600">
                      {groomer.paymentType === 'salary' 
                        ? `Salary: ₹${groomer.salary}` 
                        : `Commission: ${groomer.commission}%`}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          )}
          <div className="mt-6">
            <button
              onClick={handleAssign}
              disabled={!selectedGroomer || groomers.length === 0}
              className="w-full bg-brand-gold hover:bg-brand-gold/90 disabled:bg-gray-300 text-white py-3 rounded-lg font-semibold"
            >
              Assign Groomer & Send Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssignGroomer

