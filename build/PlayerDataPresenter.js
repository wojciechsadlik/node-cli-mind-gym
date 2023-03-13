import { plot } from "nodeplotlib";
class PlayerDataPresenter {
    static printGameResults(gameRecords) {
        if (!gameRecords.gameResults.length) {
            console.log(`No "${gameRecords.gameName}" records...`);
            return;
        }
        console.log(`"${gameRecords.gameName}" results:`);
        console.table(gameRecords.gameResults.map((res) => {
            return {
                "accuracy (%)": Number(res.accuracy.toFixed(1)),
                "time (s)": Number(res.time.toFixed(1))
            };
        }));
    }
    static plotGameResults(gameRecords) {
        if (!gameRecords.gameResults.length) {
            console.log(`No "${gameRecords.gameName}" records...`);
            return;
        }
        console.log(`Plotting "${gameRecords.gameName}" results...`);
        const accuracy = [];
        const time = [];
        gameRecords.gameResults.forEach((result) => {
            accuracy.push(result.accuracy);
            time.push(result.time);
        });
        const accuracyPlot = { y: accuracy, type: "scatter" };
        const timePlot = { y: time, type: "scatter" };
        plot([accuracyPlot]);
        plot([timePlot]);
    }
}
export default PlayerDataPresenter;
