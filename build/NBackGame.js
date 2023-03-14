import InquirerForms from "./InquirerForms.js";
class NBackGame {
    constructor() {
        this.MIN_DIFFICULTY = 1;
        this.MAX_DIFFICULTY = 10;
        this.NUMBER_OF_QUESTIONS = 20;
    }
    get getName() {
        return "N-Back";
    }
    async Play() {
        const difficulty = await this.getDifficulty();
        console.log(difficulty);
        throw new Error("Method not implemented.");
    }
    async getDifficulty() {
        let difficulty = await InquirerForms.nBackGetDifficulty(this.MIN_DIFFICULTY, this.MAX_DIFFICULTY);
        while (difficulty < this.MIN_DIFFICULTY || difficulty > this.MAX_DIFFICULTY) {
            console.log(`Difficulty has to be in range [${this.MIN_DIFFICULTY}, ${this.MAX_DIFFICULTY}]`);
            difficulty = await InquirerForms.nBackGetDifficulty(this.MIN_DIFFICULTY, this.MAX_DIFFICULTY);
        }
        return difficulty;
    }
}
export default NBackGame;
