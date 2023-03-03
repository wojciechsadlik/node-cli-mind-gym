import InquirerForms from "./InquirerForms.js";
import Player from "./Player.js";
class GameManager {
    constructor() { }
    static getInstance() {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }
        return GameManager.instance;
    }
    async Init() {
        const playerName = await InquirerForms.getName();
        this._player = new Player(playerName);
    }
}
export default GameManager;
