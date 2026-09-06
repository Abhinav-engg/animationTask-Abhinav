import { heliImg, bulletImg } from './assets.js';

let heliX = 0;
let heliY = 100;

const heliFrames = [
    {x:2, y:77, w:64, h:48},
    {x:63, y:77, w:63, h:48},
    {x:128, y:77, w:63, h:48},
    {x:190, y:77, w:66, h:48},
    {x:0, y:136, w:62, h:42},
    {x:63, y:136, w:63, h:42},
    {x:127, y:136, w:65, h:42},
    {x:190, y:136, w:66, h:42},
    {x:0, y:195, w:61, h:47},
    {x:63, y:195, w:66, h:47},
    {x:126, y:195, w:66, h:47}
];
const heliTotalFrames = heliFrames.length;

let heliFrame = 0;
let heliGameFrame = 0;
const heliStagger = 6;

let bullets = [];

let shootTimer = 0;
let nextShootTime = 150;

const bulletSpeed = 3;
const bulletWidth = 40;
const bulletHeight = 12;

let canvasHeightRef = 0;

export function updateHelicopter(CanvasWidth, CanvasHeight) {
    heliX = 40;
    heliY = CanvasHeight / 2 - 90;
    canvasHeightRef = CanvasHeight;

    heliGameFrame++;

    if (heliGameFrame % heliStagger == 0) {
        heliFrame++;

        if (heliFrame >= heliTotalFrames) {
            heliFrame = 0;
        }
    }

    shootTimer++;

    if (shootTimer >= nextShootTime) {
        shootBullet();

        shootTimer = 0;
        nextShootTime = Math.floor(Math.random() * 100) + 120;
    }
}

function shootBullet() {
    const startX = heliX + 180;
    const startY = heliY + 60;

    const targetX = 520;
    const targetY = canvasHeightRef - 70;

    const dx = targetX - startX;
    const dy = targetY - startY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    const vx = (dx / dist) * bulletSpeed;
    const vy = (dy / dist) * bulletSpeed;

    bullets.push({
        x: startX,
        y: startY,
        vx: vx,
        vy: vy,
        width: bulletWidth,
        height: bulletHeight
    });
}

export function updateBullets(CanvasWidth, CanvasHeight) {
    for (let bullet of bullets) {
        bullet.x += bullet.vx;
        bullet.y += bullet.vy;
    }

    bullets = bullets.filter(function(bullet) {
        return bullet.x < CanvasWidth + 100 && bullet.y < CanvasHeight + 100;
    });
}

export function drawHelicopter(ctx) {
    if (!(heliImg.complete && heliImg.naturalWidth > 0)) return;

    const f = heliFrames[heliFrame];

    ctx.drawImage(
        heliImg,
        f.x,
        f.y,
        f.w,
        f.h,
        heliX,
        heliY,
        180,
        180
    );
}

export function drawBullets(ctx) {
    if (!(bulletImg.complete && bulletImg.naturalWidth > 0)) return;

    for (let bullet of bullets) {
        const angle = Math.atan2(bullet.vy, bullet.vx);

        ctx.save();
        ctx.translate(bullet.x + bullet.width / 2, bullet.y + bullet.height / 2);
        ctx.rotate(angle);
        ctx.drawImage(
            bulletImg,
            -bullet.width / 2,
            -bullet.height / 2,
            bullet.width,
            bullet.height
        );
        ctx.restore();
    }
}

export function checkBulletCollision(player) {
    for (let bullet of bullets) {

        let playerLeft = player.x;
        let playerRight = player.x + player.width;
        let playerTop = player.y;
        let playerBottom = player.y + player.height;

        let bulletLeft = bullet.x;
        let bulletRight = bullet.x + bullet.width;
        let bulletTop = bullet.y;
        let bulletBottom = bullet.y + bullet.height;

        if (playerRight > bulletLeft && playerLeft < bulletRight && playerBottom > bulletTop && playerTop < bulletBottom) {
            return true;
        }
    }

    return false;
}

export function resetHelicopter() {
    bullets = [];
    shootTimer = 0;
    nextShootTime = 150;
    heliFrame = 0;
}