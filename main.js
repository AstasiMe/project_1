$(document).ready(function() {
    let position = 0;
    let i = 0;

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

    // btnPrev.click(function() {
    //     i--;
    //     if (i > 0){
    //         position += movePosition;
    //         setPosition();
    //     } else {
    //         i = elemCount; 
    //         position = -(itemWidth * (elemCount-1));
    //         setPosition();
    //     }
    // });

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

    setInterval(nextSlide, 5000);
 
    document.addEventListener('touchstart', handleTouchStart, false); //вызов функции по первому касанию элемента
    document.addEventListener('touchmove', handleTouchMove, false); //вызов функции при движении мышью (конечные координаты)

    let x1 = null;
    let y1 = null;

    function handleTouchStart(event) { //прослушавает первый клик по слайдеру
        const firstTouch = event.touches[0];
        x1 = Math.round(firstTouch.clientX);
        y1 = Math.round(firstTouch.clientY);
       // console.log(x1, y1);
    };

    function handleTouchMove(event) { //координаты при движении мышью
        if (!x1 || !y1) { //проверка на непустые значения
            return false;
        }
        let x2 = Math.round(event.touches[0].clientX);
        let y2 = Math.round(event.touches[0].clientY);
        // console.log(x2, y2);
    
        let xDiff = Math.abs(x2 - x1);
        let yDiff = Math.abs(y2 - y1);

       
        
        if (xDiff > yDiff) {
            //<-- -->
            if (x2 < x1) {console.log('вперед');}
            else {console.log('назад')};
        };
      
    };
       
});