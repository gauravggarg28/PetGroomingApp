import { useState, useRef, useEffect } from 'react'

function GoogleMapPicker({ onLocationSelect, initialAddress = '' }) {
  const [address, setAddress] = useState(initialAddress)
  const [showMap, setShowMap] = useState(false)
  const mapRef = useRef(null)
  const autocompleteRef = useRef(null)

  useEffect(() => {
    if (showMap && window.google) {
      initAutocomplete()
    } else if (showMap) {
      // Load Google Maps API
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = () => {
        initAutocomplete()
      }
      document.head.appendChild(script)
    }
  }, [showMap])

  const initAutocomplete = () => {
    if (!window.google) return

    const input = document.getElementById('address-input')
    if (!input) return

    const autocomplete = new window.google.maps.places.Autocomplete(input, {
      componentRestrictions: { country: 'in' }, // Restrict to India
      fields: ['formatted_address', 'geometry', 'name']
    })

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      if (place.geometry) {
        const selectedAddress = place.formatted_address || place.name
        setAddress(selectedAddress)
        onLocationSelect(selectedAddress)
        setShowMap(false)
      }
    })

    autocompleteRef.current = autocomplete
  }

  const handleAddressChange = (e) => {
    setAddress(e.target.value)
    onLocationSelect(e.target.value)
  }

  return (
    <div className="w-full">
      <div className="flex gap-2 mb-2">
        <input
          id="address-input"
          type="text"
          value={address}
          onChange={handleAddressChange}
          placeholder="Enter your address or click to select on map"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
        />
        <button
          type="button"
          onClick={() => setShowMap(!showMap)}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm whitespace-nowrap"
        >
          {showMap ? 'Hide Map' : 'Select on Map'}
        </button>
      </div>
      {showMap && (
        <div className="mt-2 border border-gray-300 rounded-lg overflow-hidden">
          <div
            ref={mapRef}
            id="map"
            className="w-full h-64 bg-gray-200"
            style={{ minHeight: '256px' }}
          >
            <p className="text-center text-gray-500 py-20">
              Google Maps will load here. Please enter your address in the field above or ensure Google Maps API key is configured.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default GoogleMapPicker

