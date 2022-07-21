$(document).ready(function() {
    let position = 0;
    let i = 0;
    let moveMouse = null;
    
    const sliderToShow = 1;
    const sliderToScroll = 1;
    
    const container = $('.welcome-slider-area');
    const track = $('.welcome-slider-track');
    const item = $('.welcome-single-slide');
    let elemCount = $('.welcome-slider-track > div').length;
    const btnNext = $('.btn-next');
    const btnPrev = $('.btn-prev');

    const itemWidth = container.width() / sliderToShow;
    const movePosition = sliderToScroll * itemWidth;

    item.each(function (index, item) {
        $(item).css({
            minWidth: itemWidth,
        });
    });

    btnNext.click(nextSlide);
    btnPrev.click(prevSlide);

    const setPosition = () => {
        track.css({
            transform: `translateX(${position}px)`
        });
    };
  
    function nextSlide() {
        i++;
        if (i <= (elemCount-1)){
            position -= movePosition;
            setPosition();
        } else {
            i = 0; 
            position = 0;
            setPosition();
        }
    };

    function prevSlide() {
        i--;
        if (i > 0){
            position += movePosition;
            setPosition();
        } else {
            i = elemCount; 
            position = -(itemWidth * (elemCount-1));
            setPosition();
        }
    };

    setInterval(nextSlide, 5000); //автоскролл
 
    document.addEventListener('touchstart', handleTouchStart, false); //вызов функции по первому касанию элемента
    document.addEventListener('touchmove', handleTouchMove, false); //вызов функции при движении мышью (конечные координаты)
    document.addEventListener('touchend', handleEnd, false);

    let x1 = null;
    let y1 = null;

    function handleTouchStart(event) { //прослушавает первый клик по слайдеру
        const firstTouch = event.touches[0];
        x1 = Math.round(firstTouch.clientX);
        y1 = Math.round(firstTouch.clientY);
    };

    function handleTouchMove(event) { //координаты при движении мышью
        if (!x1 || !y1) {return false;}
      
        let x2 = Math.round(event.touches[0].clientX);
        let y2 = Math.round(event.touches[0].clientY);
     
        let xDiff = Math.abs(x2 - x1);
        let yDiff = Math.abs(y2 - y1);

        if (xDiff > yDiff) {
            if (x2 < x1) {moveMouse = true;}
            else {moveMouse = false;};
        };
    };  

    function handleEnd() { //действие по окончанию движения
        if (moveMouse == true) {nextSlide();} 
        else if (moveMouse == false) {prevSlide();}
    };



    if (window.innerWidth <= 900) {
        $('.course-list').slick({
            speed: 300,
            slidesToShow: 1,
            autoplay: true,
            slidesToScroll: 1,
        });
        $('.scroll-1').slick({
            dots: true,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            prevArrow: '<a class="arrow-slider" aria-label="" type="button"><i class="fa-solid fa-angle-left"></i></a>',
            nextArrow: '<a class="arrow-slider" aria-label="" type="button"><i class="fa-solid fa-angle-right"></i></a>',
        });
        $('.client-wrap').slick({
            speed: 300,
            slidesToShow: 2,
            autoplay: true,
            slidesToScroll: 1,
        });
    } else {
        $('.course-list').slick({
            speed: 300,
            slidesToShow: 4,
            autoplay: true,
            slidesToScroll: 1,
        });
        $('.scroll-1').slick({
            dots: true,
            speed: 300,
            slidesToShow: 2,
            slidesToScroll: 2,
            autoplay: true,
            prevArrow: '<a class="arrow-slider" aria-label="" type="button"><i class="fa-solid fa-angle-left"></i></a>',
            nextArrow: '<a class="arrow-slider" aria-label="" type="button"><i class="fa-solid fa-angle-right"></i></a>',
        });
        $('.client-wrap').slick({
            speed: 300,
            slidesToShow: 5,
            autoplay: true,
            slidesToScroll: 1,
        });
    }

  const menu = $('.navbar');
    $(window).scroll(function() {
        $(menu).addClass('active');
        if (window.pageYOffset <= 25 || document.documentElement.scrollTop <= 25) {  $(menu).removeClass('active');};
    
    });
});



