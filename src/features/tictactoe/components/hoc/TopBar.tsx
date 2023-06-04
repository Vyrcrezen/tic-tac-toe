import React from "react";
import importMapAssets from "../../imports/importMapAssets";
import PlayerTurns from "../presentational/PlayerTurnsBar";
import { useAppSelector } from "../../../../global/redux/hooks";
import RoundWonBar from "../presentational/RoundWonBar";
import TicTacToeTitle from "../presentational/TicTacToeTitle";

/**
 * 
 * @param param0 the dynamically imported map assets, as returned by `importMapAssets`
 * @returns a React component which displays one of three components based on internal states: `TicTacToeTitle`, `PlayerTurns` or `RoundWonBar`
 */
export default function TopBar({mapAssets}: {mapAssets?: Awaited<ReturnType<typeof importMapAssets>>}) {

    const state = useAppSelector(state => state.ticTacToe);

    return(
        <div className={`d-flex flex-column align-items-center rounded mb-2  ttt-top-bar ${state.gameState.isInitialized ? 'sticky-top' : ''}`} >
            {
                !state.gameState.isInitialized
                ? <TicTacToeTitle />
                : !state.gameState.isGameOver
                ? <PlayerTurns mapAssets={mapAssets} />
                : <RoundWonBar mapAssets={mapAssets} />}
        </div>
    );
}
