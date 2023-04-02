import { DifficultyResults } from "./IPlayerData.js";

class PlayerDataPresenter {
    static printGameResults(gameRecords: DifficultyResults) {
        throw new Error("Method not implemented");
        // if (!gameRecords.gameResults.length) {
        //     console.log(`No ${gameRecords.gameName} records...`);
        //     return;
        // }

        // console.log(`${gameRecords.gameName} results:`)

        // console.table(gameRecords.gameResults.map((res) => {
        //     return {
        //         "difficulty": res.difficulty,
        //         "accuracy [%]": Number(res.accuracy.toFixed(1)),
        //         "time [s]": Number(res.time.toFixed(1))
        //     }
        // }));
    }
}

export default PlayerDataPresenter;