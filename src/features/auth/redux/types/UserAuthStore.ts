import SupportedLocale from "../../../localization/redux/types/SupportedLocale";

export default interface UserAuthStore {
    loggedUserName?: string;
    userSettings: {
        locale: SupportedLocale
    }
}
