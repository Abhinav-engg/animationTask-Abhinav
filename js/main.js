import { drawBackground } from './background.js';
import {
    resetPlayer,
    updatePlayer,
    drawPlayer,
    getPlayerData,
    triggerHit,
    isPlayerHit,
    isHitDone
} from './player.js';
import { setupInput } from './input.js';
import {
    updateObstacles,
    drawObstacles,
    checkObstacleCollision,
    resetObstacles
} from './obstacles.js';
import {
    updateOrbs,
    drawOrbs,
    checkOrbCollision,
    resetOrbs
} from './orbs.js';
import {
    updateHelicopter,
    updateBullets,
    drawHelicopter,
    drawBullets,
    checkBulletCollision,
    resetHelicopter
} from './helicopter.js';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let CanvasWidth;
let CanvasHeight;

let gameOver = false;
let score = 0;
let bonusFromOrb = 0;

function resizeCanvas() {
    CanvasWidth = canvas.width = window.innerWidth;
    CanvasHeight = canvas.height = window.innerHeight;

    resetPlayer(CanvasHeight);
}

resizeCanvas();

window.addEventListener('resize', resizeCanvas);

function drawScore() {
    ctx.fillStyle = '#ffffff';
    ctx.font = '24px Arial';

    ctx.fillText(
        'SCORE: ' + (Math.floor(score / 60) + bonusFromOrb),
        30,
        40
    );
}

function drawGameOver() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';

    ctx.fillRect(
        0,
        0,
        CanvasWidth,
        CanvasHeight
    );

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';

    ctx.font = '60px Arial';

    ctx.fillText('GAME OVER',CanvasWidth / 2,CanvasHeight / 2 - 30);

    ctx.font = '24px Arial';

    ctx.fillText(
        'Press R to restart',
        CanvasWidth / 2,
        CanvasHeight / 2 + 30
    );

    ctx.textAlign = 'left';
}

function restartGame() {
    gameOver = false;
    score = 0;
    bonusFromOrb = 0;

    resetObstacles();
    resetOrbs();
    resetHelicopter();

    resetPlayer(CanvasHeight);
}

function animate() {
    ctx.imageSmoothingEnabled = false;

    ctx.fillStyle = '#170f2f';

    ctx.fillRect(
        0,
        0,
        CanvasWidth,
        CanvasHeight
    );

    drawBackground(ctx, CanvasHeight);

    if (!gameOver) {
        updatePlayer(CanvasHeight);

        if (!isPlayerHit()) {

            updateObstacles(
                CanvasWidth,
                CanvasHeight
            );

            updateOrbs(
                CanvasWidth,
                CanvasHeight
            );

            updateHelicopter(CanvasWidth, CanvasHeight);
            updateBullets(CanvasWidth, CanvasHeight);
            const player = getPlayerData();
            

            if (checkObstacleCollision(player)) {
                gameOver = true;
            }

            if (checkBulletCollision(player)) {
                triggerHit();
            }

            bonusFromOrb += checkOrbCollision(player);

            score++;
        }

        if (isPlayerHit() && isHitDone()) {
            gameOver = true;
        }
    }

    drawObstacles(ctx);

    drawOrbs(ctx);

    drawHelicopter(ctx);

    drawBullets(ctx);

    drawPlayer(ctx);

    drawScore();

    if (gameOver) {
        drawGameOver();
    }

    requestAnimationFrame(animate);
}

document.addEventListener('keydown', function(event) {
    if (
        (event.key == 'r' || event.key == 'R') &&
        gameOver
    ) {
        restartGame();
    }
});

setupInput();

animate();