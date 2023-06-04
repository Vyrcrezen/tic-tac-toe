import React from 'react';
import GameCanvasArea from '../../features/tictactoe/components/hoc/GameCanvasArea';
import RuntimeUpdater from '../../features/tictactoe/logic/RuntimeUpdater';

export default function TicTacToePage() {
    return (
        <div className="container p-0">
            <RuntimeUpdater />
            <GameCanvasArea />
        </div>
    );
}
