import React from 'react';
import styled from 'styled-components';

const Col = styled.div`
  width: 24px;
  height: 24px;
  background: #c19d38;
  position: relative;
  z-index: 0;

  // 畫棋盤的縱線
  &::before {
    content: '';
    height: 100%;
    width: 2px;
    background: black;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);

    // 縱線上邊第一格回縮 50 %，讓范圍在棋盤中
    ${(props) =>
      props.$row === 0 &&
      `
      top: 50%;
    `}

    // 縱線下邊最後一格回縮 50 %，讓范圍在棋盤中
    ${(props) =>
      props.$row === 18 &&
      `
      height: 50%;
    `}
  }

  // 畫棋盤的橫線
  &::after {
    content: '';
    width: 100%;
    height: 2px;
    background: black;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);

    // 橫線左邊第一格回縮 50 %，讓范圍在棋盤中
    ${(props) =>
      props.$col === 0 &&
      `
      left: 50%;
    `}

    // 橫線右邊最後一格回縮 50 %，讓范圍在棋盤中
    ${(props) =>
      props.$col === 18 &&
      `
      width: 50%;
    `}
  }
`;

const Pawn = styled.div`
  content: '';
  background-color: ${(props) =>
    props.$color === 'black' ? 'black' : 'white'};
  width: 25px;
  height: 25px;
  border: 0;
  border-radius: 50%;
  position: absolute;
  // 棋子的大小
  transform: scale(0.8);
  // 讓棋子在棋盤的上一層顯示
  z-index: 1;
`;

//每一個棋盤與棋子
//接收 App.js 傳入的 props
export default function Square({ row, col, onClick, value }) {
  // 棋盤上點擊時，執行 onClick(), 並將 col、 row 的值帶入
  const handleChessClick = () => {
    onClick(col, row);
  };

  return (
    <Col $col={col} $row={row} onClick={handleChessClick}>
      {value && <Pawn $color={value} />}
    </Col>
  );
}
