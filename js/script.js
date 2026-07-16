const welcome = document.getElementById("welcome");
const music = document.getElementById("music");

const moon = document.getElementById("moon");
const orbit = document.querySelector(".orbit-container");


/* CLICK MÀN HÌNH CHÀO */

welcome.addEventListener("click", async () => {

    try{
        music.volume = 0.5;
        await music.play();
    }
    catch(e){
        console.log(e);
    }

    welcome.style.opacity = "0";
    welcome.style.pointerEvents = "none";

    setTimeout(()=>{
        welcome.style.display = "none";
    },800);

});


/* CLICK MẶT TRĂNG */

moon.addEventListener("click",(e)=>{

    e.stopPropagation();

    orbit.classList.toggle("active");

});


/* CLICK NGOÀI THÌ ĐÓNG */

document.addEventListener("click",(e)=>{

    if(
        !orbit.contains(e.target)
        &&
        e.target !== moon
    ){
        orbit.classList.remove("active");
    }

});
const orbitRotate =
document.querySelector(".orbit-rotate");

let isDragging = false;

let currentRotation = 0;

let startX = 0;


orbitRotate.addEventListener("mousedown",(e)=>{

    isDragging = true;

    startX = e.clientX;

    orbitRotate.style.cursor = "grabbing";

});


document.addEventListener("mouseup",()=>{

    isDragging = false;

    orbitRotate.style.cursor = "grab";

});


document.addEventListener("mousemove",(e)=>{

    if(!isDragging) return;

    const dx = e.clientX - startX;

    startX = e.clientX;

    currentRotation += dx * 0.25;

    orbitRotate.style.transform =

        `translate(-50%,-50%)
         rotate(${currentRotation}deg)`;
});
