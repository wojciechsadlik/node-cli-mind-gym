import { IGameRecords } from "./ISaveStructure.js";

class PlayerDataPresenter {
    static printGameResults(gameRecords: IGameRecords) {
        if (!gameRecords.gameResults.length) {
            console.log(`No ${gameRecords.gameName} records...`);
            return;
        }

        console.log(`${gameRecords.gameName} results:`)

        console.table(gameRecords.gameResults.map((res) => {
            return {
                "accuracy (%)": Number(res.accuracy.toFixed(1)),
                "time (s)": Number(res.time.toFixed(1))
            }
        }));
    }
}

export default PlayerDataPresenter;