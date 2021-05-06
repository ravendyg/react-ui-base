import { User } from '@modules/user/userEntity';
import { Session } from './sessionEntity';

export type SessionDao = {
    getById: (id: string) => Promise<Session | null>;
    removeById: (id: string) => Promise<void>;
    create: (user: User) => Promise<Session>;
}
