// 計算某方向的棋子也是相同棋子的連續數目
function countTotal(board, currentY, currentX, directionY, directionX) {
  // 目前的棋子
  const currentPlayer = board[currentY][currentX];

  let tempX = currentX;
  let tempY = currentY;

  // 設定一開始連續的棋子數為 0
  let total = 0;

  // 利用 do... while 迴圈，找出此棋子的某方向棋子
  do {
    tempX += directionX;
    tempY += directionY;

    // 如果某方向棋子的橫線軸在棋盤範圍，且與此棋子相同（例如：同是 '黑子' 或同是'白子'）
    if (board[tempY] && board[tempY][tempX] === currentPlayer) {
      // 連續的棋子數 +1
      total++;
    } else {
      // 否則 => 停止迴圈
      break;
    }
    // 如果為 true，繼續朝這個方向找下一個
  } while (true);

  // 迴圈結束時，回傳連續的棋子數
  return total;
}

// 找出某棋子的各方向是否有連續超過 4 個相同的棋子 （包含自己的話為 5 個）
export default function calculateWinner(board, y, x) {
  if (
    // 上到下
    countTotal(board, y, x, 1, 0) + countTotal(board, y, x, -1, 0) >= 4 ||
    // 右到左
    countTotal(board, y, x, 0, 1) + countTotal(board, y, x, 0, -1) >= 4 ||
    // 右下到左上
    countTotal(board, y, x, 1, 1) + countTotal(board, y, x, -1, -1) >= 4 ||
    // 左下到右上
    countTotal(board, y, x, 1, -1) + countTotal(board, y, x, -1, 1) >= 4
  ) {
    // 有的話 => 回傳自己棋子的值
    return board[y][x];
  }
}
