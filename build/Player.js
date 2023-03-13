import InquirerForms from "./InquirerForms.js";
import PlayerDataManager from "./PlayerDataManager.js";
class Player {
    constructor(_name) {
        this._name = _name;
        this._playerDataManager = new PlayerDataManager(this._name);
    }
    get getName() {
        return this._name;
    }
    handleExit() {
        this._playerDataManager.saveData();
    }
    addGameResult(gameName, result) {
        this._playerDataManager.addGameResult(gameName, result);
    }
    async showGameResults() {
        const playedGames = this._playerDataManager.getPlayedGames;
        const chosenGameName = await InquirerForms.pickGameName(playedGames);
        if (chosenGameName === InquirerForms.BACK)
            return;
        this._playerDataManager.printGameResults(chosenGameName);
        const createPlot = await InquirerForms.createPlot();
        if (createPlot) {
            this._playerDataManager.plotGameResults(chosenGameName);
        }
    }
}
export default Player;
