import InquirerForms from "./InquirerForms.js";
import { getRandomIntArrBetween, SMALL_A_UNICODE, SMALL_Z_UNICODE } from "./utils.js";
class CharMemoryGame {
    get getName() {
        return "Character Memory";
    }
    async Play() {
        let difficulty = await InquirerForms.charMemoDifficulty();
        let task = this.generateTask(difficulty);
        console.log(task);
    }
    generateTask(length) {
        const randomStr = String.fromCharCode(...getRandomIntArrBetween(SMALL_A_UNICODE, SMALL_Z_UNICODE + 1, length));
        return randomStr;
    }
}
export default CharMemoryGame;
