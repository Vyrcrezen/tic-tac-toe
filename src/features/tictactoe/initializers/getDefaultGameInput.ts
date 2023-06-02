import _ from "lodash";
import GameInput from "../types/GameInput";

export default function getDefaultGameInput() {
    const defaultGameInput: GameInput = {
        boardRows: 10,
        boardColumns: 10,
        players: [
            {
                name: "Player-1",
                roundWins: 0,
                tokenType: 'ring',
                turnOrder: 0
            },
            {
                name: "Player-2",
                roundWins: 0,
                tokenType: 'x',
                turnOrder: 1
            }
        ],
        numAdjacentTokensToWin: 5,
    };

    return _.cloneDeep(defaultGameInput);
}
