import GameResources from "../../types/GameResources";
import GameState from "../../types/GameState";
import GameInput from "../../types/GameInput";

export default interface TicTacToeStore {
    gameState: GameState;
    gameResources: GameResources;
    gameInput: GameInput;
}
