import _ from "lodash";
import GameResources from "../types/GameResources";

export default function getDefaultGameResources() {
    const defaultGameResources: GameResources = {
        boardDimensions: {
            canvasHeight: 100,
            canvasWidht: 100,
            cellSize: 10,
        }
    };

    return _.cloneDeep(defaultGameResources);
}
