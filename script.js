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