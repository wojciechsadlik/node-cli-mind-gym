import InquirerForms from "./InquirerForms.js";
import { getRandomIntBetween, nBackConfirmation } from "./utils.js";
class NBackGame {
    constructor() {
        this.MIN_DIFFICULTY = 1;
        this.MAX_DIFFICULTY = 10;
        this.NUMBER_OF_QUESTIONS = 5;
        this.QUESTION_MIN = 10;
        this.QUESTION_MAX = 50;
        this.N_BACK_PROBABILITY = 0.4;
    }
    get getName() {
        return "N-Back";
    }
    async Play() {
        const difficulty = await this.getDifficulty();
        const tasks = this.generateTask(difficulty);
        const correctAnswers = await this.giveTasks(tasks, difficulty);
        console.log(correctAnswers);
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
    generateTask(difficulty) {
        const tasks = [];
        for (let i = 1; i <= this.NUMBER_OF_QUESTIONS; i++) {
            if (i > difficulty && Math.random() < this.N_BACK_PROBABILITY) {
                const task = {
                    question: tasks[i - difficulty - 1].question,
                    answer: true
                };
                tasks.push(task);
            }
            else {
                const task = {
                    question: getRandomIntBetween(this.QUESTION_MIN, this.QUESTION_MAX),
                    answer: false
                };
                if (i > difficulty
                    && task.question === tasks[i - difficulty - 1].question) {
                    task.answer = true;
                }
                tasks.push(task);
            }
        }
        return tasks;
    }
    async giveTasks(tasks, difficulty) {
        let correctAnswers = 0;
        console.log(`You'll see ${this.NUMBER_OF_QUESTIONS} numbers, press 'y' if a number is the same as ${difficulty} back or 'n' otherwise`);
        for (let task of tasks) {
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
            process.stdout.write(` ${task.question} `);
            const answer = await nBackConfirmation();
            if (answer === task.answer)
                correctAnswers++;
        }
        return correctAnswers;
    }
}
export default NBackGame;
