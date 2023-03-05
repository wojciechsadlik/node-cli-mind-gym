import LettersMemoryGame from "./CharMemoryGame.js";
import InquirerForms from "./InquirerForms.js";
import Player from "./Player.js";
class GameManager {
    constructor() {
        this._games = [];
        this._games.push(new LettersMemoryGame());
    }
    static getInstance() {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }
        return GameManager.instance;
    }
    async Start() {
        const playerName = await InquirerForms.getName();
        GameManager.instance._player = new Player(playerName);
        let gameName = await InquirerForms.chooseGame(GameManager.instance._games);
        let currentGame = GameManager.instance._games.find(game => game.getName === gameName);
        if (currentGame) {
            await currentGame.Play();
        }
    }
}
export default GameManager;
