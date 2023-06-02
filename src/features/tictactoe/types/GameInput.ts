import PlayerInfo from "./PlayerInfo";

export default interface GameInput {
    boardColumns: number;
    boardRows: number;
    players: PlayerInfo[];
    numAdjacentTokensToWin: number;
}
