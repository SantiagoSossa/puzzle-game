import React from 'react'
import Cell from '../Cell/Cell';
import Row from '../Row/Row';

export default function Board(props) {
    const board = props.collection.map( row => (
        <Row>{row.map(cell => (
            <Cell>{cell}</Cell>
        ))}</Row>
    ));

    return(
        <div>
            {board}
        </div>
    )
}