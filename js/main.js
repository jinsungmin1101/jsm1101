$(document).ready(function () {

    window.onload = function () {
        // 로딩 다 끝난 후 1.5초 뒤에 영상 재생
        setTimeout(function () {
            const introVideo = document.getElementById('introVideo');
            if (introVideo) {
                introVideo.play();
            }
        }, 2000);
    };

    let isVideoPlaying = false;
    let currentVideo = null;

    // 페이지 로드 시 1페이지에서는 header를 숨김
    $('header').css({
        'transform': 'translateY(-100%)',
        'transition': 'none',
        'opacity': '0'
    });

    $('#jsm').fullpage({
        anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7'],
        responsiveWidth: 768,
        scrollBar: true,

        // 페이지 이동 시
        onLeave: function (origin, destination, direction) {
            if (destination.index === 0) {
                // 1페이지일 땐 숨김
                $('header').css({
                    'transform': 'translateY(-100%)',
                    'transition': 'transform 1s ease-in-out, opacity 1s ease-in-out',
                    'opacity': '0'
                });
            } else {
                // 나머지 페이지에서는 항상 보임
                $('header').css({
                    'transform': 'translateY(0)',
                    'transition': 'transform 1s ease-in-out, opacity 1s ease-in-out',
                    'opacity': '1'
                });
            }
        },

        // 첫 로딩 시
        afterLoad: function (anchorLink, index) {
            if (index === 1) {
                // 1페이지에서 시작하면 숨김 유지
                $('header').css({
                    'transition': 'transform 0.2s ease-in-out, opacity 0.2s ease-in-out',
                    'transform': 'translateY(-100%)',
                    'opacity': '0'
                });
            } else {
                // 그 외에서는 짧은 시간 뒤 보여줌
                setTimeout(function () {
                    $('header').css({
                        'transition': 'transform 0.2s, opacity 0.2s',
                        'transform': 'translateY(0)',
                        'opacity': '1'
                    });
                }, 1);
            }
        }
    });

    // 영상 클릭 관련 로직
    function handleVideoClick(className, shiftValues) {
        $(className).click(function (event) {
            event.stopPropagation();

            if (isVideoPlaying && currentVideo !== this) {
                resetVideos();
            }

            $(this).addClass('on');
            let video = $(this).find('video')[0];
            video.play();

            // 이전 요소들 이동
            for (let i = 1; i < parseInt(className[3]); i++) {
                $(`.ve${i}`).css('transform', `translateX(${shiftValues[i - 1]})`);
            }

            currentVideo = this;
            isVideoPlaying = true;
        });
    }

    handleVideoClick('.ve1', []);
    handleVideoClick('.ve2', ['-150%']);
    handleVideoClick('.ve3', ['-150%', '-250%']);
    handleVideoClick('.ve4', ['-150%', '-250%', '-350%']);
    handleVideoClick('.ve5', ['-150%', '-250%', '-350%', '-450%']);

    $(document).keydown(function (event) {
        if (event.key === "Escape") {
            resetVideos();
        }
    });

    $(document).click(function (event) {
        if (!$(event.target).closest('.ve1, .ve2, .ve3, .ve4, .ve5').length) {
            resetVideos();
        }
    });

    function resetVideos() {
        $('.ve1, .ve2, .ve3, .ve4, .ve5').removeClass('on').find('video').each(function () {
            this.pause();
        });

        $('.ve1, .ve2, .ve3, .ve4, .ve5').css('transform', '');

        isVideoPlaying = false;
        currentVideo = null;
    }

    // IntersectionObserver (스크롤 등장 애니메이션)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // 1번만 실행
            }
        });
    }, {
        threshold: 0.2
    });

    document.querySelectorAll('.fade-item').forEach(el => observer.observe(el));
});
