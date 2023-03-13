class PlayerDataPresenter {
    static printGameResults(gameRecords) {
        if (!gameRecords.gameResults.length) {
            console.log(`No ${gameRecords.gameName} records...`);
            return;
        }
        console.log(`${gameRecords.gameName} results:`);
        console.log('time, accuracy');
        for (let gameRes of gameRecords.gameResults) {
            console.log(`${gameRes.time}, ${gameRes.accuracy}`);
        }
    }
}
export default PlayerDataPresenter;
