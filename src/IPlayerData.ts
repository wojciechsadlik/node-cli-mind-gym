interface IGameResult {
    time: number;
    accuracy: number;
    difficulty: number;
}

interface IGameRecords {
    gameName: string;
    gameResults: IGameResult[];
}

interface IPlayerData {
    gameRecords: IGameRecords[];
}

export {IPlayerData, IGameRecords, IGameResult};