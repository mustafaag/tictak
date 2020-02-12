import React, { Component } from 'react'
import Board from './Board';

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
          history: [{
            squares: Array(9).fill(null),
          }],
          xIsNext: true,
          stepNumber: 0,
          isAscending: true
        };
      }
    
      handleClick(i,iIndex,jIndex) {
        
        const history = this.state.history.slice(0, this.state.stepNumber+1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const squareIndexes = '('+(iIndex+1)+','+(jIndex+1) +')';
        if (calculateWinner(squares).winner !== null) {
          return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
          history: history.concat([{
            squares: squares,
            squareIndexes: squareIndexes
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
    
      handleSortToggle() {
        this.setState({
          isAscending: !this.state.isAscending
        });
      }
    
      render() {
    
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
      
        const moves = (
          <li >
            <button  onClick={() => this.jumpTo(0)}>Restart Game</button>
          </li>
        );
    
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
           <div className="game-status">{status}</div>
              <Board
                winnerData= {winner}
                squares={current.squares} 
                onClick={(i,iIndex,jIndex) => this.handleClick(i,iIndex,jIndex)}
              />
            <div className="game-info">
              
              <ol>{moves}</ol>
            </div>
          </div>
        );
      }
}

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
        return retvar;
      }
      if(checkIfAllComplete(squares)){
        retvar.winner=  false;
        retvar.indexes=   [0, 1, 2, 3, 4, 5, 6, 7, 8];
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
  