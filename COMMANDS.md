# 🎯 Quick Command Reference

All the commands you need in one place!

---

## 🚀 Initial Setup

```bash
# Clone repository
git clone <your-repo-url>
cd realtime-chat-app

# Install backend dependencies
cd server
npm install

# Install mobile dependencies
cd ../mobile
npm install
```

---

## 🖥️ Backend Commands

```bash
# Navigate to server
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev

# Start production server
npm start
```

---

## 📱 Mobile Commands

```bash
# Navigate to mobile
cd mobile

# Install dependencies
npm install

# Start Expo dev server
npm start

# Start with cache cleared
npm start -- -c
# or
npx expo start -c

# Run on iOS (Mac only)
npm start
# Then press 'i'

# Run on Android
npm start
# Then press 'a'
```

---

## 🗄️ MongoDB Commands

```bash
# Start MongoDB
mongod

# Start MongoDB (with specific data directory)
mongod --dbpath /path/to/data

# Connect to MongoDB shell
mongo

# Or with mongosh (newer versions)
mongosh

# Show databases
show dbs

# Use chatapp database
use chatapp

# Show collections
show collections

# View users
db.users.find()

# View messages
db.messages.find()

# Clear all messages (for testing)
db.messages.deleteMany({})

# Clear all users (for testing)
db.users.deleteMany({})
```

---

## 🔧 Git Commands

```bash
# Initialize repository
git init

# Check status
git status

# Add all files
git add .

# Commit
git commit -m "Your commit message"

# Add remote
git remote add origin https://github.com/USERNAME/repo-name.git

# Check remote
git remote -v

# Push to GitHub
git push -u origin main

# Pull latest changes
git pull origin main

# View commit history
git log --oneline

# Remove file from git (keep locally)
git rm --cached filename

# Remove folder from git (keep locally)
git rm -r --cached foldername
```

---

## 🧹 Cleanup Commands

```bash
# Remove node_modules (backend)
cd server
rm -rf node_modules
# Windows: rmdir /s /q node_modules

# Remove node_modules (mobile)
cd mobile
rm -rf node_modules
# Windows: rmdir /s /q node_modules

# Clear Expo cache
cd mobile
npx expo start -c

# Clear npm cache
npm cache clean --force

# Reinstall everything
rm -rf node_modules package-lock.json
npm install
```

---

## 🔍 Debugging Commands

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check MongoDB version
mongod --version

# Check if port 3000 is in use (Mac/Linux)
lsof -i :3000

# Check if port 3000 is in use (Windows)
netstat -ano | findstr :3000

# Kill process on port 3000 (Mac/Linux)
kill -9 $(lsof -t -i:3000)

# Kill process on port 3000 (Windows)
# Find PID from netstat command above, then:
taskkill /PID <PID> /F

# View backend logs
cd server
npm run dev
# Watch console output

# View mobile logs
cd mobile
npm start
# Press 'j' to open debugger
```

---

## 📹 Video Recording Commands

### Mac
```bash
# Built-in screen recording
# Press: Cmd + Shift + 5
# Select area and record

# QuickTime
# Open QuickTime Player
# File → New Screen Recording
```

### Windows
```bash
# Xbox Game Bar
# Press: Win + G
# Click record button

# Or press: Win + Alt + R to start/stop
```

### Linux
```bash
# Install SimpleScreenRecorder
sudo apt install simplescreenrecorder

# Or use OBS Studio
sudo apt install obs-studio
```

---

## 🌐 Network Commands

### Find Your IP Address

**Mac/Linux:**
```bash
# Show all network interfaces
ifconfig

# Or just IP addresses
ifconfig | grep "inet "

# Or
hostname -I
```

**Windows:**
```bash
# Show network configuration
ipconfig

# Find IPv4 Address under your active network adapter
```

### Test Backend Connection

```bash
# Test if backend is running
curl http://localhost:3000

# Or
curl http://localhost:3000/users
```

---

## 📦 Package Management

```bash
# Install specific package
npm install package-name

# Install as dev dependency
npm install --save-dev package-name

# Uninstall package
npm uninstall package-name

# Update all packages
npm update

# Check for outdated packages
npm outdated

# View installed packages
npm list --depth=0
```

---

## 🎥 Video Upload Commands

### YouTube Upload (via browser)
```
1. Go to: https://studio.youtube.com
2. Click "Create" → "Upload videos"
3. Upload your video file
4. Set visibility to "Unlisted"
5. Copy the video URL
```

### Google Drive Upload
```bash
# Via browser:
1. Go to: https://drive.google.com
2. Click "New" → "File upload"
3. Upload video
4. Right-click → "Get link"
5. Set to "Anyone with the link"
```

---

## 🔐 Environment Setup

```bash
# Create .env file (backend)
cd server
cp .env.example .env

# Edit .env (Mac/Linux)
nano .env
# or
vim .env

# Edit .env (Windows)
notepad .env

# Edit API config (mobile)
cd mobile/src/config
# Edit api.js with your preferred editor
```

---

## 📊 Useful Shortcuts

### Expo Dev Server
```
Press in terminal after 'npm start':
- i: Open iOS simulator
- a: Open Android emulator
- w: Open web browser
- r: Reload app
- m: Toggle menu
- j: Open debugger
- c: Clear cache and reload
```

### Terminal
```bash
# Clear terminal
clear  # Mac/Linux
cls    # Windows

# Stop running process
Ctrl + C

# Exit terminal
exit
```

---

## 🚀 One-Command Startup

Create these scripts for quick startup:

### start-all.sh (Mac/Linux)
```bash
#!/bin/bash
# Start MongoDB
mongod &

# Start backend
cd server && npm run dev &

# Start mobile
cd mobile && npm start
```

### start-all.bat (Windows)
```batch
@echo off
start mongod
start cmd /k "cd server && npm run dev"
start cmd /k "cd mobile && npm start"
```

Make executable (Mac/Linux):
```bash
chmod +x start-all.sh
./start-all.sh
```

---

## 📝 Quick Reference

| Task | Command |
|------|---------|
| Start backend | `cd server && npm run dev` |
| Start mobile | `cd mobile && npm start` |
| Start MongoDB | `mongod` |
| Clear cache | `npx expo start -c` |
| Check status | `git status` |
| Push to GitHub | `git push` |
| Find IP | `ifconfig` or `ipconfig` |
| Kill port 3000 | `lsof -i :3000` then `kill -9 PID` |

---

**Bookmark this file for quick reference! 🔖**
