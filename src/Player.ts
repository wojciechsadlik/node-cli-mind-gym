import { IGameResult } from "./ISaveStructure.js";
import PlayerDataManager from "./PlayerDataManager.js";

class Player {
    private _saveManager: PlayerDataManager;
    constructor (
        private _name: string
    ) {
        this._saveManager = new PlayerDataManager(this._name);
    }

    get getName() {
        return this._name;
    }

    handleExit() {
        this._saveManager.saveData();
    }

    addGameResult(gameName: string, result: IGameResult) {
        this._saveManager.addGameResult(gameName, result);
    }
}

export default Player;