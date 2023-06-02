import { AppDispatch } from "../../../../../global/redux/store";
import generateDefaultPlayerActionsList from "../../../initializers/generateDefaultPlayerActionsList";
import GameInput from "../../../types/GameInput";
import GameResources from "../../../types/GameResources";
import GameState from "../../../types/GameState";
import PlayerActions from "../../../types/PlayerActions";
import PlayerInfo from "../../../types/PlayerInfo";
import { setIsBeingInitialized, setIsInitialized, setIsPlayerActionsListGenerated, setNeedsToRunAgain, setPlayerActionsList } from "../slices/gameStateSlice";

const initializeGameStateThunk =
({gameState, gameResources, gameInput}: { gameState: GameState, gameResources: GameResources, gameInput: GameInput }) => async (dispatch: AppDispatch) => {

    dispatch(setIsBeingInitialized(true));
    dispatch(setNeedsToRunAgain(false));

    if (gameState.initializationTasks.isConfigFinished && !gameState.initializationTasks.isPlayerActionsListGenerated) {
        dispatch(setPlayerActionsList( generateDefaultPlayerActionsList(gameInput.players) ));
        dispatch(setIsPlayerActionsListGenerated(true));
        dispatch(setNeedsToRunAgain(true));
    }
    else if (gameState.initializationTasks.isPlayerActionsListGenerated) {
        dispatch(setIsInitialized(true));
    }

    dispatch(setIsBeingInitialized(false));
};

export default initializeGameStateThunk;