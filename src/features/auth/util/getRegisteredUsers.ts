import UserDataWithEmail from "../types/UserDataWithEmail";

export default function getRegisteredUsers() {

    let registeredUsers: { [prop: string]: UserDataWithEmail } = {};

    try {
        registeredUsers = JSON.parse(window.localStorage.getItem('registeredUsers') || '{}');
    }
    catch (err) {
        window.localStorage.setItem('registeredUsers', '{}');
    }

    return registeredUsers;
}
