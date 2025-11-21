import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await axios.get('/api/services')
      setServices(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching services:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600 text-sm sm:text-base">Loading services...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Our Services</h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600">
          Choose from our range of professional pet grooming services
        </p>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden"
          >
            <div className="p-4 sm:p-6">
              <div className="text-5xl sm:text-6xl mb-3 sm:mb-4 text-center">{service.image}</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{service.name}</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4">{service.description}</p>
              <div className="flex justify-between items-center mb-4">
                <div className="text-xs sm:text-sm text-gray-500">
                  <span className="font-semibold">Duration:</span> {service.duration} min
                </div>
                <div className="text-xl sm:text-2xl font-bold text-primary-600">
                  ₹{service.price.toLocaleString('en-IN')}
                </div>
              </div>
              <Link
                to={`/booking/${service.id}`}
                className="block w-full bg-brand-gold hover:bg-brand-gold/90 text-white text-center py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base"
              >
                Book Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Services

