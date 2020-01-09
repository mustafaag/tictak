import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default class Board extends React.Component {
  
  renderSquare(i, clasNm) {
    if(this.props.winnerData.indexes){
      if(this.props.winnerData.indexes.indexOf(i) !== -1){
        clasNm = 'square test';
      }
    }
    return (
      <Square className={clasNm}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0, 'square')}
          {this.renderSquare(1, 'square')}
          {this.renderSquare(2, 'square')}
        </div>
        <div className="board-row">
          {this.renderSquare(3, 'square')}
          {this.renderSquare(4, 'square')}
          {this.renderSquare(5, 'square')}
        </div>
        <div className="board-row">
          {this.renderSquare(6, 'square')}
          {this.renderSquare(7, 'square')}
          {this.renderSquare(8, 'square')}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber+1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    
    if (calculateWinner(squares).winner !== null) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {

    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;

   if(winner){
    if (winner.winner) {
      status = 'Winner: ' + winner.winnerSign;
    } else if(winner.winner === null) {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }else if(!winner.winner){
      status = 'It is a draw';
    }
   }
  

    return (
      <div className="game">
        <div className="game-board">
          <Board
            winnerData= {winner}
            squares={current.squares} 
            onClick={(i) => this.handleClick(i)}
          />

        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  let retvar = {
    winner: null
  };
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      retvar.winner= true;
      retvar.winnerSign = squares[a];
      retvar.indexes = [a, b, c];
    }
    if(checkIfAllComplete(squares)){
      retvar.winner=  false;
    }
  }
  return retvar;

}


function checkIfAllComplete(squares){
  for(let i =0; i < squares.length; i++){
    if(squares[i] ===null){
      return false;
    }
  }
  return true;
}
