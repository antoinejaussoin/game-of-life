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

function relMouseCoords(event){
  var totalOffsetX = 0;
  var totalOffsetY = 0;
  var canvasX = 0;
  var canvasY = 0;
  var currentElement = this;

  do {
      totalOffsetX += currentElement.offsetLeft;
      totalOffsetY += currentElement.offsetTop;
  }
  while (currentElement = currentElement.offsetParent)

  canvasX = event.pageX - totalOffsetX;
  canvasY = event.pageY - totalOffsetY;

  // Fix for variable canvas width
  canvasX = Math.round( canvasX * (this.width / this.offsetWidth) );
  canvasY = Math.round( canvasY * (this.height / this.offsetHeight) );

  return {x:canvasX, y:canvasY}
}
HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;
