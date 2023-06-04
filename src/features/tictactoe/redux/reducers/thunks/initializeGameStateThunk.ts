import { AppDispatch } from "../../../../../global/redux/store";
import generateDefaultPlayerActionsList from "../../../initializers/generateDefaultPlayerActionsList";
import GameInput from "../../../types/GameInput";
import GameResources from "../../../types/GameResources";
import GameState from "../../../types/GameState";
import { setIsBeingInitialized, setIsInitialized, setIsPlayerActionsListGenerated, setNeedsToRunAgain, setPlayerActionsList } from "../slices/gameStateSlice";

/**
 * Whenever this thunk is called, it checks the current state of the game and might update it to move the game forward
 * @param param0 takes the redux store slices
 * @returns 
 */
const initializeGameStateThunk =
({gameState, gameResources, gameInput}: { gameState: GameState, gameResources: GameResources, gameInput: GameInput }) => async (dispatch: AppDispatch) => {

    // This vairable helps making sure that only one instance of this thunk runs at any time
    dispatch(setIsBeingInitialized(true));
    // Some tasks might set this value to true to trigger a re-run of the game state updater
    // If this is true, the task successfully triggered a re-run
    dispatch(setNeedsToRunAgain(false));

    // If the players chose their game settings, but an internal state wasn't generated for it yet
    if (gameState.initializationTasks.isConfigFinished && !gameState.initializationTasks.isPlayerActionsListGenerated) {
        // This will keep track of player stats and placed tokens
        dispatch(setPlayerActionsList( generateDefaultPlayerActionsList(gameInput.players) ));
        dispatch(setIsPlayerActionsListGenerated(true));
        // Trigger another run of the game state updater, which should set the `isInitialized` state to true, letting the gameplay thunk take over
        dispatch(setNeedsToRunAgain(true));
    }
    // If the internal states are generated
    else if (gameState.initializationTasks.isPlayerActionsListGenerated) {
        // The initialization phase is over
        dispatch(setIsInitialized(true));
    }

    dispatch(setIsBeingInitialized(false));
};

export default initializeGameStateThunk;