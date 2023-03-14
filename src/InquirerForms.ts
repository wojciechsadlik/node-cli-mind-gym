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

    static async getInt(msg?: string, def?: number): Promise<number> {
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

    static async charMemoryGetDifficulty(): Promise<number> {
        return await this.getInt("Choose difficulty (1 or greater)", 1);
    }

    static async nBackGetDifficulty(min: number, max: number): Promise<number> {
        return await InquirerForms.getInt(`Choose difficulty [${min}, ${max}]`, min);
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

    static async confirm(msg: string): Promise<boolean> {
        const answer = await inquirer.prompt({
            name: "confirmed",
            type: "confirm",
            message: msg
        });

        return answer.confirmed;
    }
}

export default InquirerForms;