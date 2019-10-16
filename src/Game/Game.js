import React, { Component } from 'react';
import Board from '../Board/Board';

export default class Game extends Component {

    state = {
        cells: 3,
        movements: 0,
        finished: false
    }

    render() {

        const isFinished = this.state.finished? <h3>You Win!</h3>: null;

        return(
            <div className="" id="">
                <h1>Puzzle</h1>
                <h4>Movements: {this.state.movements}</h4>
                <Board cells={this.state.cells}/>
                {isFinished}
            </div>
        )
    }
}