import BoardDimensions from "./BoardDimensions";
import PlacedToken from "./PlacedToken";

export default interface GameResources {
    tokens: PlacedToken[];
    boardDimensions: BoardDimensions;
}
