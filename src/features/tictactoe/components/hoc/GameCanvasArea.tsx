import React, { useEffect, useState } from "react";
import GameCanvas from "../container/GameCanvas";
import importMapAssets from "../../imports/importMapAssets";
import TopBar from "./TopBar";

/**
 * 
 * @returns a React component, which includes the `TopBar` responsible for displaying player turns and winner,
 * as well as the `GameCanvas`, where the game's settings or the game canvas is located
 */
export default function GameCanvasArea() {
    const [mapAssets, setMapAssets] = useState<Awaited<ReturnType<typeof importMapAssets>>>();

    // Import the assets
    useEffect(() => {
        if (!mapAssets) {
            importMapAssets()
                .then(assets => setMapAssets(assets))
                .catch(err => console.log(err));
        }
    }, []);
    return (
        <div className="container mt-3">
            <TopBar mapAssets={mapAssets} />
                <div className="flex-grow-1">
                    <div className='d-flex flex-column align-items-center rounded vy-secondary'>
                        <GameCanvas mapAssets={mapAssets} />
                    </div>
                </div>
        </div>
    );
}
