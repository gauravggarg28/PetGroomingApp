import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="w-full">
      {/* Hero Banner Section */}
      <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[85vh] overflow-hidden mb-8 sm:mb-12 md:mb-16">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/banner-grooming.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 via-brand-navy/80 to-brand-navy/70"></div>
        </div>
        
        {/* Fallback if image doesn't exist - hidden by default, shown only if image fails to load */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-blue-900 to-brand-navy flex items-center justify-center hidden">
          <div className="text-white text-center px-4">
            <p className="text-sm sm:text-base">Please add banner-grooming.jpg to /client/public/images/</p>
          </div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 drop-shadow-2xl">
              Professional Pet Grooming
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white mb-6 sm:mb-8 drop-shadow-lg font-light">
              Right at Your Doorstep
            </p>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-10 drop-shadow-md max-w-2xl mx-auto">
              Expert care for your beloved pets. Book now and let our professional groomers pamper your furry friends at home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <Link
                to="/register"
                className="inline-block bg-brand-gold hover:bg-brand-gold/90 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-lg text-base sm:text-lg md:text-xl font-bold transition-all duration-300 shadow-2xl hover:shadow-brand-gold/50 hover:scale-105 transform"
              >
                Register Now
              </Link>
              <Link
                to="/services"
                className="inline-block bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white px-8 sm:px-10 py-3 sm:py-4 rounded-lg text-base sm:text-lg md:text-xl font-bold transition-all duration-300 shadow-xl hover:scale-105 transform"
              >
                Browse Services
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">

      {/* Features Section */}
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🏠</div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">At Your Home</h3>
          <p className="text-sm sm:text-base text-gray-600">
            We come to you! No need to travel - our professional groomers visit your home.
          </p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">⏰</div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">Flexible Scheduling</h3>
          <p className="text-sm sm:text-base text-gray-600">
            Book at your convenience. Choose the date and time that works best for you.
          </p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">✨</div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">Expert Care</h3>
          <p className="text-sm sm:text-base text-gray-600">
            Professional groomers with years of experience caring for all types of pets.
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 mb-8 sm:mb-12 md:mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">How It Works</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="text-center">
            <div className="bg-primary-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl font-bold text-primary-600">1</span>
            </div>
            <h3 className="text-sm sm:text-base font-semibold mb-1 sm:mb-2">Register</h3>
            <p className="text-xs sm:text-sm text-gray-600">Create your account and add your pets</p>
          </div>
          <div className="text-center">
            <div className="bg-primary-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl font-bold text-primary-600">2</span>
            </div>
            <h3 className="text-sm sm:text-base font-semibold mb-1 sm:mb-2">Select Service</h3>
            <p className="text-xs sm:text-sm text-gray-600">Choose the perfect service for your pet</p>
          </div>
          <div className="text-center">
            <div className="bg-primary-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl font-bold text-primary-600">3</span>
            </div>
            <h3 className="text-sm sm:text-base font-semibold mb-1 sm:mb-2">Book Appointment</h3>
            <p className="text-xs sm:text-sm text-gray-600">Pick a date and time</p>
          </div>
          <div className="text-center">
            <div className="bg-primary-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl font-bold text-primary-600">4</span>
            </div>
            <h3 className="text-sm sm:text-base font-semibold mb-1 sm:mb-2">Enjoy Service</h3>
            <p className="text-xs sm:text-sm text-gray-600">Relax while we pamper your pet</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Ready to Book?</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Start by registering your account</p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <Link
            to="/register"
            className="inline-block bg-brand-gold hover:bg-brand-gold/90 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base md:text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Register Now
          </Link>
          <Link
            to="/services"
            className="inline-block bg-white text-brand-navy border-2 border-brand-navy px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base md:text-lg font-semibold hover:bg-brand-navy hover:text-white transition-all duration-300"
          >
            View Services
          </Link>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Home

