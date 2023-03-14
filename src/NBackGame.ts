import IGame from "./IGame.js";
import InquirerForms from "./InquirerForms.js";
import { IGameResult } from "./IPlayerData.js";

class NBackGame implements IGame {
    private readonly MIN_DIFFICULTY = 1;
    private readonly MAX_DIFFICULTY = 10;
    private readonly NUMBER_OF_QUESTIONS = 20;

    get getName(): string {
        return "N-Back";
    }

    async Play(): Promise<IGameResult> {
        const difficulty = await this.getDifficulty();

        console.log(difficulty);
        throw new Error("Method not implemented.");
    }

    private async getDifficulty(): Promise<number> {
        let difficulty: number = await InquirerForms.nBackGetDifficulty(
            this.MIN_DIFFICULTY, this.MAX_DIFFICULTY);

        while (difficulty < this.MIN_DIFFICULTY || difficulty > this.MAX_DIFFICULTY) {
            console.log(
                `Difficulty has to be in range [${this.MIN_DIFFICULTY}, ${this.MAX_DIFFICULTY}]`);
                
            difficulty = await InquirerForms.nBackGetDifficulty(
                this.MIN_DIFFICULTY, this.MAX_DIFFICULTY);
        }

        return difficulty;
    }
}

export default NBackGame;