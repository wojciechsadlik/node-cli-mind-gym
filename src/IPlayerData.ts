interface IGameResult {
    time: number;
    accuracy: number;
}

interface IGameRecords {
    gameName: string;
    gameResults: {[difficulty: number]: IGameResult[]};
}

interface IPlayerData {
    gameRecords: IGameRecords[];
}

export {IPlayerData, IGameRecords, IGameResult};