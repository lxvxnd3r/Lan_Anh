/* =========================================
                ELEMENTS
========================================= */

const welcome =
    document.getElementById("welcome");

const music =
    document.getElementById("music");

const moon =
    document.getElementById("moon");

const orbit =
    document.querySelector(".orbit-system");

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

        orbit.classList.toggle("active");

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

        }

    }
);


/* =========================================
            AUTO / DRAG ROTATE
========================================= */

let rotation = 0;

let lastFrameTime = 0;

let activePointerId = null;

let lastPointerX = 0;

const autoRotateSpeed = 7;

const dragRotateSpeed = 0.45;


function renderOrbitRotation(){

    orbitRotate.style.transform =

        `
        translate(-50%,-50%)
        rotate(${rotation}deg)
`;

}


function animateOrbit(timestamp){

    if (!lastFrameTime)
        lastFrameTime = timestamp;

    const deltaSeconds =
        (timestamp - lastFrameTime) / 1000;

    lastFrameTime =
        timestamp;

    if (activePointerId === null) {

        rotation +=
            autoRotateSpeed * deltaSeconds;

        renderOrbitRotation();

    }

    requestAnimationFrame(
        animateOrbit
    );

}


requestAnimationFrame(
    animateOrbit
);


orbitRotate.addEventListener(
    "pointerdown",
    (e) => {

        if (activePointerId !== null)
            return;

        activePointerId =
            e.pointerId;

        lastPointerX =
            e.clientX;

        orbitRotate.setPointerCapture(
            activePointerId
        );

    }
);


orbitRotate.addEventListener(
    "pointermove",
    (e) => {

        if (e.pointerId !== activePointerId)
            return;

        rotation +=
            (e.clientX - lastPointerX) * dragRotateSpeed;

        lastPointerX =
            e.clientX;

        renderOrbitRotation();

    }
);


function stopDrag(e){

    if (e.pointerId !== activePointerId)
        return;

    if (
        orbitRotate.hasPointerCapture(
            activePointerId
        )
    ) {

        orbitRotate.releasePointerCapture(
            activePointerId
        );

    }

    activePointerId =
        null;

}


orbitRotate.addEventListener(
    "pointerup",
    stopDrag
);


orbitRotate.addEventListener(
    "pointercancel",
    stopDrag
);


/* =========================================
            DISABLE RIGHT CLICK
========================================= */

document.addEventListener(
    "contextmenu",
    e => e.preventDefault()
);
