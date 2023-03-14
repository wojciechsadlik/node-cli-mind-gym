import LettersMemoryGame from "./CharMemoryGame.js";
import InquirerForms from "./InquirerForms.js";
import NBackGame from "./NBackGame.js";
import Player from "./Player.js";
class GameManager {
    constructor() {
        this._games = [];
        this._games.push(new LettersMemoryGame());
        this._games.push(new NBackGame());
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
        while (true) {
            let option = await InquirerForms.mainMenu(this._games);
            if (option === InquirerForms.EXIT)
                break;
            if (option === InquirerForms.DISPLAY_STATS)
                await this._player.printGameResults();
            if (option === InquirerForms.CLEAR_STATS)
                await this._player.clearGameRecords();
            let currentGame = this._games.find(game => game.getName === option);
            if (currentGame) {
                const result = await currentGame.Play();
                this._player.addGameResult(currentGame.getName, result);
            }
        }
    }
}
export default GameManager;
