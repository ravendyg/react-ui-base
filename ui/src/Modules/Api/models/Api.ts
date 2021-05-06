import { User } from "Modules/User/models/User";
import { Response } from './Response';

export type Api = {
    getUser: () => Promise<Response<User | null>>;
    loginWithGoogle: (idToken: string) => Promise<Response<User | null>>;
    signOut: () => Promise<void>;
};
