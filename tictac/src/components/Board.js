import React, { Component } from 'react'
import Square from './Square';

export class Board extends Component {

    renderSquare(i,iIndex,jIndex, clasNm) {
        if(this.props.winnerData.indexes){
          if(this.props.winnerData.indexes.indexOf(i) !== -1 && this.props.winnerData.winner){
            clasNm = 'square test';
          }else if(this.props.winnerData.indexes.indexOf(i) !== -1 && !this.props.winnerData.winner){
            clasNm = 'square yellow';
          }
        }
        return (
          <Square key={i} className={clasNm}
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i,iIndex,jIndex)}
          />
        );
      }
      
      renderBoard(){
        let square= [];
        for(let i = 0; i<3; i++){
          let squareChildren = [];
          for(let j = 0; j<3; j++){
            squareChildren.push(this.renderSquare(j+(i*3),i,j, 'square'));
          }
          square.push(<div key={i} className="board-row">{squareChildren}</div>); 
        }
        return square;
      }
    
      render() {
       
        return (
          <div className="game-board">
           {this.renderBoard()}
          </div>
        );
      }
}

export default Board
