function BookingProgress({ currentStep = 1 }) {
  const steps = [
    { number: 1, label: 'Select Pet', completed: currentStep > 1, active: currentStep === 1 },
    { number: 2, label: 'Date & Time', completed: currentStep > 2, active: currentStep === 2 },
    { number: 3, label: 'Confirm', completed: currentStep > 3, active: currentStep === 3 }
  ]

  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            {/* Step Circle */}
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-sm sm:text-base transition-all duration-300 ${
                  step.completed
                    ? 'bg-brand-gold text-white shadow-lg'
                    : step.active
                    ? 'bg-brand-gold text-white shadow-lg ring-4 ring-brand-gold/20'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step.completed ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              <span
                className={`mt-2 text-xs sm:text-sm font-medium hidden sm:block ${
                  step.active || step.completed ? 'text-brand-navy' : 'text-gray-500'
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 sm:mx-4 transition-all duration-300 ${
                  step.completed ? 'bg-brand-gold' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default BookingProgress

