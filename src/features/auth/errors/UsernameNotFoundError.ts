
export default class UsernameNotFoundError extends Error {
    constructor() {
        super("No account with this username");
    }
}
