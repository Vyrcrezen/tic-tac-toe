import React, { useEffect, useRef, useState } from "react";


import { useAppDispatch, useAppSelector } from "../../../../global/redux/hooks";

import fullCellFrameImg from '../../media/images/full-cell-frame.png';
import { setBoardDimensions } from "../../redux/reducers/slices/gameResourcesSlice";
import Coordinate from "../../types/Coordinate";
import PlacedToken from "../../types/PlacedToken";
import isTokenPresentInCell from "../../util/isTokenPresentInCell";

import initialGameImage from './../../media/images/blank-map.png';
import ringTokenImg from './../../media/images/wooden-ring.png';
import importMapAssets from "../../imports/importMapAssets";
import { addPlayer } from "../../redux/reducers/slices/gameInputSlice";
import GameSetup from "./GameSetup";
import getCurrentPlayer from "../../util/getCurrentPlayer";
import getPreviousPlayer from "../../util/getPreviousPlayer";
import getNextPlayer from "../../util/getNextPlayer";
import placeCurrentPlayerTokenThunk from "../../redux/reducers/thunks/placeCurrentPlayerTokenThunk";
import LoginPage from "../../../../pages/contents/LoginPage";
import { Link } from "react-router-dom";

export default function GameCanvas({mapAssets}: {mapAssets?: Awaited<ReturnType<typeof importMapAssets>>}) {

    

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const state = useAppSelector(state => state.ticTacToe);
    const loggedUser = useAppSelector(state => state.userAuth.loggedUserName);
    const dispatch = useAppDispatch();

    console.log(state);

    // if (state.gameState.inGameTasks.playerActionsList) {
    //     console.log(getPreviousPlayer(state.gameState.inGameTasks.playerActionsList));
    //     console.log(getCurrentPlayer(state.gameState.inGameTasks.playerActionsList));
    //     console.log(getNextPlayer(state.gameState.inGameTasks.playerActionsList));
    // }



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

    }, [canvasRef.current, state.gameState.isInitialized]);

    useEffect(() => {

        if (!canvasRef.current || !mapAssets) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        if (!ctx) return;        

        const { cellSize } = state.gameResources.boardDimensions;
        const { boardRows, boardColumns } = state.gameInput;
        const { tokens } = state.gameState.inGameResource;
        const { boardDimensions } = state.gameResources;

        ctx.clearRect(0, 0, boardDimensions.canvasWidht, boardDimensions.canvasHeight);

        for (let columnIndex = 0; columnIndex < boardColumns; columnIndex++) {
            for (let rowIndex = 0; rowIndex < boardRows; rowIndex++) {

                const canvasX = columnIndex * cellSize;
                const canvasY = rowIndex * cellSize;

                ctx.drawImage(mapAssets.fullCellFrame.image, canvasX, canvasY, cellSize, cellSize);
            }
        }

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
            }
            
        });

    }, [mapAssets, canvasRef.current, state.gameState.isInitialized, state.gameResources.boardDimensions, state.gameState.inGameResource.tokens]);

    return (
        <div className="p-2 w-100 h-100 rounded" >
            {
                !loggedUser
                ? <h4 className="text-center m-5">Please <a href="/login">Login</a> or <Link to="/register">Register</Link> to play the game.</h4>
                : state.gameState.isInitialized
                    ? <canvas
                        className="rounded w-100 h-100"
                        ref={canvasRef}
                        onClick={(event) => {
                            if (!canvasRef.current) return;

                            dispatch(placeCurrentPlayerTokenThunk(event, canvasRef.current, state.gameResources, state.gameState));
                        }}
                    />
                    : <GameSetup mapAssets={mapAssets} />
            }

        </div>
    );
}
