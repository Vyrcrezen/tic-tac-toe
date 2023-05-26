import TicTacToeStore from "./types/TicTacToeStore";

const initialTicTacToeState: TicTacToeStore = {
    gameResources: {
        tokens: [],
        boardDimensions: {
            canvasHeight: 100,
            canvasWidht: 100,
            cellSize: 10,
        }
    },

    gameState: {
        isInitialized: false,
        isBeingInitialized: false,
        initializationTasks: {
            isConfigFinished: false,
            isPlayerActionTrackerGenerated: false
        },
    
        isRunning: false,
        isGameOver: false,
        inGameTasks: {
            playerActions: []
        },
    
        isAdvancingPostGameState: false,
        isPostGameStateFinished: false,
        postGameTasks: {
            isNextGameSelected: false
        }
    },

    gameInput: {
        boardRows: 10,
        boardColumns: 10,
        players: []
    }
}

export default initialTicTacToeState;
