import * as fs from 'fs';
class SaveManager {
    //private _playerData: object;
    constructor(playerName) {
        this.SAVES_DIR = './saves/';
        this.FILE_FORMAT = '.json';
        this._fname = playerName + this.FILE_FORMAT;
        if (!fs.existsSync(this.SAVES_DIR))
            fs.mkdirSync(this.SAVES_DIR);
        const fileRead = fs.readFileSync(this.SAVES_DIR + this._fname, { flag: 'r', encoding: 'utf-8' });
        console.log(fileRead);
    }
}
export default SaveManager;
