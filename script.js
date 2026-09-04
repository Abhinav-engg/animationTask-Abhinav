const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let CanvasWidth;
let CanvasHeight;
function resizeCanvas() {
    CanvasWidth = canvas.width = window.innerWidth;
    CanvasHeight = canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener('resize',resizeCanvas);




const walkImg = new Image();
const runImg = new Image();

walkImg.src = 'John-walk-trimmed.png';
runImg.src = 'John-run-trimmed.png';


const spriteWidth = 256;
const spriteHeight = 256;

const columns = 5;

const walkFrames = 18;
const runFrames = 22;

let frame = 0;
let gameFrame = 0;
const staggerFrames = 8;
let animation = 'run';
let playerX = 100;
let playerY;


function updatePlayerPosition() {

    playerY = CanvasHeight - 300;

}


function animate() {

    ctx.fillStyle = '#041232';
    ctx.fillRect(
        0,
        0,
        CanvasWidth,
        CanvasHeight
    );




    let image;
    let totalFrames;

    if (animation == 'run') {

        image = runImg;
        totalFrames = runFrames;

    } else if (animation == 'walk') {

        image = walkImg;
        totalFrames = walkFrames;

    }


    const sourceX =
        (frame % columns) * spriteWidth;

    const sourceY =
        Math.floor(frame / columns) * spriteHeight;


    ctx.drawImage(

        image,

        sourceX,
        sourceY,
        spriteWidth,
        spriteHeight,

        playerX,
        playerY,
        300,
        300

    );


    gameFrame++;


    if (gameFrame % staggerFrames === 0) {

        frame++;

        if (frame >= totalFrames) {

            frame = 0;

        }

    }


    requestAnimationFrame(animate);

}


document.addEventListener('keydown', function(event) {

    if (
        event.key === 'ArrowRight' ||
        event.key === 'd'
    ) {

        animation = 'run';

    }


    if (
        event.key === 'ArrowLeft' ||
        event.key === 'a'
    ) {

        animation = 'walk';

    }

});


updatePlayerPosition();

animate();