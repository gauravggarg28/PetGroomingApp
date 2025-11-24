const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Data storage paths
const DATA_DIR = path.join(__dirname, 'data');
const SERVICES_FILE = path.join(DATA_DIR, 'services.json');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');
const CUSTOMERS_FILE = path.join(DATA_DIR, 'customers.json');

// Ensure data directory exists
try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
} catch (error) {
  console.error('Error creating data directory:', error);
  process.exit(1);
}

// Initialize data files if they don't exist
try {
  if (!fs.existsSync(SERVICES_FILE)) {
    const defaultServices = [
      {
        id: 1,
        name: "Basic",
        description: "Essential grooming including bath, brush, nail trim, and ear cleaning",
        duration: 60,
        price: 500,
        image: "🐕"
      },
      {
        id: 2,
        name: "Bath & Hygiene",
        description: "Comprehensive bath with deep cleaning, nail trimming, ear cleaning, and dental care",
        duration: 75,
        price: 800,
        image: "🛁"
      },
      {
        id: 3,
        name: "Full Grooming",
        description: "Complete grooming package including haircut, styling, bath, nail trim, ear cleaning, and spa treatment",
        duration: 120,
        price: 1200,
        image: "✨"
      }
    ];
    fs.writeFileSync(SERVICES_FILE, JSON.stringify(defaultServices, null, 2));
    console.log('Initialized services.json');
  }

  if (!fs.existsSync(BOOKINGS_FILE)) {
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify([], null, 2));
    console.log('Initialized bookings.json');
  }

  if (!fs.existsSync(CUSTOMERS_FILE)) {
    fs.writeFileSync(CUSTOMERS_FILE, JSON.stringify([], null, 2));
    console.log('Initialized customers.json');
  }
} catch (error) {
  console.error('Warning: Could not initialize data files:', error.message);
  // Don't exit - server can still run, data will be created on first write
}

// Helper functions
const readServices = () => {
  try {
    const data = fs.readFileSync(SERVICES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const readBookings = () => {
  try {
    const data = fs.readFileSync(BOOKINGS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeBookings = (bookings) => {
  try {
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
  } catch (error) {
    console.error('Error writing bookings:', error);
    throw error;
  }
};

const readCustomers = () => {
  try {
    const data = fs.readFileSync(CUSTOMERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeCustomers = (customers) => {
  try {
    fs.writeFileSync(CUSTOMERS_FILE, JSON.stringify(customers, null, 2));
  } catch (error) {
    console.error('Error writing customers:', error);
    throw error;
  }
};

// Routes

// Get all services
app.get('/api/services', (req, res) => {
  const services = readServices();
  res.json(services);
});

// Get service by ID
app.get('/api/services/:id', (req, res) => {
  const services = readServices();
  const service = services.find(s => s.id === parseInt(req.params.id));
  if (service) {
    res.json(service);
  } else {
    res.status(404).json({ error: 'Service not found' });
  }
});

// Get all bookings
app.get('/api/bookings', (req, res) => {
  const bookings = readBookings();
  res.json(bookings);
});

// Customer Registration
app.post('/api/customers', (req, res) => {
  const { customerName, phone, address, email, pets } = req.body;

  // Validation
  if (!customerName || !phone || !address || !pets || pets.length === 0) {
    return res.status(400).json({ error: 'Customer name, phone, address, and at least one pet are required' });
  }

  const customers = readCustomers();
  
  // Check if customer with same phone already exists
  const existingCustomer = customers.find(c => c.phone === phone);
  if (existingCustomer) {
    // Update existing customer
    existingCustomer.customerName = customerName;
    existingCustomer.address = address;
    if (email) existingCustomer.email = email;
    
    // Merge pets (avoid duplicates)
    pets.forEach(newPet => {
      const existingPet = existingCustomer.pets.find(p => 
        p.petName === newPet.petName && p.petType === newPet.petType
      );
      if (!existingPet) {
        existingCustomer.pets.push({
          ...newPet,
          id: existingCustomer.pets.length > 0 
            ? Math.max(...existingCustomer.pets.map(p => p.id)) + 1 
            : 1
        });
      }
    });
    
    writeCustomers(customers);
    return res.status(200).json(existingCustomer);
  }

  // Create new customer
  const newCustomer = {
    id: customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1,
    customerName,
    phone,
    address,
    email: email || '',
    pets: pets.map((pet, index) => ({
      ...pet,
      id: index + 1
    })),
    createdAt: new Date().toISOString()
  };

  customers.push(newCustomer);
  writeCustomers(customers);

  res.status(201).json(newCustomer);
});

// Get customer by phone
app.get('/api/customers/phone/:phone', (req, res) => {
  const customers = readCustomers();
  const customer = customers.find(c => c.phone === req.params.phone);
  if (customer) {
    res.json(customer);
  } else {
    res.status(404).json({ error: 'Customer not found' });
  }
});

// Get customer by ID
app.get('/api/customers/:id', (req, res) => {
  const customers = readCustomers();
  const customer = customers.find(c => c.id === parseInt(req.params.id));
  if (customer) {
    res.json(customer);
  } else {
    res.status(404).json({ error: 'Customer not found' });
  }
});

// Create a new booking
app.post('/api/bookings', (req, res) => {
  const { customerId, petId, serviceId, date, time } = req.body;

  // Validation
  if (!customerId || !petId || !serviceId || !date || !time) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const customers = readCustomers();
  const customer = customers.find(c => c.id === parseInt(customerId));
  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }

  const pet = customer.pets.find(p => p.id === parseInt(petId));
  if (!pet) {
    return res.status(404).json({ error: 'Pet not found' });
  }

  const services = readServices();
  const service = services.find(s => s.id === parseInt(serviceId));
  if (!service) {
    return res.status(404).json({ error: 'Service not found' });
  }

  const bookings = readBookings();
  const newBooking = {
    id: bookings.length > 0 ? Math.max(...bookings.map(b => b.id)) + 1 : 1,
    customerId: parseInt(customerId),
    customerName: customer.customerName,
    phone: customer.phone,
    email: customer.email,
    address: customer.address,
    petId: parseInt(petId),
    petName: pet.petName,
    petType: pet.petType,
    petBreed: pet.breed,
    petGender: pet.gender,
    serviceId: parseInt(serviceId),
    serviceName: service.name,
    date,
    time,
    status: 'confirmed',
    createdAt: new Date().toISOString()
  };

  bookings.push(newBooking);
  writeBookings(bookings);

  res.status(201).json(newBooking);
});

// Get booking by ID
app.get('/api/bookings/:id', (req, res) => {
  const bookings = readBookings();
  const booking = bookings.find(b => b.id === parseInt(req.params.id));
  if (booking) {
    res.json(booking);
  } else {
    res.status(404).json({ error: 'Booking not found' });
  }
});

// Health check endpoint for Render
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Pet Grooming API is running', version: '1.0.0' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// Start server - bind to 0.0.0.0 for Render
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Health check: http://0.0.0.0:${PORT}/health`);
});

// Handle server errors gracefully
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
  } else {
    console.error('Server error:', error);
  }
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Don't exit - let the server try to continue
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Don't exit - let the server try to continue
});

