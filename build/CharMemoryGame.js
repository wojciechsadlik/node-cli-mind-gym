import InquirerForms from "./InquirerForms.js";
import { getRandomIntArrBetween, SMALL_A_UNICODE, SMALL_Z_UNICODE, pressKeyToContinue } from "./utils.js";
import chalk from "chalk";
class LettersMemoryGame {
    get getName() {
        return "Letters Memory";
    }
    async Play() {
        const difficulty = await this.getDifficulty();
        const task = this.generateTask(difficulty);
        const startTime = Date.now();
        await this.showLetters(task);
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        let answer = await this.getAnswer();
        const endTime = Date.now();
        answer = answer.replace(/\s+/g, "");
        const result = this.calculateResult(task, answer, endTime - startTime);
        this.showResult(task, answer, result);
        return result;
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
    calculateResult(task, answer, elapsedTime) {
        const checkLength = Math.min(task.length, answer.length);
        let correct = 0;
        for (let i = 0; i < checkLength; i++) {
            if (task[i] === answer[i]) {
                correct++;
            }
        }
        const accuracy = (correct / task.length) * 100;
        const elapsedTimeS = elapsedTime / 1000;
        return { accuracy: accuracy, time: elapsedTimeS };
    }
    showResult(task, answer, result) {
        let taskFormatted = "";
        let answerFormatted = "";
        for (let i = 0; i < task.length; i++) {
            let [t, a] = [task[i], answer[i]];
            if (a && t === a) {
                taskFormatted += t;
                answerFormatted += a;
            }
            else {
                taskFormatted += chalk.green(t);
                answerFormatted += a ? chalk.red(a) : chalk.red("_");
            }
            taskFormatted += " ";
            answerFormatted += " ";
        }
        console.log(`Task:   ${taskFormatted}`);
        console.log(`Answer: ${answerFormatted}`);
        console.log(`Accuracy: ${result.accuracy.toFixed(1)}%`);
        console.log(`Time: ${result.time.toFixed(1)}s`);
    }
}
export default LettersMemoryGame;
