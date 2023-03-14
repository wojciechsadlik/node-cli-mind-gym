import inquirer from "inquirer";
import IGame from "./IGame.js";

abstract class InquirerForms {
    static readonly EXIT = "Exit";
    static readonly DISPLAY_STATS = "Display stats";
    static readonly CLEAR_STATS = "Clear stats";
    static readonly BACK = "Back";

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

    static async mainMenu(games: IGame[]): Promise<string> {
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

    static async getNumberDifficulty(): Promise<number> {
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

    static async getStringAnswer(): Promise<string> {
        const answer = await inquirer.prompt({
            name: "answer",
            type: "input",
            message: "Enter letters"
        });
    
        return answer.answer;
    }

    static async pickGameName(gameNames: string[]): Promise<string> {
        const answer = await inquirer.prompt({
            name: "game_name",
            type: "list",
            message: "Which game?",
            choices: gameNames.concat(this.BACK)
        });

        return answer.game_name;
    }

    static async confirmClearRecords(): Promise<boolean> {
        const answer = await inquirer.prompt({
            name: "confirmed",
            type: "confirm",
            message: "Do you want to clear your data?"
        });

        return answer.confirmed;
    }
}

export default InquirerForms;