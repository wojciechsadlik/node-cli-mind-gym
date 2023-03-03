import CharMemoryGame from "./CharMemoryGame.js";
import InquirerForms from "./InquirerForms.js";
import Player from "./Player.js";

class GameManager {
    private _player!: Player;
    static instance: GameManager;

    private constructor() {}
    static getInstance(): GameManager {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }
        return GameManager.instance;
    }

    async Init() {
        const playerName = await InquirerForms.getName();
        GameManager.instance._player = new Player(playerName);
        const charMemory = new CharMemoryGame();
        charMemory.Play();
    }
}

export default GameManager;