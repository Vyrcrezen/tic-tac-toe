
export default class MissingFormInputValueError extends Error {
    
    constructor(fieldName: string) {
        super(`Missing form input value for field: ${fieldName}`);
    }
}
