import React, { useEffect, useState } from "react";
import GameCanvas from "./GameCanvas";
import importMapAssets from "../../imports/importMapAssets";
import { useAppDispatch } from "../../../../global/redux/hooks";
import TopBar from "../hoc/TopBar";


export default function GameCanvasArea() {
    const [mapAssets, setMapAssets] = useState<Awaited<ReturnType<typeof importMapAssets>>>();

    const dispatch = useAppDispatch();

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
