(function (window) {

    'use strict';

    $.exists = function (selector) {
        return ($(selector).length > 0);
    }

    PageTransition();
    $.ajax({
        url: "/api/data",
    }).done(function(response) {
        setTimeout(() => {
            $('.ms-preloader').css('visibility', 'hidden');
            $('#progress').removeClass('progress').animate({'nothing':null}, 1, function () {
                $(this).addClass('progress');
                $(this).css('animationDuration', '3s');
            });
            var listData = response.message.listData;
            listData.forEach(function (el,i) {
                var title = el.title;
                var image = el.image;
                var html = '<div class="swiper-slide">'
                + '<div class="slide-inner" data-swiper-parallax="45%">'
                + '  <div class="overlay"></div>'
                + '  <div class="slide-inner--image" style="background-image: url(' + image + ')"></div>'
                + '     <div class="slide-inner--info user">'
                + '         <div class="avatar-container">'
                + '             <div class="avatar">'
                + '                 <img width="100%" height="100%" src="' + image + '" alt="avatar"/>'
                + '             </div>'
                + '             <p class="info"> ' + title
                + '             </p>'
                + '         </div>'
                + '     </div>'
                + '     <div class="slide-inner--info">'
                + '         <h1>' + title + '</h1>'
                + '         <a href="#" data-type="page-transition" class="ms-btn--slider">View Info</a>'
                + '     </div>'
                + '  </div>'
                + '</div>';

                $('.swiper-container .swiper-wrapper').append(html);
            })
            ms_home_slider();
        }, 3000);
    });


})(window);

/* Page Transition */
function PageTransition() {
    $('.ms-main-container').addClass('loaded');
    var cont = anime({
        targets: '.loaded',
        opacity: [0, 1],
        easing: 'easeInOutCubic',
        duration: 1000,
        delay: 300,
        complete: function (preload) {
            $('.ug-thumb-image').css({
                'opacity': '1'
            });
            $('.ms-section__block img').css({
                'opacity': '1'
            });
            $('.ug-thumb-wrapper, .post-item').css({
                'pointer-events': 'auto'
            });
        }
    });
    $(document).on('click', '[data-type="page-transition"]', function (e) {
        var url = $(this).attr('href');
        if (url != '#' && url != '') {
            e.preventDefault();
            $('.ms-preloader').css('visibility', 'visible');
            var url = $(this).attr('href');
            var preload = anime({
                targets: '.ms-preloader',
                opacity: [0, 1],
                duration: 300,
                easing: 'easeInOutQuad',
                complete: function (preload) {
                    window.location.href = url;
                }
            });
        }
    });
}

/* Home Slider */
function ms_home_slider() {
    if ($.exists('.swiper-container')) {
        var swiper = new Swiper('.swiper-container', {
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            loop: true,
            speed: 1000,
            mousewheel: true,
            keyboard: true,
            effect: 'fade',
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            watchSlidesProgress: true,
        });

        swiper.on('slideChange', function () {
            swiper.autoplay.start();
            $('#progress').removeClass('progress').animate({'nothing':null}, 1, function () {
                $(this).addClass('progress');
                $(this).css('animationDuration', '4s');
            });
        })

        swiper.on('touchMove', function () {
            swiper.autoplay.start();
            $('#progress').removeClass('progress').animate({'nothing':null}, 1, function () {
                $(this).addClass('progress');
            });
        })
    }
}
