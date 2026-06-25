let currentPlayer = "red";
let gameOver = false;
const board = document.getElementById("board");

function showMessage(text) {
  document.getElementById("message").innerText = text;
}

for (let r = 0; r < 6; ++r) {
  for (let c = 0; c < 7; ++c) {
    let cell = document.createElement("div");
    cell.className = "cell";
    cell.id = "r" + r + "c" + c;
    cell.onclick = function () {
      dropPiece(c);
    };
    board.appendChild(cell);
  }
}

function dropPiece(col) {
  if (gameOver) {
    return;
  }
  for (let r = 5; r >= 0; --r) {
    let cell = document.getElementById("r" + r + "c" + col);
    if (cell.style.backgroundColor === "") {
      cell.style.backgroundColor = currentPlayer;
      checkGameState();
      return;
    }
  }
}

function checkGameState() {
  if (checkWin()) {
    showMessage(currentPlayer.toUpperCase() + " WINS!");
    gameOver = true;
  } else {
    if (currentPlayer === "red") {
      currentPlayer = "yellow";
    } else {
      currentPlayer = "red";
    }
    showMessage("Turn: " + currentPlayer.toUpperCase());
  }
}

function getColor(r, c) {
  let cell = document.getElementById("r" + r + "c" + c);
  if (cell) {
    return cell.style.backgroundColor;
  }
  return "";
}

function checkWin() {
  for (let r = 0; r < 6; ++r) {
    for (let c = 0; c < 7; ++c) {
      let color = getColor(r, c);
      if (color === "") {
        continue;
      }
      if (
        c < 4 &&
        color === getColor(r, c + 1) &&
        color === getColor(r, c + 2) &&
        color === getColor(r, c + 3)
      ) {
        return true;
      }
      if (
        r < 3 &&
        color === getColor(r + 1, c) &&
        color === getColor(r + 2, c) &&
        color === getColor(r + 3, c)
      ) {
        return true;
      }
      if (
        r < 3 &&
        c < 4 &&
        color === getColor(r + 1, c + 1) &&
        color === getColor(r + 2, c + 2) &&
        color === getColor(r + 3, c + 3)
      ) {
        return true;
      }
      if (
        r < 3 &&
        c > 2 &&
        color === getColor(r + 1, c - 1) &&
        color === getColor(r + 2, c - 2) &&
        color === getColor(r + 3, c - 3)
      ) {
        return true;
      }
    }
  }
  return false;
}
