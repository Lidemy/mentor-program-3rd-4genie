import { useState } from 'react';
import calculateWinner from './utils';

// 設定棋盤的大小
const range = 19;

export default function useBoard() {
  // state
  // 棋盤的 State
  const [boardSquares, setBoardSquares] = useState(
    Array(range).fill(Array(range).fill(null))
  );
  // 棋手輪流的 State
  const [blackIsNext, setBlackisNext] = useState(true);
  // 勝者的 State
  const [winner, setWinner] = useState(null);

  // 點擊棋盤後執行 handleClick()
  const handleClick = (x, y) => {
    // 複製 boardSquares 的 state
    const squares = JSON.parse(JSON.stringify(boardSquares));

    // 如果有人贏了，或者這個位置已有棋子，return
    if (winner || squares[y][x]) return;

    // 否則就在這個位置上棋子賦予 'black' 或 'white' 的值
    squares[y][x] = blackIsNext ? 'black' : 'white';

    // 更新 boardSquares 的 state
    setBoardSquares(squares);
    // 檢查是否有人獲勝
    setWinner(calculateWinner(squares, y, x));
    // 下一手輪到對方
    setBlackisNext(!blackIsNext);
  };

  // 點擊 '重新開始'按鈕後 => 重新整理頁面，資料清空
  const handleRestart = () => {
    window.location.reload();
  };

  // 設定變數 status
  // 當有勝負結果時，顯示獲勝者
  // 否則提示誰是下一手棋手
  let status;
  status = winner
    ? `獲勝的是 ： ${winner === 'black' ? '黑子' : '白子'}`
    : `下一手 : ${blackIsNext ? '黑子' : '白子'}`;

  return {
    boardSquares,
    handleClick,
    handleRestart,
    status,
  };
}
