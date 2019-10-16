import React, { Component } from 'react';
import Board from '../Board/Board';

export default class Game extends Component {

    state = {
        cells: 4,
        movements: 0,
        finished: false
    }

    chunk = (array, size) => {
        const chunked_arr = [];
        for (let i = 0; i < array.length; i++) {
          const last = chunked_arr[chunked_arr.length - 1];
          if (!last || last.length === size) {
            chunked_arr.push([array[i]]);
          } else {
            last.push(array[i]);
          }
        }
        return chunked_arr;
    }

    render() {
        

        var shuffle = require('shuffle-array');
        var array = [...Array(Math.pow((this.state.cells),2)).keys()];
        shuffle(array);
        const collection = this.chunk(array,this.state.cells);
        console.log(collection);

        const isFinished = this.state.finished? <h3>You Win!</h3>: null;


        return(
            <div className="" id="">
                <h1>Puzzle</h1>
                <h4>Movements: {this.state.movements}</h4>
                <Board row={this.state.cells} collection={collection} />
                {isFinished}
            </div>
        )
    }
}