const axios = require("axios")
const fs = require("node:fs")
const fetch =require("node-fetch")
async function upload(url_img,name) {
    let fimg = await fetch(url_img)

let imageBuffer  = await fimg.buffer();
  let form = new FormData();
    form.append('gallery', '');
    form.append('optsize', '0');
    form.append('expire', '0');
    form.append('numfiles', '1');
    form.append('upload_session', '1722117351335.07729214987272326');
    form.append('upload_referer', 'aHR0cHM6Ly93d3cuYmluZy5jb20v');
    form.append('file', imageBuffer, {
      filename: `${name}.webp`,
      contentType: 'image/webp'
    });
let headers = {
    'accept': 'application/json',
    'content-type': 'multipart/form-data; boundary=' + form.getBoundary(),
    'cookie': '__gads=ID=c2f7d0c60815321e:T=1722117353:RT=1722117353:S=ALNI_MYjCSyuRLMogkEseyieL50l_7tMKQ; __gpi=UID=00000e80c17bcdf5:T=1722117353:RT=1722117353:S=ALNI_MYCH6W3sx9Mm9IsqD_5OKF76tDCSA; __eoi=ID=4805dcae3df63357:T=1722117353:RT=1722117353:S=AA-AfjY94nUdjtpwvm-cCYwj4HuK; FCNEC=%5B%5B%22AKsRol9taoirRz-pekG0s7FNfGyFxpVcKjaTL2SDwpD5Ln_E4OPSfMtC4vR_sih1zoQfk4Sp_YZKgafcMcquYmrrN-DQE4rlL6z5Nr4PBQYI_7dShfa7GrODSq9M-gcSPa0RTvllr2PdEHHXI73bfDPSPErPbSZ8zQ%3D%3D%22%5D%5D',
    'origin': 'https://postimages.org',
    'referer': 'https://postimages.org/',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0',
    'x-requested-with': 'XMLHttpRequest'
  };

  // إرسال الطلب باستخدام fetch
  let fetchResponse = await fetch('https://postimages.org/json/rr', {
    method: 'POST',
    body: form,
    headers: headers
  });

  let data2 = await fetchResponse.json();
let url = await data2.url
let pageResponse = await fetch(url);
let pageHtml = await pageResponse.text();
let $ = cheerio.load(pageHtml);
url = $('#code_direct').val();
return url;
}
async function getcardsdata() {
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
var name = $(".wikia-gallery .wikia-gallery-item .lightbox-caption").map(function() {
    return $(this).text();
}).get();
let url = $("div.thumb > div > a").map(function() {
    return $(this).attr('href');  // الحصول على href من عنصر <a>
}).get()
var minLength = Math.min(images.length, name.length);
for (var i = 0; i < minLength; i++) {
 // اختيار العنصر باستخدام id
let img = await upload(images[i],name[i])
let response = await axios.get(`https://cardwarskingdom.fandom.com/${url[i]}`, {
    withCredentials: true,
    headers: { 
        'Content-Type': 'application/json',
    }
});
let test = response.data
let $ = cheerio.load(test)
var thum_data = $(".pi-image-thumbnail").attr("srcset").split(' 1x')[0];
let card_thum = await upload(thum_data[i],name[i])

    galleryData.push({
            card_name:name[i],
            card_img:img,
            card_thum,
            following_cards:[],
            card_levels:[
            {
            level:10,
            url:null
            },
            {
            level:20,
            url:null
            },
            {
            level:30,
            url:null
            },
            {
            level:40,
            url:null
            }
            ]
    });
}


return galleryData
}
console.log(getcardsdata())