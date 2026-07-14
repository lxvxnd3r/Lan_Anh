const welcome =
document.getElementById("welcome");

const music =
document.getElementById("music");

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

        welcome.style.opacity="0";

        setTimeout(()=>{

            welcome.style.display="none";

        },1000);

    }
);
