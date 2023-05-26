
export default class EmailAlreadyInUse extends Error {
    constructor() {
        super("This email is already in use. Would you like to login instead?");
    }
}
