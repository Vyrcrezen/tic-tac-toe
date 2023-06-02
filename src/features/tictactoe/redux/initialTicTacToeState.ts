import getDefaultGameInput from "../initializers/getDefaultGameInput";
import getDefaultGameResources from "../initializers/getDefaultGameResources";
import getDefaultGameState from "../initializers/getDefaultGameState";
import TicTacToeStore from "./types/TicTacToeStore";

const initialTicTacToeState: TicTacToeStore = {
    gameResources: getDefaultGameResources(),

    gameState: getDefaultGameState(),

    gameInput: getDefaultGameInput(),
}

export default initialTicTacToeState;
