# 🎥 Demo Video Recording Guide

## 📋 Quick Checklist

- [ ] Backend server running
- [ ] Two devices/simulators ready
- [ ] Screen recording software ready
- [ ] Test users created
- [ ] Script/outline prepared
- [ ] Audio working (if adding voiceover)

## 🎬 Video Script Template (≤5 minutes)

### Scene 1: Introduction (0:00 - 0:30)

**What to Show:**
- Project folder structure
- Open terminal showing /mobile and /server folders

**What to Say:**
> "Hi! This is my real-time chat application built with React Native and Node.js. 
> The project has two main folders: the mobile app using Expo and React Native, 
> and the backend server using Express and Socket.IO with MongoDB."

### Scene 2: Setup & Running (0:30 - 1:30)

**What to Show:**
- Terminal 1: `cd server && npm run dev`
- Show server starting successfully
- Terminal 2: `cd mobile && npm start`
- Show Expo dev server starting
- Launch two simulators/devices

**What to Say:**
> "Let me start the backend server first. As you can see, it connects to MongoDB 
> and starts on port 3000. Now I'll start the mobile app using Expo. 
> I have two devices ready to demonstrate the real-time features."

### Scene 3: Authentication (1:30 - 2:30)

**What to Show:**
- Device 1: Register screen
- Fill in: alice@example.com / password123
- Click Register → Auto-navigate to home
- Try to go back to login (show it redirects to home)
- Logout

**What to Say:**
> "First, let me register a new user named Alice. After registration, 
> the app automatically logs in and navigates to the home screen. 
> Notice that if I try to go back to the login page, it redirects me 
> back to home because I'm already authenticated. Now let me logout."

### Scene 4: Real-Time Messaging (2:30 - 4:00)

**What to Show:**
- Device 1: Login as alice@example.com
- Device 2: Register/Login as bob@example.com
- Device 1: Show Bob appears in user list with green online indicator
- Device 1: Click on Bob to open chat
- Device 1: Type message → Show typing indicator on Device 2
- Device 1: Send message "Hello Bob!"
- Device 2: Show message appears instantly
- Device 2: Reply "Hi Alice!"
- Device 1: Show message appears with delivery/read receipts
- Show timestamps
- Device 2: Logout → Device 1 shows Bob offline (gray indicator)

**What to Say:**
> "Now I have Alice logged in on the first device and Bob on the second. 
> Notice Bob appears in Alice's user list with a green online indicator. 
> When Alice opens the chat and starts typing, Bob sees a typing indicator. 
> Messages are delivered instantly in real-time. You can see the delivery 
> and read receipts. When Bob logs out, Alice immediately sees him go offline."

### Scene 5: Additional Features (4:00 - 4:30)

**What to Show:**
- Pull to refresh user list
- Search for a user
- Show message preview in user list
- Show timestamps (now, 5m, 2h, etc.)

**What to Say:**
> "The app also includes pull-to-refresh, user search functionality, 
> message previews in the user list, and smart timestamp formatting."

### Scene 6: Conclusion (4:30 - 5:00)

**What to Show:**
- Quick recap showing both screens

**What to Say:**
> "To summarize, this app features secure JWT authentication, real-time 
> messaging with Socket.IO, online/offline status tracking, typing indicators, 
> and message receipts. All data is persisted in MongoDB. Thank you for watching!"

## 🎥 Recording Methods

### Method 1: Mac (Built-in)

```bash
# Press: Cmd + Shift + 5
# Select recording area
# Click "Record"
# Stop: Click stop button in menu bar
```

**Pros:** No installation needed, high quality
**Cons:** Mac only

### Method 2: Windows (Xbox Game Bar)

```bash
# Press: Win + G
# Click record button (or Win + Alt + R)
# Stop: Win + Alt + R again
```

**Pros:** Built-in, easy to use
**Cons:** Windows only, may have performance impact

### Method 3: OBS Studio (All Platforms)

**Setup:**
1. Download from [obsproject.com](https://obsproject.com)
2. Install and open OBS
3. Click "+" under Sources
4. Add "Display Capture" or "Window Capture"
5. Click "Start Recording"
6. Click "Stop Recording" when done

**Pros:** Professional quality, all platforms, free
**Cons:** Requires installation and setup

### Method 4: QuickTime (Mac)

```bash
# Open QuickTime Player
# File → New Screen Recording
# Click record button
# Stop: Click stop in menu bar
```

**Pros:** Simple, good quality
**Cons:** Mac only

## 📱 Device Setup Options

### Option A: Two iOS Simulators (Mac)

```bash
# Open Xcode
# Window → Devices and Simulators
# Click "+" to add simulator
# Launch two different simulators
# Arrange side by side
```

### Option B: Two Android Emulators

```bash
# Open Android Studio
# Tools → AVD Manager
# Create/Launch two emulators
# Arrange side by side
```

### Option C: Simulator + Physical Device

```bash
# Use Expo Go app on your phone
# Use simulator on computer
# Both on same WiFi
# Update API_URL to your computer's IP
```

### Option D: Two Physical Devices

```bash
# Install Expo Go on both phones
# Both on same WiFi
# Update API_URL to your computer's IP
# Record using third device or screen recording
```

## 🎤 Audio Tips

### Option 1: No Audio (Silent Video)
- Add text overlays explaining features
- Use video editing software to add captions

### Option 2: Voiceover
- Use built-in microphone
- Speak clearly and at moderate pace
- Follow the script above
- Edit out mistakes in post-production

### Option 3: Background Music (Optional)
- Use royalty-free music
- Keep volume low (don't overpower voiceover)
- Sources: YouTube Audio Library, Incompetech

## 🎞️ Video Editing (Optional)

### Free Tools:

**Mac:**
- iMovie (built-in)
- DaVinci Resolve

**Windows:**
- Windows Video Editor (built-in)
- DaVinci Resolve

**All Platforms:**
- DaVinci Resolve
- Shotcut
- OpenShot

### Quick Edits:
1. Trim beginning/end
2. Cut out mistakes
3. Add title screen (optional)
4. Add text overlays for features
5. Speed up slow parts (1.5x)
6. Add transitions between scenes

## 📤 Export Settings

**Recommended Settings:**
- **Resolution:** 1920x1080 (1080p) or 1280x720 (720p)
- **Frame Rate:** 30 fps
- **Format:** MP4 (H.264)
- **Bitrate:** 5-10 Mbps
- **Audio:** AAC, 128-192 kbps

**File Size Target:**
- Aim for under 500MB for easy uploading
- 5 minutes at 1080p should be ~200-400MB

## 🚀 Upload Destinations

### YouTube (Recommended)

**Pros:**
- Free, unlimited storage
- Good video player
- Easy to share
- Can set as unlisted

**Steps:**
1. Go to [studio.youtube.com](https://studio.youtube.com)
2. Click "Create" → "Upload videos"
3. Drag and drop your video
4. Title: "Real-Time Chat App Demo"
5. Visibility: "Unlisted"
6. Click "Publish"

### Google Drive

**Pros:**
- Easy to use
- Direct download available

**Steps:**
1. Go to [drive.google.com](https://drive.google.com)
2. Click "New" → "File upload"
3. Upload video
4. Right-click → "Get link"
5. Set to "Anyone with the link"

### Loom

**Pros:**
- Can record directly in browser
- Good for quick recordings

**Steps:**
1. Go to [loom.com](https://www.loom.com)
2. Sign up (free)
3. Click "Record"
4. Share link

## ✅ Final Checklist Before Recording

- [ ] Backend server is running without errors
- [ ] MongoDB is connected
- [ ] Two devices/simulators are ready
- [ ] Screen recording software is tested
- [ ] Audio is working (if using voiceover)
- [ ] Script/outline is prepared
- [ ] Test users are ready (alice, bob)
- [ ] Notifications are disabled
- [ ] Desktop is clean (close unnecessary windows)
- [ ] Battery is charged (if using laptop)

## 🎯 Quality Tips

1. **Lighting:** Record in good lighting if showing yourself
2. **Audio:** Use headphones to avoid echo
3. **Speed:** Don't rush, speak clearly
4. **Mistakes:** It's okay! Edit them out later
5. **Practice:** Do a test recording first
6. **Length:** Aim for 4-5 minutes (under 5 max)
7. **Focus:** Show features, not bugs
8. **Clarity:** Make sure text is readable

## 🎬 Ready to Record!

Follow this guide and you'll create a professional demo video. Good luck! 🚀

---

**Pro Tip:** Record multiple takes and choose the best one. It's easier than trying to get it perfect on the first try!
