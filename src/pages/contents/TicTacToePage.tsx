import React from 'react';
import GameCanvasArea from '../../features/tictactoe/components/container/GameCanvasArea';
import RuntimeUpdater from '../../features/tictactoe/logic/RuntimeUpdater';

export default function TicTacToePage() {
    return (
        <div className="container">
            <RuntimeUpdater />
            <GameCanvasArea />
        </div>
    );
}


// <Link to={'/tic-tac-toe/scores'}>Scores</Link>