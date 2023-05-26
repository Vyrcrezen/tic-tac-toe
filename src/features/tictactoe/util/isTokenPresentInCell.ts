import Coordinate from "../types/Coordinate";
import PlacedToken from "../types/PlacedToken";

export default function isTokenPresentInCell(position: Coordinate, tokens: PlacedToken[]) {
    return tokens.some(token => token.position.x === position.x && token.position.y === position.y);
}
