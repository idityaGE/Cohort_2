import { atom, selector } from "recoil";

export const countState = atom({
    key: 'countState',
    default: 0
})

export const evenState = selector({
    key: 'evenState',
    get: ({get}) => {
        const count = get(countState);
        return count % 2 == 0;
    },
})

// by using state management, we can avoid prop drilling and unnessary re-renders of components only the components that are subscribed to the state will re-render when the state changes
// we can also have a single source of truth for our application state