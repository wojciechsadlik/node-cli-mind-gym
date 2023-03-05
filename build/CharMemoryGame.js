import InquirerForms from "./InquirerForms.js";
import { getRandomIntArrBetween, SMALL_A_UNICODE, SMALL_Z_UNICODE, pressKeyToContinue } from "./utils.js";
class LettersMemoryGame {
    get getName() {
        return "Letters Memory";
    }
    async Play() {
        const difficulty = await this.getDifficulty();
        const task = this.generateTask(difficulty);
        await this.showLetters(task);
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        const answer = await this.getAnswer();
        console.log(`Task:   ${task}`);
        console.log(`Answer: ${answer}`);
    }
    async getDifficulty() {
        let difficulty = await InquirerForms.getNumberDifficulty();
        while (difficulty < 1) {
            console.log("Difficulty has to be greater than 0");
            difficulty = await InquirerForms.getNumberDifficulty();
        }
        return difficulty;
    }
    generateTask(length) {
        const randomStr = String.fromCharCode(...getRandomIntArrBetween(SMALL_A_UNICODE, SMALL_Z_UNICODE + 1, length));
        return randomStr;
    }
    async showLetters(task) {
        console.log(`You'll see ${task.length} letters one by one, press any key to continue`);
        for (let i = 0; i < task.length; i++) {
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
            process.stdout.write(` ${i + 1}: ${task[i]} `);
            await pressKeyToContinue();
        }
    }
    async getAnswer() {
        return await InquirerForms.getStringAnswer();
    }
}
export default LettersMemoryGame;
