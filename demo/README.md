# 🎥 Demo Video

This folder contains the demo video for the Real-Time Chat Application.

## 📹 Video File

- **File:** `Demo.mp4`
- **Duration:** ≤5 minutes
- **Size:** Check file size before committing

## ⚠️ Important Notes

### GitHub File Size Limits

- **Maximum file size:** 100 MB per file
- **Repository size:** Keep under 1 GB total

### If Video is Too Large (>100MB):

**Option 1: Compress the Video**
```bash
# Use online tools:
# - https://www.freeconvert.com/video-compressor
# - https://www.videosmaller.com/
# - HandBrake (desktop app)
```

**Option 2: Use Git LFS (Large File Storage)**
```bash
# Install Git LFS
git lfs install

# Track video files
git lfs track "*.mp4"

# Add and commit
git add .gitattributes
git add demo/Demo.mp4
git commit -m "Add demo video with Git LFS"
```

**Option 3: Use External Hosting (Recommended for large files)**
- Upload to YouTube (Unlisted)
- Upload to Google Drive
- Upload to Loom
- Use GitHub Releases

## 📊 Check Video Size

**Windows:**
```bash
dir demo\Demo.mp4
```

**Mac/Linux:**
```bash
ls -lh demo/Demo.mp4
```

## 🚀 Commit Video

If video is under 100MB:
```bash
git add demo/
git commit -m "Add demo video"
git push
```

If video is over 100MB, use one of the options above!

---

**Current Status:** ✅ Video added to repository
