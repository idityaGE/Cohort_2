import { createContext } from 'react';

const countContext = createContext({
    count: 0,
    setCount: () => {}
});

export default countContext;


// Disadvantsge of using useContext is that is doen't have the memoization feature means it doesn't stop from re-rendering of its parent components
// To avoid that we use state management libraries like Redux, Recoil etc.
