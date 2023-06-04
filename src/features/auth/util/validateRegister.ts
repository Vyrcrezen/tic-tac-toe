import EmailAlreadyInUse from "../errors/EmailAlreadyInUse";
import UsernameAlreadyRegisteredError from "../errors/UsernameAlreadyRegisteredError";
import UserDataWithEmail from "../types/UserDataWithEmail";
import getRegisteredUsers from "./getRegisteredUsers";

/**
 * Checks if the username and email are available, if so, returns true, otherwise throws an error
 * @param userData user data which also includes an email
 * @returns either true, or throws an error
 */
export default async function validateRegister(userData: UserDataWithEmail) {
    const registeredUsers = getRegisteredUsers();

    // Check if username is already taken
    if (registeredUsers[userData.username]) throw new UsernameAlreadyRegisteredError();

    // Check if email is already taken
    const emailInUse = Object.values(registeredUsers).some(account => account.email === userData.email);
    if (emailInUse) throw new EmailAlreadyInUse();

    return true;
}
