import InquirerForms from "./InquirerForms.js";
import { IGameResult } from "./ISaveStructure.js";
import PlayerDataManager from "./PlayerDataManager.js";

class Player {
    private _playerDataManager: PlayerDataManager;
    constructor (
        private _name: string
    ) {
        this._playerDataManager = new PlayerDataManager(this._name);
    }

    get getName() {
        return this._name;
    }

    handleExit() {
        console.log(`Bye ${this._name}!`);
        this._playerDataManager.saveData();
    }

    addGameResult(gameName: string, result: IGameResult) {
        this._playerDataManager.addGameResult(gameName, result);
    }

    async printGameResults() {
        const playedGames = this._playerDataManager.getPlayedGames;
        const chosenGameName = await InquirerForms.pickGameName(playedGames);

        if (chosenGameName === InquirerForms.BACK) return;

        this._playerDataManager.printGameResults(chosenGameName);
    }

    async clearGameRecords() {
        const confirmed = await InquirerForms.confirmClearRecords();

        if (confirmed) this._playerDataManager.clearGameRecords();
    }
}

export default Player;