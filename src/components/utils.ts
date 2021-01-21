interface Coordinates {
  x: number;
  y: number;
}

export function relMouseCoords(
  event: MouseEvent,
  canvas: HTMLCanvasElement
): Coordinates {
  let totalOffsetX = 0;
  let totalOffsetY = 0;
  let canvasX = 0;
  let canvasY = 0;
  let currentElement: HTMLCanvasElement | null = canvas;

  do {
    totalOffsetX += currentElement.offsetLeft;
    totalOffsetY += currentElement.offsetTop;
  } while (
    (currentElement = currentElement.offsetParent as HTMLCanvasElement | null)
  );

  canvasX = event.pageX - totalOffsetX;
  canvasY = event.pageY - totalOffsetY;

  // Fix for variable canvas width
  canvasX = Math.round(canvasX * (canvas.width / canvas.offsetWidth));
  canvasY = Math.round(canvasY * (canvas.height / canvas.offsetHeight));

  return { x: canvasX, y: canvasY };
  // const rect = canvas.getBoundingClientRect();
  // const x = event.clientX - rect.left;
  // const y = event.clientY - rect.top;
  // return { x, y };
}
