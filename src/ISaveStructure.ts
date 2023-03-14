interface IGameResult {
    time: number;
    accuracy: number;
    difficulty: number;
}

interface IGameRecords {
    gameName: string;
    gameResults: IGameResult[];
}

interface ISaveStructure {
    gameRecords: IGameRecords[];
}

export {ISaveStructure, IGameRecords, IGameResult};