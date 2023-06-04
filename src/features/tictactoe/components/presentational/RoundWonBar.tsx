import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../global/redux/hooks";
import importMapAssets from "../../imports/importMapAssets";
import Button from "@mui/material/Button";
import { setIsNextStateSelected, setNextState } from "../../redux/reducers/slices/gameStateSlice";

/**
 * 
 * @param param0 the dynamically imported map assets, as returned by `importMapAssets`
 * @returns a React component, which includes the winning player's card and two buttons for either continuing or ending the game
 */
export default function RoundWonBar({ mapAssets }: { mapAssets?: Awaited<ReturnType<typeof importMapAssets>> }) {

    const roundWinner = useAppSelector(state => state.ticTacToe.gameState.roundWinner);
    const locale = useAppSelector(state => state.localization.data.ticTacToe.roundWon);

    const dispatch = useAppDispatch();

    return (
        <div className="d-flex flex-grow-1 position-relative justify-content-center">
            <div className="d-flex flex-column align-items-center rounded vy-secondary px-2 vy-player-winner-container">
                <h5 className="mb-0" >{roundWinner?.name ?? 'Player'}</h5>
                <h6 className="mb-1">{locale.won}!</h6>
                <small>{locale.score}: {roundWinner.score}</small>
                <div className="d-flex flex-row  align-items-center justify-content-center">
                    {mapAssets
                        ? <img className="h-100" src={mapAssets[roundWinner.tokenType ?? 'ring'].src} alt="" />
                        : <img className="h-100" src="" alt="" />
                    }
                </div>
            </div>
            <div className="d-flex flex-row position-absolute rounded p-2 ">
                <Button
                    variant='contained'
                    color='primary'
                    type='button'
                    onClick={() => {
                        // The `setupNextGameThunk` will read this value to determine how to change the internal states
                        dispatch(setNextState('CONTINUE'));
                        // This value triggers the gameplay updater
                        dispatch(setIsNextStateSelected(true));
                    }}
                >
                    {locale.continue}
                </Button>

                <Button
                    variant='contained'
                    color='primary'
                    type='button'
                    onClick={() => {
                        // The `setupNextGameThunk` will read this value to determine how to change the internal states
                        dispatch(setNextState('END'));
                        // This value triggers the gameplay updater
                        dispatch(setIsNextStateSelected(true));
                    }}
                >
                    {locale.end}
                </Button>
            </div>
        </div>
    );
}
