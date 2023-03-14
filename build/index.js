import GameManager from "./GameManager.js";
const gameManager = GameManager.getInstance();
await gameManager.Start();
process.exit(0);
