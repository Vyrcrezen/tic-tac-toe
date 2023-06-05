import LocalizationData from "../redux/types/LocalizationData";
import * as _ from 'lodash';

const defaultLocalizationData: LocalizationData = {
    data: {
        locale: 'en',
        "ticTacToe": {
            "title": "Tic-Tac-Toe",
            loginPrompt: {
                please: "Please",
                login: "Login",
                or: "or",
                register: "Register",
                toPlay: "to play the game."
            },
            gameSetup: {
                welcome: "Welcome, ",
                readyToPlay: "Ready to play a game?",
                boardCol: "Board columns",
                boardRow: "Board rows",
                adjacentTokensToWin: "Adjacent tokens to win",
                playerName: "Player name",
                token: "Token",
                addPlayer: "Add player",
                start: "Start"
            },
            playerTurns: {
                current: "current",
                previous: "previous",
                next: "next",
                score: "score"
            },
            roundWon: {
                won: "won",
                continue: "continue",
                end: "end",
                score: "score"
            },
            tokens: {
                x: "x",
                ring: "ring",
                coin: "coin",
                triangle: "triangle",
                star: "star",
                pentagon: "pentagon",
                hexagon: "hexagon",
                bipyramid: "bipyramid",
                square: "square",
                heart: "heart",
            }
        },
        auth: {
            common: {
                login: "Login",
                register: "Register",
                username: "Username",
                email: "Email",
                password: "Password",
                rePassword: "Password again",
            },
            error: {
                required: "Required",
                unkownError: "Something went wrong",
                passwordsMustMatch: "Passwords must match",
                invalidEmail: "Invalid email address",
                usernameLength: "Username must be between 3 and 16 characters long.",
                passwordLength: "Password must be between 8 and 32 characters long.",
            }
        }
    }
};

export default function getDefaultLocalizationData() {
    return _.cloneDeep(defaultLocalizationData);
}
