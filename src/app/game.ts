export type player = "X" | "O";
// The square content, representing which player (if any) has claimed the tile.
export type squareStatus = player | null;
export type gameStatus = "inProgress" | "draw" | "win";
/**
 * This contains the state of our game.
 */
export type GameState = {
  /**
   * Contents of the 9 squares on the 3x3 board.
   *
   * They are laid out row-by-row. So, 0-2 is the top row,
   * 3-5 is the middle row, and 6-8 is the bottom row.
   *
   * They store which player has claimed them (if any).
   */
  squares: squareStatus[];
  // The current player, either X or O
  currentPlayer: player;
  // If the game is won, true.
  // If draw, false. If in progress, null.
  winOrDraw: boolean | null;
  // The player who has won
  winner: player;
  // The indices of squares which make up the winning combination (if any)
  winnerCombo: number[];
  /**
   * This keeps the history of the game's moves.
   *
   * Each move is represented by the square that was clicked.
   * We can just check the current value in the squares array to find which player made that move.
   * Undoing just requires us to change the current player one at a time, while resetting the square to null.
   *
   */
  movesHistory: number[];
};

export const initialGameState: GameState = {
  squares: Array(9).fill(null),
  currentPlayer: "X",
  winOrDraw: null,
  winner: "X",
  movesHistory: [],
  winnerCombo: [0, 1, 2],
};

/**
 * This function checks the squares to see if there is a winner.
 * It will go through rows, columns and diagonals, and if any of them
 * have the same value, it will return the player who won.
 *
 * Otherwise, it will return null.
 *
 * @param squares - the contents of the 9 squares on the 3x3 board
 * @returns null if there is no winner, otherwise the player who won and the indexes of the winning squares
 */
export function checkWinner(
  squares: squareStatus[]
): [player, [number, number, number]] | null {
  // The squares that must be of the same value to win.
  const lines = [
    // rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonals
    [0, 4, 8],
    [2, 4, 6],
  ];
  // we check each row, column, and diagonal
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // if square a is not null, AND a/b/c squares have same value, player wins.
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // return the winning player (X or O).
      return [squares[a], [a, b, c]];
    }
  }
  // if no winner, return null
  return null;
}
/**
 * Checks if the game is a draw.
 *
 * @param squares - the contents of the 9 squares on the 3x3 board
 * @returns whether all squares are claimed (if true, and there's no winner, it's a draw)
 */
export function checkDraw(squares: squareStatus[]): boolean {
  return !squares.includes(null);
}
/**
 * Whenever a square is clicked, this function is called.
 * If square is empty, we allow current player to make a move and claim the square.
 * If square is already taken, we show a warning telling them to use a different square.
 *
 * Then, we update the game state.
 *
 * @param square_number The number of the square that was clicked.
 */
export function handleMove(
  square_number: number,
  gameState: GameState,
  setGameState: (gameState: GameState) => void
) {
  // if game's already over, then, there's nothing to do. null indicates that it is neither win not draw.
  if (gameState.winOrDraw !== null) {
    return;
  }
  // make copy of square values
  const newSquares = [...gameState.squares];
  // get the square contents of the square that was clicked
  const square_contents = newSquares[square_number];
  // if not null, the square's already taken.
  // early return.
  if (square_contents !== null) {
    alert("Square already taken!");
    return;
  }
  // if square is empty, claim it and add it to the move history.
  newSquares[square_number] = gameState.currentPlayer;
  const is_game_draw = checkDraw(newSquares);
  // check if there is a winner
  const [winner, combo] = checkWinner(newSquares) || [null, []];
  const is_game_won = winner !== null;
  let winOrDraw = null;
  if (is_game_draw) {
    winOrDraw = false;
  }
  if (is_game_won) {
    winOrDraw = true;
  }

  setGameState({
    squares: newSquares,
    currentPlayer: gameState.currentPlayer === "X" ? "O" : "X",
    winner: winner || "X",
    winnerCombo: combo,
    movesHistory: [...gameState.movesHistory, square_number],
    winOrDraw: winOrDraw,
  });
}
