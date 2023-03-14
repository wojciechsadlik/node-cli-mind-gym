import { IGameResult } from "./IPlayerData.js";

interface IGame {
    get getName(): string;
    Play(): Promise<IGameResult>;
}

export default IGame;