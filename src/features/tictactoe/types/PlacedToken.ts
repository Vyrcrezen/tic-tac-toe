import Coordinate from "./Coordinate";
import TokenType from "./TokenType";

export default interface PlacedToken {
    type: TokenType;
    position: Coordinate;
}
