import {backgroundImg,buildingsImg,frontImg} from './assets.js';

let backgroundX = 0;
let buildingsX = 0;
let frontX = 0;

const backgroundSpeed = 0.4;
const buildingsSpeed = 1;

const minFrontSpeed = 1;
const maxFrontSpeed = 4;
const dashFrontSpeed = 6;
const speedStep = 0.5;

let normalFrontSpeed = 1.8;
export let frontSpeed = normalFrontSpeed;

let isDashing = false;

export function increaseFrontSpeed() {
    if (isDashing) return;

    normalFrontSpeed = Math.min(normalFrontSpeed + speedStep, maxFrontSpeed);
    frontSpeed = normalFrontSpeed;
}

export function decreaseFrontSpeed() {
    if (isDashing) return;

    normalFrontSpeed = Math.max(normalFrontSpeed - speedStep, minFrontSpeed);
    frontSpeed = normalFrontSpeed;
}

export function setDashSpeed(active) {
    isDashing = active;
    frontSpeed = active ? dashFrontSpeed : normalFrontSpeed;
}

export function getSpeedMultiplier() {
    return frontSpeed / 1.8;
}

function drawLayer(ctx, image, position, speed, CanvasHeight) {
    

    const imageWidth =CanvasHeight * (image.naturalWidth / image.naturalHeight);

    position -= speed;

    if (position <= -imageWidth) {
        position += imageWidth;
    }

    ctx.drawImage(
        image,
        position,
        0,
        imageWidth,
        CanvasHeight
    );

    ctx.drawImage(
        image,
        position + imageWidth,
        0,
        imageWidth,
        CanvasHeight
    );

    return position;
}

export function drawBackground(ctx, CanvasHeight) {

    backgroundX = drawLayer(
        ctx,
        backgroundImg,
        backgroundX,
        backgroundSpeed,
        CanvasHeight
    );

    buildingsX = drawLayer(
        ctx,
        buildingsImg,
        buildingsX,
        buildingsSpeed,
        CanvasHeight
    );

    frontX = drawLayer(
        ctx,
        frontImg,
        frontX,
        frontSpeed,
        CanvasHeight
    );
}