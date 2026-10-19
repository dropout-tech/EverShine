#!/bin/sh
# Zeabur build script

echo "🔨 Starting build process..."

# Clean install
echo "📦 Installing dependencies..."
npm install

# Build the app
echo "🏗️ Building React app..."
npm run build:zeabur

# Verify build
echo "✅ Verifying build output..."
ls -la dist/
ls -la dist/assets/

# Check if index.html exists
if [ -f "dist/index.html" ]; then
    echo "✅ dist/index.html found"
    head -20 dist/index.html
else
    echo "❌ ERROR: dist/index.html NOT found!"
    exit 1
fi

# Check if CSS exists
if ls dist/assets/*.css 1> /dev/null 2>&1; then
    echo "✅ CSS files found:"
    ls -lh dist/assets/*.css
else
    echo "❌ ERROR: No CSS files found!"
    exit 1
fi

# Check if JS exists
if ls dist/assets/*.js 1> /dev/null 2>&1; then
    echo "✅ JS files found:"
    ls -lh dist/assets/*.js
else
    echo "❌ ERROR: No JS files found!"
    exit 1
fi

echo "🎉 Build completed successfully!"
