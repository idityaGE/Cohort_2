// useEffect() : React Hook that tells React to DO THIS CODE WHEN: (pick one)
//                                                1. This component re-renders
//                                                2. This component mounts
//                                                3. The state of a value changes

// useEffect(function, [dependencies])
// useEffect(() => {});               // This effect will run after every render
// useEffect(() => {}, []);           // This effect will run only once after the initial render
// useEffect(() => {}, [count]);      // This effect will run when the 'count' state changes

// USES
// #1 Event Listeners
// #2 DOM manipulation
// #3 Subscriptions (real-time updates)
// #4 Fetching Data from an API
// #5 Clean up when a component unmounts


import React, { useState, useEffect } from 'react';

function ExampleComponent() {
    const [count, setCount] = useState(0);

    // This effect will run after every render
    useEffect(() => {
        console.log('Component has been rendered');
    });

    // This effect will run only once after the initial render
    useEffect(() => {
        console.log('Component has been mounted');
    }, []);

    // This effect will run when the 'count' state changes
    useEffect(() => {
        console.log('Count has been updated:', count);
    }, [count]);

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
}

export default ExampleComponent;
