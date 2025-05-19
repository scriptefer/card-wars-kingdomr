const {express,app} = require('../server.js')
const router = express.Router();
const axios = require('axios')
const cheerio = require('cheerio')
async function get_cards(params) {
    let response = await axios.get('https://cardwarskingdom.fandom.com/wiki/Creature_Book', {
        withCredentials: true,
        headers: { 
            'Content-Type': 'application/json',
        }
    });
    let test = response.data
    let $ = cheerio.load(test)
   var galleryData = [];

// اجلب جميع الصور
var images = $(".wikia-gallery .wikia-gallery-item img").map(function() {
    return $(this).attr("data-src");
}).get();

// اجلب جميع التسميات
var captions = $(".wikia-gallery .wikia-gallery-item .lightbox-caption").map(function() {
    return $(this).text();
}).get();

// استخدم الطول الأقل لتجنب الأخطاء
var minLength = Math.min(images.length, captions.length);

// إنشاء كائنات تحتوي على الرابط والنص
for (var i = 0; i < minLength; i++) {
    galleryData.push({
        imageUrl: images[i],
        caption: captions[i]
    });
}


return galleryData
    
}


// تعريف المسارات باستخدام router
router.get('/', async (req, res) => {
    let cards = await get_cards()
    res.json({ message: 'Welcome to the users API!', cards:cards});
});


module.exports = router;