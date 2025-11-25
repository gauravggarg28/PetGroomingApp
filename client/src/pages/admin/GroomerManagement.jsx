import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../utils/api'

function GroomerManagement() {
  const navigate = useNavigate()
  const [groomers, setGroomers] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    sex: '',
    address: '',
    idProof: '',
    photo: '',
    workingDays: [],
    timeSlots: [],
    paymentType: 'salary', // 'salary' or 'variable'
    salary: '',
    commission: ''
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (localStorage.getItem('adminAuth') !== 'true') {
      navigate('/admin/login')
      return
    }
    fetchGroomers()
  }, [navigate])

  const fetchGroomers = async () => {
    try {
      const response = await api.get('/api/groomers')
      setGroomers(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching groomers:', error)
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleWorkingDayToggle = (day) => {
    setFormData(prev => ({
      ...prev,
      workingDays: prev.workingDays.includes(day)
        ? prev.workingDays.filter(d => d !== day)
        : [...prev.workingDays, day]
    }))
  }

  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 8; hour <= 18; hour += 2) {
      slots.push(`${hour}:00 - ${hour + 2}:00`)
    }
    return slots
  }

  const handleTimeSlotToggle = (slot) => {
    setFormData(prev => ({
      ...prev,
      timeSlots: prev.timeSlots.includes(slot)
        ? prev.timeSlots.filter(s => s !== slot)
        : [...prev.timeSlots, slot]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/api/groomers', formData)
      alert('Groomer registered successfully!')
      setShowForm(false)
      setFormData({
        name: '',
        age: '',
        sex: '',
        address: '',
        idProof: '',
        photo: '',
        workingDays: [],
        timeSlots: [],
        paymentType: 'salary',
        salary: '',
        commission: ''
      })
      fetchGroomers()
    } catch (error) {
      console.error('Error registering groomer:', error)
      alert('Failed to register groomer')
    }
  }

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const timeSlots = generateTimeSlots()

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Groomer Management</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-brand-gold hover:bg-brand-gold/90 text-white px-4 py-2 rounded-lg"
            >
              {showForm ? 'Cancel' : 'Add New Groomer'}
            </button>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Register New Groomer</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age *</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sex *</label>
                  <select
                    name="sex"
                    value={formData.sex}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Type *</label>
                  <select
                    name="paymentType"
                    value={formData.paymentType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  >
                    <option value="salary">On Salary</option>
                    <option value="variable">Variable Pay</option>
                  </select>
                </div>
                {formData.paymentType === 'salary' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Salary (₹) *</label>
                    <input
                      type="number"
                      name="salary"
                      value={formData.salary}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      required={formData.paymentType === 'salary'}
                    />
                  </div>
                )}
                {formData.paymentType === 'variable' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Commission (%) *</label>
                    <input
                      type="number"
                      name="commission"
                      value={formData.commission}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      required={formData.paymentType === 'variable'}
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  rows="3"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ID Proof *</label>
                  <input
                    type="text"
                    name="idProof"
                    value={formData.idProof}
                    onChange={handleInputChange}
                    placeholder="Aadhar/PAN Number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
                  <input
                    type="text"
                    name="photo"
                    value={formData.photo}
                    onChange={handleInputChange}
                    placeholder="Photo URL or path"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Working Days *</label>
                <div className="flex flex-wrap gap-2">
                  {daysOfWeek.map(day => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleWorkingDayToggle(day)}
                      className={`px-4 py-2 rounded-lg ${
                        formData.workingDays.includes(day)
                          ? 'bg-brand-gold text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Available Time Slots (2-hour slots) *</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {timeSlots.map(slot => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => handleTimeSlotToggle(slot)}
                      className={`px-4 py-2 rounded-lg text-sm ${
                        formData.timeSlots.includes(slot)
                          ? 'bg-brand-gold text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-brand-gold hover:bg-brand-gold/90 text-white py-3 rounded-lg font-semibold"
              >
                Register Groomer
              </button>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-4 sm:px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-xl font-semibold">All Groomers</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Age</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Working Days</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time Slots</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {groomers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-4 py-8 text-center text-gray-500">No groomers registered</td>
                  </tr>
                ) : (
                  groomers.map(groomer => (
                    <tr key={groomer.id}>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">{groomer.name}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">{groomer.age}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        {groomer.paymentType === 'salary' 
                          ? `Salary: ₹${groomer.salary}` 
                          : `Commission: ${groomer.commission}%`}
                      </td>
                      <td className="px-4 py-4 text-sm">{groomer.workingDays.join(', ')}</td>
                      <td className="px-4 py-4 text-sm">{groomer.timeSlots.join(', ')}</td>
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

export default GroomerManagement

