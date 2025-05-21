const express = require('express');
const fs = require('node:fs');
const path = require('node:path');
const axios = require('axios');
const session = require('express-session');
const readPublic = require('./PublicReadre');
const cheerio = require('cheerio');

const app = express();
const apiFolder = path.join(__dirname, 'api');
const publicFolder = path.join(__dirname, 'public');
const viewsFolder = publicFolder;

// Session Configuration
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    }
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicFolder));

// Set View Engine
app.set('view engine', 'ejs');
app.set('views', viewsFolder);

// Skip Ngrok warning
app.use((req, res, next) => {
    res.setHeader('ngrok-skip-browser-warning', '1');
    next();
});

// Load API Routes from /api
fs.readdir(apiFolder, (err, files) => {
    if (err) return console.error('Error reading API folder:', err);

    files.forEach(file => {
        const routePath = `/api/${path.parse(file).name}`;
        const route = require(path.join(apiFolder, file));
        app.use(routePath, route);
        console.log(`Loaded route: ${routePath}`);
    });
});

// Load and render routes
const fetchOnlinePlayers = async () => {
    const response = await axios.get('https://cardwarskingdom.pythonanywhere.com/online_players', {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
};

app.get('/', async (req, res) => {
    const online = await fetchOnlinePlayers();
    res.render('index', { online });
});

app.get('/status', async (req, res) => {
    const online = await fetchOnlinePlayers();
    res.render('status', { online });
});

app.get('/download', async (req, res) => {
    const online = await fetchOnlinePlayers();

    const downloadsPath = path.join(publicFolder, 'data', 'downloads.json');
    const downloads = fs.existsSync(downloadsPath)
        ? JSON.parse(fs.readFileSync(downloadsPath, 'utf-8'))
        : {};

    res.render('download', { online, downloads });
});

app.get('/cards', (req, res) => {
    res.render('cards');
});

app.get('/changelog', (req, res) => {
    const changelogPath = path.join(publicFolder, 'data', 'changelog.json');
    const changelog = fs.existsSync(changelogPath)
        ? JSON.parse(fs.readFileSync(changelogPath, 'utf-8'))
        : [];

    res.render('changelog', { changelog });
});

// Admin Authentication Middleware
const requireAuth = (req, res, next) => {
    if (req.session && req.session.isAuthenticated) {
        next();
    } else {
       res.redirect('/admin/dashboard');
    }
};

// Admin Auth Routes
app.post('/admin/login', (req, res) => {
    const { username, password } = req.body;
    const validUsername = 'admin';
    const validPassword = 'Z#4tQ^9mW!vR6$Yp@n2Lc*XbE';

    if (username === validUsername && password === validPassword) {
        req.session.isAuthenticated = true;
        return res.redirect('/admin/dashboard');
    }

    res.json({ success: false, error: 'Invalid credentials' });
});

app.get('/admin/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/admin/login');
});

// Admin Views
app.get('/admin/dashboard', requireAuth, (req, res) => {
    res.render('admin/dashboard');
});

app.get('/admin/changelog-management', requireAuth, (req, res) => {
    res.render('admin/changelog-management');
});

// Protected Admin Routes
app.use('/admin/changelog', requireAuth);
app.use('/admin/update-downloads', requireAuth);

// Load Admin API
app.use('/admin', require('./api/admin'));

// Load Changelog API
const changelogRoutes = require('./api/changelog');
app.use('/', changelogRoutes);

// Render all public files (custom module)
console.log(readPublic(publicFolder, '/public', app));

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Export for external use
module.exports = { express, app };
