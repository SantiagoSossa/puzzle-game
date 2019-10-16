import React, { Component } from 'react';
import Board from '../Board/Board';

export default class Game extends Component {

    state = {
        cells: 2,
        movements: 0,
        finished: false,
        collection: []
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

    handleClick = (e) => {
        let rowIndex = -1;
        let columnIndex = -1;
        const updateCollection = [...this.state.collection];
        for (const row in updateCollection) {
            if (updateCollection[row].indexOf(+e.target.id) >= 0) {
                rowIndex = updateCollection[row].indexOf(+e.target.id);
                columnIndex = updateCollection.indexOf(updateCollection[row]);
            }
        }

        //up
        if (columnIndex > 0) {
            if (updateCollection[columnIndex - 1][rowIndex] == 0) {
                updateCollection[columnIndex - 1][rowIndex] = updateCollection[columnIndex][rowIndex];
                updateCollection[columnIndex][rowIndex] = 0;
                this.setState({ collection: updateCollection });
            }
        }
        //down
        if (columnIndex < this.state.cells - 1) {
            if (updateCollection[columnIndex + 1][rowIndex] == 0) {
                updateCollection[columnIndex + 1][rowIndex] = updateCollection[columnIndex][rowIndex];
                updateCollection[columnIndex][rowIndex] = 0;
                this.setState({ collection: updateCollection });
            }
        }
        //left
        if (rowIndex > 0) {
            if (updateCollection[columnIndex][rowIndex - 1] == 0) {
                updateCollection[columnIndex][rowIndex - 1] = updateCollection[columnIndex][rowIndex];
                updateCollection[columnIndex][rowIndex] = 0;
                this.setState({ collection: updateCollection });
            }
        }
        //right
        if (rowIndex < this.state.cells - 1) {
            if (updateCollection[columnIndex][rowIndex + 1] == 0) {
                updateCollection[columnIndex][rowIndex + 1] = updateCollection[columnIndex][rowIndex];
                updateCollection[columnIndex][rowIndex] = 0;
                this.setState({ collection: updateCollection });
            }
        }
        const originalArray = JSON.stringify([...Array(Math.pow((this.state.cells), 2)).keys()]);
        this.setState({finished: originalArray.substr(1,originalArray.length-2) == updateCollection.join(",")});
    }

    startGame = () => {
        var shuffle = require('shuffle-array');
        var array = [...Array(Math.pow((this.state.cells), 2)).keys()];
        shuffle(array);
        const collection = this.chunk(array, this.state.cells);
        this.setState({ collection: collection });
    }

    render() {



        const isFinished = this.state.finished ? <h3>You Win!</h3> : null;


        return (
            <div className="unselectable" id="game">
                <h1 className="title">Puzzle game</h1>
                <div className="displayContainer">
                    <div className="side">
                        <div className="statContainer">
                            <div className="header">
                                Stats
                    </div>
                            <div className="statTitle">
                                Movements &emsp; <span className="stat">{this.state.movements}</span>
                            </div>
                            <div className="statTitle">
                                Timer &emsp; <span className="stat">{this.state.timer}</span>
                            </div>
                        </div>
                    </div>
                    <Board row={this.state.cells} collection={this.state.collection} clicked={this.handleClick} />
                    {isFinished}
                    <button onClick={this.startGame}>Start</button>
                </div>
            </div>
        )
    }
}