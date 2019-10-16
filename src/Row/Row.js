import React from 'react'

export default function Row(props) {
    return(
        <div className="row" style={{display: 'flex', flexFlow: 'row'}}>
            {props.children}
        </div>
    )
}