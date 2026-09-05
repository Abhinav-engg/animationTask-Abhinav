import { drawBackground } from './background.js';
import {setupPlayer,updatePlayer,drawPlayer} from './player.js';
import { setupInput } from './input.js';



const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let CanvasWidth;
let CanvasHeight;

function resizeCanvas() {
    CanvasWidth = canvas.width = window.innerWidth;
    CanvasHeight = canvas.height = window.innerHeight;

    setupPlayer(CanvasHeight);
}

resizeCanvas();

window.addEventListener('resize', resizeCanvas);

function animate() {

    ctx.imageSmoothingEnabled = false;

    ctx.fillStyle = '#170f2f';

    ctx.fillRect(
        0,
        0,
        CanvasWidth,
        CanvasHeight
    );
    drawBackground(ctx,CanvasHeight);

    updatePlayer(
        CanvasHeight
    );

    drawPlayer(ctx);

    requestAnimationFrame(animate);
}

setupInput();

animate();