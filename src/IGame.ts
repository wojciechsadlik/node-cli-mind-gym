import { IGameResult } from "./ISaveStructure.js";

interface IGame {
    get getName(): string;
    Play(): Promise<IGameResult>;
}

export default IGame;