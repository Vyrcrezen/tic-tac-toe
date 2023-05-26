import * as bcryptjs from 'bcryptjs';

import UserDataWithEmail from "../types/UserDataWithEmail";
import getRegisteredUsers from './getRegisteredUsers';

export default async function registerNewUser(userData: UserDataWithEmail) {

    const { email, password, username } = userData;
    const registeredUsers = getRegisteredUsers();

    const hashedPassword = await bcryptjs.hash(password, 12);

    window.localStorage.setItem('registeredUsers', JSON.stringify({
    ...registeredUsers,
    [username]: {
        email: email,
        username: username,
        password: hashedPassword
    }} as { [prop: string]: UserDataWithEmail } ));
};
