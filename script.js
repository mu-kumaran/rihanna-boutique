// Making nav-bar sticky and absolute position both

const header = document.getElementById("nav-bar")

window.addEventListener("scroll",()=>{
    if (window.scrollY > 50){     //scroll greater than 50px
        header.classList.add("sticky");
    }
    else{
        header.classList.remove("sticky")
    }
})