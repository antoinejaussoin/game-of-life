export const convert = (shape: string): number[][] => {
  let row: number[] = [];
  const result: number[][] = [row];
  shape.split("").forEach((char) => {
    if (char === ".") {
      row.push(0);
    } else if (char === "*") {
      row.push(1);
    } else if (char === "\n") {
      row = [];
      result.push(row);
    }
  });
  return result;
};
