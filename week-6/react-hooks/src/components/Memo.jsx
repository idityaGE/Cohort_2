import { useState, memo } from 'react'

function Render() {
    const [count, setCount] = useState(0)
    return (
        <div>
            <button onClick={() => { let num = Math.random() * 100; setCount(num) }}>Click to change</button>
            <MemoRenderCom count={count} /> {/* Here, only this component will re-render because of the memo */}
            <MemoRenderCom count={123} />
            <MemoRenderCom count="1" />
            <MemoRenderCom count="1" />
            <MemoRenderCom count="1" />
        </div>
    )
}

const MemoRenderCom = memo(function RenderCom({ count }) {
    return (
        <p>{count}</p>
    )
})
// Explain this memo
// The memo function is used to wrap a component to prevent unnecessary re-rendering.
// The memo function will only re-render the component if the `props` have changed.
// In this case, the MemoRenderCom component is wrapped with the memo function. 
// This means that the MemoRenderCom component will only re-render if the count prop has changed.
// This can help to optimize performance by preventing unnecessary re-renders of components.

export default Render

