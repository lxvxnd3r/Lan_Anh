const welcome =
document.getElementById("welcome");

const music =
document.getElementById("music");

const moon =
document.getElementById("moon");

const orbit =
document.querySelector(".orbit-container");

const orbitRotate =
document.querySelector(".orbit-rotate");


/* CLICK MÀN HÌNH CHÀO */

welcome.addEventListener(
    "click",
    async ()=>{

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

    }
);


/* CLICK MẶT TRĂNG */

moon.addEventListener(
    "click",
    (e)=>{

        e.stopPropagation();

        orbit.classList.toggle("active");

    }
);


/* CLICK NGOÀI THÌ ĐÓNG */

document.addEventListener(
    "click",
    (e)=>{

        if(

            !orbit.contains(e.target)

            &&

            e.target !== moon

        ){

            orbit.classList.remove("active");

        }

    }
);


/* KÉO XOAY */

let dragging = false;

let rotation = 0;

orbitRotate.addEventListener(
    "mousedown",
    ()=>{

        dragging = true;

    }
);

document.addEventListener(
    "mouseup",
    ()=>{

        dragging = false;

    }
);

document.addEventListener(
    "mousemove",
    (e)=>{

        if(!dragging)
            return;

        rotation +=
            e.movementX * 0.45;

        orbitRotate.style.transform =

        `translate(-50%,-50%)
         rotate(${rotation}deg)`;

    }
);
