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
    static async choseGame(games) {
        const answer = await inquirer.prompt({
            name: "chose_game",
            type: "list",
            message: "Pick a game",
            choices: Array.from(games, game => game.getName).concat(["Exit"])
        });
        return answer.chose_game;
    }
    static async charMemoDifficulty() {
        const answer = await inquirer.prompt({
            name: "difficulty",
            type: "number",
            message: "Enter difficulty",
            default() {
                return 0;
            }
        });
        return answer.difficulty;
    }
}
export default InquirerForms;
