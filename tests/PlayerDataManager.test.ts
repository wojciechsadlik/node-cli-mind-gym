import * as fs from "fs";
import PlayerDataManager from "../src/PlayerDataManager";

describe('PlayerDataManager', () => {
    const playerData = new PlayerDataManager("test");
    const savePath = "./saves/test.json";

    it("save file is created on save", () => {
        if (fs.existsSync(savePath))
            fs.unlinkSync(savePath)

        playerData.saveData();

        expect(fs.existsSync(savePath)).toBe(true);
    });
});