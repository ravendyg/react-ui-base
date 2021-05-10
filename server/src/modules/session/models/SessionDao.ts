import { User } from "@modules/user/models/User";
import { Session } from "./Session";

export type SessionDao = {
    getById: (id: string) => Promise<Session | null>;
    removeById: (id: string) => Promise<void>;
    create: (user: User) => Promise<Session>;
}
