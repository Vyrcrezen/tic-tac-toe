import { AppDispatch } from "../../../../../global/redux/store";
import GameInput from "../../../types/GameInput";
import GameResources from "../../../types/GameResources";
import GameState from "../../../types/GameState";

const runGameplayLoopThunk =
({gameState, gameResources, gameInput}: { gameState: GameState, gameResources: GameResources, gameInput: GameInput }) => async (dispatch: AppDispatch) => {

};

export default runGameplayLoopThunk;