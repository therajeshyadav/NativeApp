# 📋 GitHub Submission Guide

## ✅ Pre-Submission Checklist

Before submitting your project, ensure you have:

- [ ] ✅ All code is committed and pushed to GitHub
- [ ] ✅ `.env` files are NOT committed (use `.env.example` instead)
- [ ] ✅ `node_modules` folders are in `.gitignore`
- [ ] ✅ README.md is complete with all sections
- [ ] ✅ Demo video is recorded and uploaded
- [ ] ✅ Video link is added to README
- [ ] ✅ Repository is public (or accessible to reviewers)
- [ ] ✅ All features are working correctly

## 🚀 Step-by-Step Submission Process

### Step 1: Prepare Your Repository

#### 1.1 Verify `.gitignore` Exists

A comprehensive `.gitignore` file should already exist in the root directory covering both `/mobile` and `/server` folders.

**Verify it includes:**
```bash
# Check .gitignore exists
cat .gitignore

# Should include:
# - node_modules/
# - .env files
# - .expo/
# - *.log files
# - OS files (.DS_Store, etc.)
```

**Important:** We use a single root `.gitignore` file for the entire repository (not separate ones in mobile/ and server/).

#### 1.2 Verify `.env.example` Files Exist

**Server `.env.example`:**
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/chatapp
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRES_IN=7d
```

**Mobile** - No `.env` needed (config is in `src/config/api.js`)

### Step 2: Initialize Git Repository (if not done)

```bash
# In project root directory
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Real-time chat application"
```

### Step 3: Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click "+" → "New repository"
3. Repository name: `realtime-chat-app` (or your preferred name)
4. Description: "Real-time 1:1 chat app with React Native & Node.js"
5. Choose "Public"
6. **DO NOT** initialize with README (you already have one)
7. Click "Create repository"

### Step 4: Push to GitHub

```bash
# Add remote origin (replace with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/realtime-chat-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 5: Record Demo Video

#### What to Show in Your Demo (≤5 minutes):

**Timeline Suggestion:**

- **0:00-0:30** - Introduction
  - Show project structure (folders: /mobile, /server)
  - Briefly explain tech stack

- **0:30-1:30** - Setup & Running
  - Show backend server starting
  - Show mobile app starting
  - Mention environment variables

- **1:30-2:30** - Authentication
  - Register new user (User 1)
  - Login with User 1
  - Show protected routes (can't access login when logged in)

- **2:30-4:00** - Real-Time Features
  - Open second device/simulator
  - Register/Login User 2
  - Send messages between users
  - Show typing indicators
  - Show online/offline status
  - Show message delivery/read receipts
  - Demonstrate search functionality

- **4:00-4:30** - Additional Features
  - Pull to refresh
  - Logout functionality
  - Show navigation guards

- **4:30-5:00** - Conclusion
  - Recap key features
  - Thank you message

#### Recording Setup:

**Option A: Two Simulators Side-by-Side**
```bash
# Terminal 1: Start backend
cd server && npm run dev

# Terminal 2: Start mobile app
cd mobile && npm start

# Open two iOS simulators or Android emulators
# Arrange them side by side
# Start screen recording
```

**Option B: Simulator + Physical Device**
- Use your phone with Expo Go
- Use simulator on computer
- Record screen showing both

### Step 6: Upload Video

#### Recommended: YouTube (Unlisted)

1. Go to [YouTube Studio](https://studio.youtube.com)
2. Click "Create" → "Upload videos"
3. Upload your video file
4. Fill in details:
   - **Title:** "Real-Time Chat App Demo - React Native & Node.js"
   - **Description:** Brief description of your app
   - **Visibility:** "Unlisted" (only people with link can view)
5. Click "Publish"
6. Copy the video URL

#### Alternative: Google Drive

1. Upload to Google Drive
2. Right-click → "Get link"
3. Change to "Anyone with the link can view"
4. Copy link

### Step 7: Update README with Video Link

Edit `README.md` and replace:
```markdown
**[📹 Click here to watch the demo video](YOUR_VIDEO_LINK_HERE)**
```

With your actual link:
```markdown
**[📹 Click here to watch the demo video](https://youtu.be/abc123xyz)**
```

Commit and push:
```bash
git add README.md
git commit -m "Add demo video link"
git push
```

### Step 8: Final Verification

Visit your GitHub repository and verify:

- [ ] ✅ README displays correctly
- [ ] ✅ Video link works
- [ ] ✅ Project structure is visible
- [ ] ✅ `.env` files are NOT visible (only `.env.example`)
- [ ] ✅ All code files are present
- [ ] ✅ Repository is public/accessible

### Step 9: Submit

Submit your GitHub repository URL:
```
https://github.com/YOUR_USERNAME/realtime-chat-app
```

## 📝 What Reviewers Will Check

1. **Repository Structure**
   - ✅ `/mobile` folder with React Native app
   - ✅ `/server` folder with Node.js backend
   - ✅ Clear README with setup instructions

2. **Documentation**
   - ✅ Complete README with all sections
   - ✅ Environment variables documented
   - ✅ Sample users provided
   - ✅ Setup instructions are clear

3. **Demo Video**
   - ✅ Video is accessible (≤5 minutes)
   - ✅ Shows all key features
   - ✅ Demonstrates real-time functionality
   - ✅ Shows authentication flow

4. **Code Quality**
   - ✅ Clean, organized code structure
   - ✅ Proper error handling
   - ✅ No sensitive data in repository
   - ✅ Dependencies properly listed

## 🎯 Submission Deadline

**Due: November 10, 2025 EOD**

Make sure to submit before the deadline!

## 🆘 Common Issues

### Issue: Video file too large for GitHub
**Solution:** Use YouTube or Google Drive instead

### Issue: Can't push to GitHub
**Solution:** 
```bash
# Check remote
git remote -v

# If wrong, remove and re-add
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/repo-name.git
```

### Issue: Accidentally committed `.env` file
**Solution:**
```bash
# Remove from git but keep locally
git rm --cached server/.env

# Add to .gitignore
echo "server/.env" >> .gitignore

# Commit
git add .gitignore
git commit -m "Remove .env from tracking"
git push
```

## ✨ Bonus Points

Consider adding these for extra credit:

- 📸 Screenshots in README
- 🎨 Architecture diagram
- 📊 API documentation
- 🧪 Testing instructions
- 🚀 Deployment guide
- 📱 App store screenshots

## 🎉 You're Ready!

Follow these steps and you'll have a professional GitHub submission. Good luck! 🚀

---

**Need Help?** Check the main README.md for troubleshooting tips.
