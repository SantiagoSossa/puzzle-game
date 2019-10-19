/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import Board from '../Board/Board';

export default class Game extends Component {

    state = {
        cells: 3,
        movements: 0,
        finished: false,
        collection: [],
        start: false,
        timer: 0,
        orderedArray: '',
        zeroColIndex: 0,
        zeroRowIndex: 0,
        rowOfZero: 0,
        colOfZero: 0
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

        const value = e.target.id;

        if (value == 0) {
            return;
        }

        let zeroColIndex = this.state.zeroColIndex
        let zeroRowIndex = this.state.zeroRowIndex
        let rowOfZero = this.state.rowOfZero
        let colOfZero = this.state.colOfZero

        let rowIndexClicked = -1;
        let columnIndexClicked = -1;
        let rowWhereClicked = -1;
        let colWhereClicked = -1;
        let direction = ""
        let numbers = []


        const updateCollection = this.state.collection;

        let moved = false

        for (const row in updateCollection) {
            if (updateCollection[row].indexOf(+value) >= 0) {
                columnIndexClicked = updateCollection[row].indexOf(+value);
                rowIndexClicked = updateCollection.indexOf(updateCollection[row]);
                rowWhereClicked = row
                colWhereClicked = updateCollection[row].indexOf(+value)
                break;
            }
        }

        if (columnIndexClicked == zeroColIndex) {

            let colInicial = columnIndexClicked
            let rowInicial = rowIndexClicked

            const colZeroInmutable = columnIndexClicked
            const rowZeroInmutable = rowIndexClicked

            if (rowWhereClicked > rowOfZero) {
                direction = "down"
            } else {
                direction = "up"
            }

            let cont = 0

            //Current Value
            let actualValue = updateCollection[rowInicial][colInicial]
            let nextValue = 0

            while (true) {
                cont += 1
                numbers.push(actualValue)

                //Next Value
                if (direction == "up") {
                    rowInicial += 1
                    nextValue = updateCollection[rowInicial][colInicial]
                } else {
                    rowInicial -= 1
                    nextValue = updateCollection[rowInicial][colInicial]
                }

                if (nextValue == 0) {
                    for (let i = 0; i < cont; i++) {
                        if (direction == "up") {
                            rowIndexClicked += 1
                            updateCollection[rowIndexClicked][columnIndexClicked] = numbers[i]
                        } else {
                            rowIndexClicked -= 1
                            updateCollection[rowIndexClicked][columnIndexClicked] = numbers[i]
                        }
                    }
                    updateCollection[rowZeroInmutable][colZeroInmutable] = 0
                    this.setState({ collection: updateCollection, zeroColIndex: colZeroInmutable, zeroRowIndex: rowZeroInmutable, rowOfZero: rowZeroInmutable });
                    moved = true
                    break;
                }
                actualValue = nextValue
            }
        } else if (rowIndexClicked == zeroRowIndex) {

            let colInicial = columnIndexClicked
            let rowInicial = rowIndexClicked

            const colZeroInmutable = columnIndexClicked
            const rowZeroInmutable = rowIndexClicked

            if (colWhereClicked > colOfZero) {
                direction = "right"
            } else {
                direction = "left"
            }

            let cont = 0

            //Current Value
            let actualValue = updateCollection[rowInicial][colInicial]
            let nextValue = 0

            while (true) {
                cont += 1
                numbers.push(actualValue)

                //Next Value
                if (direction == "right") {
                    colInicial -= 1
                    nextValue = updateCollection[rowInicial][colInicial]
                } else {
                    colInicial += 1
                    nextValue = updateCollection[rowInicial][colInicial]
                }

                if (nextValue == 0) {
                    for (let i = 0; i < cont; i++) {
                        if (direction == "right") {
                            columnIndexClicked -= 1
                            updateCollection[rowIndexClicked][columnIndexClicked] = numbers[i]
                        } else {
                            columnIndexClicked += 1
                            updateCollection[rowIndexClicked][columnIndexClicked] = numbers[i]
                        }
                    }
                    updateCollection[rowZeroInmutable][colZeroInmutable] = 0
                    this.setState({ collection: updateCollection, zeroColIndex: colZeroInmutable, zeroRowIndex: rowZeroInmutable, colOfZero: colZeroInmutable });
                    moved = true
                    break;
                }
                actualValue = nextValue
            }
        }

        //Update Movements
        if (value != 0 && moved) {
            this.setState({
                movements: this.state.movements + 1
            })
        }

        moved = false

        //Check if game is resolved
        const resolved = this.state.orderedArray == updateCollection.join(",")
        if (resolved) {
            clearInterval(this.intervalTimer)
            this.setState({
                finished: resolved
            });

            //get all divs and disable'em
            const divs = document.querySelectorAll(".cell");
            divs.forEach(div => {
                div.classList.add('disabled');
            });

        }

    }

    startGame = async () => {

        //Check for a correct cells value
        if (!this.state.cells || this.state.cells < 3) {
            await this.setState({
                cells: 3
            })
        }

        //Create, shuffle and state the new random numbers array and start the game
        var shuffle = require('shuffle-array');
        var array = [...Array(Math.pow((this.state.cells), 2)).keys()];
        shuffle(array);
        const collection = this.chunk(array, this.state.cells);

        let orderedArray = JSON.stringify([...Array(Math.pow((this.state.cells), 2)).keys()]);
        orderedArray = orderedArray.substr(1, orderedArray.length - 2)
        orderedArray += ",0"
        orderedArray = orderedArray.substr(2)
        this.setState({
            orderedArray
        })

        let columnIndex = 0;
        let rowIndex = 0;
        let rowOfZero = 0;
        let colOfZero = 0;

        for (const row in collection) {
            if (collection[row].indexOf(0) != -1) {
                columnIndex = collection[row].indexOf(0);
                rowIndex = collection.indexOf(collection[row]);
                rowOfZero = row
                colOfZero = collection[row].indexOf(0)
                break;
            }
        }

        //Animations
        const game = document.getElementById("game");
        const title = document.querySelector(".mainTitle").children[0];
        // eslint-disable-next-line no-restricted-globals
        const width = screen.width;
        game.style.paddingTop = '0%';
        if (width > 992) {
            title.style.fontSize = '4rem';
        } else if (width > 320) {
            title.style.fontSize = '2rem';
        }


        //Start Timers
        setTimeout(() => {
            this.timerStart()
            this.setState({ collection, start: true, zeroColIndex: columnIndex, zeroRowIndex: rowIndex, rowOfZero, colOfZero });
            document.getElementById("board").scrollIntoView({ block: 'start', behavior: 'smooth' });
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

    onChange = ({ target }) => {
        let val = target.value
        if (val === "") {
            val = String(val)
        } else {
            val = parseInt(val)
        }
        this.setState({
            cells: val
        })
    }

    handlerRestart = () => {
        clearInterval(this.intervalTimer);
        this.setState({
            timer: 0,
            movements: 0,
            finished: false
        })
        this.startGame();

        //get all divs and disable'em
        const divs = document.querySelectorAll(".cell");
        divs.forEach(div => {
            div.classList.remove('disabled');
        });
    }

    render() {

        const isFinished = this.state.finished ? <div className="success"><h3>You Win!</h3></div> : null;

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
                            <div className="restartContainer">
                                <button onClick={this.handlerRestart} className="restartBtn">Restart</button>
                            </div>
                            {isFinished}
                        </div> :
                        null
                    }
                    {this.state.start ? <Board row={this.state.cells} collection={this.state.collection} clicked={this.handleClick} /> : null}
                    {this.state.start ? null :
                        <div className="cellControllers">
                            <div className="labelContainer"><label htmlFor="numCellsInput">Numero de celdas</label></div>
                            <input value={this.state.cells} onChange={this.onChange} id="numCellsInput" type="number" />
                            <button className="startBtn" onClick={this.startGame}>Start</button>
                        </div>
                    }
                </div>
            </div>
        )
    }
}