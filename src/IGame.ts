import { IGameResultDifficulty } from "./IPlayerData.js";

interface IGame {
    get getName(): string;
    Play(): Promise<IGameResultDifficulty>;
}

export default IGame;