import React from 'react'
import { useMemo, useState } from 'react'


export default function UseMemo() {
    const [number, setNumber] = useState(0)
    const [counter, setCounter] = useState(0)

    const inputHandler = (e) => {
        setNumber(e.target.value)
    }

    // so the problem is that the count is being calculated every time the component re-renders(when counter changes)
    // let count = 0
    // for (let i = 1; i <= number; i++) {
    //     count += i
    // }

    // to fix that we can use useMemo to remember the value of count and only re-calculate it when the number changes
    let count = useMemo(() => {
        // console.log("useMemo got called")
        let count = 0
        for (let i = 1; i <= number; i++) {
            count += i
        }
        return count
    }, [number])

    // we can also use useEffect to achieve the same thing by creating a new state for count and updating it when the number changes
    // const [count, setCount] = useState(0)
    // useEffect(() => {
    //     let count = 0
    //     for (let i = 1; i <= number; i++) {
    //         count += i
    //     }
    //     setCount(count)
    // }, [number])
    // but this is not the best way to do it because useEffect is used for side effects and not for calculating values

    const onClickHandler = () => {
        setCounter((prev)=> prev + 1)
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <input className="border border-gray-300 rounded-md px-4 py-2 mb-4" type="number" placeholder='enter the number' onChange={inputHandler} ></input>
            <h3 className="text-2xl font-bold mb-4">Sum from 1 to {number} is {count}</h3>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={onClickHandler}>Increment({counter})</button>
        </div>
    )
}
