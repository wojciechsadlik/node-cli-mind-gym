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
            choices: Array.from(games, game => game.getName)
        });
        return answer.chose_game;
    }
}
export default InquirerForms;
