import UserAuthStore from "./types/UserAuthStore";


const initialUserAuthState: UserAuthStore = {
    loggedUserName: undefined,
    userSettings: {
        locale: 'en'
    }
}

export default initialUserAuthState;
