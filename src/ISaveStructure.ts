interface IGameData {
    time: number;
    accuracy: number;
}

interface IGameRecords {
    gameName: string;
    gameData: IGameData[];
}

interface ISaveStructure {
    gameRecords: IGameRecords[];
}

export {ISaveStructure, IGameRecords, IGameData};