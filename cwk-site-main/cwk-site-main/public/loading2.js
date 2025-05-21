/*document.addEventListener('DOMContentLoaded', function() {
    const invisibolDiv = document.querySelector('.invisibol-div');
    const img = document.querySelector('.imgone');
    const targetDiv = document.querySelector('.bg-gray-800'); 

    function onAnimationEnd() {
        img.classList.add('move');
        img.addEventListener('transitionend', function() {
            img.style.display = 'none';
            img.style.display = 'none';
        }, { once: true }); 
    }

    invisibolDiv.addEventListener('animationend', function() {
        onAnimationEnd();

        // تحديث display للعنصر بعد انتهاء الأنميشن
        targetDiv.style.display = 'block';
    });
});*/
$(document).ready(function(){
    const invisibolDiv = document.querySelector('.invisibol-div');
   

    
    const img = document.querySelector('.imgone');
    const navdiv = document.querySelector('.bg-gray-800');
    const centerDiv = document.querySelector('.center-div');
    const vdscetion = document.querySelector('.vs-section');
    const infodv = document.querySelector('.info');
    const CarSect = document.querySelector('.Caracters-Info');
    const MapSect = document.querySelector('.Maps-Info');
    const Gamesave = document.querySelector('.game-info');
    const dissect = document.querySelector('.discord-section')
    const footersct = document.querySelector('.foter')
    function onTransitionEnd() {
        navdiv.style.display = 'block';
        vdscetion.style.display = 'block';
        infodv.style.display = 'block';
        CarSect.style.display = 'block';
        MapSect.style.display = 'block';
        Gamesave.style.display = 'block';
        dissect.style.display = 'block';
        footersct .style.display = "block";
        img.style.display = 'none';
        centerDiv.style.display = 'none';
    }

    function onAnimationEnd() {
        img.classList.add('move');

        img.addEventListener('transitionend', function(event) {
            if (event.propertyName === 'width') { 
                onTransitionEnd();
            }
        }, { once: true });
    }
if (invisibolDiv) {
    invisibolDiv.addEventListener('animationend', onAnimationEnd);
}
   

});

$(document).ready(function(){
    $("#span-open-close").click(function(){
        $("#mobile-menu").slideToggle();
    });
    $("#user-button").click(function(){
        var menuButton = $("#user-menu-button");
        if (menuButton.css('display') === 'none') {
            menuButton.css('display', 'block');
        } else {
            menuButton.css('display', 'none');
        }
    });
    // حدد العناصر التي تريد تعديل حجم الخط لها
    const elements = document.querySelectorAll('.flex-2-1 > h1');
if (elements.length > 0) {
    elements.forEach(function(element) {
        // احصل على حجم الخط الحالي
        const currentFontSize = parseFloat(window.getComputedStyle(element).fontSize);
    
        // احسب الحجم الجديد بطرح 1.5rem (1.5rem = 24px تقريبًا)
        const newFontSize = currentFontSize - 24; // يمكنك ضبط القيم بناءً على الوحدات المستخدمة (px، em، rem)
    
        // قم بتعيين الحجم الجديد
        element.style.fontSize = newFontSize + 'px';
    });
}
    const ele2 = document.querySelector('.flex-1-2-3-4 > h1');
    if (ele2) {
        
    
    const currentFontSize2 = parseFloat(window.getComputedStyle(ele2).fontSize);
    
        // احسب الحجم الجديد بطرح 1.5rem (1.5rem = 24px تقريبًا)
        const newFontSize2 = currentFontSize2 - 24; // يمكنك ضبط القيم بناءً على الوحدات المستخدمة (px، em، rem)
    
        // قم بتعيين الحجم الجديد
        ele2.style.fontSize = newFontSize2 + 'px';
    }

    // استخدم forEach للتعديل على كل عنصر
   
})
$(document).ready(function(){
    $(".bor-style ").hover(function(){
        var iconButton = $("#user-menu-button");
        if (iconButton.css('display') === 'none'){
            iconButton.css('display', 'block');
        } else {
            iconButton.css('display', 'none');
        }
    });
});
