import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';


const winners = [
  [35, 28, 21, 14],
  [35, 29, 23, 17],
  [35, 36, 37, 38],
  [36, 29, 22, 15],
  [36, 37, 38, 39],
  [36, 30, 24, 18],
  [37, 38, 39, 40],
  [37, 30, 23, 16],
  [37, 31, 25, 19],
  [38, 31, 24, 17],
  [38, 39, 40, 41],
  [38, 32, 26, 20],
  [38, 30, 22, 14],
  [39, 32, 25, 18],
  [39, 31, 23, 15],
  [40, 33, 26, 19],
  [40, 32, 24, 16],
  [41, 34, 27, 20],
  [41, 33, 25, 17],
  [28, 21, 14, 7],
  [28, 29, 30, 31],
  [28, 22, 16, 10],
  [29, 22, 15, 8],
  [29, 30, 31, 32],
  [29, 23, 17, 11],
  [30, 23, 16, 9],
  [30, 31, 32, 33],
  [30, 24, 18, 12],
  [31, 24, 17, 10],
  [31, 32, 33, 34],
  [31, 23, 15, 7],
  [31, 25, 19, 13],
  [32, 25, 18, 11],
  [32, 24, 16, 8],
  [33, 26, 19, 12],
  [33, 25, 17, 9],
  [34, 27, 20, 13],
  [34, 26, 18, 10],
  [21, 14, 7, 0],
  [21, 22, 23, 24],
  [21, 15, 9, 3],
  [22, 15, 8, 1],
  [22, 23, 24, 25],
  [22, 16, 10, 4],
  [23, 16, 9, 2],
  [23, 24, 25, 26],
  [23, 17, 11, 5],
  [24, 17, 10, 3],
  [24, 25, 26, 27],
  [24, 18, 12, 6],
  [24, 16, 8, 0],
  [24, 18, 12, 6],
  [25, 18, 11, 4],
  [25, 17, 9, 1],
  [26, 19, 12, 5],
  [26, 18, 10, 2],
  [27, 20, 13, 6],
  [27, 19, 11, 3],
  [14, 15, 16, 17],
  [15, 16, 17, 18],
  [16, 17, 18, 19],
  [17, 18, 19, 20],
  [7, 8, 9, 10],
  [8, 9, 10, 11],
  [9, 10, 11, 12],
  [10, 11, 12, 13],
  [0, 1, 2, 3],
  [1, 2, 3, 4],
  [2, 3, 4, 5],
  [3, 4, 5, 6],
  ]



class Square extends React.Component {
  render() {
    return (
      <button style={this.props.background} className="square" onClick={this.props.onClick}>
    
      </button>
    )
  }
}

class Play extends React.Component {
  render() {
    const { visible } = this.props;
    const style = visible || visible === null ? { visibility: 'visible' } : { visibility: 'hidden' };
    return (
      <button style={style} className="play" onClick={this.props.onClick}>
        {this.props.value}
      </button>
    )
  }
}

class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: Array(42).fill(null),
      redisNext: true,
      turns: 0,
      winner: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { winner } = this.state;
    const clickPlay = nextState.winner;

    if((winner || winner === null) && clickPlay) {
      return false;
    }
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    const winner = this.checkWinner(this.state.squares, this.state.turns);

    if (winner || winner === null) {   
      this.setState({
        winner: winner,
        turns: 0,
      })
    }
  }

  checkWinner(sq, turns) {
    let winner = false;

    for(let i = 0; i < winners.length; i++) {
      const [a, b, c, d] = winners[i];

        if(sq[a] === 'red' && sq[a] === sq[b] && sq[a] === sq[c] && sq[a] === sq[d]) {
          winner = true;
        }

        else if(sq[a] === 'yellow' && sq[a] === sq[b] && sq[a] === sq[c] && sq[a] === sq[d]) {
          winner = true;
        }

        else if(turns === sq.length) {
          winner = null;
        }
    }
    return winner;
  }

  handleClick(i) {
    const { squares, winner } = this.state;

    if(checkMove(squares, i) && !winner) {

      if(this.state.redisNext) {
        squares[i] = 'red';
      }

      else {
        squares[i] = 'yellow';
      }

      this.setState({
        squares: squares,
        redisNext: !this.state.redisNext,
        turns : this.state.turns + 1,
      });
    }

    function checkMove(sq, index) {
        if(sq[index] !== null || sq[index + 7] === null) {
            return false;
        }
      return true;
    }
  }

  restartGame () {
      this.setState({
        squares: Array(42).fill(null),
        winner: false,
      })
  }

  renderSquare(i) {
    const square = this.state.squares[i];
    const background = { background: square };
    return <Square background={background} onClick={() => this.handleClick(i)} />;
  }

  render() {
    const { redisNext, winner }= this.state;
    let status = "Next Player: " + (redisNext ? 'Red': 'Yellow');

    if (winner) {
      status = (redisNext ? 'Yellow ' : 'Red ') + 'Wins';
    }

    else if (winner === null) {
      status = 'Tie';
    }

    return (
    <div className="center">
        <Play visible={winner} value="Play" onClick={() => this.restartGame()}/>
      <div className="status">{status}</div>
        <div className="game-board">
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            {this.renderSquare(6)}
          </div>
          <div className="board-row">
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            {this.renderSquare(9)}
            {this.renderSquare(10)}
            {this.renderSquare(11)}
            {this.renderSquare(12)}
            {this.renderSquare(13)}
            </div>
           <div className="board-row">
            {this.renderSquare(14)}
            {this.renderSquare(15)}
            {this.renderSquare(16)}
            {this.renderSquare(17)}
            {this.renderSquare(18)}
            {this.renderSquare(19)}
            {this.renderSquare(20)}
            </div>
            <div className="board-row">
            {this.renderSquare(21)}
            {this.renderSquare(22)}
            {this.renderSquare(23)}
            {this.renderSquare(24)}
            {this.renderSquare(25)}
            {this.renderSquare(26)}
            {this.renderSquare(27)}
          </div>
            <div className="board-row">
            {this.renderSquare(28)}
            {this.renderSquare(29)}
            {this.renderSquare(30)}
            {this.renderSquare(31)}
            {this.renderSquare(32)}
            {this.renderSquare(33)}
            {this.renderSquare(34)}
          </div>
          <div className="board-row">
            {this.renderSquare(35)}
            {this.renderSquare(36)}
            {this.renderSquare(37)}
            {this.renderSquare(38)}
            {this.renderSquare(39)}
            {this.renderSquare(40)}
            {this.renderSquare(41)}
          </div>
        </div>
      </div>
    );
  }
}


class Game extends React.Component {
  render() {
    return (
      <div className="game">
          <Board />
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}


ReactDOM.render(
  <Game />,
  document.getElementById('root')
);








