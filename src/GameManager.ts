import CharMemoryGame from "./CharMemoryGame.js";
import IGame from "./IGame.js";
import InquirerForms from "./InquirerForms.js";
import Player from "./Player.js";

class GameManager {
    private _player!: Player;
    static instance: GameManager;
    private _games: IGame[] = [];

    private constructor() {
        this._games.push(new CharMemoryGame());
    }

    static getInstance(): GameManager {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }
        return GameManager.instance;
    }

    async Init() {
        const playerName = await InquirerForms.getName();
        GameManager.instance._player = new Player(playerName);

        let gameName = await InquirerForms.choseGame(GameManager.instance._games);

        GameManager.instance._games.find(game => game.getName === gameName)?.Play();
    }
}

export default GameManager;