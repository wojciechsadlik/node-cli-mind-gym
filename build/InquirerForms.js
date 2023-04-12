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
            message: "Pick an option",
            choices: Array.from(games, game => game.getName)
                .concat([
                this.DISPLAY_STATS,
                this.CLEAR_STATS,
                this.EXIT
            ])
        });
        return answer.chosen_option;
    }
    static async getInt(msg, def) {
        const answer = await inquirer.prompt({
            name: "answer",
            type: "number",
            message: msg ? msg : "Enter a number",
            default() {
                return def ? def : 0;
            }
        });
        return Math.floor(answer.answer);
    }
    static async charMemoryGetDifficulty() {
        return await this.getInt("Choose difficulty (1 or greater)", 1);
    }
    static async nBackGetDifficulty(min, max) {
        return await InquirerForms.getInt(`Choose difficulty [${min}, ${max}]`, min);
    }
    static async getStringAnswer() {
        const answer = await inquirer.prompt({
            name: "answer",
            type: "input",
            message: "Enter letters"
        });
        return answer.answer;
    }
    static async pickGameName(gameNames) {
        const answer = await inquirer.prompt({
            name: "game_name",
            type: "list",
            message: "Which game?",
            choices: gameNames.concat(this.BACK)
        });
        return answer.game_name;
    }
    static async pickGameDifficulty(difficulties, all) {
        const answer = await inquirer.prompt({
            name: "game_difficulty",
            type: "list",
            message: "Which difficulty?",
            choices: difficulties.concat(all ? this.ALL : [])
                .concat(this.BACK)
        });
        return answer.game_difficulty;
    }
    static async confirm(msg) {
        const answer = await inquirer.prompt({
            name: "confirmed",
            type: "confirm",
            message: msg
        });
        return answer.confirmed;
    }
}
InquirerForms.EXIT = "Exit";
InquirerForms.DISPLAY_STATS = "Display stats";
InquirerForms.CLEAR_STATS = "Clear stats";
InquirerForms.BACK = "Back";
InquirerForms.ALL = "All";
export default InquirerForms;
