import CharMemoryGame from "./CharMemoryGame.js";
import InquirerForms from "./InquirerForms.js";
import Player from "./Player.js";
class GameManager {
    constructor() {
        this._games = [];
        this._games.push(new CharMemoryGame());
    }
    static getInstance() {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }
        return GameManager.instance;
    }
    async Init() {
        var _a;
        const playerName = await InquirerForms.getName();
        GameManager.instance._player = new Player(playerName);
        let gameName = await InquirerForms.choseGame(GameManager.instance._games);
        (_a = GameManager.instance._games.find(game => game.getName === gameName)) === null || _a === void 0 ? void 0 : _a.Play();
    }
}
export default GameManager;
