import { GoogleUser } from "./GoogleUser";
import { User } from "./User";

export type UserDao = {
    getById: (id: number) => Promise<User | null>;
    getByGmail: (gmail: string) => Promise<User | null>;
    createGoogleUser: (guser: GoogleUser) => Promise<User>
}
