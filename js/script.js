/* =========================================
                ELEMENTS
========================================= */

const welcome =
    document.getElementById("welcome");

const music =
    document.getElementById("music");

const backgroundVideo =
    document.getElementById("bg-video");

const moon =
    document.getElementById("moon");

const orbit =
    document.querySelector(".orbit-system");

const orbitRotate =
    document.querySelector(".orbit-rotate");

const planets =
    document.querySelectorAll(".planet");

const planetBackgrounds =
    document.querySelectorAll(".planet-bg");


/* =========================================
            WELCOME SCREEN
========================================= */

welcome.addEventListener(
    "click",
    async () => {

        try {

            music.volume = 0.5;

            await music.play();

            planetBackgrounds.forEach(
                bg => {

                    bg.currentTime =
                        backgroundVideo.currentTime;

                    bg.play().catch(
                        e => console.log(e)
                    );

                }
            );

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

        orbit.classList.toggle("active");

        updatePlanetBackgrounds();

    }
);


/* =========================================
            CLICK OUTSIDE
========================================= */

document.addEventListener(
    "click",
    (e) => {

        if (

            !orbit.contains(e.target)

            &&

            e.target !== moon

        ) {

            orbit.classList.remove("active");

            updatePlanetBackgrounds();

        }

    }
);


/* =========================================
        KEEP BUBBLES SHOWING BACKGROUND ONLY
========================================= */

function updatePlanetBackgrounds(){

    planets.forEach(
        planet => {

            const bg =
                planet.querySelector(".planet-bg");

            if (!bg)
                return;

            const rect =
                planet.getBoundingClientRect();

            bg.style.setProperty(
                "--planet-bg-x",
                `${-rect.left}px`
            );

            bg.style.setProperty(
                "--planet-bg-y",
                `${-rect.top}px`
            );

        }
    );

}


window.addEventListener(
    "resize",
    updatePlanetBackgrounds
);


function animatePlanetBackgrounds(){

    updatePlanetBackgrounds();

    requestAnimationFrame(
        animatePlanetBackgrounds
    );

}


requestAnimationFrame(
    animatePlanetBackgrounds
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

        updatePlanetBackgrounds();

    }
);


/* =========================================
            DISABLE RIGHT CLICK
========================================= */

document.addEventListener(
    "contextmenu",
    e => e.preventDefault()
);
