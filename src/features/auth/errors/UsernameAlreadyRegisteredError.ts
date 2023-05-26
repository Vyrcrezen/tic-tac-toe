
export default class UsernameAlreadyRegisteredError extends Error {
    constructor() {
        super("Username already registered. Please choose another one.");
    }
}
