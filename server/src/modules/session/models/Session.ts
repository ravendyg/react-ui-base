import { User } from "@modules/user/models/User";

export type Session = {
    id: string;
    expiration: number;
    user: User;
};
