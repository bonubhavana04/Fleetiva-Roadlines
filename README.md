# 🚚 Fleetiva-Roadlines

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.9-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Firebase](https://img.shields.io/badge/Firebase-12.9-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **A modern, full-stack SaaS platform for logistics and transport management** — Digitizing the entire workflow from load posting to delivery tracking with smart matching algorithms, real-time updates, and automated documentation.

---

## 📖 About Fleetiva-Roadlines

**Fleetiva-Roadlines** is a comprehensive **Multi-Tenant Logistics & Fleet Management System** built on the MERN stack with Firebase integration. It bridges the gap between load owners and truck operators by providing an intelligent, automated platform that eliminates manual processes and middlemen inefficiencies.

### 🎯 Purpose

In traditional logistics, matching loads with available trucks is fragmented, manual, and time-consuming. Fleetiva-Roadlines solves this by:

- **Centralizing Operations**: Single platform for logistics companies to manage customers, drivers, and loads
- **Automating Workflows**: From load posting to delivery confirmation with real-time status tracking
- **Smart Matching**: AI-powered algorithm to match trucks with loads based on capacity, type, and availability
- **Digital Documentation**: Automated generation of Bilty (consignment notes) and GST-compliant invoices
- **Complete Isolation**: Multi-tenant architecture ensuring data privacy between logistics companies

---

## ✨ Key Features

### 🏢 Multi-Tenant Architecture
- **Complete Data Isolation**: Each logistics company operates in a secure, isolated environment
- **Tenant Management**: Dedicated admin controls for each logistics company
- **Scalable Infrastructure**: Built to handle multiple tenants with high performance

### 🔐 Advanced Authentication & Security
- **Firebase Authentication**: Google Sign-In and email/password authentication
- **JWT Token Management**: Secure access/refresh token rotation with 7-day expiry
- **OTP Verification**: SMS-based verification via Twilio integration
- **Password Recovery**: Secure OTP-based forgot password flow
- **Role-Based Access Control (RBAC)**: Granular permissions for Admins, Drivers, and Customers

### 🚛 Smart Load & Truck Management
- **Intelligent Matching Algorithm**: Automatically matches available trucks with loads based on:
  - Vehicle capacity and type
  - Current location and availability
  - Load requirements and specifications
- **Real-Time Availability**: Live tracking of truck status and availability
- **Load Posting**: Customers can post loads with detailed specifications
- **Truck Registration**: Drivers can register and manage their fleet

### 📊 Comprehensive Dashboards
- **Admin Dashboard**: Complete oversight of operations, bookings, and analytics
- **Driver Dashboard**: Manage truck availability, view assigned loads, update delivery status
- **Customer Dashboard**: Post loads, track shipments, view invoices and documentation

### 📄 Automated Documentation
- **Digital Bilty Generation**: 4-copy consignment notes in PDF format using PDFKit
- **GST-Compliant Invoicing**: Automated invoice generation with tax calculations
- **Document Management**: Secure storage and retrieval of all transport documents

### 📍 Real-Time Tracking & Workflow
- **Status Management**: Track shipments through complete lifecycle:
  - `Pending` → `Assigned` → `In-Transit` → `Delivered`
- **Live Updates**: Real-time status notifications for all stakeholders
- **Delivery Confirmation**: Digital proof of delivery with timestamps

### 🔄 Additional Features
- **Redis Caching**: Fast OTP storage and rate limiting
- **API Interceptors**: Automatic token refresh and error handling
- **Responsive UI**: Modern, mobile-friendly interface
- **Profile Management**: Update user details, company information, and preferences

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7.1-CA4245?logo=react-router&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.7-5A29E4?logo=axios&logoColor=white)

- **React.js** (v19.2) - Modern UI library with hooks
- **Vite** - Lightning-fast build tool and dev server
- **React Router DOM** (v7.1) - Client-side routing
- **Axios** - HTTP client with interceptors for token management
- **CSS-in-JS** - Responsive, modern styling

### Backend
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.21-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-8.9-47A248?logo=mongodb&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase_Admin-13.6-FFCA28?logo=firebase&logoColor=black)

- **Node.js** (v18+) - JavaScript runtime
- **Express.js** (v4.21) - Web application framework
- **MongoDB** (v8.9) - NoSQL database
- **Mongoose** - ODM for MongoDB with schema validation
- **Firebase Admin SDK** (v13.6) - Authentication and Firestore integration
- **Redis** (v4.7) - In-memory data store for OTP and caching
- **Twilio** (v5.4) - SMS gateway for OTP delivery
- **PDFKit** (v0.16) - PDF document generation
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing

### Database & Storage
- **MongoDB Atlas** - Primary database (users, loads, trucks, bookings)
- **Firebase Firestore** - Real-time data sync and backup
- **Redis** - Session management and OTP storage

### DevOps & Deployment
- **GitHub Actions** - CI/CD pipeline
- **Vercel** - Frontend hosting (recommended)
- **Render** - Backend hosting (recommended)
- **MongoDB Atlas** - Cloud database hosting

---

## 📋 Local Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v9.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** - [Download](https://git-scm.com/)
- **MongoDB** - Local installation or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- **Redis Server** - [Download](https://redis.io/download) (for local development)
- **Firebase Account** - [Create account](https://firebase.google.com/)
- **Twilio Account** - [Sign up](https://www.twilio.com/) (for SMS features)

### 🔧 Installation Steps

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/Fleetiva-Roadlines.git
cd Fleetiva-Roadlines
```

#### 2️⃣ Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Configure Backend Environment Variables** (see table below)

```bash
# Start Redis server (in a separate terminal)
redis-server

# Start backend development server
npm run dev
```

Backend will run on `http://localhost:5000`

#### 3️⃣ Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Configure Frontend Environment Variables** (see table below)

```bash
# Start frontend development server
npm run dev
```

Frontend will run on `http://localhost:5173`

---

### 🔑 Environment Variables

#### Backend Environment Variables (`backend/.env`)

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `PORT` | Backend server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/fleetiva` or `mongodb+srv://user:pass@cluster.mongodb.net/fleetiva` |
| `ACCESS_TOKEN_SECRET` | JWT access token secret (generate random string) | `your-super-secret-access-key-min-32-chars` |
| `REFRESH_TOKEN_SECRET` | JWT refresh token secret (generate random string) | `your-super-secret-refresh-key-min-32-chars` |
| `REDIS_HOST` | Redis server host | `localhost` or `redis-cloud-url` |
| `REDIS_PORT` | Redis server port | `6379` |
| `REDIS_PASSWORD` | Redis password (if required) | `your-redis-password` or leave empty |
| `TWILIO_ACCOUNT_SID` | Twilio account SID | `ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| `TWILIO_AUTH_TOKEN` | Twilio auth token | `your-twilio-auth-token` |
| `TWILIO_PHONE_NUMBER` | Twilio phone number | `+1234567890` |
| `FIREBASE_PROJECT_ID` | Firebase project ID | `fleetiva-roadlines` |
| `FIREBASE_PRIVATE_KEY` | Firebase service account private key | `-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n` |
| `FIREBASE_CLIENT_EMAIL` | Firebase service account email | `firebase-adminsdk-xxxxx@project-id.iam.gserviceaccount.com` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5173` |

#### Frontend Environment Variables (`frontend/.env`)

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000/api` |
| `VITE_FIREBASE_API_KEY` | Firebase web API key | `AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | `fleetiva-roadlines.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID | `fleetiva-roadlines` |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | `fleetiva-roadlines.appspot.com` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | `123456789012` |
| `VITE_FIREBASE_APP_ID` | Firebase app ID | `1:123456789012:web:abcdef123456` |

> **Note**: Never commit `.env` files to version control. Use `.env.example` as a template.

---

## 🚀 Production Deployment

### Frontend Deployment (Vercel)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/Fleetiva-Roadlines)

**Manual Deployment:**

```bash
cd frontend

# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

**Environment Variables**: Add all `VITE_*` variables in Vercel dashboard under Settings → Environment Variables

**Live Frontend**: `https://fleetiva-roadlines.vercel.app` *(update with your URL)*

---

### Backend Deployment (Render)

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

**Manual Deployment:**

1. Create a new **Web Service** on [Render](https://render.com/)
2. Connect your GitHub repository
3. Configure build settings:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
4. Add all backend environment variables in Render dashboard
5. Deploy

**Live Backend API**: `https://fleetiva-roadlines-api.onrender.com` *(update with your URL)*

---

### Database Setup (MongoDB Atlas)

1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Whitelist your IP or allow access from anywhere (`0.0.0.0/0`)
3. Create a database user with read/write permissions
4. Get connection string and update `MONGODB_URI` in environment variables

---

### Redis Setup (Production)

**Options:**
- **Redis Cloud**: [Free tier available](https://redis.com/try-free/)
- **Upstash**: [Serverless Redis](https://upstash.com/)
- **Railway**: [Redis hosting](https://railway.app/)

Update `REDIS_HOST`, `REDIS_PORT`, and `REDIS_PASSWORD` in production environment variables.

---

## 🏗️ Project Structure

```text
Fleetiva-Roadlines/
├── .github/
│   ├── ISSUE_TEMPLATE/          # Bug report & feature request templates
│   └── workflows/               # GitHub Actions CI/CD pipelines
│       └── ci.yml               # Automated testing and linting
├── backend/
│   ├── config/
│   │   ├── redis.js             # Redis client configuration
│   │   ├── twilio.js            # Twilio SMS client setup
│   │   └── firebase.js          # Firebase Admin SDK initialization
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication middleware
│   │   ├── combinedAuth.js      # Firebase + JWT combined auth
│   │   ├── roleCheck.js         # Role-based access control
│   │   └── tenantScope.js       # Multi-tenant data isolation
│   ├── models/
│   │   ├── User.js              # User schema (customers, drivers, admins)
│   │   ├── Truck.js             # Truck/vehicle schema
│   │   ├── Load.js              # Load/shipment schema
│   │   ├── Booking.js           # Booking/assignment schema
│   │   └── Tenant.js            # Tenant/company schema
│   ├── routes/
│   │   ├── auth.js              # Authentication endpoints
│   │   ├── users.js             # User management
│   │   ├── trucks.js            # Truck CRUD operations
│   │   ├── loads.js             # Load management
│   │   ├── bookings.js          # Booking operations
│   │   ├── match.js             # Smart matching algorithm
│   │   └── documents.js         # PDF generation (Bilty, Invoice)
│   ├── utils/
│   │   ├── pdfGenerator.js      # PDFKit document generation
│   │   ├── otpService.js        # OTP generation and validation
│   │   └── matchingAlgorithm.js # Truck-load matching logic
│   ├── .env.example             # Environment variables template
│   ├── server.js                # Express app entry point
│   └── package.json             # Backend dependencies
├── frontend/
│   ├── public/                  # Static assets
│   ├── src/
│   │   ├── api/
│   │   │   ├── axios.js         # Axios instance with interceptors
│   │   │   └── endpoints.js     # API endpoint definitions
│   │   ├── components/
│   │   │   ├── Navbar.jsx       # Navigation component
│   │   │   ├── LoadCard.jsx     # Load display card
│   │   │   ├── TruckCard.jsx    # Truck display card
│   │   │   └── StatusBadge.jsx  # Status indicator component
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx    # Login page
│   │   │   │   ├── Register.jsx # Registration page
│   │   │   │   └── ForgotPassword.jsx
│   │   │   ├── admin/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── ManageUsers.jsx
│   │   │   │   └── Analytics.jsx
│   │   │   ├── driver/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── MyTrucks.jsx
│   │   │   │   └── Assignments.jsx
│   │   │   └── customer/
│   │   │       ├── Dashboard.jsx
│   │   │       ├── PostLoad.jsx
│   │   │       └── MyShipments.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # Authentication context
│   │   ├── firebase/
│   │   │   └── config.js        # Firebase client configuration
│   │   ├── App.jsx              # Main app component with routing
│   │   ├── main.jsx             # React entry point
│   │   └── index.css            # Global styles
│   ├── .env.example             # Frontend environment template
│   ├── vite.config.js           # Vite configuration
│   └── package.json             # Frontend dependencies
├── CONTRIBUTING.md              # Contribution guidelines
├── LICENSE                      # MIT License
└── README.md                    # This file
```

---

## 📚 API Overview

### Base URL
- **Development**: `http://localhost:5000/api`
- **Production**: `https://your-backend-url.com/api`

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/auth/register` | Register new user & send OTP | ❌ |
| `POST` | `/auth/verify-otp` | Verify OTP and activate account | ❌ |
| `POST` | `/auth/login` | Login with email/password | ❌ |
| `POST` | `/auth/google` | Google Sign-In authentication | ❌ |
| `POST` | `/auth/firebase/login` | Firebase authentication | ❌ |
| `POST` | `/auth/forgot-password` | Request password reset OTP | ❌ |
| `POST` | `/auth/reset-password` | Reset password using OTP | ❌ |
| `PUT` | `/auth/profile` | Update user profile | ✅ |
| `POST` | `/auth/refresh` | Refresh access token | ✅ |

### Load Management

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| `GET` | `/loads` | Get all loads (tenant-scoped) | ✅ | All |
| `POST` | `/loads` | Create new load | ✅ | Customer |
| `GET` | `/loads/:id` | Get load details | ✅ | All |
| `PUT` | `/loads/:id` | Update load | ✅ | Customer |
| `DELETE` | `/loads/:id` | Delete load | ✅ | Customer/Admin |

### Truck Management

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| `GET` | `/trucks` | Get all trucks (tenant-scoped) | ✅ | All |
| `POST` | `/trucks` | Register new truck | ✅ | Driver |
| `GET` | `/trucks/:id` | Get truck details | ✅ | All |
| `PUT` | `/trucks/:id` | Update truck | ✅ | Driver |
| `PUT` | `/trucks/:id/availability` | Update availability | ✅ | Driver |

### Booking & Matching

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| `GET` | `/match/:loadId` | Find matching trucks for load | ✅ | Admin |
| `POST` | `/bookings` | Create booking/assignment | ✅ | Admin |
| `GET` | `/bookings` | Get all bookings | ✅ | All |
| `GET` | `/bookings/:id` | Get booking details | ✅ | All |
| `PUT` | `/bookings/:id/status` | Update booking status | ✅ | Driver/Admin |

### Document Generation

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| `GET` | `/bookings/:id/bilty` | Generate & download Bilty PDF | ✅ | All |
| `GET` | `/bookings/:id/invoice` | Generate & download GST Invoice | ✅ | All |

### Response Format

**Success Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

> **Full API Documentation**: For detailed request/response schemas, see [API_DOCS.md](./API_DOCS.md) *(create this file for comprehensive docs)*

---

## 🤝 Contribution Guidelines

We welcome contributions from the community! Whether it's bug fixes, new features, or documentation improvements, your help is appreciated.

### How to Contribute

1. **Fork the Repository**
   ```bash
   # Click the 'Fork' button on GitHub
   ```

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/your-username/Fleetiva-Roadlines.git
   cd Fleetiva-Roadlines
   ```

3. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

4. **Make Your Changes**
   - Write clean, readable code
   - Follow existing code style and conventions
   - Add comments for complex logic
   - Update documentation if needed

5. **Test Your Changes**
   ```bash
   # Backend tests
   cd backend
   npm test

   # Frontend tests
   cd frontend
   npm test
   ```

6. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   # or
   git commit -m "fix: resolve bug description"
   ```

   **Commit Message Convention:**
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `style:` Code style changes (formatting)
   - `refactor:` Code refactoring
   - `test:` Adding tests
   - `chore:` Maintenance tasks

7. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

8. **Create a Pull Request**
   - Go to the original repository on GitHub
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill in the PR template with details
   - Submit for review

### Code Style Guidelines

- **JavaScript/React**: Follow [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- **Formatting**: Use ESLint and Prettier (configs included)
- **Naming Conventions**:
  - Components: PascalCase (`UserDashboard.jsx`)
  - Functions: camelCase (`getUserData()`)
  - Constants: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **File Structure**: Keep components small and focused (< 300 lines)

### Pull Request Guidelines

- ✅ Ensure all tests pass
- ✅ Update documentation for new features
- ✅ Add screenshots for UI changes
- ✅ Reference related issues (e.g., "Closes #123")
- ✅ Keep PRs focused on a single feature/fix
- ✅ Respond to review feedback promptly

### Reporting Issues

Found a bug or have a feature request? [Open an issue](https://github.com/your-username/Fleetiva-Roadlines/issues/new/choose)

**Bug Report Template:**
- Description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details (OS, browser, Node version)

**Feature Request Template:**
- Problem description
- Proposed solution
- Alternative solutions considered
- Additional context

### Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

For more details, see [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

### End-to-End Tests
```bash
# Coming soon
npm run test:e2e
```

---

## 🤖 CI/CD Pipeline

This project uses **GitHub Actions** for continuous integration and deployment.

### Automated Workflows

- ✅ **Dependency Security Audit**: Checks for vulnerable packages
- ✅ **Code Linting**: Ensures code quality and consistency
- ✅ **Build Verification**: Validates frontend and backend builds
- ✅ **Automated Tests**: Runs test suites on every push/PR

**Workflow File**: `.github/workflows/ci.yml`

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Fleetiva-Roadlines

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 👥 Contributors & Contact

### Project Maintainers

- **Your Name** - *Lead Developer* - [@your-github](https://github.com/your-username)

### Contributors

Thanks to all contributors who have helped build Fleetiva-Roadlines! 🎉

<a href="https://github.com/your-username/Fleetiva-Roadlines/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=your-username/Fleetiva-Roadlines" />
</a>

### Contact & Support

- 📧 **Email**: support@fleetiva-roadlines.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/your-username/Fleetiva-Roadlines/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/your-username/Fleetiva-Roadlines/discussions)
- 📖 **Documentation**: [Wiki](https://github.com/your-username/Fleetiva-Roadlines/wiki)

---

## 🙏 Acknowledgments

- [MongoDB](https://www.mongodb.com/) for the powerful NoSQL database
- [Firebase](https://firebase.google.com/) for authentication and real-time features
- [Twilio](https://www.twilio.com/) for SMS gateway services
- [Vercel](https://vercel.com/) for seamless frontend deployment
- [Render](https://render.com/) for reliable backend hosting
- All open-source contributors and maintainers

---

## 📊 Project Status

![GitHub last commit](https://img.shields.io/github/last-commit/your-username/Fleetiva-Roadlines)
![GitHub issues](https://img.shields.io/github/issues/your-username/Fleetiva-Roadlines)
![GitHub pull requests](https://img.shields.io/github/issues-pr/your-username/Fleetiva-Roadlines)
![GitHub stars](https://img.shields.io/github/stars/your-username/Fleetiva-Roadlines?style=social)

**Current Version**: v1.0.0  
**Status**: 🚀 Active Development  
**Last Updated**: January 2025

---

## 🗺️ Roadmap

- [x] Multi-tenant architecture
- [x] Firebase authentication
- [x] Smart matching algorithm
- [x] PDF document generation
- [ ] Mobile app (React Native)
- [ ] Real-time GPS tracking
- [ ] Payment gateway integration
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] WhatsApp notifications

---

<div align="center">

**Built with ❤️ by the Fleetiva-Roadlines Team**

⭐ **Star this repo** if you find it helpful!

[Report Bug](https://github.com/your-username/Fleetiva-Roadlines/issues) · [Request Feature](https://github.com/your-username/Fleetiva-Roadlines/issues) · [Documentation](https://github.com/your-username/Fleetiva-Roadlines/wiki)

</div>
