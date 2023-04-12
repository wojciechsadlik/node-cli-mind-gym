class PlayerDataPresenter {
    static printGameResults(gameName, gameRecords) {
        const difficultyResults = [];
        for (const [diff, results] of Object.entries(gameRecords)) {
            for (const res of results) {
                difficultyResults.push({
                    "difficulty": Number(diff),
                    "accuracy [%]": Number(res.accuracy.toFixed(1)),
                    "time [s]": Number(res.time.toFixed(2)),
                });
            }
        }
        console.log(`${gameName} results:`);
        console.table(difficultyResults);
    }
}
export default PlayerDataPresenter;
