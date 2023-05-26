import EmailAlreadyInUse from "../errors/EmailAlreadyInUse";
import UsernameAlreadyRegisteredError from "../errors/UsernameAlreadyRegisteredError";
import UserDataWithEmail from "../types/UserDataWithEmail";
import getRegisteredUsers from "./getRegisteredUsers";
import registerNewUser from "./registerNewUser";

export default async function validateRegister(userData: UserDataWithEmail) {
    const registeredUsers = getRegisteredUsers();

    if (registeredUsers[userData.username]) throw new UsernameAlreadyRegisteredError();

    const emailInUse = Object.values(registeredUsers).some(account => account.email === userData.email);
    if (emailInUse) throw new EmailAlreadyInUse();

    return true;
}
