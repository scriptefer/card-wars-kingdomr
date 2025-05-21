const express = require('express');
const fs = require('node:fs');
const path = require('node:path');
const readPublic = require('./PublicReadre');
const axios = require('axios')
const cheerio = require('cheerio')
const session = require('express-session');
const app = express();
const apiFolder = path.join(__dirname, 'api');
const publicFolder = path.join(__dirname, './public');

// Add session support
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    }
}));

// Add body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// إضافة دعم EJS
app.set('view engine', 'ejs');

// إعداد مجلد views ليكون المجلد الذي يحتوي على ملفات EJS
const viewsFolder = path.join(__dirname, './public');
app.set('views', viewsFolder);

app.use(express.static(publicFolder));
module.exports = { express, app };

// بث جميع الملفات داخل مجلد "public"

// قراءة ملفات API وربطها بالتطبيق
fs.readdir(apiFolder, (err, files) => {
    if (err) {
        console.error('Unable to scan directory:', err);
        return;
    }
    
    files.forEach(file => {
        const routePath = `/api/${path.parse(file).name}`;
        const filePath = path.join(apiFolder, file);

        app.use(routePath, require(filePath));
        console.log(`Loaded route: ${routePath}`);
    });
});

// Add changelog routes
const changelogRoutes = require('./api/changelog');
app.use('/', changelogRoutes);

// إضافة مسار لرندرة صفحة EJS
app.get('/', async(req, res) => {
    let response = await axios.get('https://cardwarskingdom.pythonanywhere.com/online_players', {
        withCredentials: true,
        headers: { 
            'Content-Type': 'application/json',
        }
    });
    let online = response.data
    res.render('index',{
        online
    }); // تأكد من أن لديك ملف index.ejs في مجلد views
});

app.get('/status', async(req, res) => {
    let response = await axios.get('https://cardwarskingdom.pythonanywhere.com/online_players', {
        withCredentials: true,
        headers: { 
            'Content-Type': 'application/json',
        }
    });
    let online = response.data
    
    res.render('status',{
        online
    }); // تأكد من أن لديك ملف index.ejs في مجلد views
});

console.log(readPublic(publicFolder, '/public', app));

app.use((req, res, next) => {
    res.setHeader('ngrok-skip-browser-warning', '1');
    next();
});

// تشغيل الخادم على المنفذ 5000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

app.get('/download', async(req, res) => {
    let response = await axios.get('https://cardwarskingdom.pythonanywhere.com/online_players', {
        withCredentials: true,
        headers: { 
            'Content-Type': 'application/json',
        }
    });
    let online = response.data
    
    // Read downloads data
    const downloadsPath = path.join(__dirname, 'public/data/downloads.json');
    let downloads = {};
    if (fs.existsSync(downloadsPath)) {
        downloads = JSON.parse(fs.readFileSync(downloadsPath));
    }
    
    res.render('download', {
        online,
        downloads
    });
});

app.get('/cards', (req, res) => {
    res.render('cards'); 
});

// Changelog route
app.get('/changelog', (req, res) => {
    const changelogPath = path.join(__dirname, 'public/data/changelog.json');
    let changelog = [];
    if (fs.existsSync(changelogPath)) {
        changelog = JSON.parse(fs.readFileSync(changelogPath));
    }
    res.render('changelog', { changelog });
});

// Admin authentication middleware
const requireAuth = (req, res, next) => {
    if (req.session && req.session.isAuthenticated) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

// Admin login route
app.post('/admin/login', (req, res) => {
    const { username, password } = req.body;
    
    // Temporary hardcoded credentials
    if (username === 'admin' && password === "Z#4tQ^9mW!vR6$Yp@n2Lc*XbE") {
        req.session.isAuthenticated = true;
        res.json({ success: true, redirect: '/admin/dashboard' });
    } else {
        res.json({ success: false, error: 'Invalid credentials' });
    }
});

// Admin logout route
app.get('/admin/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/admin/login');
});

// Admin dashboard route
app.get('/admin/dashboard', requireAuth, (req, res) => {
    res.render('admin/dashboard');
});

// Admin changelog management route
app.get('/admin/changelog-management', requireAuth, (req, res) => {
    res.render('admin/changelog-management');
});

// Protected admin routes
app.use('/admin/changelog', requireAuth);
app.use('/admin/update-downloads', requireAuth);

// Admin routes
app.use('/admin', require('./api/admin'));
