/* =========================================
                ELEMENTS
========================================= */

const welcome =
    document.getElementById("welcome");

const music =
    document.getElementById("music");

const moon =
    document.getElementById("moon");

const container =
    document.querySelector(".container");

const orbit =
    document.querySelector(".orbit-container");

const orbitRotate =
    document.querySelector(".orbit-rotate");


/* =========================================
            WELCOME SCREEN
========================================= */

welcome.addEventListener(
    "click",
    async () => {

        try {

            music.volume = 0.5;

            await music.play();

        }
        catch (e) {

            console.log(e);

        }

        welcome.style.opacity = "0";

        welcome.style.pointerEvents = "none";

        setTimeout(() => {

            welcome.style.display = "none";

        }, 800);

    }
);


/* =========================================
            MOON CLICK
========================================= */

moon.addEventListener(
    "click",
    (e) => {

        e.stopPropagation();

        container.classList.toggle("active");

    }
);


/* =========================================
        CLICK OUTSIDE TO CLOSE
========================================= */

document.addEventListener(
    "click",
    (e) => {

        if (

            !orbit.contains(e.target)

            &&

            e.target !== moon

        ) {

            container.classList.remove("active");

        }

    }
);


/* =========================================
                DRAG ROTATE
========================================= */

let dragging = false;

let rotation = 0;


orbitRotate.addEventListener(
    "mousedown",
    () => {

        dragging = true;

    }
);


document.addEventListener(
    "mouseup",
    () => {

        dragging = false;

    }
);


document.addEventListener(
    "mousemove",
    (e) => {

        if (!dragging)
            return;

        rotation +=
            e.movementX * 0.45;

        orbitRotate.style.transform =

            `
            translate(-50%,-50%)
            rotate(${rotation}deg)
            `;

    }
);


/* =========================================
            DISABLE RIGHT CLICK
========================================= */

document.addEventListener(
    "contextmenu",
    e => e.preventDefault()
);
