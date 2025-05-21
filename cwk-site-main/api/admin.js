const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Admin credentials (in production, use environment variables)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'cardwars2025';

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.isAuthenticated) {
        next();
    } else {
        res.redirect('/admin/login');
    }
};

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, '../public/uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Admin login page
router.get('/login', (req, res) => {
    res.render('admin/login');
});

// Admin login handler
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        req.session.isAuthenticated = true;
        res.redirect('/admin/dashboard');
    } else {
        res.render('admin/login', { error: 'Invalid credentials' });
    }
});

// Admin dashboard
router.get('/dashboard', isAuthenticated, (req, res) => {
    res.render('admin/dashboard');
});

// Handle download link updates
router.post('/update-downloads', isAuthenticated, (req, res) => {
    const { iosVersion, iosSize, androidVersion, androidSize, windowsVersion, windowsSize } = req.body;
    
    // Update downloads.json
    const downloadsPath = path.join(__dirname, '../public/data/downloads.json');
    const downloadsData = {
        ios: {
            version: iosVersion,
            size: iosSize,
            link: req.body.iosLink
        },
        android: {
            version: androidVersion,
            size: androidSize,
            link: req.body.androidLink
        },
        windows: {
            version: windowsVersion,
            size: windowsSize,
            link: req.body.windowsLink
        }
    };

    fs.writeFileSync(downloadsPath, JSON.stringify(downloadsData, null, 2));
    res.json({ success: true });
});

// Handle changelog updates
router.post('/update-changelog', isAuthenticated, (req, res) => {
    const { version, changes } = req.body;
    
    // Update changelog.json
    const changelogPath = path.join(__dirname, '../public/data/changelog.json');
    let changelogData = [];
    
    if (fs.existsSync(changelogPath)) {
        changelogData = JSON.parse(fs.readFileSync(changelogPath));
    }
    
    changelogData.unshift({
        version,
        date: new Date().toISOString(),
        changes: changes.split('\n').filter(change => change.trim())
    });

    fs.writeFileSync(changelogPath, JSON.stringify(changelogData, null, 2));
    res.json({ success: true });
});

module.exports = router; 