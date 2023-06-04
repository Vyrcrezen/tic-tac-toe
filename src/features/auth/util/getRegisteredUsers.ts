import UserDataWithEmail from "../types/UserDataWithEmail";

/**
 * The list of registered users is only stored in `Local Storage`
 * @returns an object of users like this: `{ username: { username: string, email: string, password: string } }`, the password is hashed useing bcryptjs' hash algorithm
 */
export default function getRegisteredUsers() {

    // Variable to store the users
    let registeredUsers: { [prop: string]: UserDataWithEmail } = {};

    try {
        // Retrieve the registered users from local storage, and parse it
        registeredUsers = JSON.parse(window.localStorage.getItem('registeredUsers') || '{}');
    }
    catch (err) {
        // If there was an error, because the stored JSON string is corrupt, overwrite with an empty one
        window.localStorage.setItem('registeredUsers', '{}');
    }

    return registeredUsers;
}
