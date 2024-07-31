import { games } from "./store";

export const startLogger = () => {
  setInterval(() => {
    console.log(games)
  }, 5000)
}

// This is ugly, but it works. We have a global variable `games` that is shared between the `store` and `logger` modules. The `store` module exports the `games` array, and the `logger` module imports it.
// Better solution: Use a PubSub pattern to decouple the modules. The `store` module will publish a `gameCreated` event, and the `logger` module will subscribe to it.
// or use a state management library like Redux or MobX.
// or Singleton pattern