import { User } from '@modules/user/userEntity';

export type Session = {
    id: string;
    expiration: number;
    user: User;
};
