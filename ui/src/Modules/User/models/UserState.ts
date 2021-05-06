import { User } from "./User";

export type UserState = {
    initialising: boolean;
    loading: boolean;
    data: User | null;
    loadUser(): Promise<void>;
    loginWithGoogle(): void;
};
