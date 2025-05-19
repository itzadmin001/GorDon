import React from 'react'

function Button(props) {
    return (
        <div className={`${props.classes}`}>
            {props.children}
        </div>
    )
}

export default Button
