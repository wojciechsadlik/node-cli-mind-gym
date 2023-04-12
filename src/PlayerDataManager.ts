import * as fs from "fs";
import {IGameResult, IPlayerData} from "./IPlayerData.js";
import PlayerDataPresenter from "./PlayerDataPresenter.js";

class PlayerDataManager {
    private readonly SAVES_DIR = './saves/';
    private readonly FILE_FORMAT = '.json';
    private readonly _fpath: string;
    private _playerData: IPlayerData;

    constructor(playerName: string) {
        this._fpath = this.SAVES_DIR + playerName + this.FILE_FORMAT;
        
        if (!fs.existsSync(this.SAVES_DIR)) fs.mkdirSync(this.SAVES_DIR);

        this._playerData = {gameRecords: {}};

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
        const gameRecords = this._playerData.gameRecords[gameName];

        if (!gameRecords) {
            this._playerData.gameRecords[gameName] = {
                [difficulty]: [result]
            };

            return;
        }

        if (difficulty in gameRecords) {
            gameRecords[difficulty].push(result);
        }
        else {
            gameRecords[difficulty] = [result];
        }
    }

    printGameResults(gameName: string) {
        const gameResults = this._playerData.gameRecords[gameName];
        
        if (gameResults) PlayerDataPresenter.printGameResults(gameName, gameResults);
        else console.log(`No game records for ${gameName}`);
    }

    get getPlayedGames(): string[] {
        return Object.keys(this._playerData.gameRecords);
    }

    clearGameRecords() {
        this._playerData = {gameRecords: {}};
    }
}

export default PlayerDataManager;