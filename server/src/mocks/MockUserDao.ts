import { UserDao } from "@modules/user/userDao";
import { GoogleUser, User } from "@modules/user/userEntity";
import { MockStorage } from "./MockStorage";

export class MockUserDao implements UserDao {
    private _mockDb = new MockStorage<User>('users.json');

    async getById(id: number) {
        const db = await this._mockDb.openDb();
        const user = db.find(u => u.id === id) || null;
        return user;
    }

    async getByGmail(gmail: string) {
        const db = await this._mockDb.openDb();
        const user = db.find(u => u.googleData?.email === gmail) || null;
        return user;
    }

    async createGoogleUser(guser: GoogleUser) {
        const db = await this._mockDb.openDb();
        const existing = db.find(u => u.googleData?.email === guser.email);
        if (existing) {
            return existing;
        }
        const newUser: User = {
            id: db.length,
            googleData: guser,
        };
        db.push(newUser);
        await this._mockDb.saveDb(db);
        return newUser;
    }
}
