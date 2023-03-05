import IGame from "./IGame.js";
import { getRandomIntArrBetween, SMALL_A_UNICODE, SMALL_Z_UNICODE } from "./utils.js";

class CharMemoryGame implements IGame {
    get getName(): string {
        return "Character Memory";
    }

    Play() {
        console.log(this.generateTask(30));
    }


    private generateTask(length: number): string {
        const randomStr = String.fromCharCode(
            ...getRandomIntArrBetween(SMALL_A_UNICODE,
                SMALL_Z_UNICODE + 1,
                length));

        return randomStr;
    }
}

export default CharMemoryGame;