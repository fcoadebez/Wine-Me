$(window).on('load', function() {

    if ($('#homepage').length) {
        var path = anime.path('path');
        var horizontalCenter = Math.floor(window.innerWidth/2);

        var playPauseAnim = anime({
            targets: '.velo img',
            translateX: path('x'),
            translateY: path('y'),
            rotate: path('angle'),
            duration: 10000,
            loop: false,
            easing: 'linear',
            autoplay: false
        });

        document.addEventListener('keydown', function(event) {
            const key = event.keyCode;
            var bikePosition = $('.velo img').position().left;

            ((key == 37) || (key == 39)) ? event.preventDefault() : "";

            if (key == 39) {
                playPauseAnim.reversed ? playPauseAnim.reverse() : "";
                playPauseAnim.play();

            } else if (key == 37) {
                playPauseAnim.reversed ? "" : playPauseAnim.reverse();
                playPauseAnim.play();
            }

            bikePosition >= horizontalCenter ? $('html, body').animate({scrollLeft: bikePosition - horizontalCenter}, 80) : '';

        });
        document.addEventListener('keyup', function(event) {
            const key = event.keyCode;
            key == 37 || key == 39 ? playPauseAnim.pause() : "";

        });
    }

    $("#menu").click(function() {
        console.log('ok');
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('.main-nav').animate({
                height: 'toggle'
            }, 290, function() {
            });
        } else {
            $(this).addClass('active');
            $('.main-nav').animate({
                height: 'toggle'
            }, 290, function() {
            });
        }
    });

    if ($('#questions').length) {
        $('.search > input').keyup(function(e) {
            var value = this.value;
            $('.question-container').hide();
            $( ".question:contains('" + value + "')" ).parent().show();
        });
    }
    if ($('#gamme-detail').length) {
        $('.infos-show').click(function(e) {
            e.preventDefault();
            $('.infos').show(300);
        });
    }
    if ($('#contact').length) {
        $('.check').click(function() {
            if (!$(this).siblings('.check').hasClass('active')) {
                $(this).hasClass('active') ? $(this).removeClass('active').find('input').prop('checked', false) : $(this).addClass('active').find('input').prop('checked', true);
            } else {
                $(this).siblings('.check').removeClass('active').find('input').prop('checked', false);
                $(this).addClass('active').find('input').prop('checked', true);

            }
            console.log($(this).find('input').prop('checked'));

        });

        $('.submit').click(function(e) {
            e.preventDefault();
            if (($('#nom').val() == "") || 
                ($('#prenom').val() == "") || 
                ($('#adresse').val() == "") || 
                ($('#code').val() == "") || 
                ($('#ville').val() == "") || 
                ($('#mail').val() == "") || 
                ($('#tel').val() == "") || 
                ($('#textarea').val() == "")) {

                alert("Veuillez remplir tous les champs requis.");

            } else {
                $('form').submit();
            }
        });
    }

    // Init AOS
    AOS.init({
        disable: 'mobile',
        offset: 200,
        duration: 1000,
        easing: 'ease-in-sine',
        delay: 100,
    });
});