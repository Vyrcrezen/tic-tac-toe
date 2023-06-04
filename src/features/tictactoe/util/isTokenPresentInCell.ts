import Coordinate from "../types/Coordinate";
import PlacedToken from "../types/PlacedToken";

/**
 * 
 * @param position the coordinate to check
 * @param tokens list of tokens
 * @returns boolean value indicating if a token is already present in the position
 */
export default function isTokenPresentInCell(position: Coordinate, tokens: PlacedToken[]) {
    return tokens.some(token => token.position.x === position.x && token.position.y === position.y);
}
