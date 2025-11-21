# BhaoBhao - Pet Grooming Booking App

A modern, mobile-friendly web application for BhaoBhao pet grooming company where customers can register, browse services, and book appointments at their convenience. The app supports customer profiles with multiple pets and uses Google Maps for address selection.

## Features

- 🏠 **Home Service**: Book grooming services that come to your home
- ⏰ **Flexible Scheduling**: Choose your preferred date and time
- 🐾 **Pet Management**: Register multiple pets in your profile
- 📍 **Google Maps Integration**: Select address using Google Maps API
- 📱 **Mobile-First Design**: Fully responsive and optimized for mobile devices
- 💰 **Indian Rupees**: All pricing in ₹ (INR)
- ✨ **Modern UI**: Beautiful, responsive design with Tailwind CSS

## Tech Stack

- **Frontend**: React 18 with Vite
- **Backend**: Node.js with Express
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios

## Project Structure

```
pet-grooming-app/
├── client/          # React frontend application
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/      # Page components
│   │   └── App.jsx     # Main app component
│   └── package.json
├── server/          # Express backend API
│   ├── data/        # JSON data storage
│   ├── index.js     # Server entry point
│   └── package.json
└── package.json     # Root package.json
```

## Installation

1. **Install all dependencies** (root, server, and client):
   ```bash
   npm run install-all
   ```

   Or install manually:
   ```bash
   npm install
   cd server && npm install
   cd ../client && npm install
   ```

## Running the Application

### Development Mode (Recommended)

Run both frontend and backend concurrently:
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:3001`
- Frontend development server on `http://localhost:3000`

### Run Separately

**Backend only:**
```bash
npm run server
```

**Frontend only:**
```bash
npm run client
```

## Usage

1. **Register**: Create your customer account by providing:
   - Your name and phone number (mandatory)
   - Your address (with Google Maps integration)
   - Email (optional)
   - Add at least one pet with:
     - Pet type (Dog or Cat - mandatory)
     - Breed (from comprehensive list - mandatory)
     - Pet name (mandatory)
     - Gender (mandatory)

2. **Browse Services**: Visit the services page to see available grooming packages
3. **Select Service**: Click "Book Now" on any service card
4. **Book Appointment**: 
   - Select an existing pet from your profile OR add a new pet
   - Choose preferred date and time
5. **View Confirmation**: See your booking confirmation with all details

## API Endpoints

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID

### Customers
- `POST /api/customers` - Register a new customer or update existing
- `GET /api/customers/:id` - Get customer by ID
- `GET /api/customers/phone/:phone` - Get customer by phone number

### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get booking by ID
- `POST /api/bookings` - Create a new booking (requires customer and pet IDs)

## Available Services

The app comes with 3 pre-configured services (pricing in Indian Rupees):
1. **Basic** - ₹500 (60 min)
   - Essential grooming including bath, brush, nail trim, and ear cleaning
2. **Bath & Hygiene** - ₹800 (75 min)
   - Comprehensive bath with deep cleaning, nail trimming, ear cleaning, and dental care
3. **Full Grooming** - ₹1,200 (120 min)
   - Complete grooming package including haircut, styling, bath, nail trim, ear cleaning, and spa treatment

## Environment Variables

Create a `.env` file in the `client/` directory with your Google Maps API key:

```
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

To get a Google Maps API key:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable "Places API" and "Maps JavaScript API"
4. Create credentials (API Key)
5. Add the key to your `.env` file

## Data Storage

Currently, the app uses JSON files for data storage located in `server/data/`:
- `services.json` - Available services
- `bookings.json` - Customer bookings
- `customers.json` - Customer profiles and pet information

This can be easily migrated to a database (MongoDB, PostgreSQL, etc.) in the future.

## Pet Breeds

The app includes comprehensive breed lists:
- **Dogs**: 50+ breeds including Labrador, German Shepherd, Golden Retriever, and more
- **Cats**: 35+ breeds including Persian, Maine Coon, British Shorthair, and more

## Mobile Optimization

The app is fully optimized for mobile devices with:
- Responsive design using Tailwind CSS breakpoints
- Touch-friendly buttons and inputs
- Optimized font sizes and spacing
- Mobile-first layout approach
- Sticky navigation bar

## Future Enhancements

- Payment integration
- Email/SMS notifications
- Calendar view for available time slots
- Service provider dashboard
- Customer review system
- Recurring appointment scheduling
- Image upload for pets
- Service history tracking

## License

ISC

