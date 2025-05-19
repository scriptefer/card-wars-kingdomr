const express = require('express');
const fs = require('node:fs');
const path = require('node:path');
const readPublic = require('./PublicReadre');
const axios = require('axios')
const cheerio = require('cheerio')
const app = express();
const apiFolder = path.join(__dirname, 'api');
const publicFolder = path.join(__dirname, './public');

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
    
    res.render('download',{
        online
    }); // تأكد من أن لديك ملف index.ejs في مجلد views
});
app.get('/cards', (req, res) => {
    res.render('cards'); 
});
