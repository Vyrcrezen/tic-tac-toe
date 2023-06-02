import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../global/redux/hooks";
import importMapAssets from "../../imports/importMapAssets";
import Button from "@mui/material/Button";
import { setIsNextStateSelected, setNextState } from "../../redux/reducers/slices/gameStateSlice";

export default function RoundWonBar({ mapAssets }: { mapAssets?: Awaited<ReturnType<typeof importMapAssets>> }) {

    const roundWinner = useAppSelector(state => state.ticTacToe.gameState.roundWinner);
    const dispatch = useAppDispatch();

    return (
        <div className="d-flex flex-grow-1 position-relative justify-content-center">
            <div className="d-flex flex-column align-items-center rounded vy-secondary px-2 vy-player-winner-container">
                <h5 className="mb-0" >{roundWinner?.name ?? 'Player'}</h5>
                <h6 className="mb-1">won!</h6>
                <small>score: {roundWinner.score}</small>
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
                        dispatch(setNextState('CONTINUE'));
                        dispatch(setIsNextStateSelected(true));
                    }}
                >
                    Continue
                </Button>

                <Button
                    variant='contained'
                    color='primary'
                    type='button'
                    onClick={() => {
                        dispatch(setNextState('END'));
                        dispatch(setIsNextStateSelected(true));
                    }}
                >
                    End
                </Button>
            </div>
        </div>
    );
}