
import React from 'react'

const CardWrapper = ({
    children,
    className = ''
}) => {
    return (
        <div className={`rounded-r-md border shadow-md bg-white ${className} p-7`}>
            {children}
        </div>
    )
}

export default CardWrapper