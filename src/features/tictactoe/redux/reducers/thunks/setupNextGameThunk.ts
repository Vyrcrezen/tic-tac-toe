import { AppDispatch } from "../../../../../global/redux/store";
import GameResources from "../../../types/GameResources";
import GameState from "../../../types/GameState";
import { resetGameState, setIsAdvancingPostGameState, setNeedsToRunAgain, setPlayerActionsList } from "../slices/gameStateSlice";

/**
 * Whenever this thunk is called, it checks the current state of the game and might update it to move the game forward
 * @param param0 takes the redux store slices
 * @returns 
 */
const setupNextGameThunk =
({gameState, gameResources}: { gameState: GameState, gameResources: GameResources }) => async (dispatch: AppDispatch) => {
    
    // This vairable helps making sure that only one instance of this thunk runs at any time
    dispatch(setIsAdvancingPostGameState(true));
    // Some tasks might set this value to true to trigger a re-run of the game state updater
    // If this is true, the task successfully triggered a re-run
    dispatch(setNeedsToRunAgain(false));

    // This state should be true after a user selected what should happen next
    if (gameState.postGameTasks.isNextStateSelected) {

        // The game state is reset in a way that the current initialization values are persisted
        if (gameState.postGameOptions.nextState === 'CONTINUE') {
            dispatch(resetGameState({
                initializationData: {
                    isInitialized: gameState.isInitialized,
                    isConfigFinished: gameState.initializationTasks.isConfigFinished,
                    isPlayerActionsListGenerated: gameState.initializationTasks.isPlayerActionsListGenerated,
                    playerActionsList: gameState.inGameResource.playerActionsList
                }
            }));
        }
        // The game state is reset to default values, which will leave the game state at a point where the users need to configure the game settings
        else if (gameState.postGameOptions.nextState === 'END') {
            dispatch(resetGameState({}));
        }
    }

    dispatch(setIsAdvancingPostGameState(false));
};

export default setupNextGameThunk;