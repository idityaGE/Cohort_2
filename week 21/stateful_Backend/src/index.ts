import { games } from "./store";
import { startLogger } from "./logger";

setInterval(() => {
  games.push({
    id: Math.random().toString(36).substr(2, 9),
    whitePlayerName: 'Alice',
    blackPlayerName: 'Bob',
    moves: ['e4', 'e5', 'Nf3']
  })
}, 5000)

startLogger()