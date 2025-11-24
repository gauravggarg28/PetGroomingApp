import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../utils/api'
import { dogBreeds, catBreeds } from '../utils/breeds'
import BookingProgress from '../components/BookingProgress'

function Booking() {
  const { serviceId } = useParams()
  const navigate = useNavigate()
  const [service, setService] = useState(null)
  const [customer, setCustomer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [useExistingPet, setUseExistingPet] = useState(true)
  const [selectedPetId, setSelectedPetId] = useState('')
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    petType: '',
    breed: '',
    petName: '',
    gender: ''
  })

  useEffect(() => {
    fetchService()
    fetchCustomer()
  }, [serviceId])

  const fetchService = async () => {
    try {
      const response = await api.get(`/api/services/${serviceId}`)
      setService(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching service:', error)
      setLoading(false)
    }
  }

  const fetchCustomer = async () => {
    const customerId = localStorage.getItem('customerId')
    const customerPhone = localStorage.getItem('customerPhone')
    
    if (customerId) {
      try {
        const response = await api.get(`/api/customers/${customerId}`)
        setCustomer(response.data)
        if (response.data.pets.length > 0) {
          setSelectedPetId(response.data.pets[0].id.toString())
          setCurrentStep(2) // Move to date/time step if pet is selected
        }
      } catch (error) {
        console.error('Error fetching customer:', error)
      }
    } else if (customerPhone) {
      try {
        const response = await api.get(`/api/customers/phone/${customerPhone}`)
        setCustomer(response.data)
        localStorage.setItem('customerId', response.data.id)
        if (response.data.pets.length > 0) {
          setSelectedPetId(response.data.pets[0].id.toString())
        }
      } catch (error) {
        console.error('Error fetching customer:', error)
      }
    } else {
      // No customer registered, redirect to registration
      navigate('/register')
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    let petId, petData

    if (useExistingPet && customer && customer.pets.length > 0) {
      if (!selectedPetId) {
        alert('Please select a pet')
        setSubmitting(false)
        return
      }
      petId = parseInt(selectedPetId)
      const selectedPet = customer.pets.find(p => p.id === petId)
      petData = selectedPet
    } else {
      // Validate new pet fields
      if (!formData.petType || !formData.breed || !formData.petName || !formData.gender) {
        alert('Please fill all pet information fields')
        setSubmitting(false)
        return
      }
      // Add new pet to customer profile first
      try {
        const updatedCustomer = {
          ...customer,
          pets: [...customer.pets, {
            id: customer.pets.length > 0 ? Math.max(...customer.pets.map(p => p.id)) + 1 : 1,
            petType: formData.petType,
            breed: formData.breed,
            petName: formData.petName,
            gender: formData.gender
          }]
        }
        await api.post('/api/customers', updatedCustomer)
        petId = updatedCustomer.pets[updatedCustomer.pets.length - 1].id
        petData = updatedCustomer.pets[updatedCustomer.pets.length - 1]
      } catch (error) {
        console.error('Error adding pet:', error)
        alert('Failed to add pet. Please try again.')
        setSubmitting(false)
        return
      }
    }

    if (!formData.date || !formData.time) {
      alert('Please select date and time')
      setSubmitting(false)
      return
    }

    try {
      const response = await api.post('/api/bookings', {
        customerId: customer.id,
        petId: petId,
        serviceId: parseInt(serviceId),
        date: formData.date,
        time: formData.time
      })
      navigate(`/confirmation/${response.data.id}`)
    } catch (error) {
      console.error('Error creating booking:', error)
      alert('Failed to create booking. Please try again.')
      setSubmitting(false)
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

  if (!service) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="text-center">
          <p className="text-red-600 text-sm sm:text-base">Service not found</p>
        </div>
      </div>
    )
  }

  if (!customer) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="text-center">
          <p className="text-gray-600 text-sm sm:text-base mb-4">Please register first</p>
            <button
              onClick={() => navigate('/register')}
              className="bg-brand-gold text-white px-6 py-2 rounded-lg hover:bg-brand-gold/90 transition-all duration-300"
            >
              Go to Registration
            </button>
        </div>
      </div>
    )
  }

  const today = new Date().toISOString().split('T')[0]
  const getBreedOptions = (petType) => {
    return petType === 'Dog' ? dogBreeds : petType === 'Cat' ? catBreeds : []
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
        <div className="mb-6 sm:mb-8">
          <div className="text-5xl sm:text-6xl text-center mb-3 sm:mb-4">{service.image}</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-2">
            Book {service.name}
          </h1>
          <p className="text-center text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">{service.description}</p>
          <div className="text-center">
            <span className="text-xl sm:text-2xl font-bold text-primary-600">₹{service.price.toLocaleString('en-IN')}</span>
            <span className="text-gray-500 ml-2 text-sm sm:text-base">({service.duration} minutes)</span>
          </div>
        </div>

        {/* Booking Progress Indicator */}
        <BookingProgress currentStep={currentStep} />

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Pet Selection */}
          {customer.pets.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Select Pet</h2>
              <div className="flex items-center space-x-4 mb-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={useExistingPet}
                    onChange={() => setUseExistingPet(true)}
                    className="mr-2"
                  />
                  <span className="text-sm sm:text-base">Use Existing Pet</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={!useExistingPet}
                    onChange={() => setUseExistingPet(false)}
                    className="mr-2"
                  />
                  <span className="text-sm sm:text-base">Add New Pet</span>
                </label>
              </div>

              {useExistingPet && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Pet *
                  </label>
                  <select
                    value={selectedPetId}
                    onChange={(e) => {
                      setSelectedPetId(e.target.value)
                      if (e.target.value) setCurrentStep(2)
                    }}
                    required={useExistingPet}
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent text-sm sm:text-base"
                  >
                    <option value="">Select a pet</option>
                    {customer.pets.map(pet => (
                      <option key={pet.id} value={pet.id}>
                        {pet.petName} ({pet.petType} - {pet.breed})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}

          {/* New Pet Form */}
          {(!useExistingPet || customer.pets.length === 0) && (
            <div className="space-y-4 border border-gray-200 rounded-lg p-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Pet Information</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type of Pet *
                </label>
                <select
                  name="petType"
                  value={formData.petType}
                  onChange={handleChange}
                  required={!useExistingPet}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent text-sm sm:text-base"
                >
                  <option value="">Select pet type</option>
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                </select>
              </div>

              {formData.petType && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Breed *
                  </label>
                  <select
                    name="breed"
                    value={formData.breed}
                    onChange={handleChange}
                    required={!useExistingPet}
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent text-sm sm:text-base"
                  >
                    <option value="">Select breed</option>
                    {getBreedOptions(formData.petType).map(breed => (
                      <option key={breed} value={breed}>{breed}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pet Name *
                </label>
                <input
                  type="text"
                  name="petName"
                  value={formData.petName}
                  onChange={handleChange}
                  required={!useExistingPet}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent text-sm sm:text-base"
                  placeholder="Enter pet name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required={!useExistingPet}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent text-sm sm:text-base"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          )}

          {/* Date and Time */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Date *
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={(e) => {
                  handleChange(e)
                  if (e.target.value && formData.time) setCurrentStep(3)
                  else if (e.target.value) setCurrentStep(2)
                }}
                required
                min={today}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent text-sm sm:text-base"
              />
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Time *
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={(e) => {
                  handleChange(e)
                  if (e.target.value && formData.date) setCurrentStep(3)
                  else if (e.target.value) setCurrentStep(2)
                }}
                required
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent text-sm sm:text-base"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-brand-gold hover:bg-brand-gold/90 text-white py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              {submitting ? 'Booking...' : 'Confirm Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Booking
