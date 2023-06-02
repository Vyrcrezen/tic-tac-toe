import { AppDispatch } from "../../../../../global/redux/store";
import GameResources from "../../../types/GameResources";
import GameState from "../../../types/GameState";
import { resetGameState, setIsAdvancingPostGameState, setNeedsToRunAgain, setPlayerActionsList } from "../slices/gameStateSlice";

const setupNextGameThunk =
({gameState, gameResources}: { gameState: GameState, gameResources: GameResources }) => async (dispatch: AppDispatch) => {
    
    dispatch(setIsAdvancingPostGameState(true));
    dispatch(setNeedsToRunAgain(false));

    if (gameState.postGameTasks.isNextStateSelected) {

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
        else if (gameState.postGameOptions.nextState === 'END') {
            dispatch(resetGameState({}));
        }
    }

    dispatch(setIsAdvancingPostGameState(false));
};

export default setupNextGameThunk;