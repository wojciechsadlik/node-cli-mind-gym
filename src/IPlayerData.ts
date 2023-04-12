interface IGameResult {
    time: number;
    accuracy: number;
}

interface IGameResultDifficulty extends IGameResult {
    difficulty: number;
}

type DifficultyResults = Record<number, IGameResult[]>;

interface IPlayerData {
    gameRecords: Record<string, DifficultyResults>;
}

export {IPlayerData, DifficultyResults, IGameResult, IGameResultDifficulty};