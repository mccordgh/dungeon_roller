import { Game } from './classes/game';

document.title = 'Dungeon Roller';

window.rndIndex = (arr) => arr[Math.floor(Math.random() * (arr.length))];
window.rndInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

let game = new Game();

game.run();
