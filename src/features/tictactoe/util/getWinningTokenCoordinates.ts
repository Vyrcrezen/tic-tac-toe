import Coordinate from "../types/Coordinate";
import PlacedToken from "../types/PlacedToken";
import TokenType from "../types/TokenType";

export default function getWinningTokenCoordinates(gameTokens: PlacedToken[], tokenType: TokenType, adjacentAmountNeededToWin: number) {

    const horizontalWinningTokenCoordinates: Coordinate[] = [];
    const verticalWinningTokenCoordinates: Coordinate[] = [];
    const upRightWinningTokenCoordinates: Coordinate[] = [];
    const downRightWinningTokenCoordinates: Coordinate[] = [];

    for (let baseToken of gameTokens) {
        
        if(baseToken.type === tokenType) {
            // Count horizontal adjacent tokens of the same type
            // Since we check each token individually, it's enough to only count in one direction, because we will also check the token at the extremity of the row
            horizontalWinningTokenCoordinates.push(baseToken.position);
            let endOfSimilarTokensReached = false;
            let counter = 1;

            // Horizontal
            while (!endOfSimilarTokensReached) {
                const nextHorizontalToken = gameTokens.find(token => token.position.y === baseToken.position.y && token.position.x === baseToken.position.x + counter && token.type === baseToken.type);
                
                if (!nextHorizontalToken) endOfSimilarTokensReached = true;
                else {
                    horizontalWinningTokenCoordinates.push(nextHorizontalToken.position);
                    ++counter;
                }
            }

            // Vertical
            verticalWinningTokenCoordinates.push(baseToken.position);
            endOfSimilarTokensReached = false;
            counter = 1;
            while (!endOfSimilarTokensReached) {
                const nextVerticalToken = gameTokens.find(token => token.position.y === baseToken.position.y + counter && token.position.x === baseToken.position.x && token.type === baseToken.type);
                
                if (!nextVerticalToken) endOfSimilarTokensReached = true;
                else {
                    verticalWinningTokenCoordinates.push(nextVerticalToken.position);
                    ++counter;
                }
            }

            // Up-Right Diagonal
            upRightWinningTokenCoordinates.push(baseToken.position);
            endOfSimilarTokensReached = false;
            counter = 1;
            while (!endOfSimilarTokensReached) {
                const nextUpRightToken = gameTokens.find(token => token.position.y === baseToken.position.y + counter && token.position.x === baseToken.position.x + counter && token.type === baseToken.type);
                
                if (!nextUpRightToken) endOfSimilarTokensReached = true;
                else {
                    upRightWinningTokenCoordinates.push(nextUpRightToken.position);
                    ++counter;
                }
            }

            // Down-Right Diagonal
            downRightWinningTokenCoordinates.push(baseToken.position);
            endOfSimilarTokensReached = false;
            counter = 1;
            while (!endOfSimilarTokensReached) {
                const nextDownRightToken = gameTokens.find(token => token.position.y === baseToken.position.y - counter && token.position.x === baseToken.position.x + counter && token.type === baseToken.type);
                
                if (!nextDownRightToken) endOfSimilarTokensReached = true;
                else {
                    downRightWinningTokenCoordinates.push(nextDownRightToken.position);
                    ++counter;
                }
            }

            // Let's see what coordinates we have
            if (horizontalWinningTokenCoordinates.length >= adjacentAmountNeededToWin) break;
            else if (verticalWinningTokenCoordinates.length >= adjacentAmountNeededToWin) break;
            else if (upRightWinningTokenCoordinates.length >= adjacentAmountNeededToWin) break;
            else if (downRightWinningTokenCoordinates.length >= adjacentAmountNeededToWin) break;
            else {
                horizontalWinningTokenCoordinates.length = 0;
                verticalWinningTokenCoordinates.length = 0;
                upRightWinningTokenCoordinates.length = 0;
                downRightWinningTokenCoordinates.length = 0;
            }
            
        }
    };

    // console.log('horizontal, vertical, up-right, down-right');
    // console.log(horizontalWinningTokenCoordinates);
    // console.log(verticalWinningTokenCoordinates);
    // console.log(upRightWinningTokenCoordinates);
    // console.log(downRightWinningTokenCoordinates);

    if (horizontalWinningTokenCoordinates.length >= adjacentAmountNeededToWin) return horizontalWinningTokenCoordinates;
    if (verticalWinningTokenCoordinates.length >= adjacentAmountNeededToWin) return verticalWinningTokenCoordinates;
    if (upRightWinningTokenCoordinates.length >= adjacentAmountNeededToWin) return upRightWinningTokenCoordinates;
    if (downRightWinningTokenCoordinates.length >= adjacentAmountNeededToWin) return downRightWinningTokenCoordinates;
    return [];

}
