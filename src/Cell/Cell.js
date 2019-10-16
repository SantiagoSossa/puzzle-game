import React from 'react'

export default function Cell(props) {
    return(
        <div className="Cell" style={{backgroundColor: 'salmon', height: '100px', width: '100px', border: '1px solid #ccc', textAlign:'center', lineHeight:'100px'}}>
            {props.children}
        </div>
    )
}