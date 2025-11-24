import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'
import GoogleMapPicker from '../components/GoogleMapPicker'
import { dogBreeds, catBreeds } from '../utils/breeds'

function Register() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    address: '',
    email: '',
    pets: [{
      petType: '',
      breed: '',
      petName: '',
      gender: ''
    }]
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePetChange = (index, field, value) => {
    setFormData(prev => {
      const newPets = [...prev.pets]
      newPets[index] = {
        ...newPets[index],
        [field]: value,
        // Reset breed when pet type changes
        ...(field === 'petType' ? { breed: '' } : {})
      }
      return { ...prev, pets: newPets }
    })
  }

  const handleAddressSelect = (address) => {
    setFormData(prev => ({ ...prev, address }))
  }

  const addPet = () => {
    setFormData(prev => ({
      ...prev,
      pets: [...prev.pets, {
        petType: '',
        breed: '',
        petName: '',
        gender: ''
      }]
    }))
  }

  const removePet = (index) => {
    setFormData(prev => ({
      ...prev,
      pets: prev.pets.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    // Validation
    if (!formData.customerName || !formData.phone || !formData.address) {
      alert('Please fill all mandatory fields')
      setSubmitting(false)
      return
    }

    if (formData.pets.some(pet => !pet.petType || !pet.breed || !pet.petName || !pet.gender)) {
      alert('Please fill all mandatory fields for all pets')
      setSubmitting(false)
      return
    }

    try {
      const response = await api.post('/api/customers', formData)
      // Store customer ID in localStorage for future bookings
      localStorage.setItem('customerId', response.data.id)
      localStorage.setItem('customerPhone', response.data.phone)
      navigate('/services')
    } catch (error) {
      console.error('Error registering customer:', error)
      alert('Failed to register. Please try again.')
      setSubmitting(false)
    }
  }

  const getBreedOptions = (petType) => {
    return petType === 'Dog' ? dogBreeds : petType === 'Cat' ? catBreeds : []
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-center">
          Customer Registration
        </h1>
        <p className="text-center text-gray-600 mb-6 text-sm sm:text-base">
          Register to book grooming services for your pets
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Customer Information */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 border-b pb-2">
              Customer Information
            </h2>

            <div>
              <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
                Customer Name *
              </label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
                placeholder="+91 9876543210"
                pattern="[0-9+\s-]+"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address *
              </label>
              <GoogleMapPicker
                onLocationSelect={handleAddressSelect}
                initialAddress={formData.address}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email (Optional)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          {/* Pet Information */}
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Pet Information
              </h2>
              <button
                type="button"
                onClick={addPet}
                className="text-sm sm:text-base text-primary-600 hover:text-primary-700 font-medium"
              >
                + Add Pet
              </button>
            </div>

            {formData.pets.map((pet, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                {formData.pets.length > 1 && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Pet {index + 1}</span>
                    <button
                      type="button"
                      onClick={() => removePet(index)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type of Pet *
                  </label>
                  <select
                    value={pet.petType}
                    onChange={(e) => handlePetChange(index, 'petType', e.target.value)}
                    required
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
                  >
                    <option value="">Select pet type</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                  </select>
                </div>

                {pet.petType && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Breed *
                    </label>
                    <select
                      value={pet.breed}
                      onChange={(e) => handlePetChange(index, 'breed', e.target.value)}
                      required
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
                    >
                      <option value="">Select breed</option>
                      {getBreedOptions(pet.petType).map(breed => (
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
                    value={pet.petName}
                    onChange={(e) => handlePetChange(index, 'petName', e.target.value)}
                    required
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Enter pet name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender *
                  </label>
                  <select
                    value={pet.gender}
                    onChange={(e) => handlePetChange(index, 'gender', e.target.value)}
                    required
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-brand-gold hover:bg-brand-gold/90 text-white py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              {submitting ? 'Registering...' : 'Register & Continue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register

