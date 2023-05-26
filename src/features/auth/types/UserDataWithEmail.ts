import UserData from "./UserData";

export default interface UserDataWithEmail extends UserData {
    email: string;
}
