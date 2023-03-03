import inquirer from "inquirer";
import Player from "./Player.js";
import InquirerForms from "./InquirerForms.js";
import GameManager from "./GameManager.js";

const gameManager = GameManager.getInstance();
gameManager.Init();