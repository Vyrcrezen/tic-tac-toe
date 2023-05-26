import React from "react";
import GameCanvas from "./GameCanvas";


export default function GameCanvasArea() {
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-lg-8 flex-grow-1 map-element">
                    <div className='d-flex flex-column align-items-center h-100 rounded vy-secondary'>
                        <GameCanvas />
                    </div>
                </div>
                <div className="col-lg-4 flex-grow-1 map-side-element">
                    Side elements
                </div>
            </div>
        </div>
    );
}
