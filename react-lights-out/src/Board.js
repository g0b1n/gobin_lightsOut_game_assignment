import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.25 }) {
  const [board, setBoard] = useState(createBoard());


  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values

    for (let y = 0; y < nrows; y++){
      let row = [];
      for (let x = 0; x < ncols; x++){
        row.push(Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  /// WINNING FUNCTION
//   function createBoard() {
//   let initialBoard = [];
//   for (let y = 0; y < nrows; y++) {
//     let row = [];
//     for (let x = 0; x < ncols; x++) {
//       row.push(false); // Set all lights to off
//     }
//     initialBoard.push(row);
//   }
//   return initialBoard;
// }


  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.

    return board.every(row => {
      return row.every(cell => !cell)
    })
  }


  // click counter
  const [clickCount, setClickCount] = useState(0);

  function flipCellsAround(coord) {
    // increment the counter
    setClickCount(oldCount => oldCount + 1); 

    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map(row => [...row]);
      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy);

      // flip neighbours
      flipCell(y, x -1, boardCopy); // left
      flipCell(y, x +1, boardCopy); // right
      flipCell(y -1, x, boardCopy); // above
      flipCell(y +1, x, boardCopy); // below

      // TODO: return the copy
      return boardCopy
    });
  }

  
  

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board
  return (
  <div>
    {hasWon() ? (
      <div className="winner">
        <span className="winner-congrats">Congratulations! You've won!</span>
        <p className="winner-countMsg">It took you only, {clickCount} clicks to win.</p>
      </div>
    ) : (
      <div>
        <table className="Board">
          <tbody>
            {board.map((row, y) => (
              <tr key={y}>
                {row.map((cell, x) => (
                  <Cell
                    key={`${y}-${x}`}
                    isLit={cell}
                    flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div>Click Count: {clickCount}</div>
      </div>
    )}
  </div>
);


  // TODO
}

export default Board;
