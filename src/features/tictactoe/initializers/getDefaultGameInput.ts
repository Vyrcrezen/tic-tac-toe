import _ from "lodash";
import GameInput from "../types/GameInput";

export default function getDefaultGameInput() {
    const defaultGameInput: GameInput = {
        boardRows: 10,
        boardColumns: 10,
        players: [],
        numAdjacentTokensToWin: 5,
    };

    return _.cloneDeep(defaultGameInput);
}
