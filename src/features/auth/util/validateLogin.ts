import * as bcryptjs from 'bcryptjs';

import UsernameNotFoundError from "../errors/UsernameNotFoundError";
import UserData from "../types/UserData";
import getRegisteredUsers from "./getRegisteredUsers";
import IncorrectPasswordError from '../errors/IncorrectPasswordError';

export default async function validateLogin(userData: UserData) {

    const registeredUsers = getRegisteredUsers();

    if (!registeredUsers[userData.username]) throw new UsernameNotFoundError();
    
    const isPasswordCorrect = await bcryptjs.compare( userData.password, registeredUsers[userData.username].password );

    if (!isPasswordCorrect) throw new IncorrectPasswordError();

    return isPasswordCorrect;    
}
