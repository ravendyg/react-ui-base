import { GoogleUser } from "./models/GoogleUser";
import { UserDao } from "./models/UserDao";
import { UserEntity } from "./models/UserEntity";

export class UserEntityImpl implements UserEntity {
    constructor(private _dao: UserDao) { }

    createGoogleUser(guser: GoogleUser) {
        return this._dao.createGoogleUser(guser);
    }

    getByGmail(gmail: string) {
        return this._dao.getByGmail(gmail);
    }

    getById(id: number) {
        return this._dao.getById(id);
    }
}
