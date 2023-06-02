import TokenType from "./TokenType";

export default interface PlayerInfo {
    name: string;
    tokenType: TokenType;
    turnOrder: number;
    roundWins: number;
}
