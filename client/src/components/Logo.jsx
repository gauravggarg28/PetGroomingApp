function Logo({ className = "" }) {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/images/logo.png" 
        alt="BhaoBhao Logo" 
        className="h-10 sm:h-12 md:h-14 w-auto object-contain"
        onError={(e) => {
          // Fallback if image doesn't exist
          e.target.style.display = 'none'
          e.target.nextSibling.style.display = 'flex'
        }}
      />
      <div className="flex items-center hidden" style={{ display: 'none' }}>
        <div className="flex flex-col">
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary-600 leading-tight">
            Bhao
          </span>
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary-600 leading-tight -mt-1">
            Bhao
          </span>
        </div>
        <div className="ml-2 w-8 h-8 sm:w-10 sm:h-10 bg-primary-600 rounded-full flex items-center justify-center">
          <span className="text-white text-lg sm:text-xl">🐕</span>
        </div>
      </div>
    </div>
  )
}

export default Logo

