import { User } from "Modules/User/models/User";

export type UserDto = {
    user: User;
    token: string;
};
