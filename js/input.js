import {
    jump,
    dash,
    walk,
    run
} from './player.js';
import { setFrontSpeed } from './background.js';

export function setupInput() {

    document.addEventListener('keydown', function(event) {

        if (
            event.key == 'ArrowUp' ||
            event.key == ' '
        ){
            event.preventDefault();
            jump();
        }

        if (
            event.key == 'x' ||
            event.key == 'X'
        ){
            dash();
        }

        if (event.key == 'Shift') {
            setFrontSpeed(true);
        }

        if(
            event.key == 'ArrowLeft' 
            ||
            event.key == 'a'
        ){
            walk();
        }

        if (
            event.key == 'ArrowRight' ||
            event.key == 'd'
        ) {
            run();
        }
    });

    document.addEventListener('keyup', function(event) {
        if (event.key == 'Shift') {
            setFrontSpeed(false);
        }
    });
}