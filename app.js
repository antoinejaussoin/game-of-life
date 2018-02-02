import ColorEngine from './bw-engine';
import { gosperGliderGun, blockLayingSwitch, addMargins, blank } from './shapes';
import { classic, highLife } from './variations';
import './utils';

const size = 1000;

// HTML stuff
const canvas = document.getElementById('board');
const context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;
const imageData = context.getImageData(0, 0, size, size);
const generationLabel = document.getElementById('generation');
canvas.className = "board";
canvas.height = size;
canvas.width = size;

// Engine
const margin = addMargins(50);
const engine = new ColorEngine(size, imageData, highLife);
engine.initToRandom(3);
//engine.inject(1, 1, blank(size - 2, size - 2));

canvas.addEventListener('click', event => {
    console.log('Event: ', event);
    const cooords = canvas.relMouseCoords(event);
    engine.inject(cooords.x, cooords.y, blank(100, 100));
    displayCanvas();
});

const displayCanvas = () => {
    engine.draw();
    context.putImageData(imageData, 0, 0);
}

const updateGenerationLabel = () => {
    generationLabel.innerText = engine.generation;
}

displayCanvas();

const next = () => {
    displayCanvas();
    engine.play();
    updateGenerationLabel();
    window.requestAnimationFrame(next);
}

document.getElementById('btn').onclick = next;
