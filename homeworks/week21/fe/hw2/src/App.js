import React from 'react';
import styled from 'styled-components';
import useBoard from './useBoard';
import Square from './Square';
import PropTypes from 'prop-types';

const Title = styled.h1`
  margin-top: 20px;
  text-align: center;
  font-weight: 600;
`;
const Status = styled.div`
  text-align: center;
  font-size: 16px;
  letter-spacing: 2px;
`;
const Button = styled.button`
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  outline: none;
  padding: 8px 13px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  &:focus {
    outline: 0;
  }
`;
const BoardBox = styled.div`
  margin: 5px auto;
  width: 500px;
  height: 500px;
  box-shadow: 3px 3px 8px 3px 3px;
  border-radius: 10px;
  padding: 5vmin;
`;

const Row = styled.div`
  display: flex;
`;

export default function App() {
  //從 useBoard.js 傳入 props
  const { boardSquares, handleClick, handleRestart, status } = useBoard();

  return (
    <div>
      <Title>五子棋</Title>

      {/* 勝負狀態 */}
      <Status>
        <div>{status}</div>
        <Button onClick={handleRestart}>重新開始</Button>
      </Status>

      {/* 五子棋盤 */}
      <BoardBox>
        {/* 找出棋盤中每一個 y 以及其順序的值（yIndex） */}
        {/* 相當於找出每一個橫線軸 */}
        {boardSquares.map((row, yIndex) => (
          <Row key={yIndex}>
            {/* 棋盤中每一個 x  以及其順序的值（xIndex）  */}
            {/* 相當於在某橫線軸上，每條縱線軸的位置 */}
            {row.map((col, xIndex) => (
              // 顯示 Square 的 Component ,並將 props 值傳到 Square 中
              <Square
                key={xIndex}
                row={yIndex}
                col={xIndex}
                onClick={handleClick}
                value={boardSquares[yIndex][xIndex]}
              ></Square>
            ))}
          </Row>
        ))}
      </BoardBox>
    </div>
  );
}

App.propTypes = {
  boardSquares: PropTypes.object,
  handleClick: PropTypes.func,
  handleRestart: PropTypes.func,
  status: PropTypes.string,
};
