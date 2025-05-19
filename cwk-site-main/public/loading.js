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
$(document).ready(function() {
    let ellipsis = $('.ellipsis');
    let index = 0;

    function animateEllipsis() {
        
        ellipsis.removeClass('show');
        for (let i = 0; i <= index; i++) {
            ellipsis.eq(i).addClass('show');
        }

        if (index === 2) {
            setTimeout(function() {
                let hideIndex = 2;
                function hideEllipsis() {
                    if (hideIndex >= 0) {
                        ellipsis.eq(hideIndex).removeClass('show');
                        hideIndex--;
                        setTimeout(hideEllipsis, 300); 
                    } else {
                        setTimeout(function() {
                            index = 0; // إعادة التكرار من البداية
                            animateEllipsis();
                        }, 300); 
                    }
                }
                hideEllipsis();
            }, 500); 
        } else {
            index++;
            setTimeout(animateEllipsis, 500);
        }
    }
    animateEllipsis();
});
const plattext = $(".PLATFORM-Text");
$(document).ready(function(){
    $(".PLATFORM-Text").click(function(){
        plattext.css('outline', 'rgb(99 102 241) solid 1px')
        plattext.css('outline-width', '4px')
    });
});

$(document).ready(function() {
    $(".PLATFORM-Text").click(function(e) {
        $(".Main-download").css({
            'display': 'grid',
            'justify-items': 'center'
        });
        $(".chosseyourplatfrome-All-In-One").css('display', 'grid');
        $(".bodybluring-div").css('display', 'block');
        $("body").css("overflow", "hidden");
        e.stopPropagation();
    });

    $(document).click(function() {
        $('.chosseyourplatfrome-All-In-One').css('display', 'none');
        $('.bodybluring-div').css('display', 'none');
        $("body").css("overflow-y", "auto");
    });

    $('.chosseyourplatfrome-All-In-One').click(function(e) {
        e.stopPropagation();
    });
});


$(document).ready(function() {
    function getLeftPosition() {
        var windowWidth = parseInt($(window).width(), 10); // تحويل العرض إلى عدد صحيح بشكل صريح

        if (windowWidth > 992) {
            return '-25%';
        } else if (windowWidth >= 992 && windowWidth <= 1023) {
            return '-35%';
        } else if (windowWidth >= 838 && windowWidth <= 991) {
            return '-35%';
        } else if (windowWidth >= 768 && windowWidth <= 832) {
            return '-42%';
        } else if (windowWidth >= 709 && windowWidth <= 767) {
            return '-50%';
        } else if (windowWidth >= 640 && windowWidth <= 708) {
            return '-55%';
        } else if (windowWidth >= 576 && windowWidth <= 639) {
            return '-59%';
        } else if (windowWidth >= 510 && windowWidth <= 575) {
            return '-55%';
        } else if (windowWidth >= 477 && windowWidth <= 509) {
            return '-35%';
        } else if (windowWidth >= 412 && windowWidth <= 476) {
            return '-35%';
        } else if (windowWidth >= 344 && windowWidth <= 475) {
            return '-37%';
        } else {
            return '0%';
        }
    }

    function checkScreenWidth() {
        var leftPosition = getLeftPosition();
        var windowWidth = parseInt($(window).width(), 10);

        // ضبط موقع left للزر #leftbutton بناءً على عرض الشاشة
        if (windowWidth >= 1024 && windowWidth <= 1100) {
            $("#leftbutton").css('left', '31.3%');
        } else if (windowWidth >= 992 && windowWidth <= 1023) {
            $("#leftbutton").css('left', '34.3%');
        } else if (windowWidth >= 838 && windowWidth <= 991) {
            $("#leftbutton").css('left', '34%');
        } else if (windowWidth >= 768 && windowWidth <= 832) {
            $("#leftbutton").css('left', '40.5%');
        } else if (windowWidth >= 709 && windowWidth <= 767) {
            $("#leftbutton").css('left', '50%');
        } else if (windowWidth >= 640 && windowWidth <= 708) {
            $("#leftbutton").css('left', '57%');
        } else if (windowWidth >= 576 && windowWidth <= 639) {
            $("#leftbutton").css('left', '65%');
        } else if (windowWidth >= 510 && windowWidth <= 575) {
            $("#leftbutton").css('left', '55%');
        } else if (windowWidth >= 477 && windowWidth <= 509) {
            $("#leftbutton").css('left', '65%');
        } else if (windowWidth >= 412 && windowWidth <= 476) {
            $("#leftbutton").css('left', '65%');
        } else if (windowWidth >= 344 && windowWidth <= 475) {
            $("#leftbutton").css('left', '63%');
        } else {
            $("#leftbutton").css('left', '0%');
        }

        $("#rightbutton").off('click').on('click', function() {
            $(".f3lex").css('left', leftPosition);
            $(this).css('display', 'none');
            $("#leftbutton").css('opacity', '1').css('display', 'grid');
            $("#leftbutton span").css('transform', 'rotate(180deg)');
        });
    }

    checkScreenWidth();
    $(window).resize(checkScreenWidth);

    $("#leftbutton").click(function() {
        $(".f3lex").css('left', '0%');
        $(this).css('display', 'none');
        $("#rightbutton").css('display', 'grid');
        $("#leftbutton").css('opacity', '0').css('display', 'grid');
        $("#leftbutton span").css('transform', 'rotate(180deg)');
    });
});

$(document).ready(function(){
    $("#dnwl-button").click(function(){
        window.location.href = '/download';
    });
});
//download
$(document).ready(function(){
    $(".final-button").click(function(){
        const link = $("<a>");
        link.attr("href", "https://github.com/Sgsysysgsgsg/Card-Wars-Kingdom-Revived/releases/download/server5/Card.Wars.Kingdom-2.0.3-32bit-pc.zip");
        link.attr("download", "cardwardkingdom_32bit.zip"); 
        link[0].click();
    });
});
//
$(document).ready(function(){
    $(".PlInPcOn-").click(function(){
        const link = $("<a>");
        link.attr("href", "https://github.com/Sgsysysgsgsg/Card-Wars-Kingdom-Revived/releases/download/server5/Card.Wars.Kingdom-2.0.3-32bit-pc.zip");
        link.attr("download", "cardwardkingdom_32bit.zip"); 
        link[0].click();
    });
});
// id 
$(document).ready(function(){
    $("#final-button-id").click(function(){
        const link = $("<a>");
        link.attr("href", "https://github.com/Sgsysysgsgsg/Card-Wars-Kingdom-Revived/releases/download/server5/Card.Wars.Kingdom-2.0.3.apk");
        link.attr("download", "cardwardkingdom.zip"); 
        link[0].click();
    });
});
//android download
$(document).ready(function(){
    $(".android-animation").click(function(){
        const link = $("<a>");
        link.attr("href", "https://github.com/Sgsysysgsgsg/Card-Wars-Kingdom-Revived/releases/download/server5/Card.Wars.Kingdom-2.0.3.apk");
        link.attr("download", "cardwardkingdom.zip"); 
        link[0].click();
    });
});
//
$(document).ready(function(){
    $("#toComServerDis").click(function(){
        window.open('https://discord.gg/card-wars-kingdom-revived-1227932764117143642', '_blank');
    });
});
$(document).ready(function(){
    $(".againforflextwo").click(function(){
        window.open('https://discord.com/channels/1227932764117143642/1250781080618012775', '_blank');
    });
})

$(document).ready(()=>{
    let elm= document.querySelector('.bor-style');
    if (elm) {
        elm.addEventListener('click', function() {
            window.location.href = '/status';
        });
    }
})


$(document).ready(function(){
    $(".h-8").click(function(){
        window.location.href = "/"
    });
    $(".h-8").css('cursor', 'pointer');
});


