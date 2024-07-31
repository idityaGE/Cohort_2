import { GameManger } from "./store";
import { startLogger } from "./logger";



setInterval(() => {
  GameManger.getInstance().addGame({
    id: Math.random().toString(),
    whitePlayerName: 'Alice',
    blackPlayerName: 'Bob',
    moves: []
  })
}, 5000)

startLogger()