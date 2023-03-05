import InquirerForms from "./InquirerForms.js";
import { getRandomIntArrBetween, SMALL_A_UNICODE, SMALL_Z_UNICODE, timer } from "./utils.js";
class CharMemoryGame {
    get getName() {
        return "Character Memory";
    }
    async Play() {
        let difficulty = await InquirerForms.charMemoDifficulty();
        let task = this.generateTask(difficulty);
        for (let char of task) {
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
            process.stdout.write(char);
            await timer(1000);
        }
        process.stdout.cursorTo(0);
        console.log(task);
    }
    generateTask(length) {
        const randomStr = String.fromCharCode(...getRandomIntArrBetween(SMALL_A_UNICODE, SMALL_Z_UNICODE + 1, length));
        return randomStr;
    }
}
export default CharMemoryGame;
