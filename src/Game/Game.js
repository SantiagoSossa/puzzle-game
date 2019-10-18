/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import Board from '../Board/Board';

export default class Game extends Component {

    state = {
        cells: 4,
        movements: 0,
        finished: false,
        collection: [],
        start: false,
        timer: 0
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

        const value = e.target.id
        if (value != 0) {
            this.setState({
                movements: this.state.movements + 1
            })
        }

        const originalArray = JSON.stringify([...Array(Math.pow((this.state.cells), 2)).keys()]);
        const resolved = originalArray.substr(1, originalArray.length - 2) == updateCollection.join(",")
        if (resolved) {
            clearInterval(this.intervalTimer)
            this.setState({
                finished: resolved
            });
        }
    }

    startGame = () => {

        //Create, shuffle and state the new random numbers array and start the game
        var shuffle = require('shuffle-array');
        var array = [...Array(Math.pow((this.state.cells), 2)).keys()];
        shuffle(array);
        const collection = this.chunk(array, this.state.cells);

        //Animations
        const game = document.getElementById("game");
        const title = document.querySelector(".mainTitle").children[0];
        // eslint-disable-next-line no-restricted-globals
        const width = screen.width;
        game.style.paddingTop = '0%';
        if (width > 992){
            title.style.fontSize = '4rem';
        } else if (width > 320){
            title.style.fontSize = '2rem';
        }
        

        //Start Timers
        setTimeout(() => {
            this.timerStart()
            this.setState({ collection, start: true });
            document.getElementById("board").scrollIntoView({block: 'start',  behavior: 'smooth' });
        }, 500);
    }

    intervalTimer = 0;

    timerStart() {
        this.intervalTimer = setInterval(() => {
            this.setState({
                timer: this.state.timer + 1
            })
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerStart)
    }

    render() {

        const isFinished = this.state.finished ? <h3>You Win!</h3> : null;

        return (
            <div className="unselectable" id="game">
                <div className="mainTitle">
                    <h1>Puzzle Game</h1>
                </div>
                <div className="displayContainer">
                    {this.state.start ?
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
                        </div> :
                        null
                    }
                    {this.state.start ? <Board row={this.state.cells} collection={this.state.collection} clicked={this.handleClick} /> : null}
                    {isFinished}
                    {this.state.start ? null : <button className="startBtn" onClick={this.startGame}>Start</button>}
                </div>
            </div>
        )
    }
}