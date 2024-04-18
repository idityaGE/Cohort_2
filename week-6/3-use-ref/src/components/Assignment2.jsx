import React, { useState, useCallback, useRef } from 'react';

// Create a component that tracks and displays the number of times it has been rendered. Use useRef to create a variable that persists across renders without causing additional renders when it changes.

export function Assignment2() {
    const noOfRender = useRef(0)
    noOfRender.current = noOfRender.current + 1;
    // explanation: useRef is used to create a variable that persists across renders without causing additional renders when it changes.

    const [, forceRender] = useState(0);

    const handleReRender = () => {
        // Update state to force re-render
        forceRender(Math.random());
    };
    return (
        <div>
            <p>This component has rendered {noOfRender.current} times.</p>
            <button onClick={handleReRender}>Force Re-render</button>
        </div>
    );
};