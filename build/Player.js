import PlayerDataManager from "./PlayerDataManager.js";
class Player {
    constructor(_name) {
        this._name = _name;
        this._saveManager = new PlayerDataManager(this._name);
    }
    get getName() {
        return this._name;
    }
    handleExit() {
        this._saveManager.saveData();
    }
}
export default Player;
