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
        this._player = new Player(playerName);
        process.on('exit', () => {
            this._player.handleExit();
        });
        let gameName = await InquirerForms.chooseGame(this._games);
        let currentGame = this._games.find(game => game.getName === gameName);
        if (currentGame) {
            await currentGame.Play();
        }
    }
}
export default GameManager;
