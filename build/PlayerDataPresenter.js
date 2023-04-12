class PlayerDataPresenter {
    static printGameResultsAll(gameName, gameRecords) {
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
    static printGameResultDifficulty(gameName, gameRecords, difficulty) {
        const difficultyResults = [];
        for (const res of gameRecords[difficulty]) {
            difficultyResults.push({
                "accuracy [%]": Number(res.accuracy.toFixed(1)),
                "time [s]": Number(res.time.toFixed(2)),
            });
        }
        console.log(`${gameName} results at ${difficulty} difficulty:`);
        console.table(difficultyResults);
    }
}
export default PlayerDataPresenter;
