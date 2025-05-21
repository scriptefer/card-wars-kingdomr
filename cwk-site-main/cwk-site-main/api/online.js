const {express,app} = require('../server.js')
const router = express.Router();
const axios = require('axios')
const cheerio = require('cheerio')
async function get_online(params) {
    let response = await axios.get('https://cardwarskingdom.pythonanywhere.com/online_players', {
        withCredentials: true,
        headers: { 
            'Content-Type': 'application/json',
        }
    });
    let online = response.data
    return online.online_player_count;
}


// تعريف المسارات باستخدام router
router.get('/', async (req, res) => {
    let online = await get_online()
    res.json({ message: 'Welcome to the users API!', online:online});
});


module.exports = router;