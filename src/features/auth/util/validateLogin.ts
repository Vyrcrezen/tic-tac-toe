import * as bcryptjs from 'bcryptjs';

import UsernameNotFoundError from "../errors/UsernameNotFoundError";
import UserData from "../types/UserData";
import getRegisteredUsers from "./getRegisteredUsers";
import IncorrectPasswordError from '../errors/IncorrectPasswordError';

/**
 * 
 * @param userData an object which includes a `username` and a `password`
 * @returns boolean value, indicating that the validation was successful or not
 */
export default async function validateLogin(userData: UserData) {

    // Get the registered users from local storage
    const registeredUsers = getRegisteredUsers();

    // Throw an error, indicating that there is no account with the given username
    if (!registeredUsers[userData.username]) throw new UsernameNotFoundError();
    
    // Check if the stored hashed password matches with the given password
    const isPasswordCorrect = await bcryptjs.compare( userData.password, registeredUsers[userData.username].password );

    // Throw an error, indicating that the password is incorrect
    if (!isPasswordCorrect) throw new IncorrectPasswordError();

    return isPasswordCorrect;    
}
