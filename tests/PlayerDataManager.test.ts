import * as fs from "fs";
import PlayerDataManager from "../src/PlayerDataManager";
import {IGameResult, IPlayerData} from "../src/IPlayerData";

function readSave(path: string): IPlayerData {
    const fileRead = fs.readFileSync(path, {flag: 'r', encoding: 'utf-8'});
    return JSON.parse(fileRead);
}

describe('PlayerDataManager', () => {
    const playerData = new PlayerDataManager("test");
    const savePath = "./saves/test.json";

    const gameResult: IGameResult = {accuracy: 80, time: 10};

    const expectedTest1Path = "./tests/expectedSaves/test1.json";
    const expectedTest2Path = "./tests/expectedSaves/test2.json";
    const expectedTest3Path = "./tests/expectedSaves/test3.json";
    const expectedTest4Path = "./tests/expectedSaves/test4.json";
    const expectedTest5Path = "./tests/expectedSaves/test5.json";
    

    it("save file is created on save", () => {
        if (fs.existsSync(savePath))
            fs.unlinkSync(savePath)

        playerData.saveData();

        expect(fs.existsSync(savePath)).toBe(true);
    });

    it("player data is cleared", () => {
        playerData.clearGameRecords();

        playerData.saveData();

        expect(readSave(savePath))
            .toMatchObject(readSave(expectedTest1Path));
    });

    it("game result is added to player data", () => {
        playerData.addGameResult("N-Back", 2, gameResult);

        playerData.saveData();

        expect(readSave(savePath))
            .toMatchObject(readSave(expectedTest2Path));
        
    });

    it("same game result added", () => {
        playerData.addGameResult("N-Back", 2, gameResult);

        playerData.saveData();

        expect(readSave(savePath))
            .toMatchObject(readSave(expectedTest3Path));
        
    });

    it("different difficulty result added", () => {
        playerData.addGameResult("N-Back", 3, gameResult);

        playerData.saveData();

        expect(readSave(savePath))
            .toMatchObject(readSave(expectedTest4Path));
        
    });

    it("different game name result added", () => {
        playerData.addGameResult("Letters Memory", 2, gameResult);

        playerData.saveData();

        expect(readSave(savePath))
            .toMatchObject(readSave(expectedTest5Path));
        
    });

    it("printing results", () => {
        playerData.printGameResults("N-Back");
    });
});