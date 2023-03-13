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
}

export default Player;