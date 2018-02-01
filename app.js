import ColorEngine from './bw-engine';

(function(){
    var script=document.createElement('script');
    script.onload=function(){
        var stats=new Stats();
        const counterDiv = document.getElementById('counter');
        counterDiv.appendChild(stats.dom);
        stats.dom.style.position = 'relative';
		stats.dom.style.float = 'right';
        requestAnimationFrame(function loop(){
            stats.update();
            requestAnimationFrame(loop)});
    };
    script.src='//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);
})();
const size = 1000;
const canvas = document.getElementById('board');
const context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;
const imageData = context.getImageData(0, 0, size, size);

const engine = new ColorEngine(size, imageData);
engine.initToBlank();


const generationLabel = document.getElementById('generation');
canvas.className = "board";
canvas.height = size;
canvas.width = size;

canvas.addEventListener('click', event => {
    console.log('Event: ', event);
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
