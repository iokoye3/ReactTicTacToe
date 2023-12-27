import React, { useState } from 'react';
import './App.css';

// Initial state of the game

const initialState = {
  squares: Array(9).fill(null),
  isNext: true,
  winner: null,
}

const handleWinner = (squares) => {
  const combos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let index = 0; index < combos.length; index++) {
    const [a, b, c] = combos[index];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const BoardSquare = ({value, onClick}) => {
  return (
    <button className='boardsquare' onClick={onClick}>
      {value}
    </button>
  )
}

const GameBoard = ({squares, onClick}) => {
  const renderSquare = (x) => {
    return <BoardSquare value={squares[x]} onClick={() => onClick(x)} />;
  }

  return (
    <div className='board'>
      <div className='row'>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className='row'>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>        
      <div className='row'>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

const App = () => {   
  const [state, setState] = useState(initialState);

  const handleClick = (x) => {
    const squares = state.squares.slice();
    if (handleWinner(squares) || squares[x]) {
      return;
    }
    squares[x] = state.isNext ? 'X' : 'O';
    setState({
      squares: squares,
      isNext: !state.isNext,
      winner: handleWinner(squares),
    })
  }  
  
  const resetBoard = () => {
    setState(initialState);
  }

  // Game results

  const winner = state.winner;
  const isFull = state.squares.every((square) => square !== null);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  }
  else if (isFull) {
    status = `TIE!`;
  }
  else {
    status = `Next player: ${state.isNext ? 'X' : 'O'}`;
  }
  
  return (
    <div className='game'>
      <div className='gameboard'>
        <GameBoard squares={state.squares} onClick={handleClick} />
      </div>
      <div className="results">
        <div className='status'>{status}</div>
        {(winner || isFull) && (
          <button onClick={resetBoard}>Reset Game</button>
        )}
      </div>
    </div>
  );
}

export default App;
