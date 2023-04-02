import * as fs from "fs";
import {IGameResult, IPlayerData} from "./IPlayerData";
import PlayerDataPresenter from "./PlayerDataPresenter";

class PlayerDataManager {
    private readonly SAVES_DIR = './saves/';
    private readonly FILE_FORMAT = '.json';
    private readonly _fpath: string;
    private _playerData: IPlayerData;

    constructor(playerName: string) {
        this._fpath = this.SAVES_DIR + playerName + this.FILE_FORMAT;
        
        if (!fs.existsSync(this.SAVES_DIR)) fs.mkdirSync(this.SAVES_DIR);

        this._playerData = {gameRecords: []};

        if (fs.existsSync(this._fpath)) {
            const fileRead = fs.readFileSync(this._fpath, {flag: 'r', encoding: 'utf-8'});
            this._playerData = JSON.parse(fileRead);
        }
    }

    saveData() {
        fs.writeFileSync(this._fpath, JSON.stringify(this._playerData, null, 2));
        console.log(`Session saved to ${this._fpath}`);
    }

    addGameResult(gameName: string, difficulty: number, result: IGameResult) {
        const gameRecords = this._playerData.gameRecords.find(game =>
            game.gameName === gameName);

        if (!gameRecords) {
            this._playerData.gameRecords.push({
                gameName: gameName,
                gameResults: {[difficulty]: [result]}
            });

            return;
        }

        if (difficulty in gameRecords.gameResults) {
            gameRecords.gameResults[difficulty].push(result);
        }
        else {
            gameRecords.gameResults[difficulty] = [result];
        }
    }

    printGameResults(gameName: string) {
        const gameResults = this._playerData.gameRecords.find(game =>
            game.gameName === gameName);
        
        if (gameResults) PlayerDataPresenter.printGameResults(gameResults);
        else console.log(`No game records for ${gameName}`);
    }

    get getPlayedGames(): string[] {
        const playedGames: string[] = [];

        for (let gameRecords of this._playerData.gameRecords) {
            playedGames.push(gameRecords.gameName);
        }

        return playedGames;
    }

    clearGameRecords() {
        this._playerData = {gameRecords: []};
    }
}

export default PlayerDataManager;