import inquirer from "inquirer";
import IGame from "./IGame.js";

abstract class InquirerForms {
    static async getName(): Promise<string> {
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

    static async choseGame(games: IGame[]): Promise<string> {
        const answer = await inquirer.prompt({
            name: "chose_game",
            type: "list",
            message: "Pick a game",
            choices: Array.from(games, game => game.getName).concat(["Exit"])
        });
        
        return answer.chose_game;
    }

    static async charMemoDifficulty(): Promise<number> {
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