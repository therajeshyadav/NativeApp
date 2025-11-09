# 💬 Real-Time Chat Application

A modern, full-featured real-time 1:1 chat application with a beautiful dark-themed UI, built with React Native (Expo) and Node.js (Express + Socket.IO).

![Chat App](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)

## ✨ Features

### Authentication & Security
- � Seclure JWT-based authentication
- � MPassword hashing with bcryptjs
- 🚪 Protected routes and navigation guards
- 💾 Persistent login with AsyncStorage
- � CAuto-redirect based on auth state

### Real-Time Communication
- 💬 Instant messaging with Socket.IO
- 👥 Live online/offline user status
- ⌨️ Real-time typing indicators
- ✓ Message delivery receipts
- ✓✓ Read receipts
- 🔔 Real-time message notifications

### User Experience
- 📱 Beautiful dark-themed mobile UI
- 🎨 Color-coded user avatars
- 🔍 User search functionality
- ⏱️ Smart timestamp formatting (now, 5m, 2h, 3d)
- 🔄 Pull-to-refresh user list
- 💬 Message preview in user list
- 📜 Infinite scroll chat history
- ⚡ Smooth animations and transitions

## Tech Stack

### Backend
- Node.js + Express
- Socket.IO for real-time communication
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

### Mobile
- React Native (Expo)
- Expo Router for navigation
- Socket.IO client
- AsyncStorage for local data
- Axios for API calls

## Project Structure

```
├── server/              # Backend Node.js application
│   ├── src/
│   │   ├── config/      # Database configuration
│   │   ├── middleware/  # Auth middleware
│   │   ├── models/      # Mongoose models
│   │   ├── routes/      # API routes
│   │   ├── socket/      # Socket.IO handlers
│   │   └── index.js     # Server entry point
│   ├── .env.example     # Environment variables template
│   └── package.json
│
└── mobile/              # React Native mobile app
    ├── app/             # Expo Router pages
    │   ├── chat/        # Chat screen
    │   ├── index.js     # Entry point
    │   ├── login.js     # Login screen
    │   ├── register.js  # Register screen
    │   └── home.js      # User list screen
    ├── src/
    │   ├── config/      # API configuration
    │   ├── context/     # React Context (Auth)
    │   └── services/    # API & Socket services
    └── package.json
```

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (local installation or MongoDB Atlas account) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** package manager
- **Expo CLI** (optional, will be installed automatically)
- **iOS Simulator** (Mac only) or **Android Emulator** or **Expo Go app** on physical device

### 📦 Installation

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd chat-app
```

#### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Edit `.env` file with your configuration:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/chatapp
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d
```

**Important:** Change `JWT_SECRET` to a secure random string in production!

```bash
# Start MongoDB (if running locally)
mongod

# Start the backend server
npm run dev
```

✅ Server should now be running on `http://localhost:3000`

#### 3. Mobile App Setup

Open a new terminal window:

```bash
# Navigate to mobile directory
cd mobile

# Install dependencies
npm install
```

**Configure API endpoints** in `src/config/api.js`:

```javascript
// Choose based on your setup:

// Option 1: iOS Simulator (Mac)
export const API_URL = 'http://localhost:3000';
export const SOCKET_URL = 'http://localhost:3000';

// Option 2: Android Emulator
// export const API_URL = 'http://10.0.2.2:3000';
// export const SOCKET_URL = 'http://10.0.2.2:3000';

// Option 3: Physical Device (replace with your computer's IP)
// Find your IP: Windows (ipconfig), Mac/Linux (ifconfig)
// export const API_URL = 'http://192.168.1.100:3000';
// export const SOCKET_URL = 'http://192.168.1.100:3000';
```

```bash
# Start Expo development server
npm start
```

**Run the app:**
- Press **`i`** for iOS Simulator (Mac only)
- Press **`a`** for Android Emulator
- Scan QR code with **Expo Go** app on your phone

### 🎯 First Time Usage

1. **Register** two test accounts:
   - User 1: alice@example.com / password123
   - User 2: bob@example.com / password123

2. **Login** with User 1 on one device/simulator

3. **Login** with User 2 on another device/simulator

4. **Start chatting** - Select a user from the list and send messages!

5. **Test features:**
   - Send messages and see real-time delivery
   - Watch typing indicators
   - Check online/offline status
   - Pull to refresh user list
   - Search for users

## API Endpoints

### REST API

#### Authentication
- `POST /auth/register` - Register new user
  ```json
  {
    "username": "john",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `POST /auth/login` - Login user
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

#### Users
- `GET /users` - Get all users (requires auth)

#### Conversations
- `GET /conversations/:userId/messages` - Get messages with specific user (requires auth)

### Socket Events

#### Client → Server
- `message:send` - Send a new message
  ```javascript
  { recipientId: 'userId', content: 'Hello!' }
  ```
- `message:delivered` - Mark message as delivered
  ```javascript
  { messageId: 'msgId' }
  ```
- `message:read` - Mark message as read
  ```javascript
  { messageId: 'msgId' }
  ```
- `typing:start` - User started typing
  ```javascript
  { recipientId: 'userId' }
  ```
- `typing:stop` - User stopped typing
  ```javascript
  { recipientId: 'userId' }
  ```

#### Server → Client
- `message:new` - Receive new message
- `message:sent` - Confirmation of sent message
- `message:status` - Message status update
- `user:status` - User online/offline status change
- `typing:start` - Other user started typing
- `typing:stop` - Other user stopped typing

## Sample Users

After starting the app, register at least 2 users to test the chat functionality:

**User 1:**
- Username: alice
- Email: alice@example.com
- Password: password123

**User 2:**
- Username: bob
- Email: bob@example.com
- Password: password123

## Testing the App

1. Register/login with first user on one device/simulator
2. Register/login with second user on another device/simulator
3. From User 1's home screen, tap on User 2
4. Send messages back and forth
5. Observe real-time delivery, typing indicators, and read receipts

## Environment Variables

### Server (.env)
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/chatapp
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRES_IN=7d
```

## 🔧 Troubleshooting

### ❌ Cannot connect to server from mobile app

**Problem:** App shows connection errors or can't fetch data

**Solutions:**
- ✅ Verify backend server is running (`npm run dev` in server directory)
- ✅ Check `API_URL` in `mobile/src/config/api.js` matches your setup
- ✅ For **Android Emulator**, use `http://10.0.2.2:3000` instead of `localhost`
- ✅ For **Physical Device**, use your computer's local IP (e.g., `http://192.168.1.100:3000`)
- ✅ Ensure firewall allows connections on port 3000
- ✅ Both devices must be on the same WiFi network (for physical devices)

### ❌ MongoDB connection error

**Problem:** Server crashes with MongoDB connection error

**Solutions:**
- ✅ Ensure MongoDB is running (`mongod` command or MongoDB service)
- ✅ Verify `MONGODB_URI` in `.env` file is correct
- ✅ For **MongoDB Atlas**: 
  - Check IP whitelist (add `0.0.0.0/0` for testing)
  - Verify username/password in connection string
  - Ensure database user has read/write permissions

### ❌ Socket connection issues

**Problem:** Messages not appearing in real-time

**Solutions:**
- ✅ Verify `SOCKET_URL` matches your backend URL
- ✅ Check mobile app console for connection errors
- ✅ Ensure JWT token is valid (try logging out and back in)
- ✅ Restart both backend server and mobile app
- ✅ Check network connectivity

### ❌ "Attempted to navigate before mounting" error

**Problem:** Navigation error on app start

**Solutions:**
- ✅ This has been fixed in the latest code
- ✅ Clear app cache: Stop app → Clear Expo cache → Restart
- ✅ Ensure you're using the latest code version

### ❌ Expo/Metro bundler issues

**Problem:** App won't start or shows bundler errors

**Solutions:**
```bash
# Clear Expo cache
npx expo start -c

# Or clear Metro cache
npm start -- --reset-cache

# If still having issues, reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### 🆘 Still Having Issues?

1. Check the console logs in both backend and mobile app
2. Verify all dependencies are installed correctly
3. Ensure you're using compatible Node.js version (v16+)
4. Try restarting MongoDB, backend server, and mobile app in that order

## 🎥 Demo Video

### Watch the Demo (≤5 minutes)

**[📹 Click here to watch the demo video](YOUR_VIDEO_LINK_HERE)**

> Replace `YOUR_VIDEO_LINK_HERE` with your actual video link after uploading

### What's Covered in the Demo:
1. ✅ User registration and login
2. ✅ Real-time messaging between two users
3. ✅ Online/offline status indicators
4. ✅ Typing indicators in action
5. ✅ Message delivery and read receipts
6. ✅ User search functionality
7. ✅ Logout functionality

### How to Create Your Demo Video

#### Option 1: Screen Recording (Recommended)

**For Mac:**
```bash
# Use QuickTime Player or built-in screen recording
# Press: Cmd + Shift + 5
# Select area and record
```

**For Windows:**
```bash
# Use Xbox Game Bar
# Press: Win + G
# Click record button
```

**For Linux:**
```bash
# Use OBS Studio or SimpleScreenRecorder
sudo apt install simplescreenrecorder
```

#### Option 2: Use OBS Studio (All Platforms)
1. Download [OBS Studio](https://obsproject.com/)
2. Add display capture source
3. Start recording
4. Save as MP4

#### Recording Tips:
- 📱 Record both devices/simulators side by side
- ⏱️ Keep it under 5 minutes
- 🎤 Add voiceover explaining features (optional)
- 🎬 Show: Register → Login → Chat → Real-time features → Logout
- 📊 Use 1080p resolution for clarity

### Where to Upload Your Video

#### Option 1: YouTube (Recommended)
1. Go to [YouTube Studio](https://studio.youtube.com)
2. Click "Create" → "Upload videos"
3. Upload your video
4. Set as "Unlisted" (visible only with link)
5. Copy the link and add to README

#### Option 2: Google Drive
1. Upload to [Google Drive](https://drive.google.com)
2. Right-click → "Get link"
3. Set to "Anyone with the link can view"
4. Copy link and add to README

#### Option 3: Loom
1. Go to [Loom](https://www.loom.com)
2. Record or upload video
3. Copy share link
4. Add to README

#### Option 4: GitHub Release (for smaller videos)
1. Go to your repo → Releases → Create new release
2. Attach video file (max 2GB)
3. Publish release
4. Copy video URL

### Update README with Video Link

After uploading, replace this line in README:
```markdown
**[📹 Click here to watch the demo video](YOUR_VIDEO_LINK_HERE)**
```

With your actual link:
```markdown
**[📹 Click here to watch the demo video](https://youtu.be/your-video-id)**
```

## 📱 App Screenshots

### Authentication Flow
- Clean login/register screens with validation
- Secure JWT-based authentication
- Auto-redirect based on login state

### Home Screen
- User list with online/offline indicators
- Last message preview with timestamps
- Search functionality
- Pull-to-refresh

### Chat Screen
- Real-time messaging
- Typing indicators
- Message status (sent/delivered/read)
- Smooth scrolling with auto-scroll to bottom
- Message timestamps

## 🛠️ Built With

### Backend Technologies
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Socket.IO** - Real-time bidirectional communication
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Secure authentication tokens
- **bcryptjs** - Password hashing

### Mobile Technologies
- **React Native** - Cross-platform mobile framework
- **Expo** - React Native development platform
- **Expo Router** - File-based routing
- **Socket.IO Client** - Real-time communication
- **Axios** - HTTP client
- **AsyncStorage** - Local data persistence
- **React Context API** - State management

## 📝 License

This project is licensed under the MIT License - feel free to use it for learning and personal projects.

## 👨‍💻 Author

Built with ❤️ for learning real-time communication and mobile app development.

## 📚 Additional Documentation

Need help? Check out these guides:

- **[⚡ QUICK_START.md](QUICK_START.md)** - Get up and running in 5 minutes
- **[🎥 VIDEO_RECORDING_GUIDE.md](VIDEO_RECORDING_GUIDE.md)** - How to record your demo video
- **[📤 SUBMISSION_GUIDE.md](SUBMISSION_GUIDE.md)** - Complete GitHub submission guide
- **[✅ GITHUB_PUSH_CHECKLIST.md](GITHUB_PUSH_CHECKLIST.md)** - Pre-push verification checklist
- **[📊 PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Project overview and statistics

## 🎯 Project Status

**Status:** ✅ Complete and Ready for Submission

**Deadline:** November 10, 2025 EOD

---

## 🌟 Key Highlights

- ✅ Full authentication system with protected routes
- ✅ Real-time messaging with Socket.IO
- ✅ Beautiful, modern UI with dark theme
- ✅ Online/offline status tracking
- ✅ Typing indicators and read receipts
- ✅ Message persistence in MongoDB
- ✅ Responsive and smooth user experience
- ✅ Production-ready code structure
- ✅ Comprehensive documentation
- ✅ Single repository with /mobile and /server

## 📦 Repository Structure

```
realtime-chat-app/
├── mobile/              # React Native mobile app
├── server/              # Node.js backend
├── README.md            # This file
├── QUICK_START.md       # Quick setup guide
├── SUBMISSION_GUIDE.md  # GitHub submission help
└── .gitignore           # Single root gitignore
```

## 🚀 Next Steps

1. ✅ **Setup:** Follow [QUICK_START.md](QUICK_START.md)
2. 🎥 **Record:** Use [VIDEO_RECORDING_GUIDE.md](VIDEO_RECORDING_GUIDE.md)
3. 📤 **Submit:** Follow [SUBMISSION_GUIDE.md](SUBMISSION_GUIDE.md)

---

**Happy Chatting! 💬**

Built with ❤️ using React Native, Node.js, Socket.IO, and MongoDB
