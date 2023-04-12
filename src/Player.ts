import InquirerForms from "./InquirerForms.js";
import { IGameResult } from "./IPlayerData.js";
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

    addGameResult(gameName: string, difficulty: number, result: IGameResult) {
        this._playerDataManager.addGameResult(gameName, difficulty, result);
    }

    async printGameResults() {
        const playedGames = this._playerDataManager.getPlayedGames;
        const chosenGameName = await InquirerForms.pickGameName(playedGames);

        if (chosenGameName === InquirerForms.BACK) return;

        const playedDifficulties = this._playerDataManager.getPlayedDifficulties(chosenGameName);
        const chosenDifficulty = await InquirerForms.pickGameDifficulty(playedDifficulties, true);

        if (chosenDifficulty === InquirerForms.BACK) return;

        if (chosenDifficulty === InquirerForms.ALL) {
            this._playerDataManager.printGameResults(chosenGameName);
        }
        else {
            this._playerDataManager.printGameResults(chosenGameName, Number(chosenDifficulty));
        }
    }

    async clearGameRecords() {
        const confirmed = await InquirerForms.confirm("Do you want to clear your data?");

        if (confirmed) this._playerDataManager.clearGameRecords();
    }
}

export default Player;