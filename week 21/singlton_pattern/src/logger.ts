import { GameManger } from "./store";

export const startLogger = () => {
  setInterval(() => {
    GameManger.getInstance().log();
  }, 5000)
}
