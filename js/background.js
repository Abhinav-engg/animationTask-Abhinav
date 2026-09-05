import {backgroundImg,buildingsImg,frontImg} from './assets.js';

let backgroundX = 0;
let buildingsX = 0;
let frontX = 0;

const backgroundSpeed = 0.4;
const buildingsSpeed = 1;
const normalFrontSpeed = 1.8;
export let frontSpeed = normalFrontSpeed;

export function setFrontSpeed(isBoosted) {
    frontSpeed = isBoosted ? normalFrontSpeed * 2 : normalFrontSpeed;
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