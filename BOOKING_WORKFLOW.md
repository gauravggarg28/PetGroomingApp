# BhaoBhao - Customer Booking Workflow

## Overview
This document outlines the complete workflow for customers to book pet grooming services through the BhaoBhao application.

## Booking Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    START: Customer Visits Home                  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
                    ┌────────────────┐
                    │  Browse Home    │
                    │     Page        │
                    └────────┬────────┘
                             │
                             ▼
        ┌────────────────────┴────────────────────┐
        │                                          │
        ▼                                          ▼
┌───────────────┐                        ┌───────────────┐
│   Register    │                        │   Services    │
│   (New User)  │                        │     Page      │
└───────┬───────┘                        └───────┬───────┘
        │                                          │
        │                                          │
        ▼                                          ▼
┌──────────────────────────────────────────────────────┐
│  STEP 1: Customer Registration                       │
│  ────────────────────────────────────────────────────│
│  • Customer Name (Mandatory)                         │
│  • Phone Number (Mandatory)                           │
│  • Address with Google Maps (Mandatory)               │
│  • Email (Optional)                                   │
│  • Add Pet(s):                                        │
│    - Pet Type: Dog or Cat (Mandatory)                │
│    - Breed (Mandatory - from dropdown)               │
│    - Pet Name (Mandatory)                            │
│    - Gender (Mandatory)                              │
│  • Can add multiple pets                              │
│  • Submit → Customer profile created                  │
└──────────────────────────────────────────────────────┘
        │
        ▼
┌──────────────────────────────────────────────────────┐
│  STEP 2: Browse Services                             │
│  ────────────────────────────────────────────────────│
│  • View 3 available services:                         │
│    1. Basic - ₹500 (60 min)                         │
│    2. Bath & Hygiene - ₹800 (75 min)                 │
│    3. Full Grooming - ₹1,200 (120 min)              │
│  • Click "Book Now" on desired service               │
└──────────────────────────────────────────────────────┘
        │
        ▼
┌──────────────────────────────────────────────────────┐
│  STEP 3: Select Pet                                  │
│  ────────────────────────────────────────────────────│
│  Options:                                            │
│  ┌──────────────────────────────────────────────┐    │
│  │ Option A: Use Existing Pet                   │    │
│  │ • Select from dropdown of registered pets    │    │
│  │ • Shows: Pet Name (Type - Breed)             │    │
│  └──────────────────────────────────────────────┘    │
│  ┌──────────────────────────────────────────────┐    │
│  │ Option B: Add New Pet                        │    │
│  │ • Pet Type: Dog or Cat                       │    │
│  │ • Breed: Select from comprehensive list      │    │
│  │ • Pet Name: Enter name                       │    │
│  │ • Gender: Male or Female                     │    │
│  │ • Pet automatically added to profile         │    │
│  └──────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────┘
        │
        ▼
┌──────────────────────────────────────────────────────┐
│  STEP 4: Select Date & Time                          │
│  ────────────────────────────────────────────────────│
│  • Preferred Date:                                   │
│    - Date picker (future dates only)                 │
│    - Cannot select past dates                        │
│  • Preferred Time:                                   │
│    - Time picker (24-hour format)                   │
│  • Both fields are mandatory                         │
└──────────────────────────────────────────────────────┘
        │
        ▼
┌──────────────────────────────────────────────────────┐
│  STEP 5: Confirm Booking                             │
│  ────────────────────────────────────────────────────│
│  • Review all details:                               │
│    - Service name and price                          │
│    - Pet information                                 │
│    - Date and time                                   │
│  • Click "Confirm Booking" button                    │
│  • System validates:                                 │
│    - Customer exists                                 │
│    - Pet exists or is created                        │
│    - Service exists                                  │
│    - Date and time provided                          │
│  • Booking created in system                         │
└──────────────────────────────────────────────────────┘
        │
        ▼
┌──────────────────────────────────────────────────────┐
│  STEP 6: Booking Confirmation                        │
│  ────────────────────────────────────────────────────│
│  • Success message displayed                         │
│  • Booking details shown:                            │
│    - Booking ID                                      │
│    - Service name                                    │
│    - Customer name                                   │
│    - Pet name, type, and breed                       │
│    - Date and time (formatted)                       │
│    - Service address                                 │
│  • Options:                                          │
│    - Book Another Service                            │
│    - Back to Home                                    │
└──────────────────────────────────────────────────────┘
        │
        ▼
┌──────────────────────────────────────────────────────┐
│                    END: Booking Complete              │
└──────────────────────────────────────────────────────┘
```

## Detailed Step-by-Step Process

### Step 1: Customer Registration
**Route:** `/register`

**Prerequisites:** None

**Process:**
1. Customer fills registration form
2. Enters personal information (name, phone, address, optional email)
3. Adds at least one pet with complete details
4. Can add multiple pets in same registration
5. System checks if customer with same phone exists:
   - If exists: Updates customer and merges pets
   - If new: Creates new customer profile
6. Customer ID stored in localStorage for future bookings

**Validation:**
- Customer name: Required
- Phone: Required, must be unique identifier
- Address: Required, can use Google Maps picker
- Email: Optional
- Pet Type: Required (Dog or Cat only)
- Breed: Required (from dropdown list)
- Pet Name: Required
- Gender: Required (Male or Female)

---

### Step 2: Browse Services
**Route:** `/services`

**Prerequisites:** None (but booking requires registration)

**Process:**
1. Customer views all available services
2. Each service card shows:
   - Service name
   - Description
   - Duration
   - Price in ₹ (Indian Rupees)
3. Customer clicks "Book Now" on desired service

**Available Services:**
- **Basic** - ₹500 (60 minutes)
- **Bath & Hygiene** - ₹800 (75 minutes)
- **Full Grooming** - ₹1,200 (120 minutes)

---

### Step 3: Booking Page - Pet Selection
**Route:** `/booking/:serviceId`

**Prerequisites:** Customer must be registered

**Process:**
1. System checks for customer in localStorage
2. If no customer found → Redirects to registration
3. If customer exists → Loads customer profile and pets
4. Customer chooses:
   - **Option A:** Select existing pet from dropdown
   - **Option B:** Add new pet (form appears)
5. If adding new pet:
   - Fills pet information
   - Pet is automatically added to customer profile
   - New pet becomes available for selection

**Pet Selection Logic:**
- If customer has pets → Shows radio buttons (Use Existing / Add New)
- If customer has no pets → Shows "Add New Pet" form directly
- Selected pet ID stored for booking

---

### Step 4: Date & Time Selection
**Route:** `/booking/:serviceId` (same page)

**Process:**
1. Customer selects preferred date:
   - Date picker shows calendar
   - Past dates disabled
   - Can select any future date
2. Customer selects preferred time:
   - Time picker (24-hour format)
   - Can select any time
3. Both fields are mandatory

**Validation:**
- Date: Required, must be future date
- Time: Required

---

### Step 5: Confirm Booking
**Route:** `/booking/:serviceId` (same page)

**Process:**
1. Customer reviews all information:
   - Service details (name, price, duration)
   - Pet information
   - Date and time
2. Clicks "Confirm Booking" button
3. System validates:
   - Customer exists in database
   - Pet exists (or creates new pet)
   - Service exists
   - Date and time provided
4. Booking created with status: "confirmed"
5. Booking includes:
   - Customer information
   - Pet information (name, type, breed, gender)
   - Service information
   - Date and time
   - Customer address (from profile)

**API Call:**
```
POST /api/bookings
Body: {
  customerId: number,
  petId: number,
  serviceId: number,
  date: string (YYYY-MM-DD),
  time: string (HH:MM)
}
```

---

### Step 6: Confirmation Page
**Route:** `/confirmation/:bookingId`

**Process:**
1. Booking confirmation page displays
2. Shows success message with checkmark
3. Displays complete booking details:
   - Booking ID (unique identifier)
   - Service name
   - Customer name
   - Pet name, type, and breed
   - Date (formatted: "Monday, January 15, 2024")
   - Time (formatted: "2:30 PM")
   - Service address
4. Provides action buttons:
   - "Book Another Service" → Goes to services page
   - "Back to Home" → Returns to home page

**Information Displayed:**
- All booking details in organized format
- Note about groomer arrival
- Professional confirmation message

---

## User Experience Flow

### First-Time Customer Journey
1. **Home Page** → Clicks "Register Now" or "Browse Services"
2. **Registration** → Fills form, adds pets
3. **Services Page** → Views services, selects one
4. **Booking Page** → Selects pet, chooses date/time
5. **Confirmation** → Sees booking confirmation

### Returning Customer Journey
1. **Home Page** → Clicks "Browse Services" or "Services" in nav
2. **Services Page** → Views services, selects one
3. **Booking Page** → Selects existing pet OR adds new pet, chooses date/time
4. **Confirmation** → Sees booking confirmation

### Quick Booking Flow (Registered User)
1. **Services** → Click "Book Now"
2. **Booking** → Select pet, date, time → Confirm
3. **Confirmation** → Done!

---

## Data Flow

### Customer Data Storage
```
Customer Profile:
├── ID (auto-generated)
├── Customer Name
├── Phone (unique identifier)
├── Address
├── Email (optional)
├── Pets Array:
│   ├── Pet ID
│   ├── Pet Type (Dog/Cat)
│   ├── Breed
│   ├── Pet Name
│   └── Gender
└── Created At (timestamp)
```

### Booking Data Storage
```
Booking:
├── ID (auto-generated)
├── Customer ID (reference)
├── Customer Name
├── Phone
├── Email
├── Address
├── Pet ID (reference)
├── Pet Name
├── Pet Type
├── Pet Breed
├── Pet Gender
├── Service ID (reference)
├── Service Name
├── Date
├── Time
├── Status (confirmed)
└── Created At (timestamp)
```

---

## Error Handling

### Registration Errors
- Missing mandatory fields → Alert shown
- Invalid phone format → Validation error
- Address not selected → Alert shown

### Booking Errors
- Customer not registered → Redirect to registration
- Pet not selected → Alert shown
- Date/time not selected → Alert shown
- Service not found → Error message displayed
- API errors → Error message with retry option

---

## Technical Implementation

### Frontend Routes
- `/` - Home page
- `/register` - Customer registration
- `/services` - Browse services
- `/booking/:serviceId` - Book service
- `/confirmation/:bookingId` - Booking confirmation

### Backend API Endpoints
- `POST /api/customers` - Register/update customer
- `GET /api/customers/:id` - Get customer by ID
- `GET /api/customers/phone/:phone` - Get customer by phone
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `POST /api/bookings` - Create booking
- `GET /api/bookings/:id` - Get booking by ID

### State Management
- Customer ID stored in localStorage
- Customer phone stored in localStorage
- Automatic customer lookup on booking page
- Pet selection state managed in component

---

## Future Enhancements

1. **Time Slot Availability**
   - Check available time slots
   - Prevent double bookings
   - Show unavailable times

2. **Booking Modifications**
   - Edit existing bookings
   - Cancel bookings
   - Reschedule appointments

3. **Notifications**
   - Email confirmation
   - SMS reminders
   - Booking status updates

4. **Payment Integration**
   - Online payment
   - Payment confirmation
   - Invoice generation

5. **Service History**
   - View past bookings
   - Booking history for pets
   - Repeat booking option

---

## Summary

The booking workflow is designed to be:
- **Simple:** Clear steps from registration to confirmation
- **Flexible:** Can add pets during booking or use existing ones
- **User-friendly:** Mobile-responsive, intuitive interface
- **Efficient:** Minimal steps for returning customers
- **Complete:** All necessary information captured and displayed

The entire process takes approximately 2-3 minutes for a new customer and 1 minute for a returning customer.

