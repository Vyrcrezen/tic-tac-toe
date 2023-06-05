import SupportedLocale from "./SupportedLocale"

export default interface LocalizationData {
    data: {
        locale: string,
        ticTacToe: {
            title: string,
            loginPrompt: {
                please: string,
                login: string,
                or: string,
                register: string,
                toPlay: string,
            },
            gameSetup: {
                welcome: string,
                readyToPlay: string,
                boardCol: string,
                boardRow: string,
                adjacentTokensToWin: string,
                playerName: string,
                token: string,
                addPlayer: string,
                start: string
            },
            playerTurns: {
                current: string,
                previous: string,
                next: string,
                score: string
            },
            roundWon: {
                won: string,
                continue: string,
                end: string,
                score: string
            },
            tokens: {
                x: string,
                ring: string,
                coin: string,
                triangle: string,
                star: string,
                pentagon: string,
                hexagon: string,
                bipyramid: string,
                square: string,
                heart: string,
            }
        },
        auth: {
            common: {
                login: string,
                register: string,
                username: string,
                email: string,
                password: string,
                rePassword: string,
            },
            error: {
                required: string,
                unkownError: string,
                passwordsMustMatch: string,
                invalidEmail: string,
                usernameLength: string,
                passwordLength: string,
            }
        }
    }
}
