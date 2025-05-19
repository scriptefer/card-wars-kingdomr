const fs = require('node:fs');
const path = require('node:path');

const publicFolder = path.join(__dirname, '../client/public');

function readPublic(dir, routeBase, app) {
    fs.readdir(dir, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.error('Unable to scan directory:', err);
            return;
        }
        files.forEach(file => {
            const filePath = path.join(dir, file.name);
            const routePath = `${routeBase}/${file.name}`;
            console.log(`Loaded route: ${routePath}`);
            if (file.isDirectory()) {
                // Recursively read subdirectories
                readPublic(filePath, routePath, app);
            } else {
                app.get(routePath, (req, res) => {
                    const ext = path.extname(file.name).toLowerCase();
                    let contentType = 'text/plain'; // Default content type
                    
                    if (ext === '.png') {
                        contentType = 'image/png';
                    } else if (ext === '.mp4') {
                        contentType = 'video/mp4';
                        
                    } else if (ext === '.mp3') {
                        contentType = 'audio/mp3';
                    } else if (ext === '.jpg' || ext === '.jpeg') {
                        contentType = 'image/jpeg';
                    } else if (ext === '.webp') {
                        contentType = 'image/webp'; 
                    } else if (ext === '.css') {
                        contentType = 'text/css';
                    } else if (ext === '.js') {
                        contentType = 'application/javascript';
                    } else if (ext === '.ttf') {
                        contentType = 'font/ttf';
                    } else if (ext === '.otf') {
                        contentType = 'font/otf';
                    } else if (ext === '.woff') {
                        contentType = 'font/woff';
                    } else if (ext === '.woff2') {
                        contentType = 'font/woff2';
                    } else if (ext === '.html') {
                        contentType = 'text/html';
                    }
                    
                
                    // Set the Content-Type header
                    res.setHeader('Content-Type', contentType);

                    // Use sendFile to serve the file
                    res.sendFile(path.resolve(filePath), err => {
                        if (err) {
                            console.error('Error sending file:', err);
                            res.status(500).send('Error sending file');
                        }
                    });
                });
            }
        });
    });
}

module.exports = readPublic;
