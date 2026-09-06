import { orbImg } from './assets.js';

let orbs = [];

let orbTimer = 0;
let nextOrbTime = 15;

let orbSpeed = 7;

const columns = 6;
const rows = 2;

let frame = 0;
let gameFrame = 0;
const staggerFrames = 8;

export function updateOrbs(CanvasWidth, CanvasHeight) {
    orbTimer++;

    if (orbTimer >= nextOrbTime) {
        createOrb(CanvasWidth, CanvasHeight);

        orbTimer = 0;
        nextOrbTime = Math.floor(Math.random() * 150) + 15;
    }

    for (let orb of orbs) {
        orb.x -= orbSpeed;
    }

    orbs = orbs.filter(function(orb) {
        return orb.x + orb.width > 0;
    });

    gameFrame++;

    if (gameFrame % staggerFrames == 0) {
        frame++;

        if (frame >= columns) {
            frame = 0;
        }
    }
}

function createOrb(CanvasWidth, CanvasHeight) {
    orbs.push({
        x: CanvasWidth + 50,
        y: CanvasHeight - 250 - Math.random() * 150,
        width: 50,
        height: 50
    });
}

export function drawOrbs(ctx) {
    if (!(orbImg.complete && orbImg.naturalWidth > 0)) return;

    const spriteWidth = orbImg.naturalWidth / columns;
    const spriteHeight = orbImg.naturalHeight / rows;

    for (let orb of orbs) {
        ctx.drawImage(
            orbImg,
            frame * spriteWidth,
            0,
            spriteWidth,
            spriteHeight,
            orb.x,
            orb.y,
            orb.width,
            orb.height
        );
    }
}

export function checkOrbCollision(player) {
    let pointsGained = 0;

    orbs = orbs.filter(function(orb) {

        let playerLeft = player.x;
        let playerRight = player.x + player.width;
        let playerTop = player.y;
        let playerBottom = player.y + player.height;

        let orbLeft = orb.x;
        let orbRight = orb.x + orb.width;
        let orbTop = orb.y;
        let orbBottom = orb.y + orb.height;

        if (playerRight > orbLeft && playerLeft < orbRight && playerBottom > orbTop && playerTop < orbBottom) {
            pointsGained += 25;
            return false;
        }

        return true;
    });

    return pointsGained;
}

export function resetOrbs() {
    orbs = [];
    orbTimer = 0;
    nextOrbTime = 15;
}