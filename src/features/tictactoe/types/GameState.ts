
export default interface GameState {
    isInitialized: boolean;
    isBeingInitialized: boolean;
    initializationTasks: {
        isConfigFinished: boolean,
        isPlayerActionTrackerGenerated: boolean
    };

    isRunning: boolean;
    isGameOver: boolean;
    inGameTasks: {
        playerActions:
            {
                name: string,
                didMove: boolean,
                winConditionChecked: boolean
            }[]
    }


    isAdvancingPostGameState: boolean;
    isPostGameStateFinished: boolean;
    postGameTasks: {
        isNextGameSelected: boolean
    }

}
