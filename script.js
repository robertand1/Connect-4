let currentPlayer = "red";
let gameOver = false;

function showMessage(text) {
  document.getElementById("message").innerText = text;
}

function boardInitialization() {
  const board = document.getElementById("board");
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

function checkDirection(r, c, R, C, color) {
  for (let i = 1; i <= 3; ++i) {
    let nextRow = r + R * i;
    let nextCol = c + C * i;
    if (getColor(nextRow, nextCol) !== color) {
      return false;
    }
  }
  return true;
}

function checkWin() {
  for (let r = 0; r < 6; ++r) {
    for (let c = 0; c < 7; ++c) {
      let color = getColor(r, c);
      if (color === "") {
        continue;
      }
      if (checkDirection(r, c, 0, 1, color)) {
        return true;
      }
      if (checkDirection(r, c, 1, 0, color)) {
        return true;
      }
      if (checkDirection(r, c, 1, 1, color)) {
        return true;
      }
      if (checkDirection(r, c, 1, -1, color)) {
        return true;
      }
    }
  }
  return false;
}

boardInitialization();
