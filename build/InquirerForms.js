import inquirer from "inquirer";
class InquirerForms {
    static async getName() {
        const answer = await inquirer.prompt({
            name: "player_name",
            type: "input",
            message: "What is your name?",
            default() {
                return "Player";
            }
        });
        console.log(`Hi ${answer.player_name}!`);
        return answer.player_name;
    }
    static async mainMenu(games) {
        const answer = await inquirer.prompt({
            name: "chosen_option",
            type: "list",
            message: "Pick a game",
            choices: Array.from(games, game => game.getName)
                .concat([this.DISPLAY_STATS])
                .concat([this.EXIT])
        });
        return answer.chosen_option;
    }
    static async getNumberDifficulty() {
        const answer = await inquirer.prompt({
            name: "difficulty",
            type: "number",
            message: "Enter difficulty (> 0)",
            default() {
                return 1;
            }
        });
        return Math.floor(answer.difficulty);
    }
    static async getStringAnswer() {
        const answer = await inquirer.prompt({
            name: "answer",
            type: "input",
            message: "Enter letters"
        });
        return answer.answer;
    }
}
InquirerForms.EXIT = "Exit";
InquirerForms.DISPLAY_STATS = "Display stats";
export default InquirerForms;
