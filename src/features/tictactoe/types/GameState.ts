import NextState from "./NextState";
import PlacedToken from "./PlacedToken";
import PlayerActions from "./PlayerActions";
import RoundWinner from "./RoundWinner";

export default interface GameState {
    needsToRunAgain: boolean;

    roundWinner: RoundWinner;

    isInitialized: boolean;
    isBeingInitialized: boolean;
    initializationTasks: {
        isConfigFinished: boolean,
        isPlayerActionsListGenerated: boolean
    };

    isRunning: boolean;
    isGameOver: boolean;
    inGameTasks: {
        didCurrentPlayerMove: boolean,
    }
    inGameResource: {
        playerActionsList: PlayerActions[],
        tokens: PlacedToken[];
    }


    isAdvancingPostGameState: boolean;
    isPostGameStateFinished: boolean;
    postGameOptions: {
        nextState?: NextState,
    }
    postGameTasks: {
        isNextStateSelected: boolean
    }

}
