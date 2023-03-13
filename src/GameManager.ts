import LettersMemoryGame from "./CharMemoryGame.js";
import IGame from "./IGame.js";
import InquirerForms from "./InquirerForms.js";
import Player from "./Player.js";

class GameManager {
    private _player!: Player;
    static instance: GameManager;
    private _games: IGame[] = [];

    private constructor() {
        this._games.push(new LettersMemoryGame());
    }

    static getInstance(): GameManager {
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
            if (option === InquirerForms.EXIT) break;
            if (option === InquirerForms.DISPLAY_STATS)
                await this._player.showGameResults();

            let currentGame = this._games.find(game => game.getName === option);
            
            if (currentGame) {
                const result = await currentGame.Play();
                this._player.addGameResult(currentGame.getName, result);
            }
        }
        
    }
}

export default GameManager;