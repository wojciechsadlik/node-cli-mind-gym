import InquirerForms from "./InquirerForms.js";
import { getRandomIntBetween, nBackConfirmation } from "./utils.js";
class NBackGame {
    constructor() {
        this.MIN_DIFFICULTY = 1;
        this.MAX_DIFFICULTY = 10;
        this.NUMBER_OF_QUESTIONS = 20;
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
        const startTime = Date.now();
        const correctAnswers = await this.giveTasks(tasks, difficulty);
        const elapsedTime = (Date.now() - startTime) / 1000;
        const accuracy = (correctAnswers / this.NUMBER_OF_QUESTIONS) * 100;
        console.log(`Accuracy: ${accuracy.toFixed(1)}%`);
        console.log(`Time: ${elapsedTime.toFixed(1)}s`);
        return {
            accuracy: accuracy,
            time: elapsedTime,
            difficulty: difficulty
        };
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
        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);
            process.stdout.write(` ${i + 1}: ${task.question} `);
            const answer = await nBackConfirmation();
            if (answer === task.answer)
                correctAnswers++;
        }
        process.stdout.write('\n');
        return correctAnswers;
    }
}
export default NBackGame;
