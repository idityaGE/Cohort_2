import { createContext } from 'react';

const countContext = createContext({
    count: 0,
    setCount: () => {}
});

export default countContext;