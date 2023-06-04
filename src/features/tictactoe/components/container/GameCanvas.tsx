import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../../global/redux/hooks";

import { setBoardDimensions } from "../../redux/reducers/slices/gameResourcesSlice";
import importMapAssets from "../../imports/importMapAssets";
import GameSetup from "./GameSetup";
import placeCurrentPlayerTokenThunk from "../../redux/reducers/thunks/placeCurrentPlayerTokenThunk";
import LoginPrompt from "../presentational/LoginPrompt";

export default function GameCanvas({mapAssets}: {mapAssets?: Awaited<ReturnType<typeof importMapAssets>>}) {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const state = useAppSelector(state => state.ticTacToe);
    const loggedUser = useAppSelector(state => state.userAuth.loggedUserName);
    const dispatch = useAppDispatch();

    // This hook is responsible for updating the calculated board dimensions
    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const parentElement = canvas.parentElement;
        const ctx = canvas.getContext('2d');

        // If the canvas hasn't loaded yet, there's nothing to do
        if (!ctx || !parentElement) return;

        // Retrieve the parent width, excluding the padding
        const parentStyles = window.getComputedStyle(parentElement);
        const parentWidth = parentElement.clientWidth - parseFloat(parentStyles.paddingLeft) - parseFloat(parentStyles.paddingRight);

        const numColumns = state.gameInput.boardColumns;
        const numRows = state.gameInput.boardRows;

        // Calculate the actual width of a single cell, we are more contrained horizontally than vertically
        const cellSize = Math.round(parentWidth / numColumns);

        // Set the dimensions of the canvas
        canvas.width = numColumns * cellSize;
        canvas.height = numRows * cellSize;

        // Store the canvas dimensions for later
        dispatch(setBoardDimensions({ canvasHeight: canvas.height, canvasWidht: canvas.width, cellSize }));

    }, [canvasRef.current, state.gameState.isInitialized, state.gameInput.boardColumns, state.gameInput.boardRows]);

    // This hook is responsible for drawing elements onto the canvas
    useEffect(() => {
        if (!canvasRef.current || !mapAssets) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // If we coudn't retrieve the canvas context, there's nothing to do
        if (!ctx) return;        

        // Retrieve the board dimensions and the token positions
        const { cellSize } = state.gameResources.boardDimensions;
        const { boardRows, boardColumns } = state.gameInput;
        const { tokens } = state.gameState.inGameResource;
        const { boardDimensions } = state.gameResources;

        // Clear the previous canvas
        ctx.clearRect(0, 0, boardDimensions.canvasWidht, boardDimensions.canvasHeight);

        // Draw a cell border inside each cell
        for (let columnIndex = 0; columnIndex < boardColumns; columnIndex++) {
            for (let rowIndex = 0; rowIndex < boardRows; rowIndex++) {

                const canvasX = columnIndex * cellSize;
                const canvasY = rowIndex * cellSize;

                ctx.drawImage(mapAssets.fullCellFrame.image, canvasX, canvasY, cellSize, cellSize);
            }
        }

        // Draw each token placed on the canvas
        tokens.forEach(token => {
            switch (token.type) {
                case 'bipyramid': ctx.drawImage(mapAssets.bipyramid.image, token.position.x * cellSize, token.position.y * cellSize, cellSize, cellSize);
                break;
                case 'triangle': ctx.drawImage(mapAssets.triangle.image, token.position.x * cellSize, token.position.y * cellSize, cellSize, cellSize);
                break;
                case 'ring': ctx.drawImage(mapAssets.ring.image, token.position.x * cellSize, token.position.y * cellSize, cellSize, cellSize);
                break;
                case 'x': ctx.drawImage(mapAssets.x.image, token.position.x * cellSize, token.position.y * cellSize, cellSize, cellSize);
                break;
                case 'coin': ctx.drawImage(mapAssets.coin.image, token.position.x * cellSize, token.position.y * cellSize, cellSize, cellSize);
                break;
                case 'square': ctx.drawImage(mapAssets.square.image, token.position.x * cellSize, token.position.y * cellSize, cellSize, cellSize);
                break;
                case 'star': ctx.drawImage(mapAssets.star.image, token.position.x * cellSize, token.position.y * cellSize, cellSize, cellSize);
                break;
                case 'pentagon': ctx.drawImage(mapAssets.pentagon.image, token.position.x * cellSize, token.position.y * cellSize, cellSize, cellSize);
                break;
                case 'hexagon': ctx.drawImage(mapAssets.hexagon.image, token.position.x * cellSize, token.position.y * cellSize, cellSize, cellSize);
                break;
                case 'heart': ctx.drawImage(mapAssets.heart.image, token.position.x * cellSize, token.position.y * cellSize, cellSize, cellSize);
                break;
            }
            
        });

    }, [mapAssets, canvasRef.current, state.gameState.isInitialized, state.gameResources.boardDimensions, state.gameState.inGameResource.tokens]);

    return (
        <div className="p-2 w-100 h-100 rounded" >
            {
                !loggedUser
                ? <LoginPrompt />
                : state.gameState.isInitialized
                    ? <canvas
                        className="rounded w-100 h-100"
                        ref={canvasRef}
                        onClick={(event) => {
                            if (!canvasRef.current) return;
                            // On a click event, we call the thunk handling the placing of tokens
                            dispatch(placeCurrentPlayerTokenThunk(event, canvasRef.current, state.gameResources, state.gameState));
                        }}
                    />
                    : <GameSetup mapAssets={mapAssets} />
            }
        </div>
    );
}
