
//http://nullprogram.com/webgl-game-of-life/
//http://www.radicaleye.com/lifepage/picgloss/picgloss.html

export const convert = (shape) => {
  let row = [];
  const result = [ row ];
  shape.split('').forEach(char => {
    if (char === '.') {
      row.push(0);
    } else if (char === '*') {
      row.push(1);
    } else if (char === '\n') {
      row = [];
      result.push(row);
    }
  });
  return result;
};
