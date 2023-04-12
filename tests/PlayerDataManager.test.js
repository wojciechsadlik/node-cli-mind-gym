import * as fs from "fs";
import PlayerDataManager from "../build/PlayerDataManager";

function readSave(path) {
    const fileRead = fs.readFileSync(path, {flag: 'r', encoding: 'utf-8'});
    return JSON.parse(fileRead);
}

describe('PlayerDataManager', () => {
    const playerDataManager = new PlayerDataManager("test");
    const savePath = "./saves/test.json";

    const gameResult = {accuracy: 80, time: 10};

    const expectedPlayerData = {gameRecords: {}};
    
    it("save file is created on save", () => {
        if (fs.existsSync(savePath))
            fs.unlinkSync(savePath)

        playerDataManager.saveData();

        expect(fs.existsSync(savePath)).toBe(true);
    });

    it("player data is cleared", () => {
        playerDataManager.clearGameRecords();

        playerDataManager.saveData();

        expect(readSave(savePath))
            .toMatchObject(expectedPlayerData);
    });

    it("game result is added to player data", () => {
        playerDataManager.addGameResult("N-Back", 2, gameResult);

        playerDataManager.saveData();

        expectedPlayerData.gameRecords["N-Back"] = {2: [gameResult]};

        expect(readSave(savePath))
            .toMatchObject(expectedPlayerData);
        
    });

    it("same game result added", () => {
        playerDataManager.addGameResult("N-Back", 2, gameResult);

        playerDataManager.saveData();

        expectedPlayerData.gameRecords["N-Back"][2].push(gameResult);

        expect(readSave(savePath))
            .toMatchObject(expectedPlayerData);
        
    });

    it("different difficulty result added", () => {
        playerDataManager.addGameResult("N-Back", 3, gameResult);

        playerDataManager.saveData();

        expectedPlayerData.gameRecords["N-Back"][3] = [gameResult];

        expect(readSave(savePath))
            .toMatchObject(expectedPlayerData);
        
    });

    it("different game name result added", () => {
        playerDataManager.addGameResult("Letters Memory", 2, gameResult);

        playerDataManager.saveData();

        expectedPlayerData.gameRecords["Letters Memory"] = {2: [gameResult]};

        expect(readSave(savePath))
            .toMatchObject(expectedPlayerData);
        
    });

    it("getting played games", () => {
        expect(playerDataManager.getPlayedGames)
            .toMatchObject(["N-Back", "Letters Memory"]);
    });

    it("printing results", () => {
        console.table(expectedPlayerData);
        console.table(expectedPlayerData.gameRecords["N-Back"]);

        playerDataManager.printGameResults("N-Back");
    });
});