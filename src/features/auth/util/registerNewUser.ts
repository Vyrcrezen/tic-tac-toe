import * as bcryptjs from 'bcryptjs';

import UserDataWithEmail from "../types/UserDataWithEmail";
import getRegisteredUsers from './getRegisteredUsers';

/**
 * Hashes the user password, and adds the user to the list of registered users stored inside the Local Storage
 * @param userData submitted user data for the registration
 */
export default async function registerNewUser(userData: UserDataWithEmail) {

    const { email, password, username } = userData;
    const registeredUsers = getRegisteredUsers();

    // Hash the user password for security, and discard the plain text version
    const hashedPassword = await bcryptjs.hash(password, 12);

    // Update the list of registered users with the new entry
    window.localStorage.setItem('registeredUsers', JSON.stringify({
    ...registeredUsers,
    [username]: {
        email: email,
        username: username,
        password: hashedPassword
    }} as { [prop: string]: UserDataWithEmail } ));
};
