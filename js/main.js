const images = document.querySelectorAll('img');
const slider = document.querySelector('.slider');
const circlebtn_div = document.querySelector('.circlebtn-conatianer');

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

var counter = 1;
var size = 640;
var isAnimating = false;

var interval = setInterval(autoSilder, 3000);

images.forEach((image, index) => {
    image.style.transform = `translateX(${-counter * size}px)`;
    if (index === 0 || index === images.length - 1) return;
    const spanTag = document.createElement('span');
    spanTag.setAttribute('class', 'circleBtn');
    spanTag.setAttribute('id', index);
    circlebtn_div.appendChild(spanTag);
})

const circleBtn = document.querySelectorAll('.circleBtn');
updateClass();

prevBtn.addEventListener('click', function() {
    if (counter <= 0) return;
    if (isAnimating) return;
    counter--;
    makeTransition();
    resetTimer();
})

nextBtn.addEventListener('click', function() {
    if (counter >= images.length - 1) return;
    if (isAnimating) return;
    counter++;
    makeTransition();
    resetTimer();
})

circleBtn.forEach((btn) => {
    btn.addEventListener('click', takeToImage)
})

slider.addEventListener('transitionend', checkEnds);
slider.addEventListener('transitionstart', updateClass);

function checkEnds() {
    isAnimating = false;
    if (images[counter].id === 'firstClone') {
        counter = 1;
        makeTransition('none')
    }
    if (images[counter].id === 'lastClone') {
        counter = images.length - 2;
        makeTransition('none');
    }
}



function autoSilder() {
    checkEnds();
    counter++;
    images.forEach((image, index) => {
        image.style.transition = `transform 0.4s ease-in-out`;
        image.style.transform = `translateX(${-counter * size}px)`;
    })
}

function updateClass() {
    isAnimating = true;
    circleBtn.forEach((btn, index) => {
        btn.classList.remove("active");
    });
    switch (counter) {
        case 0:
            circleBtn[circleBtn.length - 1].classList.add('active');
            break;
        case (images.length - 1):
            circleBtn[0].classList.add('active');
            break;
        default:
            circleBtn[counter - 1].classList.add('active');
            break;
    }
}

function makeTransition(none) {
    images.forEach(image => {
        none ? image.style.transition = none : image.style.transition = `transform 0.4s ease-in-out`;
        image.style.transform = `translateX(${-counter * size}px)`;
    })
}

function takeToImage(e) {
    resetTimer();
    var id = e.target.id;
    counter = id;
    makeTransition();
}

function resetTimer() {
    clearInterval(interval);
    interval = setInterval(autoSilder, 3000);
}