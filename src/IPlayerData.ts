interface IGameResult {
    time: number;
    accuracy: number;
}

type DifficultyResults = Record<number, IGameResult[]>;

interface IPlayerData {
    gameRecords: Record<string, DifficultyResults>;
}

export {IPlayerData, DifficultyResults, IGameResult};