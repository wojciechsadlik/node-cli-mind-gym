import inquirer from 'inquirer';

let playerName = "";

async function askName() {
    const answer = await inquirer.prompt({
        name: "player_name",
        type: "input",
        message: "What is your name?",
        default() {
            return "Player";
        }
    });

    playerName = answer.player_name;
}

await askName();
console.log(`Hi ${playerName}!`);