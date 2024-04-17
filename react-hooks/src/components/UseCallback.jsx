import React, { useCallback } from 'react'
import { useState } from 'react'
import { memo } from 'react'

function UseCallback() {
    const [counter, setCounter] = useState(0)
    const onClickHandler = () => {
        setCounter((p) => p + 1)
    }
    // So the probelm with this code is that every time the parent component re-renders, the child component also re-renders because the function a is getting recreated every time the parent component re-renders.
    // function a() {
    //     console.log("a got called")
    // }

    // To prevent this, we can use the useCallback hook. useCallback hook will return a memoized version of the callback that only changes if one of the dependencies has changed.
    const a = useCallback(() => {
        console.log("a got called")
    }, [])

    return (
        <div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={onClickHandler}>Increment({counter})</button>
            <Demo a={a} />
        </div>
    )
}

const Demo = memo(({a}) => {
    console.log("Demo got called")
    return <div>Demo</div>
})

export default UseCallback