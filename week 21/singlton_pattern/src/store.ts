interface Game {
  id: string,
  whitePlayerName: string,
  blackPlayerName: string,
  moves: string[],
}

// Singleton class 
export class GameManger {
  private static instance: GameManger;
  private games: Game[] = [];  // Private means that this property is only accessible within the class
  private constructor() {
    this.games = [];
  }

  public addGame(game: Game) {
    this.games.push(game);
  }

  public getGames() {
    return this.games;
  }

  public getGame(id: string) {
    return this.games.find(game => game.id === id);
  }

  public deleteGame(id: string) {
    this.games = this.games.filter(game => game.id !== id);
  }

  public addMove(id: string, move: string) {
    const game = this.games.find(game => game.id === id);
    if (game) {
      game.moves.push(move);
    }
  }

  public log() {
    console.log(this.games);
  }

  public static getInstance() {
    if (!GameManger.instance) {
      GameManger.instance = new GameManger();
    }
    return GameManger.instance;
  }
}
