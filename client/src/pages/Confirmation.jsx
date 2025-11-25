import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../utils/api'

function Confirmation() {
  const { bookingId } = useParams()
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBooking()
  }, [bookingId])

  const fetchBooking = async () => {
    try {
      const response = await api.get(`/api/bookings/${bookingId}`)
      setBooking(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching booking:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600 text-sm sm:text-base">Loading...</p>
        </div>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="text-center">
          <p className="text-red-600 text-sm sm:text-base">Booking not found</p>
        </div>
      </div>
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 text-center">
        <div className="mb-4 sm:mb-6">
          <div className="inline-block bg-green-100 rounded-full p-3 sm:p-4 mb-3 sm:mb-4">
            <svg
              className="w-12 h-12 sm:w-16 sm:h-16 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Your appointment has been successfully scheduled
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 text-left">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900">Booking Details</h2>
          <div className="space-y-2 sm:space-y-3">
            <div className="flex justify-between items-start sm:items-center flex-col sm:flex-row gap-1 sm:gap-0">
              <span className="text-sm sm:text-base text-gray-600">Booking ID:</span>
              <span className="font-semibold text-sm sm:text-base">#{booking.id}</span>
            </div>
            <div className="flex justify-between items-start sm:items-center flex-col sm:flex-row gap-1 sm:gap-0">
              <span className="text-sm sm:text-base text-gray-600">Service:</span>
              <span className="font-semibold text-sm sm:text-base">{booking.serviceName}</span>
            </div>
            <div className="flex justify-between items-start sm:items-center flex-col sm:flex-row gap-1 sm:gap-0">
              <span className="text-sm sm:text-base text-gray-600">Customer:</span>
              <span className="font-semibold text-sm sm:text-base">{booking.customerName}</span>
            </div>
            <div className="flex justify-between items-start sm:items-center flex-col sm:flex-row gap-1 sm:gap-0">
              <span className="text-sm sm:text-base text-gray-600">Pet:</span>
              <span className="font-semibold text-sm sm:text-base">{booking.petName} ({booking.petType}{booking.petBreed ? ` - ${booking.petBreed}` : ''})</span>
            </div>
            <div className="flex justify-between items-start sm:items-center flex-col sm:flex-row gap-1 sm:gap-0">
              <span className="text-sm sm:text-base text-gray-600">Date:</span>
              <span className="font-semibold text-sm sm:text-base">{formatDate(booking.date)}</span>
            </div>
            <div className="flex justify-between items-start sm:items-center flex-col sm:flex-row gap-1 sm:gap-0">
              <span className="text-sm sm:text-base text-gray-600">Time Slot:</span>
              <span className="font-semibold text-sm sm:text-base">{booking.timeSlot || formatTime(booking.time)}</span>
            </div>
            <div className="pt-3 border-t border-gray-200">
              <span className="text-sm sm:text-base text-gray-600 block mb-1 sm:mb-2">Address:</span>
              <span className="font-semibold text-sm sm:text-base break-words">{booking.address}</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
          <p className="text-xs sm:text-sm text-blue-800">
            <strong>Note:</strong> Our groomer will arrive at your specified address on the scheduled date and time.
            Please ensure your pet is ready and accessible. You will receive a confirmation email shortly.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link
            to="/services"
            className="bg-brand-gold hover:bg-brand-gold/90 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base"
          >
            Book Another Service
          </Link>
          <Link
            to="/"
            className="bg-gray-200 text-gray-700 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-sm sm:text-base"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Confirmation

