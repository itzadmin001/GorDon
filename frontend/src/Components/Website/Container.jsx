import React from 'react'

function Container(props) {
    return (
        <div className={` max-w-[1280px] mx-auto px-8 ${props.classes}`}>
            {props.children}
        </div>
    )
}

export default Container
