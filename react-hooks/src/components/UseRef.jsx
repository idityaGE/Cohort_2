import React from 'react'
import { useRef, useEffect } from 'react'

function UseRef() {
    const ref = useRef(null)
    useEffect(() => {
        setTimeout(() => {
            ref.current.innerHTML = "2000"
        }, 2000)
    }, [])
    const incomeTax = 100000;
    return (
        <div>
            <h1 ref={ref}>{incomeTax}</h1>
        </div>
    )
}

export default UseRef