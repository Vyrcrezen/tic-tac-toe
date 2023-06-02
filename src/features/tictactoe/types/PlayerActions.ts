import TokenType from "./TokenType";

export default interface PlayerActions {
  name: string;
  turnOrder: number;
  didMove: boolean;
  winConditionChecked: boolean;
  tokenType: TokenType;
  score: number;
}
