import IGame from "./IGame.js";
import InquirerForms from "./InquirerForms.js";
import { getRandomIntArrBetween, SMALL_A_UNICODE, SMALL_Z_UNICODE, pressKeyToContinue } from "./utils.js";
import chalk from "chalk";

class LettersMemoryGame implements IGame {
    get getName(): string {
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

        this.showResult(task, answer, endTime - startTime);
    }

    private async getDifficulty(): Promise<number> {
        let difficulty: number = await InquirerForms.getNumberDifficulty();

        while (difficulty < 1) {
            console.log("Difficulty has to be greater than 0");
            difficulty = await InquirerForms.getNumberDifficulty();
        }

        return difficulty;
    }

    private generateTask(length: number): string {
        const randomStr = String.fromCharCode(
            ...getRandomIntArrBetween(SMALL_A_UNICODE,
                SMALL_Z_UNICODE + 1,
                length));

        return randomStr;
    }

    private async showLetters(task: string): Promise<void> {
        console.log(`You'll see ${task.length} letters one by one, press any key to continue`);
        for (let i = 0; i < task.length; i++) {
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
            process.stdout.write(` ${i+1}: ${task[i]} `);

            await pressKeyToContinue();
        }
    }

    private async getAnswer(): Promise<string> {
        return await InquirerForms.getStringAnswer();
    }

    private showResult(task: string, answer: string, elapsedTime: number): void {
        let taskFormatted = "";
        let answerFormatted = "";
        let correct = 0;
        for (let i = 0; i < task.length; i++) {
            let [t, a] = [task[i], answer[i]];
            if (a && t === a) {
                taskFormatted += t;
                answerFormatted += a;
                correct++;
            }
            else {
                taskFormatted += chalk.green(t);
                answerFormatted += a ? chalk.red(a) : chalk.red("_");
            }

            taskFormatted += " ";
            answerFormatted += " ";
        }
        let accuracy = correct / task.length;

        console.log(`Task:   ${taskFormatted}`);
        console.log(`Answer: ${answerFormatted}`);
        console.log(`Accuracy: ${Math.round(accuracy * 100)}%`);
        console.log(`Time: ${(elapsedTime/1000).toFixed(1)}s`);
    }
}

export default LettersMemoryGame;