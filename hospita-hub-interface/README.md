# Hospital Hub - Complete Authentication System

## 🚀 Quick Start Guide

### Prerequisites
- .NET 6.0 or later
- Node.js 16+ and npm
- SQL Server (or the connection string configured in appsettings.json)

### 1. Backend Setup (.NET API)

```bash
# Navigate to backend directory
cd Pro/Hospital_Hub_Portal

# Restore packages
dotnet restore

# Run the application
dotnet run
```

The backend will start on `http://localhost:5000`

### 2. Frontend Setup (React)

```bash
# Navigate to frontend directory
cd Pro/Hospital_Hub_Interface/hospita-hub-interface

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start on `http://localhost:5173`

## 🔐 Complete Authentication Flow Testing

### Step 1: Access the Application
1. Open your browser and go to `http://localhost:5173`
2. You should see the **Login/Register page**

### Step 2: Register a New User
1. Click **"Don't have an account? Sign up"**
2. Fill in the registration form:
   - **Name**: Your full name
   - **Email**: A valid email address
   - **Password**: At least 6 characters
   - **Confirm Password**: Same as password
   - **Role**: Choose "Patient" or "Admin"
3. Click **"Create Account"**
4. You should see: "Registration successful! Please login."

### Step 3: Login with the Registered User
1. Switch back to login mode
2. Enter your email and password
3. Click **"Sign In"**
4. You should be automatically redirected based on your role:
   - **Admin** → `/admin/dashboard`
   - **Patient** → `/patient/home`

### Step 4: Verify Authentication
1. Look for the **Authentication Test Panel** at the top of the dashboard
2. Check the **Current Status** section:
   - ✅ Authenticated: Yes
   - 👤 User ID: (should show your user ID)
   - 📧 Email: (your email)
   - 👨‍💼 Role: (Admin or User)
   - 📝 Name: (your name)

### Step 5: Test API Endpoints
1. Click **"Test API Connection"** - Should show "✅ API Test: Auth API is working!"
2. Click **"Test Protected Endpoint"** - Should show your user details
3. Try accessing the other dashboard features

### Step 6: Test Role-Based Access
1. **Logout** using the logout button in the header
2. **Register a new user** with a different role
3. **Login** and verify you're redirected to the correct dashboard
4. Try accessing the wrong role's routes - you should be redirected

### Step 7: Test Token Persistence
1. **Login** to the application
2. **Refresh the page** - you should stay logged in
3. **Close the browser** and reopen - you should still be logged in
4. **Clear browser data** - you should be logged out

## 🛡️ Security Features Verified

- ✅ **Password Hashing**: Passwords are stored as SHA256 hashes
- ✅ **JWT Tokens**: Secure token-based authentication
- ✅ **Role-Based Access**: Different dashboards for different roles
- ✅ **Protected Routes**: Unauthorized users can't access protected pages
- ✅ **Token Validation**: Automatic token validation on app load
- ✅ **Auto Logout**: Invalid/expired tokens automatically log users out
- ✅ **Input Validation**: Form validation and error handling
- ✅ **CORS Configuration**: Proper cross-origin resource sharing

## 🔧 API Endpoints

### Public Endpoints
- `GET /api/auth/test` - Test API connection
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Protected Endpoints
- `GET /api/auth/validate` - Validate current token
- `GET /api/auth/me` - Get current user info

## 📊 Database Schema

The authentication system uses the `HH_User` table with the following key fields:
- `UserID` (Primary Key)
- `UserName`
- `UserEmail`
- `UserPassword` (SHA256 hashed)
- `UserRole` (Admin/User)
- `CreatedDate`

## 🐛 Troubleshooting

### Common Issues:

1. **Backend won't start**
   - Check if .NET is installed: `dotnet --version`
   - Verify connection string in `appsettings.json`

2. **Frontend won't start**
   - Check if Node.js is installed: `node --version`
   - Run `npm install` to install dependencies

3. **CORS errors**
   - Ensure backend is running on port 5000
   - Check CORS configuration in `Program.cs`

4. **Authentication fails**
   - Check browser console for errors
   - Verify API endpoints are accessible
   - Check database connection

5. **Token validation fails**
   - Clear browser localStorage
   - Check JWT settings in `appsettings.json`

## 🎯 Expected Behavior

### Successful Flow:
1. User registers → Data saved to database with hashed password
2. User logs in → JWT token generated and stored
3. User accesses protected routes → Token validated automatically
4. User sees role-specific dashboard → Role-based routing works
5. User logs out → Token removed, redirected to login

### Security Features:
- Passwords are never stored in plain text
- JWT tokens expire after 60 minutes
- Invalid tokens automatically log users out
- Role-based access control prevents unauthorized access

## 📝 Notes

- The system uses **SHA256** for password hashing (consider upgrading to bcrypt for production)
- JWT tokens are stored in **localStorage** (consider httpOnly cookies for production)
- The test component can be removed from production builds
- All API responses include proper error messages
- The system is ready for production with additional security hardening

---

**🎉 Congratulations! Your authentication system is working perfectly!**
