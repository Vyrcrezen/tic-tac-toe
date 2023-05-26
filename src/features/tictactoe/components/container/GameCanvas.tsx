import React, { useEffect, useRef, useState } from "react";


import { useAppDispatch, useAppSelector } from "../../../../global/redux/hooks";

import fullCellFrameImg from '../../media/images/full-cell-frame.png';
import { addPlayerToken, setBoardDimensions } from "../../redux/reducers/slices/gameResourcesSlice";
import Coordinate from "../../types/Coordinate";
import PlacedToken from "../../types/PlacedToken";
import isTokenPresentInCell from "../../util/isTokenPresentInCell";

import initialGameImage from './../../media/images/blank-map.png';
import ringTokenImg from './../../media/images/wooden-ring.png';
import importMapAssets from "../../imports/importMapAssets";
import { addPlayer } from "../../redux/reducers/slices/gameInputSlice";
import GameSetup from "./GameSetup";

export default function GameCanvas() {

    const [mapAssets, setMapAssets] = useState<Awaited<ReturnType<typeof importMapAssets>>>();

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const state = useAppSelector(state => state.ticTacToe);
    const dispatch = useAppDispatch();

    // Import the assets
    useEffect(() => {
        if (!mapAssets) {
            importMapAssets()
                .then(assets => setMapAssets(assets))
                .catch(err => console.log(err));

            dispatch(addPlayer({ playerName: "Vyr", token: 'bipyramid' }));
            dispatch(addPlayer({ playerName: "Vyr", token: 'bipyramid' }));
            dispatch(addPlayer({ playerName: "Cresi", token: 'triangle' }));
        }
    }, []);

    useEffect(() => {

        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const parentElement = canvas.parentElement;
        const ctx = canvas.getContext('2d');

        if (!ctx || !parentElement) return;

        const parentStyles = window.getComputedStyle(parentElement);
        const parentWidth = parentElement.clientWidth - parseFloat(parentStyles.paddingLeft) - parseFloat(parentStyles.paddingRight);

        const numColumns = state.gameInput.boardColumns;
        const numRows = state.gameInput.boardRows;

        const cellSize = Math.round(parentWidth / numColumns);

        canvas.width = numColumns * cellSize;
        canvas.height = numRows * cellSize;

        dispatch(setBoardDimensions({ canvasHeight: canvas.height, canvasWidht: canvas.width, cellSize }));

    }, [canvasRef.current]);

    useEffect(() => {

        if (!canvasRef.current || !mapAssets) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        if (!ctx) return;

        const { cellSize } = state.gameResources.boardDimensions;
        const { boardRows, boardColumns } = state.gameInput;
        const { tokens } = state.gameResources;

        for (let columnIndex = 0; columnIndex < boardColumns; columnIndex++) {
            for (let rowIndex = 0; rowIndex < boardRows; rowIndex++) {

                const canvasX = columnIndex * cellSize;
                const canvasY = rowIndex * cellSize;

                ctx.drawImage(mapAssets.fullCellFrame.image, canvasX, canvasY, cellSize, cellSize);
            }
        }

        tokens.forEach(token => {
            ctx.drawImage(mapAssets.ring.image, token.position.x * cellSize, token.position.y * cellSize, cellSize, cellSize);
        });

    }, [mapAssets, canvasRef.current, state.gameResources.boardDimensions, state.gameResources.tokens]);

    return (
        <div className="p-3 w-100 h-100 rounded" >
            {
                state.gameState.isRunning
                ? <canvas
                    className="rounded w-100 h-100"
                    ref={canvasRef}
                    onClick={(event) => {
                        if (!canvasRef.current) return;

                        const canvasRect = canvasRef.current.getBoundingClientRect();

                        const canvasX = event.clientX - canvasRect.left;
                        const canvasY = event.clientY - canvasRect.top;

                        const { tokens, boardDimensions: { cellSize } } = state.gameResources;

                        const cellX = Math.floor(canvasX / cellSize);
                        const cellY = Math.floor(canvasY / cellSize);

                        const isCellOccupied = isTokenPresentInCell({ x: cellX, y: cellY }, tokens);

                        if (!isCellOccupied) {
                            dispatch(addPlayerToken({
                                position: { x: cellX, y: cellY },
                                type: 'ring'
                            }));
                        }
                    }}
                />
                : <GameSetup />
            }
            
        </div>
    );
}
