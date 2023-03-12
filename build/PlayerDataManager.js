import * as fs from "fs";
class PlayerDataManager {
    constructor(playerName) {
        this.SAVES_DIR = './saves/';
        this.FILE_FORMAT = '.json';
        this._fpath = this.SAVES_DIR + playerName + this.FILE_FORMAT;
        if (!fs.existsSync(this.SAVES_DIR))
            fs.mkdirSync(this.SAVES_DIR);
        this._playerData = { gameRecords: [] };
        if (fs.existsSync(this._fpath)) {
            const fileRead = fs.readFileSync(this._fpath, { flag: 'r', encoding: 'utf-8' });
            this._playerData = JSON.parse(fileRead);
        }
    }
    saveData() {
        fs.writeFileSync(this._fpath, JSON.stringify(this._playerData));
    }
    addGameResult(gameName, result) {
        const gameResults = this._playerData.gameRecords.find(game => game.gameName === gameName);
        if (!gameResults) {
            this._playerData.gameRecords.push({
                gameName: gameName,
                gameResults: [result]
            });
            return;
        }
        gameResults.gameResults.push(result);
    }
}
export default PlayerDataManager;
