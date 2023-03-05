import IGame from "./IGame.js";
import InquirerForms from "./InquirerForms.js";
import { getRandomIntArrBetween, SMALL_A_UNICODE, SMALL_Z_UNICODE, timer, pressKeyToContinue } from "./utils.js";

class LettersMemoryGame implements IGame {
    get getName(): string {
        return "Letters Memory";
    }

    async Play() {
        let difficulty = await InquirerForms.lettersMemoDifficulty();
        let task = this.generateTask(difficulty);

        console.log("Press any key to continue...");
        for (let i = 0; i < task.length; i++) {
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
            process.stdout.write(` ${i+1}: ${task[i]} `);

            await pressKeyToContinue();
        }

        process.stdout.cursorTo(0);
        console.log(task);
    }

    private generateTask(length: number): string {
        const randomStr = String.fromCharCode(
            ...getRandomIntArrBetween(SMALL_A_UNICODE,
                SMALL_Z_UNICODE + 1,
                length));

        return randomStr;
    }
}

export default LettersMemoryGame;