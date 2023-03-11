import * as fs from "fs";
import {ISaveStructure} from "./ISaveStructure.js";

class PlayerDataManager {
    private readonly SAVES_DIR = './saves/';
    private readonly FILE_FORMAT = '.json';
    private readonly _fpath: string;
    private _playerData: ISaveStructure;

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
        fs.writeFileSync(this._fpath, JSON.stringify(this._playerData));
    }
}

export default PlayerDataManager;