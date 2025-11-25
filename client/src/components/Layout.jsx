import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'

function Layout({ children }) {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')
  
  if (isAdminRoute) {
    return <>{children}</>
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <Navbar />
      {children}
    </div>
  )
}

export default Layout

