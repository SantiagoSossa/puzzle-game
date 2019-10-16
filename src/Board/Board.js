import React from 'react'
import Cell from '../Cell/Cell';

export default function Board(props) {
    return(
        props.cells.map(cell =>{
           return <div className="row">{cell}</div>
        })
    )
}