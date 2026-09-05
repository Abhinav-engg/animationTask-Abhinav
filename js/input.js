import {
    jump,
    dash,
    walk,
    run
} from './player.js';

export function setupInput() {

    document.addEventListener('keydown', function(event) {

        if (
            event.key == 'ArrowUp' ||
            event.key == ' '
        ) {
            event.preventDefault();
            jump();
        }

        if (
            event.key == 'Shift' ||
            event.key == 'x' ||
            event.key == 'X'
        ) {
            dash();
        }

        if (
            event.key == 'ArrowLeft' ||
            event.key == 'a'
        ) {
            walk();
        }

        if (
            event.key == 'ArrowRight' ||
            event.key == 'd'
        ) {
            run();
        }
    });
}