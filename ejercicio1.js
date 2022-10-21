const makeFigure = function (size) {
  // Create a matrix of size*size filled with zeros
  const figure = Array.from(Array(size), () => Array(size).fill(0));
  /*
    `i` --> Y-axis
    `j` --> X-axis
    `iMax` and `jMax` decrease by 2 for each inner iteration of the spiral.
    `count` exists to end the outer loop in case the function doesn't end by one
      of the 4 `while` cases.
  */
  let i = 0;
  let j = 0;
  let iMax = size;
  let jMax = size;
  let count = 0;

  // The number of spirals is less than a quarter of the `size` of the array.
  outerLoop: while (count < size / 4) {
    /*
      Each `while` defines a direction in which the spiral is generated.
      In order: right, down, left, up. And it's repeated for each inner spiral.
      The condition for each `while` is determined by the size of the current
        spiral.

      Each iteration of each `while` works the same:
      First, it adds a 1 to the current position and then checks if:
        - Two positions ahead in the current direction it's inside the array,
          and there is a 1.
        And
        - Two positions ahead in the next direction there is a 1, or if the
          snake moves forward, it would touch itself because it's too close
          (top with bottom or right with left).
      And if the function didn't end, move to the next position on the current
        direction.
    */
    while (j < jMax) {
      figure[i][j] = 1;
      if (
        j + 2 < size &&
        figure[i][j + 2] === 1 &&
        (figure[i + 2][j] === 1 || figure[i + 1][j - 1])
      ) {
        break outerLoop;
      }
      j++;
    }
    // X-axis correction because previous loop left it out of bounds
    j--;
    while (i < iMax) {
      figure[i][j] = 1;
      if (
        i + 2 < size &&
        figure[i + 2][j] === 1 &&
        (figure[i][j - 2] === 1 || figure[i - 1][j - 1])
      ) {
        break outerLoop;
      }
      i++;
    }
    // Y-axis correction because previous loop left it out of bounds
    i--;
    while (j > size - jMax) {
      figure[i][j] = 1;
      if (
        j - 2 > 0 &&
        figure[i][j - 2] === 1 &&
        (figure[i - 2][j] === 1 || figure[i - 1][j + 1])
      ) {
        break outerLoop;
      }
      j--;
    }
    // + 1 so it ends before the previous spiral
    while (i > size - iMax + 1) {
      figure[i][j] = 1;
      if (
        i - 2 > 0 &&
        figure[i - 2][j] === 1 &&
        (figure[i][j + 2] === 1 || figure[i + 1][j + 1] === 1)
      ) {
        break outerLoop;
      }
      i--;
    }
    /* X-axis and Y-axis correction, and bounds decrease, to start the next
      spiral. */
    i++;
    j++;
    iMax -= 2;
    jMax -= 2;
    count++;
  }
  for (let k = 0; k < figure.length; k++) {
    console.log(
      figure[k].map((element) => (element === 1 ? "0" : ".")).join(" ")
    );
  }
  return figure;
};
