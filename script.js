// Making nav-bar both sticky and absolute position

const header = document.getElementById("nav-bar")

window.addEventListener("scroll",()=>{
    if (window.scrollY > 50){     //scroll greater than 50px
        header.classList.add("sticky");
    }
    else{
        header.classList.remove("sticky")
    }
})

// Slider section
 
let sliderImages = document.querySelectorAll(".slide")
let arrowLeft = document.querySelector("#arrow-left")
let arrowRight = document.querySelector("#arrow-right")
let current = 0;
let autoSlideInterval = null;

// clear all images
function reset(){
    for(let i=0;i<sliderImages.length;i++){
        sliderImages[i].style.display = "none";
    }
}

// Initial slide
function startSlide(current){
    reset()
    sliderImages[current].style.display = "block";
}

// Show previous slide
function slideLeft(){
    current--;
    if(current < 0){
        current = sliderImages.length - 1;
    }
    startSlide(current); 
}

//show next slide
function slideRight(){
    current++;
    if(current >= sliderImages.length){
        current = 0;
    }
    startSlide(current);
}

// Left arrow click
arrowLeft.addEventListener("click",()=>{
    slideLeft()
    startAutoSlide();
})

// Right arrow click
arrowRight.addEventListener("click",()=>{
    slideRight();
    startAutoSlide();
})

// Start auto slide
function startAutoSlide() {
    stopAutoSlide(); // prevent duplicates
    autoSlideInterval = setInterval(slideRight, 3000); // every 3s
}

// Stop auto slide
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
}

// Initialize slider
function slider_init(){
    startSlide(current);
    startAutoSlide();
}

slider_init();

// Another slider section

const slides = document.querySelector('.c-slides');
const slideImages = document.querySelectorAll('.c-slide');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

let index = 0;

// Show current slide
function showSlide() {
  slides.style.transform = `translateX(${-index * 100}%)`;
}

// Next button
next.addEventListener('click', () => {
  index = (index + 1) % slideImages.length;
  showSlide();
});

// Prev button
prev.addEventListener('click', () => {
  index = (index - 1 + slideImages.length) % slideImages.length;
  showSlide();
});

// Auto slide
let autoSlide = setInterval(() => {
  index = (index + 1) % slideImages.length;
  showSlide();
}, 3000);

// Pause on hover
document.querySelector('.c-slider').addEventListener('mouseenter', () => clearInterval(autoSlide));
document.querySelector('.c-slider').addEventListener('mouseleave', () => {
  autoSlide = setInterval(() => {
    index = (index + 1) % slideImages.length;
    showSlide();
  }, 3000);
});

// carousel
// Carousel section


const track = document.querySelector('.carousel-track');
const images = document.querySelectorAll('.carousel-image');
const prevBtn = document.getElementById('caro-prev');
const nextBtn = document.getElementById('caro-next');
const progress = document.querySelector('.progress');


let currentIndex = 0;


// Clone first and last image for circular effect
const firstClone = images[0].cloneNode(true);
const lastClone = images[images.length - 1].cloneNode(true);
track.appendChild(firstClone);
track.insertBefore(lastClone, images[0]);


let caro_slides = Array.from(document.querySelectorAll('.carousel-image'));
let slideWidth = caro_slides[0].clientWidth + 30; // include gap


// Move to first real image (after lastClone)
track.style.transform = `translateX(-${slideWidth}px)`;


function updateCarousel() {
  track.style.transition = 'transform 0.6s ease-in-out';
  track.style.transform = `translateX(-${(currentIndex + 1) * slideWidth}px)`;
 
  const progressPercent = ((currentIndex + 1) / images.length) * 100;
  progress.style.width = `${progressPercent}%`;
}


nextBtn.addEventListener('click', () => {
  if (currentIndex >= images.length - 1) return;
  currentIndex++;
  updateCarousel();
});


prevBtn.addEventListener('click', () => {
  if (currentIndex <= 0) return;
  currentIndex--;
  updateCarousel();
});


// Reset position instantly after transition (circular loop)
track.addEventListener('transitionend', () => {
  if (caro_slides[currentIndex + 1] === firstClone) {
    track.style.transition = 'none';
    currentIndex = 0;
    track.style.transform = `translateX(-${slideWidth}px)`;
  } else if (caro_slides[currentIndex + 1] === lastClone) {
    track.style.transition = 'none';
    currentIndex = images.length - 1;
    track.style.transform = `translateX(-${(images.length) * slideWidth}px)`;
  }
});


// Lightbox logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');


caro_slides.forEach((img, i) => {
  img.addEventListener('click', () => {
    lightbox.classList.add('active');
    lightboxImg.src = img.src;
  });
});


// Close lightbox on ESC key
window.addEventListener('keydown', (e) => {
  if (e.key === "Escape" && lightbox.classList.contains('active')) {
    lightbox.classList.remove('active');
  }
});


// Resize update
window.addEventListener('resize', () => {
  slideWidth = caro_slides[0].clientWidth + 30;
  updateCarousel();
});


