import { User } from '@modules/user/models/User';
import { SessionDao } from './models/SessionDao';
import { SessionEntity } from './models/SessionEntity';

export class SessionEntityImpl implements SessionEntity {
    constructor(private _dao: SessionDao) { }

    create(user: User) {
        return this._dao.create(user);
    }

    getById(id: string) {
        return this._dao.getById(id);
    }

    removeById(id: string) {
        return this._dao.removeById(id);
    }
}
