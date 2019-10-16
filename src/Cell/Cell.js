import React from 'react'

export default function Cell(props) {
    return(
        <div onClick={props.clicked} className="cell" id={props.children}>
            {props.children}
        </div>
    )
}