
module.exports = function solveSudoku(matrix) {

  var a = matrix.slice(0);
  let countIt = 0;
  let arrObj = [];
  let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  arrObj = createArrZeroCells(a);
  if (solveCell(a, 0)) {
    return a;
  }
  return false;

  function solveCell(a, ind) {

    let row = arrObj[ind].i;
    let col = arrObj[ind].j;

    let PossibleValues = findPossibleValues(a, row, col);
    for (let i = 0; i < PossibleValues.length; i++) {
      a[row][col] = PossibleValues[i];
      if (ind === arrObj.length - 1) {
        return true;
      }
      else {
        if (solveCell(a, ind + 1)) {
          return true;
        } else {
          a[row][col] = 0;
        }
      }
    }
    return false;
  }

  function createArrZeroCells(a) {
    // массив нулевых ячеек
    arrObj = [];
    let curObj = {};
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < a.length; j++) {
        if (a[i][j] === 0) {
          let curObj = {};
          curObj.i = i;
          curObj.j = j;

          // находим допустимые значения
          curObj.PossibleValues = findPossibleValues(a, i, j);
          arrObj.push(curObj);
        }
      }
    }
    // сортируем массив нулевых ячеек по возрастанию кол-ва допустимых значений
    arrObj.sort(function (aa, bb) {

      if (aa.PossibleValues.length < bb.PossibleValues.length) {
        return -1;
      }
      if (aa.PossibleValues.length > bb.PossibleValues.length) {
        return 1;
      }
      return 0;
    });
    return arrObj;
  }

  function findPossibleValues(a, row, col) {

    let res = Array.from(new Set(numbers));
    for (let i = 0; i < 9; i++) {
      const index = res.indexOf(a[i][col]);
      if (index > -1) {
        res.splice(index, 1);
      }
    }
    for (let i = 0; i < 9; i++) {
      index = res.indexOf(a[row][i]);
      if (index > -1) {
        res.splice(index, 1);
      }
    }
    let xSquare = Math.floor(row / 3) * 3;
    let ySquare = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        index = res.indexOf(a[xSquare + i][ySquare + j]);
        if (index > -1) {
          res.splice(index, 1);
        }
      }
    }

    return res;
  }

}
// let arr = [
//     [6, 5, 0, 7, 3, 0, 0, 8, 0],
//     [0, 0, 0, 4, 8, 0, 5, 3, 0],
//     [8, 4, 0, 9, 2, 5, 0, 0, 0],
//     [0, 9, 0, 8, 0, 0, 0, 0, 0],
//     [5, 3, 0, 2, 0, 9, 6, 0, 0],
//     [0, 0, 6, 0, 0, 0, 8, 0, 0],
//     [0, 0, 9, 0, 0, 0, 0, 0, 6],
//     [0, 0, 7, 0, 0, 0, 0, 5, 0],
//     [1, 6, 5, 3, 9, 0, 4, 7, 0]
// ];

// let arr = [
//   [8, 7, 0, 0, 0, 0, 6, 5, 2],
//   [0, 0, 0, 0, 7, 2, 4, 0, 0],
//   [0, 3, 2, 0, 5, 0, 0, 0, 0],
//   [0, 0, 8, 0, 0, 5, 3, 0, 4],
//   [6, 0, 0, 9, 0, 3, 0, 0, 0],
//   [0, 1, 3, 7, 0, 0, 0, 0, 0],
//   [5, 0, 9, 4, 0, 7, 0, 0, 0],
//   [3, 0, 0, 1, 0, 9, 0, 7, 0],
//   [1, 2, 0, 0, 0, 6, 0, 4, 9]
// ];
// // console.log(solve(arr).map(e => "" + e));
// console.log(solveSudoku(arr));

