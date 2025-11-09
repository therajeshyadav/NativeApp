# ⚡ Quick Start Guide

This is a simplified guide to get the app running quickly. For detailed instructions, see [README.md](README.md).

## 🚀 5-Minute Setup

### Step 1: Install Prerequisites (if not installed)

```bash
# Check if Node.js is installed
node --version  # Should be v16 or higher

# Check if MongoDB is installed
mongod --version

# If not installed, download from:
# Node.js: https://nodejs.org/
# MongoDB: https://www.mongodb.com/try/download/community
```

### Step 2: Clone & Install

```bash
# Clone the repository
git clone <your-repo-url>
cd chat-app

# Install backend dependencies
cd server
npm install

# Install mobile dependencies
cd ../mobile
npm install
```

### Step 3: Configure Environment

```bash
# In server directory, create .env file
cd server
cp .env.example .env

# Edit .env (use any text editor)
# Change JWT_SECRET to a random string
```

**server/.env:**
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/chatapp
JWT_SECRET=my_super_secret_key_12345
JWT_EXPIRES_IN=7d
```

### Step 4: Start MongoDB

**Mac/Linux:**
```bash
mongod
```

**Windows:**
```bash
# MongoDB should start automatically as a service
# Or run: "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe"
```

### Step 5: Start Backend Server

```bash
# In server directory
cd server
npm run dev
```

✅ You should see: `Server running on port 3000` and `MongoDB connected`

### Step 6: Configure Mobile API

**Edit `mobile/src/config/api.js`:**

```javascript
// For iOS Simulator (Mac)
export const API_URL = 'http://localhost:3000';
export const SOCKET_URL = 'http://localhost:3000';

// For Android Emulator (uncomment these instead)
// export const API_URL = 'http://10.0.2.2:3000';
// export const SOCKET_URL = 'http://10.0.2.2:3000';
```

### Step 7: Start Mobile App

**Open a new terminal:**

```bash
# In mobile directory
cd mobile
npm start
```

Then press:
- **`i`** for iOS Simulator (Mac only)
- **`a`** for Android Emulator
- Or scan QR code with Expo Go app

### Step 8: Test the App

1. **Register first user:**
   - Email: alice@example.com
   - Password: password123

2. **Open second device/simulator**

3. **Register second user:**
   - Email: bob@example.com
   - Password: password123

4. **Start chatting!**
   - From Alice's device, tap on Bob
   - Send messages
   - Watch real-time delivery

## 🎯 Common Commands

### Backend
```bash
cd server
npm run dev          # Start development server
npm start            # Start production server
```

### Mobile
```bash
cd mobile
npm start            # Start Expo dev server
npm start -- -c      # Start with cache cleared
```

### MongoDB
```bash
mongod               # Start MongoDB
mongo                # Open MongoDB shell
```

## 🔧 Quick Troubleshooting

### Can't connect to server?
```bash
# Check if server is running
# Terminal should show: "Server running on port 3000"

# Check API_URL in mobile/src/config/api.js
# For Android: use 10.0.2.2 instead of localhost
```

### MongoDB won't start?
```bash
# Check if already running
ps aux | grep mongod

# Or try:
sudo mongod
```

### Expo won't start?
```bash
# Clear cache
npx expo start -c

# Or reinstall
rm -rf node_modules
npm install
```

## 📱 Device-Specific Setup

### iOS Simulator (Mac only)
```javascript
// mobile/src/config/api.js
export const API_URL = 'http://localhost:3000';
export const SOCKET_URL = 'http://localhost:3000';
```

### Android Emulator
```javascript
// mobile/src/config/api.js
export const API_URL = 'http://10.0.2.2:3000';
export const SOCKET_URL = 'http://10.0.2.2:3000';
```

### Physical Device
```bash
# Find your computer's IP address

# Mac/Linux:
ifconfig | grep "inet "

# Windows:
ipconfig

# Use that IP in config:
export const API_URL = 'http://192.168.1.100:3000';
export const SOCKET_URL = 'http://192.168.1.100:3000';
```

## ✅ Verification Checklist

- [ ] Backend server running (port 3000)
- [ ] MongoDB connected
- [ ] Mobile app started
- [ ] Can register new user
- [ ] Can login
- [ ] Can see user list
- [ ] Can send messages
- [ ] Messages appear in real-time

## 🎥 Next Steps

1. ✅ Test all features
2. 📹 Record demo video (see [VIDEO_RECORDING_GUIDE.md](VIDEO_RECORDING_GUIDE.md))
3. 📤 Upload video to YouTube/Drive
4. 📝 Update README with video link
5. 🚀 Push to GitHub (see [SUBMISSION_GUIDE.md](SUBMISSION_GUIDE.md))

## 🆘 Need Help?

- See [README.md](README.md) for detailed documentation
- See [SUBMISSION_GUIDE.md](SUBMISSION_GUIDE.md) for GitHub submission
- See [VIDEO_RECORDING_GUIDE.md](VIDEO_RECORDING_GUIDE.md) for video recording

---

**You're all set! Happy coding! 🚀**
