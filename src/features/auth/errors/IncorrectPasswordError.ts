
export default class IncorrectPasswordError extends Error {
    constructor() {
        super("Password is incorrect");
    }
}
