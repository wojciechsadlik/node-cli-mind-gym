import GameManager from "./GameManager.js";

const gameManager = GameManager.getInstance();
await gameManager.Start();

console.log("Bye!");
process.exit(0);