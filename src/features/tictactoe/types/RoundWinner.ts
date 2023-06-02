import Coordinate from "./Coordinate";
import TokenType from "./TokenType";

export default interface RoundWinner {
    name: string,
    tokenType: TokenType,
    winningCoordinates: Coordinate[],
    score: number
}
