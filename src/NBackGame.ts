import IGame from "./IGame.js";
import InquirerForms from "./InquirerForms.js";
import { IGameResult } from "./IPlayerData.js";
import { getRandomIntBetween } from "./utils.js";

interface ITask {
    questions: number[],
    answers: boolean[]
}

class NBackGame implements IGame {
    private readonly MIN_DIFFICULTY = 1;
    private readonly MAX_DIFFICULTY = 10;
    private readonly NUMBER_OF_QUESTIONS = 20;
    private readonly QUESTION_MIN = 10;
    private readonly QUESTION_MAX = 50;
    private readonly N_BACK_PROBABILITY = 0.4;

    get getName(): string {
        return "N-Back";
    }

    async Play(): Promise<IGameResult> {
        const difficulty = await this.getDifficulty();

        const task = this.generateTask(difficulty);
        console.log(task);

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

    private generateTask(difficulty: number): ITask {
        const task: number[] = [];
        const answers: boolean[] = [];

        for (let i = 1; i <= this.NUMBER_OF_QUESTIONS; i++) {
            if (i > difficulty && Math.random() < this.N_BACK_PROBABILITY) {
                task.push(task[i - difficulty - 1]);
                answers.push(true);
            }
            else {
                task.push(getRandomIntBetween(this.QUESTION_MIN, this.QUESTION_MAX));
                if (i > difficulty) answers.push(task[i-1] === task[i-difficulty-1]);
                else answers.push(false);
            }
        }

        return {questions: task, answers: answers};
    }
}

export default NBackGame;