import {
    jump,
    dash
} from './player.js';
import { increaseFrontSpeed, decreaseFrontSpeed } from './background.js';

export function setupInput() {

    document.addEventListener('keydown', function(event) {
        const key = event.key.toLowerCase();

        if (
            event.key == 'ArrowUp' ||
            event.key == ' '
        ){
            event.preventDefault();
            jump();
        }

        if (
            key == 'x'
        ){
            dash();
        }

        if(
            event.key == 'ArrowLeft' 
            ||
            key == 'a'
        ){
            decreaseFrontSpeed();
        }

        if (
            event.key == 'ArrowRight' ||
            key == 'd'
        ) {
            increaseFrontSpeed();
        }
    });
}