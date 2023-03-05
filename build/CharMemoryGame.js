import { getRandomIntArrBetween, SMALL_A_UNICODE, SMALL_Z_UNICODE } from "./utils.js";
class CharMemoryGame {
    get getName() {
        return "Character Memory";
    }
    Play() {
        console.log(this.generateTask(30));
    }
    generateTask(length) {
        const randomStr = String.fromCharCode(...getRandomIntArrBetween(SMALL_A_UNICODE, SMALL_Z_UNICODE + 1, length));
        return randomStr;
    }
}
export default CharMemoryGame;
