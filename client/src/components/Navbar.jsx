import { Link } from 'react-router-dom'
import Logo from './Logo'

function Navbar() {
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18 md:h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
              <Logo />
            </Link>
          </div>
          <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-brand-navy px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm md:text-base font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/services"
              className="text-gray-700 hover:text-brand-navy px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm md:text-base font-medium transition-colors"
            >
              Services
            </Link>
            <Link
              to="/register"
              className="bg-brand-gold hover:bg-brand-gold/90 text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

